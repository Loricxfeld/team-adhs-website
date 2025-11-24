// src/app/models/member.ts
export interface Member {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  birthDate?: Date;
  address: {
    street: string;
    postalCode: string;
    city: string;
    country: string;
  };
  membershipType: 'erwachsene' | 'studierende' | 'angehoerige';
  interests: string[];
  activeSupport: boolean;
  supportAreas?: string[];
  newsletter: boolean;
  dataProtection: boolean;
  additionalInfo?: string;
  joinDate?: Date;
}

export interface MembershipBenefit {
  title: string;
  description: string;
  icon: string;
}


