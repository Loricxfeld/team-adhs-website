// src/app/services/support-group.service.ts
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { SupportGroup, GroupBenefit, FAQ } from '../models/support-group';

@Injectable({
  providedIn: 'root'
})
export class SupportGroupService {

  private supportGroups: SupportGroup[] = [
    {
      id: 1,
      name: 'Online-Selbsthilfegruppen-Treffen',
      type: 'online',
      description: 'Das Online-Selbsthilfegruppen-Treffen des Vereins Team ADHS findet monatlich am ersten Donnerstag im Monat via Zoom statt.',
      schedule: 'Jeden ersten Donnerstag im Monat um 18:00 Uhr',
      zoomLink: 'https://us02web.zoom.us/j/83271733219?pwd=bnU4WUpxZ1R',
      moderator: 'Mag. Michaela Hartl',
      targetGroup: 'Erwachsene mit ADHS',
      frequency: 'Monatlich',
      isActive: true,
      nextMeeting: new Date('2024-07-04T18:00:00'),
      contact: 'kontakt@team-adhs.at'
    },
    {
      id: 2,
      name: 'Studierenden-Selbsthilfegruppen-Treffen',
      type: 'online',
      description: 'Das Studierenden-Selbsthilfegruppen-Treffen des Vereins Team ADHS findet monatlich, meist am zweiten Donnerstag im Monat, online via Zoom statt.',
      schedule: 'Meist am zweiten Donnerstag im Monat um 18:00 Uhr',
      zoomLink: 'https://us02web.zoom.us/j/83271733219?pwd=bnU4WUpxZ1R',
      moderator: 'David Piedade und Franziska Hartmann, B.Sc.',
      targetGroup: 'Studierende mit ADHS',
      frequency: 'Monatlich',
      isActive: true,
      nextMeeting: new Date('2024-07-11T18:00:00'),
      contact: 'kontakt@team-adhs.at'
    },
    {
      id: 3,
      name: 'Wiener Präsenz-Selbsthilfegruppen-Treffen',
      type: 'presence',
      description: 'Das Wiener Präsenz-Selbsthilfegruppen-Treffen des Vereins Team ADHS findet monatlich, meist am dritten Donnerstag im Monat, an wechselnden Lokalitäten in Wien statt.',
      schedule: 'Meist am dritten Donnerstag im Monat um 19:00 Uhr',
      location: 'Wechselnde Lokalitäten in Wien (wird rechtzeitig bekannt gegeben)',
      moderator: 'Mag. Michaela Hartl',
      targetGroup: 'Erwachsene mit ADHS in Wien',
      frequency: 'Monatlich',
      requirements: ['Reservierung läuft auf "Bienenstock"'],
      isActive: true,
      nextMeeting: new Date('2024-07-18T19:00:00'),
      contact: 'kontakt@team-adhs.at'
    },
    {
      id: 4,
      name: 'AuDHS-Selbsthilfegruppen-Treffen',
      type: 'hybrid',
      description: 'Das AuDHS-Selbsthilfegruppen-Treffen des Vereins Team ADHS findet monatlich jeweils am vierten Samstag im Monat, abwechselnd online via Zoom und in Präsenz in Wien statt.',
      schedule: 'Jeden vierten Samstag im Monat um 14:00 Uhr',
      location: 'Abwechselnd online und in Präsenz in Wien',
      moderator: 'Team ADHS',
      targetGroup: 'Menschen mit der Doppeldiagnose ADHS und Autismus-Spektrum',
      frequency: 'Monatlich',
      requirements: ['ANMELDUNG erforderlich'],
      isActive: true,
      nextMeeting: new Date('2024-06-22T14:00:00'),
      contact: 'kontakt@team-adhs.at'
    },
    {
      id: 5,
      name: 'Partner-Treffen online',
      type: 'online',
      description: 'Das Treffen des Vereins Team ADHS zum Erfahrungsaustausch für Partner*innen und Angehörige von erwachsenen ADHS-Betroffenen findet monatlich, meist am letzten Dienstag im Monat, online via Zoom statt.',
      schedule: 'Jeden letzten Dienstag im Monat um 19:00 Uhr (alle zwei Monate)',
      zoomLink: 'https://us02web.zoom.us/j/partner-meeting',
      moderator: 'Mag. Michaela Hartl',
      targetGroup: 'Partner*innen und Angehörige von erwachsenen ADHS-Betroffenen',
      frequency: 'Alle zwei Monate',
      isActive: true,
      nextMeeting: new Date('2024-06-25T19:00:00'),
      contact: 'kontakt@team-adhs.at'
    }
  ];

  private groupBenefits: GroupBenefit[] = [
    {
      title: 'Erfahrungsaustausch',
      description: 'Austausch mit anderen Betroffenen und Angehörigen über persönliche Erfahrungen im Umgang mit ADHS',
      icon: 'forum'
    },
    {
      title: 'Gegenseitige Unterstützung',
      description: 'Emotionale Unterstützung und praktische Tipps von Menschen, die ähnliche Herausforderungen kennen',
      icon: 'people'
    },
    {
      title: 'Informationen und Ressourcen',
      description: 'Aktuelle Informationen über Behandlungsmöglichkeiten, Therapien und hilfreiche Ressourcen',
      icon: 'info'
    },
    {
      title: 'Entstigmatisierung',
      description: 'Abbau von Vorurteilen und Scham durch offenen Austausch in einem sicheren Rahmen',
      icon: 'favorite'
    },
    {
      title: 'Soziale Kontakte',
      description: 'Aufbau neuer Freundschaften und Beziehungen zu Menschen mit ähnlichen Erfahrungen',
      icon: 'group'
    },
    {
      title: 'Strukturierte Unterstützung',
      description: 'Regelmäßige Treffen bieten Struktur und kontinuierliche Unterstützung im Alltag',
      icon: 'schedule'
    }
  ];

  private faqs: FAQ[] = [
    {
      question: 'Muss ich mich für die Selbsthilfegruppen-Treffen anmelden?',
      answer: 'Für die meisten Treffen ist keine Anmeldung erforderlich. Nur für die AuDHS-Treffen ist eine Anmeldung unter kontakt@team-adhs.at notwendig.',
      category: 'participation'
    },
    {
      question: 'Kostet die Teilnahme an den Selbsthilfegruppen etwas?',
      answer: 'Nein, die Teilnahme an unseren Selbsthilfegruppen-Treffen ist kostenlos. Mitglieder erhalten zusätzlich Ermäßigungen bei anderen Veranstaltungen.',
      category: 'general'
    },
    {
      question: 'Muss ich eine ADHS-Diagnose haben, um teilnehmen zu können?',
      answer: 'Eine offizielle Diagnose ist nicht zwingend erforderlich. Auch Menschen, die sich im Diagnoseprozess befinden oder Angehörige sind, sind willkommen.',
      category: 'participation'
    },
    {
      question: 'Wie läuft ein typisches Selbsthilfegruppen-Treffen ab?',
      answer: 'Die Treffen beginnen meist mit einer Vorstellungsrunde, gefolgt von einem offenen Austausch über aktuelle Themen. Die Moderation sorgt für einen strukturierten Rahmen.',
      category: 'content'
    },
    {
      question: 'Was passiert mit den Informationen, die in der Gruppe geteilt werden?',
      answer: 'Alles was in der Gruppe besprochen wird, unterliegt der Schweigepflicht. Die Vertraulichkeit ist ein wichtiger Grundsatz unserer Selbsthilfegruppen.',
      category: 'general'
    },
    {
      question: 'Kann ich auch teilnehmen, wenn ich nicht aus Wien komme?',
      answer: 'Ja! Unsere Online-Treffen sind für alle zugänglich, unabhängig vom Wohnort. Für Präsenz-Treffen sind Sie natürlich auch willkommen, wenn Sie anreisen möchten.',
      category: 'participation'
    },
    {
      question: 'Welche technischen Voraussetzungen brauche ich für Online-Treffen?',
      answer: 'Sie benötigen ein Gerät mit Internetverbindung, Kamera und Mikrofon. Wir nutzen Zoom - Sie können per Browser oder App teilnehmen.',
      category: 'technical'
    },
    {
      question: 'Was ist der Unterschied zwischen den verschiedenen Gruppen?',
      answer: 'Wir haben spezialisierte Gruppen: Allgemeine ADHS-Gruppen, eine für Studierende, eine für AuDHS (ADHS + Autismus) und eine für Angehörige. So können spezifische Themen besser behandelt werden.',
      category: 'content'
    }
  ];

  constructor() { }

  getSupportGroups(): Observable<SupportGroup[]> {
    return of(this.supportGroups.filter(group => group.isActive));
  }

  getGroupById(id: number): Observable<SupportGroup | undefined> {
    const group = this.supportGroups.find(g => g.id === id);
    return of(group);
  }

  getGroupBenefits(): Observable<GroupBenefit[]> {
    return of(this.groupBenefits);
  }

  getFAQs(category?: string): Observable<FAQ[]> {
    let faqs = this.faqs;
    if (category) {
      faqs = faqs.filter(faq => faq.category === category);
    }
    return of(faqs);
  }

  getUpcomingMeetings(): Observable<SupportGroup[]> {
    const now = new Date();
    const upcomingGroups = this.supportGroups
      .filter(group => group.isActive && group.nextMeeting && group.nextMeeting >= now)
      .sort((a, b) => {
        if (!a.nextMeeting || !b.nextMeeting) return 0;
        return a.nextMeeting.getTime() - b.nextMeeting.getTime();
      });
    return of(upcomingGroups);
  }

  requestGroupInfo(email: string, groupId: number): Observable<boolean> {
    console.log(`Info request for group ${groupId} from ${email}`);
    return of(true);
  }
}
