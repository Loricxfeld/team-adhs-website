// src/app/pages/kontakt/kontakt.component.ts
import { Component, OnInit } from '@angular/core';
import { ContactService } from '../../services/contact.service';
import { ContactMessage, ContactPerson, OfficeInfo } from '../../models/contact-message';

@Component({
  selector: 'app-kontakt',
  standalone: false,
  templateUrl: './kontakt.component.html',
  styleUrls: ['./kontakt.component.scss']
})
export class KontaktComponent implements OnInit {

  contactPersons: ContactPerson[] = [];
  officeInfo!: OfficeInfo;
  contactFAQs: { question: string; answer: string }[] = [];

  // Contact form
  contactMessage: ContactMessage = {
    name: '',
    email: '',
    subject: '',
    message: '',
    category: 'general',
    isUrgent: false,
    preferredContact: 'email',
    phone: ''
  };

  // Form state
  isSubmitting = false;
  isSubmitted = false;
  formErrors: { [key: string]: string } = {};

  // Form options
  contactCategories = this.contactService.getContactCategories();

  // UI state
  showPhoneField = false;
  expandedFAQs: { [key: number]: boolean } = {};

  constructor(private contactService: ContactService) { }

  ngOnInit(): void {
    this.loadData();
  }

  private loadData(): void {
    this.contactService.getContactPersons().subscribe(persons => {
      this.contactPersons = persons;
    });

    this.contactService.getOfficeInfo().subscribe(info => {
      this.officeInfo = info;
    });

    this.contactFAQs = this.contactService.getContactFAQs();
  }

  onPreferredContactChange(): void {
    this.showPhoneField = this.contactMessage.preferredContact === 'phone';
    if (!this.showPhoneField) {
      this.contactMessage.phone = '';
      delete this.formErrors['phone'];
    }
  }

  validateForm(): boolean {
    this.formErrors = {};
    let isValid = true;

    // Required fields
    if (!this.contactMessage.name.trim()) {
      this.formErrors['name'] = 'Name ist erforderlich';
      isValid = false;
    }

    if (!this.contactMessage.email.trim()) {
      this.formErrors['email'] = 'E-Mail ist erforderlich';
      isValid = false;
    } else if (!this.contactService.validateEmail(this.contactMessage.email)) {
      this.formErrors['email'] = 'Bitte geben Sie eine gültige E-Mail-Adresse ein';
      isValid = false;
    }

    if (!this.contactMessage.message.trim()) {
      this.formErrors['message'] = 'Nachricht ist erforderlich';
      isValid = false;
    }

    // Phone validation if phone contact is preferred
    if (this.showPhoneField && this.contactMessage.preferredContact === 'phone') {
      if (!this.contactMessage.phone?.trim()) {
        this.formErrors['phone'] = 'Telefonnummer ist erforderlich wenn Telefon-Kontakt gewünscht';
        isValid = false;
      }
    }

    return isValid;
  }

  async onSubmit(): Promise<void> {
    if (!this.validateForm()) {
      return;
    }

    this.isSubmitting = true;

    try {
      // Add timestamp
      this.contactMessage.timestamp = new Date();

      const success = await this.contactService.sendContactMessage(this.contactMessage);

      if (success) {
        this.isSubmitted = true;
        this.resetForm();
      } else {
        this.formErrors['submit'] = 'Es ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut.';
      }
    } catch (error) {
      console.error('Contact form error:', error);
      this.formErrors['submit'] = 'Es ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut.';
    } finally {
      this.isSubmitting = false;
    }
  }

  sendDirectEmail(): void {
    const emailLink = this.contactService.getDirectEmailLink(this.contactMessage);
    window.location.href = emailLink;
  }

  private resetForm(): void {
    this.contactMessage = {
      name: '',
      email: '',
      subject: '',
      message: '',
      category: 'general',
      isUrgent: false,
      preferredContact: 'email',
      phone: ''
    };
    this.formErrors = {};
    this.showPhoneField = false;
  }

  resetSubmittedState(): void {
    this.isSubmitted = false;
  }

  hasError(field: string): boolean {
    return !!this.formErrors[field];
  }

  getError(field: string): string {
    return this.formErrors[field] || '';
  }

  getCategoryDescription(categoryValue: string): string {
    const category = this.contactCategories.find(c => c.value === categoryValue);
    return category?.description || '';
  }

  openSocialLink(platform: 'facebook' | 'instagram' | 'discord'): void {
    const links = {
      facebook: this.officeInfo.socialMedia.facebook,
      instagram: this.officeInfo.socialMedia.instagram,
      discord: this.officeInfo.socialMedia.discord
    };

    window.open(links[platform], '_blank');
  }

  copyEmailToClipboard(): void {
    navigator.clipboard.writeText(this.officeInfo.email).then(() => {
      alert('E-Mail-Adresse wurde in die Zwischenablage kopiert!');
    }).catch(() => {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = this.officeInfo.email;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      alert('E-Mail-Adresse wurde in die Zwischenablage kopiert!');
    });
  }

  toggleFAQ(index: number): void {
    this.expandedFAQs[index] = !this.expandedFAQs[index];
  }

  isFAQExpanded(index: number): boolean {
    return !!this.expandedFAQs[index];
  }

  scrollToForm(): void {
    const formElement = document.getElementById('contact-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  }

  getPersonResponsibilities(person: ContactPerson): string {
    return person.responsibleFor.join(', ');
  }
}
