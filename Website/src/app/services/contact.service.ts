import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ContactMessage, ContactPerson, OfficeInfo } from '../models/contact-message';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private contactPersons: ContactPerson[] = [
    {
      id: 1,
      name: 'Mag. Michaela Hartl',
      role: 'Landeschefin Österreich, Vereinsleitung',
      email: 'kontakt@team-adhs.at',
      responsibleFor: [
        'Vereinsleitung und Organisation',
        'Selbsthilfegruppen-Moderation',
        'Partner-Treffen',
        'Allgemeine Anfragen',
        'Kooperationen'
      ],
      availability: 'Mo-Fr nach Vereinbarung'
    },
    {
      id: 2,
      name: 'David Piedade',
      role: 'Studierenden-Betreuung',
      email: 'kontakt@team-adhs.at',
      responsibleFor: [
        'Studierenden-Selbsthilfegruppen',
        'Universitäts-Kooperationen',
        'Junge Erwachsene'
      ]
    },
    {
      id: 3,
      name: 'Franziska Hartmann, B.Sc.',
      role: 'Studierenden-Betreuung',
      email: 'kontakt@team-adhs.at',
      responsibleFor: [
        'Studierenden-Selbsthilfegruppen',
        'Peer-Support',
        'Wissenschaftliche Kooperationen'
      ]
    }
  ];

  private officeInfo: OfficeInfo = {
    name: 'Verein Team ADHS',
    address: {
      street: '',
      postalCode: '',
      city: 'Wien',
      country: 'Österreich'
    },
    email: 'kontakt@team-adhs.at',
    website: 'https://team-adhs.at',
    socialMedia: {
      facebook: 'https://www.facebook.com/teamadhs.at',
      instagram: 'https://www.instagram.com/team_adhs/',
      discord: 'https://discord.gg/tAUSEyNcCg'
    },
    businessHours: 'Ehrenamtliche Betreuung - Antwort binnen 2-3 Werktagen'
  };

  constructor() { }

  sendContactMessage(message: ContactMessage): Observable<boolean> {
    console.log('Contact message sent:', message);

    // Simulate API call
    return of(true);
  }

  getContactPersons(): Observable<ContactPerson[]> {
    return of(this.contactPersons);
  }

  getOfficeInfo(): Observable<OfficeInfo> {
    return of(this.officeInfo);
  }

  getContactCategories(): { value: string; label: string; description?: string }[] {
    return [
      {
        value: 'general',
        label: 'Allgemeine Anfrage',
        description: 'Fragen zu ADHS, dem Verein oder unseren Angeboten'
      },
      {
        value: 'membership',
        label: 'Mitgliedschaft',
        description: 'Fragen zur Vereinsmitgliedschaft oder Anmeldung'
      },
      {
        value: 'events',
        label: 'Termine & Veranstaltungen',
        description: 'Fragen zu Selbsthilfegruppen, Workshops oder Events'
      },
      {
        value: 'support',
        label: 'Persönliche Unterstützung',
        description: 'Individuelle Beratung oder spezielle Anliegen'
      },
      {
        value: 'media',
        label: 'Medien & Presse',
        description: 'Presseanfragen, Interviews oder Medienkooperationen'
      },
      {
        value: 'cooperation',
        label: 'Kooperationen',
        description: 'Zusammenarbeit mit Organisationen, Unternehmen oder Institutionen'
      }
    ];
  }

  validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  generateEmailSubject(category: string, customSubject?: string): string {
    const categoryLabels: { [key: string]: string } = {
      'general': 'Allgemeine Anfrage',
      'membership': 'Mitgliedschaft',
      'events': 'Termine & Veranstaltungen',
      'support': 'Persönliche Unterstützung',
      'media': 'Medienanfrage',
      'cooperation': 'Kooperationsanfrage'
    };

    const categoryLabel = categoryLabels[category] || 'Anfrage';

    if (customSubject && customSubject.trim()) {
      return `${categoryLabel}: ${customSubject}`;
    }

    return categoryLabel;
  }

  generateEmailBody(message: ContactMessage): string {
    let body = `Hallo Team ADHS,\n\n`;
    body += `Name: ${message.name}\n`;
    body += `E-Mail: ${message.email}\n`;
    if (message.phone) {
      body += `Telefon: ${message.phone}\n`;
    }
    body += `Kategorie: ${this.getContactCategories().find(c => c.value === message.category)?.label}\n`;
    if (message.isUrgent) {
      body += `⚠️ DRINGEND\n`;
    }
    body += `\nNachricht:\n${message.message}\n\n`;
    body += `Bevorzugter Kontakt: ${message.preferredContact === 'phone' ? 'Telefon' : 'E-Mail'}\n`;
    body += `\nVielen Dank!\n`;

    return body;
  }

  getDirectEmailLink(message: ContactMessage): string {
    const subject = encodeURIComponent(this.generateEmailSubject(message.category, message.subject));
    const body = encodeURIComponent(this.generateEmailBody(message));

    return `mailto:kontakt@team-adhs.at?subject=${subject}&body=${body}`;
  }

  getWhatsAppLink(message: string): string {
    const text = encodeURIComponent(`Hallo Team ADHS, ${message}`);
    return `https://wa.me/?text=${text}`;
  }

  // FAQ for contact page
  getContactFAQs(): { question: string; answer: string }[] {
    return [
      {
        question: 'Wie schnell erhalte ich eine Antwort?',
        answer: 'Da wir ehrenamtlich arbeiten, antworten wir in der Regel binnen 2-3 Werktagen. Bei dringenden Anliegen bitte im Betreff "DRINGEND" vermerken.'
      },
      {
        question: 'Kann ich auch telefonisch Kontakt aufnehmen?',
        answer: 'Aktuell bieten wir primär E-Mail-Kontakt an. Bei Bedarf vereinbaren wir gerne einen Telefontermin.'
      },
      {
        question: 'Bietet ihr auch persönliche Beratung an?',
        answer: 'Wir sind ein Selbsthilfeverein und bieten keine professionelle Therapie oder Beratung. Wir können aber bei der Suche nach geeigneten Fachkräften unterstützen.'
      },
      {
        question: 'Kann ich auch anonym Kontakt aufnehmen?',
        answer: 'Ja, für erste Fragen kannst Du auch unsere Social Media Kanäle oder Discord nutzen. Für persönliche Anliegen ist jedoch eine E-Mail-Adresse hilfreich.'
      },
      {
        question: 'Helft ihr auch bei Problemen mit Behörden oder am Arbeitsplatz?',
        answer: 'Wir können Erfahrungen teilen und bei der Suche nach rechtlicher Beratung unterstützen, bieten aber selbst keine Rechtsberatung an.'
      }
    ];
  }
}
