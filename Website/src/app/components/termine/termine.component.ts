import { Component, OnInit } from '@angular/core';
import { TermineService, Termin } from '../../services/termine.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-termine',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="termine-container">
      <h2>Kommende Termine</h2>
      
      <div *ngIf="loading">Laden...</div>
      
      <div *ngIf="error" class="error">{{ error }}</div>
      
      <div class="termine-liste">
        <div *ngFor="let termin of termine" class="termin-card">
          <h3>{{ termin.title }}</h3>
          <p><strong>Datum:</strong> {{ termin.date | date:'dd.MM.yyyy' }}</p>
          <p><strong>Zeit:</strong> {{ termin.time }}</p>
          <p><strong>Typ:</strong> {{ termin.type }}</p>
          <p *ngIf="termin.isOnline">
            <strong>Online:</strong> 
            <a [href]="termin.zoomLink" target="_blank">Zoom-Link</a>
          </p>
          <p *ngIf="!termin.isOnline">
            <strong>Ort:</strong> {{ termin.location }}
          </p>
          <p><strong>Moderation:</strong> {{ termin.moderator }}</p>
          <p>{{ termin.description }}</p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .termine-container {
      padding: 20px;
    }
    .termine-liste {
      display: grid;
      gap: 20px;
    }
    .termin-card {
      border: 1px solid #ddd;
      padding: 20px;
      border-radius: 8px;
    }
    .error {
      color: red;
      padding: 10px;
      background: #fee;
    }
  `]
})
export class TermineComponent implements OnInit {
  termine: Termin[] = [];
  loading = false;
  error = '';

  constructor(private termineService: TermineService) {}

  ngOnInit() {
    this.loadTermine();
  }

  loadTermine() {
    this.loading = true;
    this.termineService.getUpcoming().subscribe({
      next: (data) => {
        this.termine = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Fehler beim Laden der Termine';
        this.loading = false;
        console.error(err);
      }
    });
  }
}