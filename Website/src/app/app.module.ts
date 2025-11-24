import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { NavigationComponent } from './shared/navigation/navigation.component';
import { HomeComponent } from './pages/home/home.component';
import { MatIconModule } from '@angular/material/icon';
import { TermineComponent } from './pages/termine/termine.component';
import { EventCardComponent } from './components/event-card/event-card.component';
import { EventListComponent } from './components/event-list/event-list.component';
import { SocialLinksComponent } from './components/social-links/social-links.component';
import { TargetGroupListComponent } from './components/target-group-list/target-group-list.component';
import { MatButtonModule } from '@angular/material/button';
import { UpcomingEventsComponent } from './components/upcoming-events/upcoming-events.component';
import { EventFilterComponent } from './components/event-filter/event-filter.component';
import { MitgliedWerdenComponent } from './pages/mitglied-werden/mitglied-werden.component';
import { MembershipFormComponent } from './components/membership-form/membership-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SelbsthilfegruppeComponent } from './pages/selbsthilfegruppe/selbsthilfegruppe.component';
import { GroupInfoCardComponent } from './components/group-info-card/group-info-card.component';
import { SupportGroupService } from './services/support-group.service';
import { AngehoerigeComponent } from './pages/angehoerige/angehoerige.component';
import { SupportTipsComponent } from './components/support-tips/support-tips.component';
import { KontaktComponent } from './pages/kontakt/kontakt.component';
import { ContactFormComponent } from './components/contact-form/contact-form.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    NavigationComponent,
    HomeComponent,
    TermineComponent,
    EventCardComponent,
    EventListComponent,
    SocialLinksComponent,
    TargetGroupListComponent,
    UpcomingEventsComponent,
    EventFilterComponent,
    MitgliedWerdenComponent,
    MembershipFormComponent,
    SelbsthilfegruppeComponent,
    GroupInfoCardComponent,
    AngehoerigeComponent,
    SupportTipsComponent,
    KontaktComponent,
    ContactFormComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [

    SupportGroupService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
