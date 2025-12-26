import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { Topic } from '../../models/topic.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  topics: Topic[] = [];
  loading = true;
  searchQuery = '';
  constructor(private apiService: ApiService) {}
  ngOnInit(): void {
    this.loadTopics();
  }
  loadTopics(): void {
    this.loading = true;
    this.apiService.getTopics().subscribe({
      next: (topics) => {
        this.topics = topics;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading topics:', error);
        this.loading = false;
      }
    });
  }
  onSearch(): void {
    if (this.searchQuery.trim()) {
      this.loading = true;
      this.apiService.searchTopics(this.searchQuery).subscribe({
        next: (topics) => {
          this.topics = topics;
          this.loading = false;
        },
        error: (error) => {
          console.error('Error searching topics:', error);
          this.loading = false;
        }
      });
    } else {
      this.loadTopics();
    }
  }
  formatDate(date: Date): string {
    const d = new Date(date);
    return d.toLocaleDateString('tr-TR', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    });
  }
}

