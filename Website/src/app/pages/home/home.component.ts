// src/app/pages/home/home.component.ts
import { Component, OnInit } from '@angular/core';

interface TargetGroup {
  id: number;
  description: string;
  links?: { text: string; route: string }[];
}

interface Partner {
  id: number;
  name: string;
  description: string;
  website?: string;
}

interface SocialLink {
  name: string;
  url: string;
  icon: string;
  description: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  targetGroups: TargetGroup[] = [
    {
      id: 1,
      description: 'Du die Diagnose ADHS bekommen hast und gar nicht so recht weißt, was das für Dich heißt.'
    },
    {
      id: 2,
      description: 'Du wissen möchtest, welche Behandlungen und Therapien bei ADHS sowie bei ihren Begleitsymptomen und Komorbiditäten als State Of The Art gelten.'
    },
    {
      id: 3,
      description: 'Du als Mensch im ADHS-Spektrum auf der Suche nach Ansprechpartner•innen, Erfahrungsaustausch, individueller Unterstützung, spezifischem Training und adäquaten Therapien oder diesbezüglichen Informationen bist.'
    },
    {
      id: 4,
      description: 'Du Kontakt zu anderen Menschen im ADHS-Spektrum finden möchtest.',
      links: [
        { text: 'Termine', route: '/termine' },
        { text: 'die Selbsthilfegruppe', route: '/die-selbsthilfegruppe' }
      ]
    },
    {
      id: 5,
      description: 'Dein•e Partner•in, Freunde oder Familienmitglieder ADHS haben und Du Dich informieren möchtest, wie Du sie sinnvoll unterstützen kannst.',
      links: [
        { text: 'Angehörige', route: '/angehoerige' }
      ]
    },
    {
      id: 6,
      description: 'Du Dich über die auf wissenschaftlichen Erkenntnissen beruhenden Hintergründe des ADHS-Spektrums informieren möchtest.'
    },
    {
      id: 7,
      description: 'Du Tipps zum Umgang mit ADHS im Alltag bekommen möchtest.'
    },
    {
      id: 8,
      description: 'Du Dir aufgrund von Unkonzentriertheit, Impulsivität, Rastlosigkeit trotz Erschöpfung und Schusseligkeit immer wieder anhören musst, dass Du faul, unzuverlässig, unpünktlich, frech, undiszipliniert etc. bist.'
    },
    {
      id: 9,
      description: 'Psycholog•innen, Pädagog•innen, Sozialarbeiter•innen, Therapeut•innen, Mediziner•innen, Fachpersonen, Freunde, Interessierte'
    },
    {
      id: 10,
      description: 'Mitgliedern von Team ADHS',
      links: [
        { text: 'Mitglied werden', route: '/mitglied-werden' }
      ]
    },
    {
      id: 11,
      description: 'Unterstützer•innen, sei es in praktischen oder finanziellen Belangen von Team ADHS',
      links: [
        { text: 'aktiv werden', route: '/aktiv-werden' },
        { text: 'Spenden', route: '/spenden' }
      ]
    }
  ];

  partners: Partner[] = [
    {
      id: 1,
      name: '8ung e. Gen.',
      description: 'Coaching und Unterstützung bei Neurodivergenzen wie ADHS, Asperger-Syndrom und ähnlichen Konstitutionen. Fachvorträge. Beratung in Institutionen. Bio- und Neurofeedback. Hypnose. Tiergestützte Therapie mit Hund.',
      website: 'https://8ung.at'
    },
    {
      id: 2,
      name: 'Specialisterne',
      description: 'Ausbildung, Jobvermittlung und Jobcoaching von neurodivergenten Personen. Specialisterne Austria hat sich auf die Vermittlung neurodivergenter Personen in Jobs in der IT, Software Testing, Datenverarbeitung, Data Science, Qualitätsmanagement und mehr spezialisiert.',
      website: 'https://specialisterne.at'
    },
    {
      id: 3,
      name: 'ZIMT - Das Magazin für die Psyche',
      description: 'ZIMT ist ein innovatives Online-Magazin über die Psyche, mit dem Ziel, psychische Gesundheit in den Mittelpunkt junger Menschen zu bringen.',
      website: 'https://www.zimtmagazin.at'
    }
  ];

  socialLinks: SocialLink[] = [
    {
      name: 'Facebook-Seite',
      url: 'https://www.facebook.com/teamadhs.at',
      icon: 'facebook',
      description: 'Infos'
    },
    {
      name: 'Facebook-Gruppe',
      url: 'https://www.facebook.com/groups/teamadhs',
      icon: 'group',
      description: 'Diskussionen'
    },
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/team_adhs/',
      icon: 'camera_alt',
      description: 'Folge uns auf Instagram'
    },
    {
      name: 'Discord',
      url: 'https://discord.gg/tAUSEyNcCg',
      icon: 'forum',
      description: 'Diskussionsforum Team ADHS – zum aktiven Austausch zu allen Themen rund um ADHS'
    },
    {
      name: 'WhatsApp-Gruppe Bienenstock',
      url: 'mailto:kontakt@team-adhs.at?subject=WhatsApp-Gruppe Bienenstock',
      icon: 'chat',
      description: 'um beizutreten, schick uns bitte ein Mail'
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }
}
