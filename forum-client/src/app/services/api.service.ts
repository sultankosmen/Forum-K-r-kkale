import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { Topic, Entry, TopicDetail } from '../models/topic.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://localhost:7181/api'; // Backend URL 

  // Simüle edilmiş veriler
  private mockTopics: Topic[] = [
    {
      id: 1,
      title: 'Kırıkkale Üniversitesi',
      slug: 'kirikkale-universitesi',
      entryCount: 45,
      lastEntryDate: new Date('2025-10-07'),
      author: 'kullanici1',
      isActive: true
    },
    {
      id: 2,
      title: 'Kırıkkale Hava Durumu',
      slug: 'kirikkale-hava-durumu',
      entryCount: 23,
      lastEntryDate: new Date('2025-15-06'),
      author: 'kullanici2',
      isActive: true
    },
    {
      id: 3,
      title: 'Kırıkkale Yemek Mekanları',
      slug: 'kirikkale-yemek-mekanlari',
      entryCount: 67,
      lastEntryDate: new Date('2025-11-04'),
      author: 'kullanici3',
      isActive: true
    },
    {
      id: 4,
      title: 'Kırıkkale Ulaşım',
      slug: 'kirikkale-ulasim',
      entryCount: 34,
      lastEntryDate: new Date('2025-11-01'),
      author: 'kullanici4',
      isActive: true
    },
    {
      id: 5,
      title: 'Kırıkkale Gezilecek Yerler',
      slug: 'kirikkale-gezilecek-yerler',
      entryCount: 28,
      lastEntryDate: new Date('2025-11-02'),
      author: 'kullanici5',
      isActive: true
    }
  ];

  private mockEntries: Record<number, Entry[]> = {
    1: [
      {
        id: 1,
        topicId: 1,
        content: 'Kırıkkale Üniversitesi, Türkiye\'nin önde gelen devlet üniversitelerinden biridir. Kampüsü oldukça geniş ve yeşillikler içerisindedir.',
        author: 'kullanici1',
        authorId: 1,
        createdAt: new Date('2025-01-10'),
        favoriteCount: 12,
        isFavorite: false
      },
      {
        id: 2,
        topicId: 1,
        content: 'Üniversite kampüsünde öğrenci yurtları, kütüphane, spor tesisleri ve yemekhaneler mevcuttur. Öğrenci yaşamı için oldukça uygun bir ortam sunuyor.',
        author: 'kullanici2',
        authorId: 2,
        createdAt: new Date('2025-10-11'),
        favoriteCount: 8,
        isFavorite: false
      },
      {
        id: 3,
        topicId: 1,
        content: 'Mühendislik fakültesi özellikle güçlü. Mezun öğrenciler genellikle iyi işlere yerleşiyor.',
        author: 'kullanici3',
        authorId: 3,
        createdAt: new Date('2025-15-09'),
        favoriteCount: 15,
        isFavorite: false
      }
    ]
  };

  constructor() { }

  // Topics
  getTopics(): Observable<Topic[]> {
    return of(this.mockTopics).pipe(delay(300));
  }

  getTopicById(id: number): Observable<TopicDetail | null> {
    const topic = this.mockTopics.find(t => t.id === id);
    if (!topic) {
      return of(null).pipe(delay(300));
    }

    const entries = this.mockEntries[id] || [];
    const topicDetail: TopicDetail = {
      ...topic,
      entries: entries.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
    };

    return of(topicDetail).pipe(delay(300));
  }

  getTopicBySlug(slug: string): Observable<TopicDetail | null> {
    const topic = this.mockTopics.find(t => t.slug === slug);
    if (!topic) {
      return of(null).pipe(delay(300));
    }

    const entries = this.mockEntries[topic.id] || [];
    const topicDetail: TopicDetail = {
      ...topic,
      entries: entries.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
    };

    return of(topicDetail).pipe(delay(300));
  }

  searchTopics(query: string): Observable<Topic[]> {
    const filtered = this.mockTopics.filter(topic =>
      topic.title.toLowerCase().includes(query.toLowerCase())
    );
    return of(filtered).pipe(delay(200));
  }

  // Entries
  getEntriesByTopicId(topicId: number): Observable<Entry[]> {
    const entries = this.mockEntries[topicId] || [];
    return of(entries).pipe(delay(200));
  }

  addEntry(topicId: number, content: string): Observable<Entry> {
    const newEntry: Entry = {
      id: Date.now(),
      topicId,
      content,
      author: 'current_user', // Auth service'ten gelcek
      authorId: 1,
      createdAt: new Date(),
      favoriteCount: 0,
      isFavorite: false
    };

    if (!this.mockEntries[topicId]) {
      this.mockEntries[topicId] = [];
    }
    this.mockEntries[topicId].push(newEntry);

    return of(newEntry).pipe(delay(300));
  }

  toggleFavorite(entryId: number): Observable<boolean> {
    //  favori yap
    return of(true).pipe(delay(200));
  }

  // Popular topics gündem
  getPopularTopics(): Observable<Topic[]> {
    const popular = [...this.mockTopics]
      .sort((a, b) => b.entryCount - a.entryCount)
      .slice(0, 10);
    return of(popular).pipe(delay(200));
  }

  // Recent topics
  getRecentTopics(): Observable<Topic[]> {
    const recent = [...this.mockTopics]
      .sort((a, b) => b.lastEntryDate.getTime() - a.lastEntryDate.getTime())
      .slice(0, 10);
    return of(recent).pipe(delay(200));
  }
}

