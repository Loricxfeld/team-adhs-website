// src/app/pages/mitglied-werden/mitglied-werden.component.ts
import { Component, OnInit } from '@angular/core';
import { MemberService } from '../../services/member.service';
import { Member, MembershipBenefit } from '../../models/member';

@Component({
  selector: 'app-mitglied-werden',
  standalone: false,
  templateUrl: './mitglied-werden.component.html',
  styleUrls: ['./mitglied-werden.component.scss']
})
export class MitgliedWerdenComponent implements OnInit {

  membershipBenefits: MembershipBenefit[] = [];

  // Form data
  member: Member = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: {
      street: '',
      postalCode: '',
      city: '',
      country: 'Österreich'
    },
    membershipType: 'erwachsene',
    interests: [],
    activeSupport: false,
    supportAreas: [],
    newsletter: true,
    dataProtection: false,
    additionalInfo: ''
  };

  // Form state
  isSubmitting = false;
  isSubmitted = false;
  formErrors: { [key: string]: string } = {};

  // Options
  interestOptions: string[] = [];
  supportAreaOptions: string[] = [];

  constructor(private memberService: MemberService) { }

  ngOnInit(): void {
    this.loadData();
  }

  private loadData(): void {
    this.memberService.getMembershipBenefits().subscribe(benefits => {
      this.membershipBenefits = benefits;
    });

    this.interestOptions = this.memberService.getInterestOptions();
    this.supportAreaOptions = this.memberService.getSupportAreaOptions();
  }

  onInterestChange(interest: string, checked: boolean): void {
    if (checked) {
      if (!this.member.interests.includes(interest)) {
        this.member.interests.push(interest);
      }
    } else {
      this.member.interests = this.member.interests.filter(i => i !== interest);
    }
  }

  onSupportAreaChange(area: string, checked: boolean): void {
    if (!this.member.supportAreas) {
      this.member.supportAreas = [];
    }

    if (checked) {
      if (!this.member.supportAreas.includes(area)) {
        this.member.supportAreas.push(area);
      }
    } else {
      this.member.supportAreas = this.member.supportAreas.filter(a => a !== area);
    }
  }

  isInterestSelected(interest: string): boolean {
    return this.member.interests.includes(interest);
  }

  isSupportAreaSelected(area: string): boolean {
    return this.member.supportAreas?.includes(area) || false;
  }

  validateForm(): boolean {
    this.formErrors = {};
    let isValid = true;

    // Required fields
    if (!this.member.firstName.trim()) {
      this.formErrors['firstName'] = 'Vorname ist erforderlich';
      isValid = false;
    }

    if (!this.member.lastName.trim()) {
      this.formErrors['lastName'] = 'Nachname ist erforderlich';
      isValid = false;
    }

    if (!this.member.email.trim()) {
      this.formErrors['email'] = 'E-Mail ist erforderlich';
      isValid = false;
    } else if (!this.memberService.validateEmail(this.member.email)) {
      this.formErrors['email'] = 'Bitte geben Sie eine gültige E-Mail-Adresse ein';
      isValid = false;
    }

    if (!this.member.address.street.trim()) {
      this.formErrors['street'] = 'Straße ist erforderlich';
      isValid = false;
    }

    if (!this.member.address.postalCode.trim()) {
      this.formErrors['postalCode'] = 'PLZ ist erforderlich';
      isValid = false;
    }

    if (!this.member.address.city.trim()) {
      this.formErrors['city'] = 'Ort ist erforderlich';
      isValid = false;
    }

    if (!this.member.dataProtection) {
      this.formErrors['dataProtection'] = 'Zustimmung zur Datenschutzerklärung ist erforderlich';
      isValid = false;
    }

    return isValid;
  }

  onSubmit(): void {
  if (!this.validateForm()) {
    return;
  }

  this.isSubmitting = true;

  this.memberService.submitMembership(this.member).subscribe({
    next: (response) => {
      this.isSubmitted = true;
      this.resetForm();
      this.isSubmitting = false;
    },
    error: (error) => {
      console.error('Membership submission error:', error);
      this.formErrors['submit'] = 'Es ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut.';
      this.isSubmitting = false;
    }
  });
}

  private resetForm(): void {
    this.member = {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: {
        street: '',
        postalCode: '',
        city: '',
        country: 'Österreich'
      },
      membershipType: 'erwachsene',
      interests: [],
      activeSupport: false,
      supportAreas: [],
      newsletter: true,
      dataProtection: false,
      additionalInfo: ''
    };
    this.formErrors = {};
  }

  hasError(field: string): boolean {
    return !!this.formErrors[field];
  }

  getError(field: string): string {
    return this.formErrors[field] || '';
  }

  resetSubmittedState(): void {
    this.isSubmitted = false;
  }
}
