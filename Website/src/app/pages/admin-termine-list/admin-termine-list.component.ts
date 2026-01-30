import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventService } from '../../services/event.service';
import { Event } from '../../models/event';
import { SelbsthilfegruppeComponent } from '../selbsthilfegruppe/selbsthilfegruppe.component';

@Component({
  selector: 'app-admin-termine-list',
  templateUrl: './admin-termine-list.component.html',
  styleUrls: ['./admin-termine-list.component.scss']
})
export class AdminTermineListComponent implements OnInit {
 termine: Event[] = [];
  loading = false;

  constructor(
    private eventService: EventService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadTermine();
  }

  loadTermine() {
    this.loading = true;
    this.eventService.getEvents().subscribe({
      next: (data) => {
        this.termine = data;
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
      }
    });
  }

  edit(id: number) {
    this.router.navigate(['/admin/termine', id]);
  }

  copy(termin: Event) {
    this.router.navigate(['/admin/termine/create'], {
      state: { copyFrom: termin }
    });
  }

  delete(id: number) {
    if (confirm('Termin wirklich löschen?')) {
      this.eventService.deleteEvent(id).subscribe({
        next: () => {
          this.loadTermine();
        }
      });
    }
  }
}
