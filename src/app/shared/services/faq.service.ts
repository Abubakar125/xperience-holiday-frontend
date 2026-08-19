import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

const API = environment.apiUrl;

@Injectable({ providedIn: 'root' })
export class FaqService {
  constructor(private http: HttpClient) {}

  getFaqs() { return this.http.get<any[]>(`${API}/faqs`); }
}
