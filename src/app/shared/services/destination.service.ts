import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

const API = environment.apiUrl;

@Injectable({ providedIn: 'root' })
export class DestinationService {
  constructor(private http: HttpClient) {}

  getDestination(id: number) { return this.http.get<any>(`${API}/destinations/${id}`); }
  getDestinations()          { return this.http.get<any[]>(`${API}/destinations`); }
}
