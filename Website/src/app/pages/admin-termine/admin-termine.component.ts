import { Component,OnInit } from '@angular/core';
import { EventService } from '../../services/event.service';
import { Event } from '../../models/event';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-admin-termine',
  templateUrl: './admin-termine.component.html',
  styleUrls: ['./admin-termine.component.scss']
})
export class AdminTermineComponent  implements OnInit  {
  newEvent: any = {
    title: '',
    type: 'Online-Meeting',
    date: new Date(),
    time: '',
    isOnline: true,
    location: '',
    zoomLink: '',
    description: '',
    requiresRegistration: false,
    moderator: '',
    frequency: '',
    isRecurring: false
  };

  dateTimeInput: string = '';
  loading = false;
  successMessage = '';
  errorMessage = '';
 editMode = false;  // ✅ NEU
  terminId?: number; // ✅ NEU

  constructor(private eventService: EventService,
  private route: ActivatedRoute,      // ✅ NEU
    private router: Router               // ✅ NEU



  ) {}
 ngOnInit() {
    // ✅ NEU: Check für Edit-Mode
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.editMode = true;
      this.terminId = +id;
      this.loadTermin(id);
    }

    // ✅ NEU: Check für Copy-Mode
    const state = history.state;
    if (state.copyFrom) {
      this.newEvent = { ...state.copyFrom };
      delete this.newEvent.id; // Keine ID beim Kopieren
      this.dateTimeInput = this.formatDateTime(this.newEvent.date);
    }
  }
 loadTermin(id: number) {
    this.eventService.getById(id).subscribe({
      next: (termin) => {
        this.newEvent = termin;
        this.dateTimeInput = this.formatDateTime(termin.date);
      }
    });
  }

formatDateTime(date: any): string {
  const d = new Date(date);
  const offset = d.getTimezoneOffset() * 60000;
  const localDate = new Date(d.getTime() - offset);
  return localDate.toISOString().slice(0, 16);
}
  onSubmit() {
    this.loading = true;
    this.successMessage = '';
    this.errorMessage = '';

    // Convert datetime-local to Date
    if (this.dateTimeInput) {
      this.newEvent.date = this.dateTimeInput;
    }

     if (this.editMode && this.terminId) {
    // UPDATE
    this.eventService.updateEvent(this.terminId, this.newEvent).subscribe({
      next: (response) => {
        this.successMessage = 'Termin erfolgreich aktualisiert!';
        this.loading = false;
        setTimeout(() => {
          this.router.navigate(['/admin/termine']);
        }, 1500);
      },
      error: (error) => {
        this.errorMessage = 'Fehler beim Aktualisieren: ' + error.message;
        this.loading = false;
      }
    });
  } else {
    // CREATE
    this.eventService.createEvent(this.newEvent).subscribe({
      next: (response) => {
        this.successMessage = 'Termin erfolgreich erstellt!';
        this.loading = false;
        this.resetForm();
      },
      error: (error) => {
        this.errorMessage = 'Fehler beim Erstellen: ' + error.message;
        this.loading = false;
      }
    });
  }
  }
  resetForm() {
    this.newEvent = {
      title: '',
      type: 'Online-Meeting',
      date: new Date(),
      time: '',
      isOnline: true,
      location: '',
      zoomLink: '',
      description: '',
      requiresRegistration: false,
      moderator: '',
      frequency: '',
      isRecurring: false
    };
    this.dateTimeInput = '';
  }
}