// src/app/pages/angehoerige/angehoerige.component.ts
import { Component, OnInit } from '@angular/core';
import { RelativeService } from '../../services/relative.service';
import { SupportTip, RelativeResource, ChallengeAndSolution } from '../../models/relative-info';

@Component({
  selector: 'app-angehoerige',
  templateUrl: './angehoerige.component.html',
  styleUrls: ['./angehoerige.component.scss']
})
export class AngehoerigeComponent implements OnInit {

  supportTips: SupportTip[] = [];
  relativeResources: RelativeResource[] = [];
  challengesAndSolutions: ChallengeAndSolution[] = [];

  // Filter states
  selectedTipCategory = '';
  selectedResourceType = '';

  // Options for filters
  tipCategories = this.relativeService.getTipCategories();
  resourceTypes = this.relativeService.getResourceTypes();

  // Expanded tips for details
  expandedTips: { [key: number]: boolean } = {};

  // Contact form
  showContactForm = false;
  contactForm = {
    email: '',
    message: ''
  };
  isSubmittingContact = false;

  constructor(private relativeService: RelativeService) { }

  ngOnInit(): void {
    this.loadData();
  }

  private loadData(): void {
    this.loadSupportTips();
    this.loadResources();

    this.relativeService.getChallengesAndSolutions().subscribe(challenges => {
      this.challengesAndSolutions = challenges;
    });
  }

  private loadSupportTips(): void {
    const category = this.selectedTipCategory || undefined;
    this.relativeService.getSupportTips(category).subscribe(tips => {
      this.supportTips = tips;
    });
  }

  private loadResources(): void {
    const type = this.selectedResourceType || undefined;
    this.relativeService.getRelativeResources(type).subscribe(resources => {
      this.relativeResources = resources;
    });
  }

  onTipCategoryChange(): void {
    this.loadSupportTips();
    // Reset expanded tips when category changes
    this.expandedTips = {};
  }

  onResourceTypeChange(): void {
    this.loadResources();
  }

  toggleTipExpansion(tipId: number): void {
    this.expandedTips[tipId] = !this.expandedTips[tipId];
  }

  isTipExpanded(tipId: number): boolean {
    return !!this.expandedTips[tipId];
  }

  getCategoryIcon(category: string): string {
    const iconMap: { [key: string]: string } = {
      'understanding': 'psychology',
      'communication': 'chat',
      'daily': 'schedule',
      'professional': 'medical_services',
      'selfcare': 'self_improvement'
    };
    return iconMap[category] || 'info';
  }

  getResourceTypeIcon(type: string): string {
    const iconMap: { [key: string]: string } = {
      'book': 'menu_book',
      'website': 'language',
      'video': 'play_circle',
      'course': 'school',
      'support-group': 'groups'
    };
    return iconMap[type] || 'link';
  }

  getResourceTypeLabel(type: string): string {
    const labelMap: { [key: string]: string } = {
      'book': 'Buch',
      'website': 'Website',
      'video': 'Video',
      'course': 'Kurs',
      'support-group': 'Selbsthilfegruppe'
    };
    return labelMap[type] || type;
  }

  openContactForm(): void {
    this.showContactForm = true;
  }

  closeContactForm(): void {
    this.showContactForm = false;
    this.contactForm = { email: '', message: '' };
  }

  async submitContactForm(): Promise<void> {
    if (!this.contactForm.email.trim()) {
      return;
    }

    this.isSubmittingContact = true;

    try {
      const success = await this.relativeService.sendSupportRequest(
        this.contactForm.email,
        this.contactForm.message
      );

      if (success) {
        alert('Vielen Dank! Wir haben Ihre Nachricht erhalten und werden uns bald bei Ihnen melden.');
        this.closeContactForm();
      }
    } catch (error) {
      console.error('Contact form error:', error);
      alert('Es ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut oder kontaktieren Sie uns direkt per E-Mail.');
    } finally {
      this.isSubmittingContact = false;
    }
  }

  openResourceLink(resource: RelativeResource): void {
    if (resource.url) {
      window.open(resource.url, '_blank');
    }
  }

  scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
