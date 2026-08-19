import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

const API = environment.apiUrl;

@Injectable({ providedIn: 'root' })
export class HomeConfigService {
  constructor(private http: HttpClient) {}

  getHomeConfig() { return this.http.get<any>(`${API}/home-config`); }
}
