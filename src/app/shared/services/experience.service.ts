import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

const API = environment.apiUrl;

@Injectable({ providedIn: 'root' })
export class ExperienceService {
  constructor(private http: HttpClient) {}

  getExperience(id: number) { return this.http.get<any>(`${API}/experiences/${id}`); }
  getExperiences()          { return this.http.get<any[]>(`${API}/experiences`); }
}
