export interface ContactMessage {
  id?: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  category: 'general' | 'membership' | 'events' | 'support' | 'media' | 'cooperation';
  isUrgent?: boolean;
  preferredContact?: 'email' | 'phone';
  phone?: string;
  timestamp?: Date;
}

export interface ContactPerson {
  id: number;
  name: string;
  role: string;
  email: string;
  phone?: string;
  responsibleFor: string[];
  image?: string;
  availability?: string;
}

export interface OfficeInfo {
  name: string;
  address: {
    street: string;
    postalCode: string;
    city: string;
    country: string;
  };
  email: string;
  website: string;
  socialMedia: {
    facebook: string;
    instagram: string;
    discord: string;
  };
  businessHours?: string;
}
