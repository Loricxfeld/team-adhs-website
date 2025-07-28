import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Member, MembershipBenefit } from '../models/member';

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  private membershipBenefits: MembershipBenefit[] = [
    {
      title: 'Ermäßigungen',
      description: 'Ermäßigungen bei unseren Veranstaltungen',
      icon: 'local_offer'
    },
    {
      title: 'Vorab-Einladungen',
      description: 'Vorab-Einladungen zu Workshops und Seminaren',
      icon: 'event'
    },
    {
      title: 'Informationen aus erster Hand',
      description: 'Alle gewünschten Informationen zu Verein, Webseite und unseren Aktivitäten',
      icon: 'info'
    },
    {
      title: 'Aktive Mitgestaltung',
      description: 'Möglichkeit zur aktiven Unterstützung des Vereins',
      icon: 'volunteer_activism'
    },
    {
      title: 'Vernetzung',
      description: 'Kontakt zu anderen Mitgliedern und Betroffenen',
      icon: 'people'
    }
  ];

  constructor() { }

  getMembershipBenefits(): Observable<MembershipBenefit[]> {
    return of(this.membershipBenefits);
  }

  submitMembership(member: Member)
  //:    Observable<boolean>
  {
    // In a real app, this would send data to backend
    console.log('New membership application:', member);

    // Simulate API call
    return new Promise<boolean>((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, 1500);
    });
  }

  validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  getInterestOptions(): string[] {
    return [
      'Selbsthilfegruppen-Treffen',
      'Online-Meetings',
      'Workshops und Seminare',
      'Informationsveranstaltungen',
      'AuDHS-Treffen',
      'Partner-Treffen',
      'Vernetzung mit anderen Betroffenen',
      'Wissenschaftliche Informationen',
      'Alltagstipps',
      'Rechtliche Beratung'
    ];
  }

  getSupportAreaOptions(): string[] {
    return [
      'Veranstaltungsorganisation',
      'Social Media Betreuung',
      'Website-Pflege',
      'Öffentlichkeitsarbeit',
      'Grafik und Design',
      'Texte und Inhalte',
      'Übersetzungen',
      'IT-Support',
      'Buchführung',
      'Fundraising',
      'Beratung und Mentoring',
      'Moderation von Treffen'
    ];
  }
}
