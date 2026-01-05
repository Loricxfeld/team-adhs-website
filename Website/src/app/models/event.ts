export interface Event {
  id: number;
  title: string;
  type: 'Selbsthilfegruppe' | 'Online-Meeting' | 'Workshop' | 'AuDHS' | 'Partner-Treffen';
  date: Date;
 
  isOnline: boolean;
  location?: string;
  zoomLink?: string;
  description: string;
  requiresRegistration: boolean;
  moderator?: string;
 
  isRecurring?: boolean;
}

export interface EventFilter {
  type: string;
  month: number | null;
  isOnline: boolean | null;
}
