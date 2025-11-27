import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Termin {
  id: number;
  title: string;
  type: string;
  date: string;
  time?: string;
  isOnline: boolean;
  location?: string;
  zoomLink?: string;
  description: string;
  requiresRegistration: boolean;
  moderator?: string;
  frequency?: string;
  isRecurring: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class TermineService {
  private apiUrl = 'https://localhost:7148/api/termine';

  constructor(private http: HttpClient) { }

  // Alle Termine
  getAll(): Observable<Termin[]> {
    return this.http.get<Termin[]>(this.apiUrl);
  }

  // Kommende Termine
  getUpcoming(limit: number = 10): Observable<Termin[]> {
    return this.http.get<Termin[]>(`${this.apiUrl}/upcoming?limit=${limit}`);
  }

  // Einzelner Termin
  getById(id: number): Observable<Termin> {
    return this.http.get<Termin>(`${this.apiUrl}/${id}`);
  }
}


