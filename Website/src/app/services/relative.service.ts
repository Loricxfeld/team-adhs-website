import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { SupportTip, RelativeResource, ChallengeAndSolution } from '../models/relative-info';

@Injectable({
  providedIn: 'root'
})
export class RelativeService {

  private supportTips: SupportTip[] = [
    {
      id: 1,
      title: 'Verständnis entwickeln',
      description: 'ADHS ist eine neurologische Besonderheit, nicht fehlende Disziplin oder Faulheit.',
      category: 'understanding',
      icon: 'psychology',
      detailedTips: [
        'Informiere dich über ADHS und seine Auswirkungen',
        'ADHS-Symptome sind nicht absichtlich oder kontrollierbar',
        'Jeder Mensch mit ADHS ist anders - es gibt kein "typisches" ADHS',
        'Verstehe, dass schlechte Tage normal sind',
        'ADHS hat auch positive Seiten: Kreativität, Spontaneität, Energie'
      ]
    },
    {
      id: 2,
      title: 'Kommunikation verbessern',
      description: 'Klare, ruhige Kommunikation hilft beiden Seiten.',
      category: 'communication',
      icon: 'chat',
      detailedTips: [
        'Sprich ruhig und deutlich',
        'Verwende kurze, klare Sätze',
        'Wiederhole wichtige Informationen',
        'Stelle Blickkontakt her',
        'Vermeide Vorwürfe und "Du machst immer..."-Aussagen',
        'Höre aktiv zu und zeige Verständnis'
      ]
    },
    {
      id: 3,
      title: 'Alltagsstrukturen schaffen',
      description: 'Struktur und Routine können sehr hilfreich sein.',
      category: 'daily',
      icon: 'schedule',
      detailedTips: [
        'Feste Tagesroutinen entwickeln',
        'Wichtige Termine gemeinsam planen',
        'To-Do-Listen erstellen und sichtbar machen',
        'Erinnerungen und Alarme nutzen',
        'Gemeinsame Rituale einführen',
        'Flexibilität bei unvorhergesehenen Änderungen'
      ]
    },
    {
      id: 4,
      title: 'Professionelle Hilfe unterstützen',
      description: 'Begleite den Therapie- und Behandlungsprozess unterstützend.',
      category: 'professional',
      icon: 'medical_services',
      detailedTips: [
        'Arzttermine gemeinsam wahrnehmen (wenn gewünscht)',
        'Bei der Medikamenteneinnahme unterstützen',
        'Therapiefortschritte gemeinsam besprechen',
        'Rückschläge nicht persönlich nehmen',
        'Geduld mit dem Behandlungsprozess haben'
      ]
    },
    {
      id: 5,
      title: 'Auf sich selbst achten',
      description: 'Als Angehörige/r ist Selbstfürsorge besonders wichtig.',
      category: 'selfcare',
      icon: 'self_improvement',
      detailedTips: [
        'Eigene Grenzen respektieren',
        'Auszeiten nehmen',
        'Unterstützung für sich selbst suchen',
        'Hobbys und Interessen beibehalten',
        'Mit anderen Angehörigen sprechen',
        'Professionelle Hilfe in Anspruch nehmen wenn nötig'
      ]
    },
    {
      id: 6,
      title: 'Positives verstärken',
      description: 'Konzentration auf Stärken und Erfolge statt nur auf Probleme.',
      category: 'communication',
      icon: 'thumb_up',
      detailedTips: [
        'Erfolge und Fortschritte anerkennen',
        'Stärken betonen und nutzen',
        'Kleine Schritte wertschätzen',
        'Gemeinsame positive Erlebnisse schaffen',
        'Humor und Leichtigkeit bewahren'
      ]
    }
  ];

  private relativeResources: RelativeResource[] = [
    {
      id: 1,
      title: 'ADHS bei Erwachsenen - Ein Ratgeber für Angehörige',
      description: 'Umfassender Ratgeber mit praktischen Tipps für Partner und Familie',
      type: 'book',
      author: 'Dr. Astrid Neuy-Bartmann',
      language: 'de'
    },
    {
      id: 2,
      title: 'ADHS Deutschland e.V.',
      description: 'Informationen und Unterstützung für Betroffene und Angehörige',
      type: 'website',
      url: 'https://www.adhs-deutschland.de',
      language: 'de'
    },
    {
      id: 3,
      title: 'Online-Kurs: Leben mit ADHS für Angehörige',
      description: 'Strukturierter Online-Kurs mit Strategien für den Umgang mit ADHS',
      type: 'course',
      language: 'de',
      price: 'Kostenpflichtig'
    },
    {
      id: 4,
      title: 'How to ADHD - YouTube Channel',
      description: 'Englischsprachige Videos über ADHS mit vielen praktischen Tipps',
      type: 'video',
      url: 'https://www.youtube.com/channel/UC-nPM1_kSZf91ZGkcgy_95Q',
      language: 'en'
    },
    {
      id: 5,
      title: 'Partner-Treffen Team ADHS',
      description: 'Monatliche Online-Treffen für Partner und Angehörige',
      type: 'support-group',
      language: 'de'
    }
  ];

  private challengesAndSolutions: ChallengeAndSolution[] = [
    {
      challenge: 'Vergesslichkeit und Unpünktlichkeit',
      solution: 'Gemeinsame Kalender nutzen, Erinnerungen setzen, Pufferzeiten einplanen',
      additionalTips: [
        'Digitale Kalender mit Benachrichtigungen',
        'Wichtige Termine doppelt eintragen',
        'Vorabend-Vorbereitung zur Routine machen'
      ]
    },
    {
      challenge: 'Emotionale Ausbrüche und Impulsivität',
      solution: 'Ruhig bleiben, Pause einlegen, später über die Situation sprechen',
      additionalTips: [
        'Nicht in der Emotion diskutieren',
        'Entspannungstechniken gemeinsam lernen',
        'Auslöser identifizieren und vermeiden'
      ]
    },
    {
      challenge: 'Unordnung und Chaos',
      solution: 'Gemeinsame Organisationssysteme entwickeln, kleine Schritte feiern',
      additionalTips: [
        'Einfache Organisationssysteme einführen',
        'Regelmäßige Aufräum-Sessions',
        'Nicht perfektionistisch sein'
      ]
    },
    {
      challenge: 'Prokrastination und fehlende Motivation',
      solution: 'Aufgaben in kleine Schritte unterteilen, gemeinsam Prioritäten setzen',
      additionalTips: [
        'Body-Doubling anbieten (zusammen arbeiten)',
        'Belohnungssysteme einführen',
        'Ablenkungen minimieren'
      ]
    },
    {
      challenge: 'Soziale Isolation',
      solution: 'Soziale Aktivitäten planen, Freundschaften pflegen, Selbsthilfegruppen besuchen',
      additionalTips: [
        'ADHS-freundliche Aktivitäten wählen',
        'Kleine Gruppen bevorzugen',
        'Rückzugsmöglichkeiten einplanen'
      ]
    }
  ];

  constructor() { }

  getSupportTips(category?: string): Observable<SupportTip[]> {
    let tips = this.supportTips;
    if (category) {
      tips = tips.filter(tip => tip.category === category);
    }
    return of(tips);
  }

  getRelativeResources(type?: string): Observable<RelativeResource[]> {
    let resources = this.relativeResources;
    if (type) {
      resources = resources.filter(resource => resource.type === type);
    }
    return of(resources);
  }

  getChallengesAndSolutions(): Observable<ChallengeAndSolution[]> {
    return of(this.challengesAndSolutions);
  }

  getTipCategories(): { value: string; label: string }[] {
    return [
      { value: '', label: 'Alle Tipps' },
      { value: 'understanding', label: 'Verständnis' },
      { value: 'communication', label: 'Kommunikation' },
      { value: 'daily', label: 'Alltag' },
      { value: 'professional', label: 'Professionelle Hilfe' },
      { value: 'selfcare', label: 'Selbstfürsorge' }
    ];
  }

  getResourceTypes(): { value: string; label: string }[] {
    return [
      { value: '', label: 'Alle Ressourcen' },
      { value: 'book', label: 'Bücher' },
      { value: 'website', label: 'Websites' },
      { value: 'video', label: 'Videos' },
      { value: 'course', label: 'Kurse' },
      { value: 'support-group', label: 'Selbsthilfegruppen' }
    ];
  }

  sendSupportRequest(email: string, message: string): Observable<boolean> {
    console.log('Support request from relative:', { email, message });
    // Simulate API call
    return of(true);
  
  }
}
