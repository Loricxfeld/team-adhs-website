export interface SupportTip {
  id: number;
  title: string;
  description: string;
  category: 'communication' | 'daily' | 'professional' | 'selfcare' | 'understanding';
  icon: string;
  detailedTips?: string[];
}

export interface RelativeResource {
  id: number;
  title: string;
  description: string;
  type: 'book' | 'website' | 'video' | 'course' | 'support-group';
  url?: string;
  author?: string;
  price?: string;
  language: 'de' | 'en';
}

export interface ChallengeAndSolution {
  challenge: string;
  solution: string;
  additionalTips?: string[];
}
