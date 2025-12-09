import { Component } from '@angular/core';
import { EventService } from '../../services/event.service';
import { Event } from '../../models/event';

@Component({
  selector: 'app-admin-termine',
  template: `
    <div class="admin-container">
      <h2>Neuen Termin erstellen</h2>

      <div *ngIf="successMessage" class="success">
        ✅ {{ successMessage }}
      </div>

      <div *ngIf="errorMessage" class="error">
        ❌ {{ errorMessage }}
      </div>

      <form (ngSubmit)="onSubmit()" #form="ngForm">
        <div class="form-group">
          <label>Titel *</label>
          <input type="text" [(ngModel)]="newEvent.title" name="title" required>
        </div>

        <div class="form-group">
          <label>Typ *</label>
          <select [(ngModel)]="newEvent.type" name="type" required>
            <option value="Online-Meeting">Online-Meeting</option>
            <option value="Selbsthilfegruppe">Selbsthilfegruppe</option>
            <option value="AuDHS">AuDHS</option>
            <option value="Partner-Treffen">Partner-Treffen</option>
            <option value="Workshop">Workshop</option>
          </select>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label>Datum *</label>
            <input type="datetime-local" [(ngModel)]="dateTimeInput" name="date" required>
          </div>

          <div class="form-group">
            <label>Uhrzeit</label>
            <input type="text" [(ngModel)]="newEvent.time" name="time" placeholder="18:00">
          </div>
        </div>

        <div class="form-group">
          <label>
            <input type="checkbox" [(ngModel)]="newEvent.isOnline" name="isOnline">
            Online-Termin
          </label>
        </div>

        <div class="form-group" *ngIf="!newEvent.isOnline">
          <label>Ort</label>
          <input type="text" [(ngModel)]="newEvent.location" name="location">
        </div>

        <div class="form-group" *ngIf="newEvent.isOnline">
          <label>Zoom-Link</label>
          <input type="url" [(ngModel)]="newEvent.zoomLink" name="zoomLink">
        </div>

        <div class="form-group">
          <label>Beschreibung *</label>
          <textarea [(ngModel)]="newEvent.description" name="description" rows="4" required></textarea>
        </div>

        <div class="form-group">
          <label>Moderator</label>
          <input type="text" [(ngModel)]="newEvent.moderator" name="moderator">
        </div>

        <div class="form-group">
          <label>Häufigkeit</label>
          <input type="text" [(ngModel)]="newEvent.frequency" name="frequency" 
                 placeholder="z.B. Jeden ersten Donnerstag">
        </div>

        <div class="form-group">
          <label>
            <input type="checkbox" [(ngModel)]="newEvent.isRecurring" name="isRecurring">
            Wiederkehrender Termin
          </label>
        </div>

        <div class="form-group">
          <label>
            <input type="checkbox" [(ngModel)]="newEvent.requiresRegistration" name="requiresRegistration">
            Anmeldung erforderlich
          </label>
        </div>

        <div class="button-group">
          <button type="submit" [disabled]="!form.valid || loading">
            {{ loading ? 'Wird gespeichert...' : 'Termin erstellen' }}
          </button>
          <button type="button" (click)="resetForm()">Zurücksetzen</button>
        </div>
      </form>
    </div>
  `,
  styles: [`
    .admin-container {
      max-width: 800px;
      margin: 2rem auto;
      padding: 2rem;
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }

    h2 {
      margin-bottom: 2rem;
      color: #333;
    }

    .form-group {
      margin-bottom: 1.5rem;
    }

    .form-row {
      display: grid;
      grid-template-columns: 2fr 1fr;
      gap: 1rem;
    }

    label {
      display: block;
      margin-bottom: 0.5rem;
      font-weight: 500;
      color: #555;
    }

    input[type="text"],
    input[type="url"],
    input[type="datetime-local"],
    select,
    textarea {
      width: 100%;
      padding: 0.75rem;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 1rem;
    }

    input[type="checkbox"] {
      width: auto;
      margin-right: 0.5rem;
    }

    .button-group {
      display: flex;
      gap: 1rem;
      margin-top: 2rem;
    }

    button {
      padding: 0.75rem 2rem;
      border: none;
      border-radius: 4px;
      font-size: 1rem;
      cursor: pointer;
      transition: all 0.2s;
    }

    button[type="submit"] {
      background: #4CAF50;
      color: white;
    }

    button[type="submit"]:hover:not(:disabled) {
      background: #45a049;
    }

    button[type="submit"]:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    button[type="button"] {
      background: #f5f5f5;
      color: #333;
    }

    button[type="button"]:hover {
      background: #e0e0e0;
    }

    .success {
      padding: 1rem;
      background: #d4edda;
      color: #155724;
      border-radius: 4px;
      margin-bottom: 1rem;
    }

    .error {
      padding: 1rem;
      background: #f8d7da;
      color: #721c24;
      border-radius: 4px;
      margin-bottom: 1rem;
    }
  `]
})
export class AdminTermineComponent {
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

  constructor(private eventService: EventService) {}

  onSubmit() {
    this.loading = true;
    this.successMessage = '';
    this.errorMessage = '';

    // Convert datetime-local to Date
    if (this.dateTimeInput) {
      this.newEvent.date = new Date(this.dateTimeInput);
    }

    this.eventService.createEvent(this.newEvent).subscribe({
      next: (response) => {
        this.successMessage = 'Termin erfolgreich erstellt!';
        this.loading = false;
        this.resetForm();
      },
      error: (error) => {
        this.errorMessage = 'Fehler beim Erstellen: ' + error.message;
        this.loading = false;
        console.error(error);
      }
    });
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