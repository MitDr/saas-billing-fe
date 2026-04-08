import {Component, computed} from '@angular/core';
import {FaqItem} from '../../../core/interface/faq-item';
import {NzCardComponent} from 'ng-zorro-antd/card';
import {NzCollapseComponent, NzCollapsePanelComponent} from 'ng-zorro-antd/collapse';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {NzInputDirective, NzInputGroupComponent} from 'ng-zorro-antd/input';
import {FormsModule} from '@angular/forms';
import {NzEmptyComponent} from 'ng-zorro-antd/empty';
import {SafeHtmlPipe} from '../../../core/pipe/safe-html.pipe';

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
    NzEmptyComponent,
    SafeHtmlPipe
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
          question: 'What is this application?',
          answer: 'This application is a Software as a Service (SaaS) platform that helps tenants manage subscription-based services.</br>' +
            'Tenants can use the web interface or access the system via APIs.'
        },
        {
          question: 'How can I use the application’s API?',
          answer: 'Step 1: Create an account at <a href="/auth/register" class="text-blue-600 hover:text-blue-700 underline font-medium">here</a></br>' +
            'Step 2: Create a tenant</br>' +
            'Step 3: Each tenant will be provided with an API secret key</br>' +
            'Step 4: Include this API key in the header of every request sent to the application’s API'
        },
        {
          question: 'Is it free to use?',
          answer: 'Yes! We do not charge any. </br>' + 'But there will be some fee for using stripe payment gateway.'
        },
        {
          question: 'Does the application provide user documentation?',
          answer: 'Yes. The application provides user documentation at: <a href="/documents">here</a></br>'
            + 'It also includes a chatbot for support at: <a href="/app/ai-chat ">here</a>  '
        },
        {
          question: 'What currencies are supported?',
          answer: 'Currently, the application supports USD and VND for plan management. </br>' +
            'For payouts, only USD is supported.'
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
          question: 'How can Subscriber change my payment method?',
          answer: 'Subscribers can access the portal and update their payment method.'
        },
        {
          question: 'How do subscriptions and billing work?',
          answer: 'You can create multiple plans with different prices, features, and trial periods. We handles recurring payments, invoices, proration, and webhooks automatically.'
        },
        {
          question: 'Is the trial subscription charged?',
          answer: 'No. The trial subscription is free (priced at 0) and does not automatically renew.'
        },
        {
          question: 'Can subscriber cancel there subscription or upgrade their subscription?',
          answer: 'Yes. Subscriber can cancel anytime. Upgrades/downgrades are currently under development.'
        }
      ]
    },
    {
      title: 'Plans & Prices',
      items: [
        {
          question: 'What types of pricing plans are supported?',
          answer: 'Currently, the application only supports time-based pricing plans and does not yet support usage-based pricing.'
        },
        {
          question: 'Can I make many pricing for a single plan',
          answer: 'Yes you can make many pricing for a plan </br>' +
            'You can even change how long it would be'
        },
        {
          question: 'Can I have different features for different pricing?',
          answer: 'No, unfortunately, features are tied to plans.</br>'
            + 'In this case, you need to create a new plan.'
        },
        {
          question: 'Can I revoke a subscriber from a feature?',
          answer: 'Yes. You can revoke access using the entitlement menu.'
        }
      ]
    },
    {
      title: 'Payout',
      items: [
        {
          question: 'How can I withdraw funds?',
          answer: 'Tenants need to connect their account with Stripe via the application and request a payout (if there is sufficient balance).'
        },
        {
          question: 'How do I connect to Stripe?',
          answer: 'Go to the tenant menu in the application and follow the steps to connect your account.'
        },
        {
          question: 'How do I know when a payment is ready for withdrawal?',
          answer: 'When a payment is finalized, a date will be provided indicating when the funds will be available for withdrawal.'
        }
      ]
    },
    {
      title: 'Technical',
      items: [
        {
          question: 'What is a webhook and how is it used in the application?',
          answer: 'A webhook (or web callback) is a method for automatically sending real-time data between applications when an event occurs. </br>'
            + 'Tenants can register webhooks to listen for events during the subscription payment lifecycle. </br>'
            + `Examples include:
                <ul class="list-disc pl-6 space-y-1 mt-3">
                    <li>Subscription created successfully</li>
                    <li>New invoice generated</li>
                    <li>Payment completed</li>
                </ul>`
        },
        {
          question: 'What is Stripe? What does it have to do with our application',
          answer: 'Stripe is a, global financial technology company that provides payment processing software and APIs for online businesses, e-commerce platforms, and applications. It enables businesses to accept credit cards, digital wallets (like Apple Pay and Google Pay), and local payment methods securely. </br>'
            + 'We use Stripe as our payment gateway to ensure secure and reliable transactions.'
        }
      ]
    },
    {
      title: 'Support & Troubleshooting',
      items: [
        {
          question: 'Why did my subscriber\'s payment fail?',
          answer: `This may be due to:
            <ul class="list-disc pl-6 space-y-1 mt-3">
                <li>Invalid card</li>
                <li>Insufficient balance</li>
                <li>Errors from Stripe</li>
            </ul>`
        },
        {
          question: 'How do I contact support?',
          answer: 'For open-source users: open GitHub Issues.\nFor premium/custom support: contact us via email or Discord (link in README).'
        },
      ]
    }
  ];


  // Computed filter realtime
  filteredCategories = computed(() => {
    return this.faqCategories
      .filter(cat => cat.items.length > 0);
  });
}
