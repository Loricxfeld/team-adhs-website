// src/app/pages/selbsthilfegruppe/selbsthilfegruppe.component.ts
import { Component, OnInit } from '@angular/core';

import { SupportGroup, GroupBenefit, FAQ } from '../../models/support-group';
import { SupportGroupService } from '../../services/support-group.service';

@Component({
  selector: 'app-selbsthilfegruppe',
  templateUrl: './selbsthilfegruppe.component.html',
  styleUrls: ['./selbsthilfegruppe.component.scss']
})
export class SelbsthilfegruppeComponent implements OnInit {

  supportGroups: SupportGroup[] = [];
  groupBenefits: GroupBenefit[] = [];
  faqs: FAQ[] = [];
  upcomingMeetings: SupportGroup[] = [];

  // FAQ categories for filtering
  faqCategories = [
    { value: '', label: 'Alle Fragen' },
    { value: 'general', label: 'Allgemein' },
    { value: 'participation', label: 'Teilnahme' },
    { value: 'technical', label: 'Technik' },
    { value: 'content', label: 'Inhalte' }
  ];

  selectedFaqCategory = '';

  // Contact form
  showContactForm = false;
  contactForm = {
    email: '',
    groupId: 0,
    message: ''
  };

  isSubmittingContact = false;

  constructor(private supportGroupService: SupportGroupService) { }

  ngOnInit(): void {
    this.loadData();
  }

  private loadData(): void {
    this.supportGroupService.getSupportGroups().subscribe(groups => {
      this.supportGroups = groups;
    });

    this.supportGroupService.getGroupBenefits().subscribe(benefits => {
      this.groupBenefits = benefits;
    });

    this.loadFAQs();

    this.supportGroupService.getUpcomingMeetings().subscribe(meetings => {
      this.upcomingMeetings = meetings.slice(0, 3);
    });
  }

  private loadFAQs(): void {
    const category = this.selectedFaqCategory || undefined;
    this.supportGroupService.getFAQs(category).subscribe(faqs => {
      this.faqs = faqs;
    });
  }

  onFaqCategoryChange(): void {
    this.loadFAQs();
  }

  getGroupTypeIcon(type: string): string {
    switch (type) {
      case 'online': return 'videocam';
      case 'presence': return 'location_on';
      case 'hybrid': return 'swap_horiz';
      default: return 'group';
    }
  }

  getGroupTypeLabel(type: string): string {
    switch (type) {
      case 'online': return 'Online';
      case 'presence': return 'Präsenz';
      case 'hybrid': return 'Hybrid';
      default: return 'Gruppe';
    }
  }

  getGroupTypeClass(type: string): string {
    return `group-type-${type}`;
  }

  openContactForm(groupId: number = 0): void {
    this.contactForm.groupId = groupId;
    this.showContactForm = true;
  }

  closeContactForm(): void {
    this.showContactForm = false;
    this.contactForm = {
      email: '',
      groupId: 0,
      message: ''
    };
  }

  async submitContactForm(): Promise<void> {
    if (!this.contactForm.email.trim()) {
      return;
    }

    this.isSubmittingContact = true;

    try {
      const success = await this.supportGroupService.requestGroupInfo(
        this.contactForm.email,
        this.contactForm.groupId
      );

      if (success) {
        alert('Vielen Dank! Wir haben Ihre Anfrage erhalten und werden uns bald bei Ihnen melden.');
        this.closeContactForm();
      }
    } catch (error) {
      console.error('Contact form error:', error);
      alert('Es ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut.');
    } finally {
      this.isSubmittingContact = false;
    }
  }

  joinZoomMeeting(zoomLink: string): void {
    window.open(zoomLink, '_blank');
  }

  formatNextMeetingDate(date: Date): string {
    return date.toLocaleDateString('de-DE', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }) + ' Uhr';
  }

  isGroupHappeningSoon(group: SupportGroup): boolean {
    if (!group.nextMeeting) return false;

    const now = new Date();
    const timeDiff = group.nextMeeting.getTime() - now.getTime();
    const daysDiff = timeDiff / (1000 * 3600 * 24);

    return daysDiff <= 7 && daysDiff > 0;
  }

  isGroupToday(group: SupportGroup): boolean {
    if (!group.nextMeeting) return false;

    const now = new Date();
    const meetingDate = new Date(group.nextMeeting);

    return now.toDateString() === meetingDate.toDateString();
  }
}
