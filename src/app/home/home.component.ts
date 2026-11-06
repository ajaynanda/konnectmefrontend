import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgbCarouselConfig, NgbCarousel, NgbSlide } from '@ng-bootstrap/ng-bootstrap';
import { NgImageSliderModule } from 'ng-image-slider';

export interface Testimonial {
  name: string;
  role: string;
  location: string;
  avatar: string;
  quote: string;
  rating: number;
}

export interface FeaturePillar {
  icon: string;
  badge: string;
  title: string;
  description: string;
  highlight: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [NgbCarouselConfig],
  imports: [CommonModule, RouterLink, NgbCarousel, NgbSlide, NgImageSliderModule]
})
export class HomeComponent implements OnInit {
  activeTab: string = 'visual';

  stats = [
    { value: '450K+', label: 'Active Creators', icon: 'bi-people-fill' },
    { value: '130+', label: 'Countries Connected', icon: 'bi-globe2' },
    { value: '0%', label: 'Feed Compression', icon: 'bi-badge-4k-fill' },
    { value: '99.9%', label: 'Encrypted Privacy', icon: 'bi-shield-check' }
  ];

  features: FeaturePillar[] = [
    {
      icon: 'bi-camera2',
      badge: 'Lossless Media',
      title: 'Curated Visual Feeds',
      description: 'Lossless high-fidelity photography and project portfolios rendered with zero compression artifacts and zero sponsored rage-bait.',
      highlight: 'Ultra-crisp raw tones'
    },
    {
      icon: 'bi-soundwave',
      badge: 'Low-Latency',
      title: 'Real-Time Global Rooms',
      description: 'Drop into spatial audio studios, encrypted direct channels, and regional async community boards spanning 24 timezones effortlessly.',
      highlight: 'Lossless 48kHz audio'
    },
    {
      icon: 'bi-wallet2',
      badge: '0% Platform Fee',
      title: 'Creator Economy Built-In',
      description: 'Direct peer monetization, instantaneous micro-tipping, verified identity badges, and license attribution contracts built directly into every post.',
      highlight: 'Instant crypto & fiat sync'
    },
    {
      icon: 'bi-shield-lock-fill',
      badge: 'Client-Side Keying',
      title: 'Privacy-First Architecture',
      description: 'Zero third-party trackers, zero data brokering to ad networks, and client-side encryption on all 1-on-1 and group dispatches.',
      highlight: 'Zero third-party trackers'
    }
  ];

  testimonials: Testimonial[] = [
    {
      name: 'Aoi Takahashi',
      role: 'Spatial Designer',
      location: 'Tokyo, Japan',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      quote: 'KonnectMe changed how I collaborate with artists in Seoul and Paris. The image fidelity is breathtaking, and the distraction-free feed actually respects my time.',
      rating: 5
    },
    {
      name: 'David Vance',
      role: 'Founder, Synapse AI',
      location: 'Berlin, Germany',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
      quote: 'I found my current co-founder through an open audio room on KonnectMe. We built an entire enterprise MVP in 90 days. It is LinkedIn without the corporate cringe.',
      rating: 5
    },
    {
      name: 'Maya Sterling',
      role: 'Expedition Photographer',
      location: 'Vancouver, Canada',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80',
      quote: 'The zero-algorithm promise is real. When I post landscape shots, my followers actually see them in chronological order without having to pay for boost tokens.',
      rating: 5
    }
  ];

  pricingTiers = [
    {
      name: 'Free Explorer',
      price: '$0',
      period: 'forever',
      description: 'Perfect for casual discovery and building your personal circle.',
      popular: false,
      btnText: 'Get Started Free',
      btnRoute: '/register',
      features: [
        'Uncompressed visual feed access',
        'Up to 500 active network connections',
        'Direct 1-on-1 encrypted messaging',
        'Spatial audio rooms (listen-only)'
      ]
    },
    {
      name: 'Pro Creator',
      price: '$12',
      period: 'per month',
      description: 'For visual creators, photographers, and independent founders.',
      popular: true,
      btnText: 'Start 14-Day Pro Trial',
      btnRoute: '/membership',
      features: [
        'Unlimited lossless 4K portfolio showcases',
        'Unlimited network connections & followers',
        'Verified creator badge & custom domain',
        'Host unlimited spatial audio rooms',
        '0% fee peer tipping & client contracts'
      ]
    },
    {
      name: 'Global Studio',
      price: '$49',
      period: 'per month',
      description: 'For creative studios, agencies, and distributed tech teams.',
      popular: false,
      btnText: 'Contact Enterprise',
      btnRoute: '/membership',
      features: [
        'Everything in Pro for up to 10 team seats',
        'Dedicated organization channel & job board',
        'Advanced API access & webhook events',
        '24/7 dedicated support & concierge sync'
      ]
    }
  ];

  imgCollection = [
    {
      image: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=1200&q=80',
      thumbImage: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=400&q=80',
      alt: 'Creator 1',
      title: 'Good Platform for Developing Friends'
    },
    {
      image: 'https://images.unsplash.com/photo-1494708001911-679f5d15a946?auto=format&fit=crop&w=1200&q=80',
      thumbImage: 'https://images.unsplash.com/photo-1494708001911-679f5d15a946?auto=format&fit=crop&w=400&q=80',
      title: 'I Rate 5/5 for this KonnectMe',
      alt: 'Creator 2'
    },
    {
      image: 'https://images.unsplash.com/photo-1504199367641-aba8151af406?auto=format&fit=crop&w=1200&q=80',
      thumbImage: 'https://images.unsplash.com/photo-1504199367641-aba8151af406?auto=format&fit=crop&w=400&q=80',
      title: 'Well Connected and Secured',
      alt: 'Creator 3'
    },
    {
      image: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=1200&q=80',
      thumbImage: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=400&q=80',
      title: 'Lossless Visuals & Great Community',
      alt: 'Creator 4'
    }
  ];

  images = [
    {
      title: 'Build your Network across 130+ Countries',
      short: 'Next-Gen Global Social Platform',
      src: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1400&q=80'
    },
    {
      title: 'Share Lossless 4K Moments and Project Feeds',
      short: 'Zero Compression, Zero Algorithmic Traps',
      src: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1400&q=80'
    },
    {
      title: 'Real-Time Spatial Audio Studios & Direct Channels',
      short: 'Collaborate effortlessly across timezones',
      src: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1400&q=80'
    }
  ];

  constructor(config: NgbCarouselConfig) {
    config.interval = 3500;
    config.keyboard = true;
    config.pauseOnHover = true;
  }

  ngOnInit(): void {}

  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }
}
