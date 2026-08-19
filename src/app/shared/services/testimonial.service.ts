import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

const API = environment.apiUrl;

@Injectable({ providedIn: 'root' })
export class TestimonialService {
  constructor(private http: HttpClient) {}

  getTestimonials() { return this.http.get<any[]>(`${API}/testimonials`); }
}
