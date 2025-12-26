export interface Topic {
  id: number;
  title: string;
  slug: string;
  entryCount: number;
  lastEntryDate: Date;
  author: string;
  isActive: boolean;
}

export interface Entry {
  id: number;
  topicId: number;
  content: string;
  author: string;
  authorId: number;
  createdAt: Date;
  updatedAt?: Date;
  favoriteCount: number;
  isFavorite?: boolean;
}

export interface TopicDetail extends Topic {
  entries: Entry[];
}

