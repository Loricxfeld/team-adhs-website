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
// Angular Material Modules
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';

// Component Imports
import { TermineComponent } from './pages/termine/termine.component';
import { EventCardComponent } from './components/event-card/event-card.component';
import { EventListComponent } from './components/event-list/event-list.component';
import { SocialLinksComponent } from './components/social-links/social-links.component';
import { TargetGroupListComponent } from './components/target-group-list/target-group-list.component';
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
import { HttpClientModule } from '@angular/common/http';
import { AdminTermineComponent } from './pages/admin-termine/admin-termine.component';
import { AdminTermineListComponent } from './pages/admin-termine-list/admin-termine-list.component';
import { AdminMembersListComponent } from './pages/admin-members-list/admin-members-list.component';



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
    AdminTermineComponent,
    AdminTermineListComponent,
    AdminMembersListComponent,
   
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,

    // Material Icon & Button
    MatIconModule,
    MatButtonModule,

    // Material Form Components
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatRadioModule,

    // Material Layout Components
    MatCardModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,

    // Material Feedback Components
    MatSnackBarModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatTooltipModule,

    // Material Advanced Components
    MatMenuModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,

    // Angular Forms & HTTP
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [

    SupportGroupService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
