import {Component, computed, signal} from '@angular/core';
import {FaqItem} from '../../../core/interface/faq-item';
import {NzCardComponent} from 'ng-zorro-antd/card';
import {NzCollapseComponent, NzCollapsePanelComponent} from 'ng-zorro-antd/collapse';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {NzInputDirective, NzInputGroupComponent} from 'ng-zorro-antd/input';
import {FormsModule} from '@angular/forms';
import {NzEmptyComponent} from 'ng-zorro-antd/empty';

interface FaqCategory {
  title: string;
  items: FaqItem[];
}

@Component({
  selector: 'app-faq',
  imports: [
    NzCardComponent,
    NzCollapseComponent,
    NzCollapsePanelComponent,
    NzButtonComponent,
    NzInputGroupComponent,
    NzInputDirective,
    FormsModule,
    NzEmptyComponent
  ],
  templateUrl: './faq.html',
  styleUrl: './faq.css',
})
export class Faq {
  faqCategories: FaqCategory[] = [
    {
      title: 'General',
      items: [
        {
          question: 'What is MyApp?',
          answer: 'MyApp is a modern SaaS starter kit built with Angular and Spring Boot. It includes authentication, Stripe payments, admin dashboard, subscription management, and many production-ready features to help you launch your service faster.'
        },
        {
          question: 'How do I get started?',
          answer: '1. Clone the repository from GitHub\n2. Install dependencies (npm install for frontend, Maven for backend)\n3. Run backend (Spring Boot) and frontend (ng serve)\n4. Register an account and start creating plans, subscribers, and entitlements.'
        },
        {
          question: 'Is MyApp free to use?',
          answer: 'Yes! It is open-source under MIT License – free for personal and commercial use. You can customize everything as you like.'
        }
      ]
    },
    {
      title: 'Billing & Payments',
      items: [
        {
          question: 'Which payment methods are supported?',
          answer: 'We integrate with Stripe, supporting credit/debit cards, Apple Pay, Google Pay, SEPA Direct Debit (Europe), and more (depending on your region). PayPal and local gateways will be added soon.'
        },
        {
          question: 'How do subscriptions and billing work?',
          answer: 'You can create multiple plans with different prices, features, and trial periods. Stripe handles recurring payments, invoices, proration, and webhooks automatically. Usage-based billing is also supported.'
        },
        {
          question: 'Can users cancel or upgrade their subscription?',
          answer: 'Yes. Users can cancel anytime from their dashboard (prorated refund if applicable). Upgrades/downgrades are seamless with automatic proration handled by Stripe.'
        }
      ]
    },
    {
      title: 'Technical',
      items: [
        {
          question: 'What tech stack does MyApp use?',
          answer: 'Frontend: Angular 17+ (standalone components, signals)\nBackend: Spring Boot 3 + PostgreSQL\nUI Library: ng-zorro-antd\nPayments: Stripe\nAuth: JWT + Social Login'
        },
        {
          question: 'Does it support dark mode?',
          answer: 'Yes! Dark mode is built-in and automatically follows your system preference. You can also toggle it manually in settings.'
        },
        {
          question: 'How can I add new features or customize?',
          answer: 'MyApp is modular:\n- Add new components/services in src/app\n- Extend existing services (e.g. add new payment gateway)\n- Customize theme in styles.scss\nEverything uses standalone components for easy extension.'
        }
      ]
    },
    {
      title: 'Support & Troubleshooting',
      items: [
        {
          question: 'I encountered an error. What should I do?',
          answer: '1. Check browser console (F12)\n2. Ensure backend is running (port 8080)\n3. Delete node_modules → npm install again\n4. Submit issue on GitHub with logs/error message.'
        },
        {
          question: 'How do I contact support?',
          answer: 'For open-source users: open GitHub Issues.\nFor premium/custom support: contact us via email or Discord (link in README).'
        }
      ]
    }
  ];


  // Computed filter realtime
  filteredCategories = computed(() => {
    return this.faqCategories
      .filter(cat => cat.items.length > 0);
  });
}
