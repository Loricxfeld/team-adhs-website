// src/app/pages/termine/termine.component.ts
import { Component, OnInit } from '@angular/core';
import { EventService } from '../../services/event.service';
import { Event, EventFilter } from '../../models/event';

@Component({
  selector: 'app-termine',
  standalone: false,
  templateUrl: './termine.component.html',
  styleUrls: ['./termine.component.scss']
})
export class TermineComponent implements OnInit {
  events: Event[] = [];
  filteredEvents: Event[] = [];
  upcomingEvents: Event[] = [];

  // Filter state
  currentFilter: EventFilter = {
    type: 'all',
    month: null,
    isOnline: null
  };

  // Available filter options
  eventTypes = [
    { value: 'all', label: 'Alle Termine' },
    { value: 'Selbsthilfegruppe', label: 'Selbsthilfegruppe' },
    { value: 'Online-Meeting', label: 'Online-Meetings' },
    { value: 'AuDHS', label: 'AuDHS-Treffen' },
    { value: 'Partner-Treffen', label: 'Partner-Treffen' },
    { value: 'Workshop', label: 'Workshops' }
  ];

  months = [
    { value: null, label: 'Alle Monate' },
    { value: 0, label: 'Januar' },
    { value: 1, label: 'Februar' },
    { value: 2, label: 'März' },
    { value: 3, label: 'April' },
    { value: 4, label: 'Mai' },
    { value: 5, label: 'Juni' },
    { value: 6, label: 'Juli' },
    { value: 7, label: 'August' },
    { value: 8, label: 'September' },
    { value: 9, label: 'Oktober' },
    { value: 10, label: 'November' },
    { value: 11, label: 'Dezember' }
  ];

  onlineOptions = [
    { value: null, label: 'Online & Präsenz' },
    { value: true, label: 'Nur Online' },
    { value: false, label: 'Nur Präsenz' }
  ];

  // Loading state
  isLoading = true;

  // View mode
  viewMode: 'list' | 'calendar' = 'list';

  constructor(private eventService: EventService) { }

  ngOnInit(): void {
    this.loadEvents();
  
  }

  private loadEvents(): void {
    this.isLoading = true;
    this.eventService.getEvents().subscribe({
      next: (events) => {
        this.events = events;
      
        this.loadUpcomingEvents()
        this.isLoading = false;
      },
     
      error: (error) => {
        console.error('Error loading events:', error);
        this.isLoading = false;
      }
    });
  }

  private loadUpcomingEvents(): void {
   
       const now = new Date();
     this.upcomingEvents = this.events
         .filter(x => new Date(x.date) >= now)
         .sort((a, b) => new Date( a.date).getTime() - new Date(b.date).getTime())
         .slice(0, 20);
     
     
      
      
      this.applyFilters();
  }

  onFilterChange(): void {
    this.applyFilters();
  }

  private applyFilters(): void {
    this.filteredEvents = this.eventService.filterEvents(this.upcomingEvents, this.currentFilter);
  }

  onRegisterForEvent(event: Event): void {
    this.eventService.registerForEvent(event.id).subscribe({
      next: (success) => {
        if (success) {
          console.log('Successfully registered for event:', event.title);
          // In a real app, show a success message
        }
      },
      error: (error) => {
        console.error('Registration failed:', error);
        // In a real app, show an error message
      }
    });
  }

  clearFilters(): void {
    this.currentFilter = {
      type: 'all',
      month: null,
      isOnline: null
    };
    this.applyFilters();
  }

  hasActiveFilters(): boolean {
    return this.currentFilter.type !== 'all' ||
      this.currentFilter.month !== null ||
      this.currentFilter.isOnline !== null;
  }

  toggleViewMode(): void {
    this.viewMode = this.viewMode === 'list' ? 'calendar' : 'list';
  }

  getFilteredEventsCount(): number {
    return this.filteredEvents.length;
  }

  getNextEventOfType(type: string): Event | null {
    return this.eventService.getNextEventOfType(type);
  }

  // Helper methods for template
  getEventsByMonth(): { [key: string]: Event[] } {
    const groupedEvents: { [key: string]: Event[] } = {};

    this.filteredEvents.forEach(event => {
      const monthYear = event.date.toLocaleDateString('de-DE', {
        year: 'numeric',
        month: 'long'
      });

      if (!groupedEvents[monthYear]) {
        groupedEvents[monthYear] = [];
      }
      groupedEvents[monthYear].push(event);
    });

    return groupedEvents;
  }

  getUpcomingEventsForType(type: string): Event[] {
    const now = new Date();
    return this.events
      .filter(event => event.type === type && event.date >= now)
      .sort((a, b) => a.date.getTime() - b.date.getTime())
      .slice(0, 2);
  }
}
