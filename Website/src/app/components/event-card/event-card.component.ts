// src/app/components/event-card/event-card.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Event } from '../../models/event';

@Component({
  selector: 'app-event-card',
  standalone: false,
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.scss']
})
export class EventCardComponent {
  @Input() event!: Event;
  @Output() register = new EventEmitter<Event>();

  isRegistering = false;

  onRegister() {
    if (this.event.requiresRegistration) {
      this.isRegistering = true;
      this.register.emit(this.event);

      // Simulate registration process
      setTimeout(() => {
        this.isRegistering = false;
      }, 2000);
    }
  }

  addToCalendar() {
    const googleCalendarUrl = this.generateGoogleCalendarUrl();
    window.open(googleCalendarUrl, '_blank');
  }

  private generateGoogleCalendarUrl(): string {
    const startDate = this.event.date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    const endDate = new Date(this.event.date.getTime() + 2 * 60 * 60 * 1000)
      .toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';

    const params = new URLSearchParams({
      action: 'TEMPLATE',
      text: this.event.title,
      dates: `${startDate}/${endDate}`,
      details: this.event.description + (this.event.moderator ? `\n\nModeration: ${this.event.moderator}` : ''),
      location: this.event.isOnline ? 'Online' : (this.event.location || '')
    });

    return `https://calendar.google.com/calendar/render?${params.toString()}`;
  }

  getEventTypeClass(): string {
    return this.event.type.toLowerCase().replace(/[^a-z0-9]/g, '-');
  }

  isEventSoon(): boolean {
    const now = new Date();
    const timeDiff = this.event.date.getTime() - now.getTime();
    const daysDiff = timeDiff / (1000 * 3600 * 24);
    return daysDiff <= 7 && daysDiff > 0;
  }

  isEventToday(): boolean {
    const now = new Date();
    const eventDate = new Date(this.event.date);
    return now.toDateString() === eventDate.toDateString();
  }
}
