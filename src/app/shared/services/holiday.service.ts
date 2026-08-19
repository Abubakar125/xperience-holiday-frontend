import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

const API = environment.apiUrl;

@Injectable({ providedIn: 'root' })
export class HolidayService {
  constructor(private http: HttpClient) {}

  getHoliday(id: number) { return this.http.get<any>(`${API}/holidays/${id}`); }
  getHolidays()          { return this.http.get<any[]>(`${API}/holidays`); }
}
