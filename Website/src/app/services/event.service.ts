// src/app/services/event.service.ts
import { Injectable } from '@angular/core';
import { Observable, of, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Event, EventFilter } from '../models/event';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class EventService {

private events: Event[] = []


  constructor(private http: HttpClient) { }
 
  private apiUrl = environment.apiUrl + '/termine';

  getEvents(): Observable<Event[]> {
        return this.http.get<Event[]>(this.apiUrl).pipe(
    tap(events => this.events = events)
  );
  }
createEvent(event: Event): Observable<any> {
  return this.http.post(`${this.apiUrl}`, event);
}

  getUpcomingEvents(limit: number =20): Observable<Event[]> {
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
  return [...new Set(this.events.map(e => e.type))];
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
  getById(id: number): Observable<Event> {
  return this.http.get<Event>(`${this.apiUrl}/${id}`);
}
  updateEvent(id: number, event: Event): Observable<any> {
  return this.http.put(`${this.apiUrl}/${id}`, event);
}

// Delete Termin
deleteEvent(id: number): Observable<any> {
  return this.http.delete(`${this.apiUrl}/${id}`);
}
}
