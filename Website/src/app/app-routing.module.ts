import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { TermineComponent } from './pages/termine/termine.component';
import { MitgliedWerdenComponent } from './pages/mitglied-werden/mitglied-werden.component';
import { SelbsthilfegruppeComponent } from './pages/selbsthilfegruppe/selbsthilfegruppe.component';
import { AngehoerigeComponent } from './pages/angehoerige/angehoerige.component';
import { KontaktComponent } from './pages/kontakt/kontakt.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'termine', component: TermineComponent },
  { path: 'mitglied-werden', component: MitgliedWerdenComponent },
  { path: 'die-selbsthilfegruppe', component: SelbsthilfegruppeComponent },
  { path: 'angehoerige', component: AngehoerigeComponent },  // NEU
  { path: 'kontakt', component: KontaktComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
