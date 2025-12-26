import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import { TopicDetail, Entry } from '../../models/topic.model';

@Component({
  selector: 'app-topic-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './topic-detail.component.html',
  styleUrl: './topic-detail.component.scss'
})
export class TopicDetailComponent implements OnInit {
  topic: TopicDetail | null = null;
  loading = true;
  newEntryContent = '';
  submitting = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadTopic(+id);
    }
  }
  loadTopic(id: number): void {
    this.loading = true;
    this.apiService.getTopicById(id).subscribe({
      next: (topic) => {
        this.topic = topic;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading topic:', error);
        this.loading = false;
      }
    });
  }
  submitEntry(): void {
    if (!this.topic || !this.newEntryContent.trim() || !this.authService.isAuthenticated()) {
      return;
    }
    this.submitting = true;
    this.apiService.addEntry(this.topic.id, this.newEntryContent).subscribe({
      next: (entry) => {
        if (this.topic) {
          this.topic.entries.unshift(entry);
          this.topic.entryCount++;
        }
        this.newEntryContent = '';
        this.submitting = false;
      },
      error: (error) => {
        console.error('Error adding entry:', error);
        this.submitting = false;
      }
    });
  }
  toggleFavorite(entry: Entry): void {
    if (!this.authService.isAuthenticated()) {
      return;
    }

    this.apiService.toggleFavorite(entry.id).subscribe({
      next: () => {
        entry.isFavorite = !entry.isFavorite;
        entry.favoriteCount += entry.isFavorite ? 1 : -1;
      },
      error: (error) => {
        console.error('Error toggling favorite:', error);
      }
    });
  }
  formatDate(date: Date): string {
    const d = new Date(date);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - d.getTime());
    const diffMinutes = Math.ceil(diffTime / (1000 * 60));
    const diffHours = Math.ceil(diffTime / (1000 * 60 * 60));
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffMinutes < 60) return `${diffMinutes} dakika önce`;
    if (diffHours < 24) return `${diffHours} saat önce`;
    if (diffDays === 1) return 'Dün';
    if (diffDays < 7) return `${diffDays} gün önce`;
    return d.toLocaleDateString('tr-TR', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
}

