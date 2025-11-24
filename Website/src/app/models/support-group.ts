// src/app/models/support-group.ts
export interface SupportGroup {
  id: number;
  name: string;
  type: 'online' | 'presence' | 'hybrid';
  description: string;
  schedule: string;
  location?: string;
  zoomLink?: string;
  moderator: string;
  targetGroup: string;
  frequency: string;
  requirements?: string[];
  maxParticipants?: number;
  currentParticipants?: number;
  isActive: boolean;
  nextMeeting?: Date;
  contact: string;
}

export interface GroupBenefit {
  title: string;
  description: string;
  icon: string;
}

export interface FAQ {
  question: string;
  answer: string;
  category: 'general' | 'participation' | 'technical' | 'content';
}

