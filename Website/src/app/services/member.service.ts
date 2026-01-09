import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Member, MembershipBenefit } from '../models/member';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class MemberService {

    private apiUrl = environment.apiUrl + '/members';  // ✅ NEU
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

  constructor(private http: HttpClient) { }

  getMembershipBenefits(): Observable<MembershipBenefit[]> {
    return of(this.membershipBenefits);
  }

  submitMembership(member: Member):Observable<any>
  //:    Observable<boolean>
  {

     // Member für Backend vorbereiten
  const memberDto = {
    firstName: member.firstName,
    lastName: member.lastName,
    email: member.email,
    phone: member.phone,
    street: member.address.street,
    postalCode: member.address.postalCode,
    city: member.address.city,
    country: member.address.country,
    membershipType: member.membershipType,
    interests: member.interests?.join(',') || '',  // ✅ Array → String
    activeSupport: member.activeSupport,
    supportAreas: member.supportAreas?.join(',') || '',  // ✅ Array → String
    newsletter: member.newsletter,
    dataProtection: member.dataProtection,
    additionalInfo: member.additionalInfo
  };

  return this.http.post(this.apiUrl, member);  // ✅ API Call
    
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
