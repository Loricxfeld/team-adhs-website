// src/app/services/event.service.ts
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Event, EventFilter } from '../models/event';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private events: Event[] = [
    {
      id: 1,
      title: 'Online-Selbsthilfegruppen-Treffen',
      type: 'Online-Meeting',
      date: new Date('2024-06-06T18:00:00'),
      time: '18:00',
      isOnline: true,
      zoomLink: 'https://us02web.zoom.us/j/83271733219?pwd=bnU4WUpxZ1R',
      description: 'Das Online-Selbsthilfegruppen-Treffen des Vereins Team ADHS findet monatlich am ersten Donnerstag im Monat via Zoom statt.',
      requiresRegistration: false,
      moderator: 'Mag. Michaela Hartl',
      frequency: 'Jeden ersten Donnerstag im Monat',
      isRecurring: true
    },
    {
      id: 2,
      title: 'Studierenden-Selbsthilfegruppen-Treffen',
      type: 'Online-Meeting',
      date: new Date('2024-06-13T18:00:00'),
      time: '18:00',
      isOnline: true,
      zoomLink: 'https://us02web.zoom.us/j/83271733219?pwd=bnU4WUpxZ1R',
      description: 'Das Studierenden-Selbsthilfegruppen-Treffen des Vereins Team ADHS findet monatlich, meist am zweiten Donnerstag im Monat, online via Zoom statt.',
      requiresRegistration: false,
      moderator: 'David Piedade und Franziska Hartmann, B.Sc.',
      frequency: 'Meist am zweiten Donnerstag im Monat',
      isRecurring: true
    },
    {
      id: 3,
      title: 'Wiener Präsenz-Selbsthilfegruppen-Treffen',
      type: 'Selbsthilfegruppe',
      date: new Date('2024-06-20T19:00:00'),
      time: '19:00',
      isOnline: false,
      location: 'Stammkaffee, Sechskrügelgasse 1, 1030 Wien (nahe U3 Rochusgasse, Aufgang Rochusmarkt)',
      description: 'Das Wiener Präsenz-Selbsthilfegruppen-Treffen des Vereins Team ADHS findet monatlich, meist am dritten Donnerstag im Monat, an wechselnden Lokalitäten in Wien statt. Die Reservierung lautet auf "Bienenstock".',
      requiresRegistration: false,
      moderator: 'Mag. Michaela Hartl',
      frequency: 'Meist am dritten Donnerstag im Monat',
      isRecurring: true
    },
    {
      id: 4,
      title: 'AuDHS-Selbsthilfegruppen-Treffen',
      type: 'AuDHS',
      date: new Date('2024-06-22T14:00:00'),
      time: '14:00',
      isOnline: false,
      location: 'Wien (Ort wird bekannt gegeben)',
      description: 'Das AuDHS-Selbsthilfegruppen-Treffen des Vereins Team ADHS findet monatlich jeweils am vierten Samstag im Monat, abwechselnd online via Zoom und in Präsenz in Wien statt. Für Menschen mit der Doppeldiagnose ADHS und Autismus-Spektrum.',
      requiresRegistration: true,
      moderator: 'Team ADHS',
      frequency: 'Jeden vierten Samstag im Monat',
      isRecurring: true
    },
    {
      id: 5,
      title: 'Partner-Treffen online',
      type: 'Partner-Treffen',
      date: new Date('2024-06-25T19:00:00'),
      time: '19:00',
      isOnline: true,
      zoomLink: 'https://us02web.zoom.us/j/partner-meeting',
      description: 'Das Treffen des Vereins Team ADHS zum Erfahrungsaustausch für Partner*innen und Angehörige von erwachsenen ADHS-Betroffenen findet monatlich, meist am letzten Dienstag im Monat, online via Zoom statt.',
      requiresRegistration: false,
      moderator: 'Mag. Michaela Hartl',
      frequency: 'Jeden letzten Dienstag im Monat (jeden zweiten Monat)',
      isRecurring: true
    },
    {
      id: 6,
      title: 'AuDHS-Erwachsenen-Treffen Online',
      type: 'AuDHS',
      date: new Date('2024-07-30T19:00:00'),
      time: '19:00',
      isOnline: true,
      zoomLink: 'https://us02web.zoom.us/j/audhs-meeting',
      description: 'AuDHS-Erwachsenen-Treffen für Menschen mit der Doppeldiagnose ADHS und Autismus-Spektrum - dieses Treffen findet abwechselnd online und in Präsenz statt.',
      requiresRegistration: true,
      moderator: 'Team ADHS',
      frequency: 'Abwechselnd online und in Präsenz',
      isRecurring: true
    },
    {
      id: 7,
      title: 'Online-Selbsthilfegruppen-Treffen',
      type: 'Online-Meeting',
      date: new Date('2024-07-04T18:00:00'),
      time: '18:00',
      isOnline: true,
      zoomLink: 'https://us02web.zoom.us/j/83271733219?pwd=bnU4WUpxZ1R',
      description: 'Das Online-Selbsthilfegruppen-Treffen des Vereins Team ADHS findet monatlich am ersten Donnerstag im Monat via Zoom statt.',
      requiresRegistration: false,
      moderator: 'Mag. Michaela Hartl',
      frequency: 'Jeden ersten Donnerstag im Monat',
      isRecurring: true
    },
    {
      id: 8,
      title: 'Wiener Präsenz-Selbsthilfegruppen-Treffen',
      type: 'Selbsthilfegruppe',
      date: new Date('2024-07-18T19:00:00'),
      time: '19:00',
      isOnline: false,
      location: 'Wird rechtzeitig bekannt gegeben',
      description: 'Das Wiener Präsenz-Selbsthilfegruppen-Treffen des Vereins Team ADHS findet monatlich, meist am dritten Donnerstag im Monat, an wechselnden Lokalitäten in Wien statt.',
      requiresRegistration: false,
      moderator: 'Mag. Michaela Hartl',
      frequency: 'Meist am dritten Donnerstag im Monat',
      isRecurring: true
    }
  ];

  constructor() { }

  getEvents(): Observable<Event[]> {
    return of(this.events.sort((a, b) => a.date.getTime() - b.date.getTime()));
  }

  getUpcomingEvents(limit: number = 3): Observable<Event[]> {
    const now = new Date();
    const upcoming = this.events
      .filter(event => event.date >= now)
      .sort((a, b) => a.date.getTime() - b.date.getTime())
      .slice(0, limit);
    return of(upcoming);
  }

  filterEvents(events: Event[], filter: EventFilter): Event[] {
    return events.filter(event => {
      // Filter by type
      if (filter.type && filter.type !== 'all' && event.type !== filter.type) {
        return false;
      }

      // Filter by month
      if (filter.month !== null && event.date.getMonth() !== filter.month) {
        return false;
      }

      // Filter by online/offline
      if (filter.isOnline !== null && event.isOnline !== filter.isOnline) {
        return false;
      }

      return true;
    });
  }

  getEventTypes(): string[] {
    return ['Selbsthilfegruppe', 'Online-Meeting', 'Workshop', 'AuDHS', 'Partner-Treffen'];
  }

  getNextEventOfType(type: string): Event | null {
    const now = new Date();
    const nextEvent = this.events
      .filter(event => event.type === type && event.date >= now)
      .sort((a, b) => a.date.getTime() - b.date.getTime())[0];

    return nextEvent || null;
  }

  // Simulate registration
  registerForEvent(eventId: number): Observable<boolean> {
    // In a real app, this would make an HTTP call
    console.log(`Registering for event with ID: ${eventId}`);
    return of(true);
  }

  // Get events for a specific month
  getEventsForMonth(year: number, month: number): Observable<Event[]> {
    const monthEvents = this.events.filter(event =>
      event.date.getFullYear() === year &&
      event.date.getMonth() === month
    );
    return of(monthEvents);
  }
}
