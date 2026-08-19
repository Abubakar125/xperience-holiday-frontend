import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FaqService } from '../../services/faq.service';

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.scss'
})
export class FaqComponent implements OnInit {
  faqs: any[] = [];

  constructor(private faqService: FaqService) {}

  ngOnInit() {
    this.faqService.getFaqs().subscribe({
      next: (data) => {
        this.faqs = data
          .filter((f: any) => f.isActive)
          .sort((a: any, b: any) => (a.order ?? 0) - (b.order ?? 0));
      },
      error: () => { this.faqs = []; }
    });
  }
}
