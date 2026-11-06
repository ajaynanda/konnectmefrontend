import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-membership',
  templateUrl: './membership.component.html',
  styleUrls: ['./membership.component.css'],
  imports: [CommonModule, RouterLink]
})
export class MembershipComponent implements OnInit {
  billingCycle: 'monthly' | 'annual' = 'annual';

  faqs = [
    {
      q: 'Can I switch between plans at any time?',
      a: 'Yes, absolutely. You can upgrade, downgrade, or cancel your subscription at any time with a single click. When upgrading, prorated credit for remaining days is automatically applied.'
    },
    {
      q: 'What is the 0% creator fee guarantee?',
      a: 'KonnectMe takes zero commission on creator micro-tips, direct audio studio tickets, or peer client contracts. You only pay standard regulatory payment processing fees (e.g., Stripe standard).'
    },
    {
      q: 'What does "Lossless 4K" media preservation mean?',
      a: 'Unlike legacy social platforms that heavily re-compress your imagery into jagged JPEG artifacts, KonnectMe maintains your color profiles, EXIF metadata, and crisp resolutions in original fidelity.'
    },
    {
      q: 'Is there a free trial for Pro Creator?',
      a: 'Yes! Every new account gets an unrestricted 14-day Pro Creator trial upon registration. No credit card is required to explore.'
    },
    {
      q: 'What happens if I cancel my subscription?',
      a: 'If you cancel Pro or Studio, your account automatically reverts to the Free Explorer tier at the end of the billing period. None of your historical posts or connections are deleted.'
    }
  ];

  constructor() {}

  ngOnInit(): void {}

  setBillingCycle(cycle: 'monthly' | 'annual'): void {
    this.billingCycle = cycle;
  }
}
