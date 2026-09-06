import type { Locale } from './config'

// Interface strings that do not come from Sanity.
// `t('nav.home', params)` walks to the leaf by its path and picks the active language (see composables/useTranslation.ts);
// `{name}` placeholders are filled from `params`.

export type Translated = Record<Locale, string>

export type MessageTree = { [key: string]: Translated | MessageTree }

export const strings = {
  nav: {
    aria: { en: 'Main', fr: 'Principale' },
    home: { en: 'Home', fr: 'Accueil' },
    resume: { en: 'Resume', fr: 'CV' },
    projects: { en: 'Projects', fr: 'Projets' },
    language: { en: 'Language', fr: 'Langue' },
  },
  hero: {
    seeProjects: { en: 'See projects', fr: 'Voir les projets' },
    readResume: { en: 'Read resume', fr: 'Voir le CV' },
  },
  quote: {
    another: { en: 'Another one', fr: 'Une autre' },
  },
  home: {
    workTitle: { en: 'Featured projects', fr: 'Projets en vedette' },
    allProjects: { en: 'All {count} projects', fr: 'Les {count} projets' },
    careerTitle: { en: 'Career', fr: 'Parcours' },
    now: { en: 'Now', fr: 'Actuellement' },
    at: { en: 'at {company}', fr: 'chez {company}' },
    since: { en: 'since {date}', fr: 'depuis {date}' },
    fullResume: { en: 'Full resume', fr: 'CV complet' },
    aboutTitle: { en: 'About me', fr: 'À propos' },
    aboutsAria: { en: 'Abouts', fr: 'À propos' },
    experienceSummary: { en: '{years} of experience', fr: "{years} d'expérience" },
    openOnProjects: { en: '{name}: open on the projects page', fr: '{name} : ouvrir sur la page projets' },
  },
  resume: {
    downloadCv: { en: 'Download CV', fr: 'Télécharger le CV' },
    now: { en: 'Now', fr: 'Actuellement' },
    experience: { en: 'Experience', fr: 'Expérience' },
    education: { en: 'Education', fr: 'Formation' },
    languages: { en: 'Languages', fr: 'Langues' },
    skills: { en: 'Skills', fr: 'Compétences' },
    since: { en: 'since {date}', fr: 'depuis {date}' },
    rolesIn: { en: '{count} roles in {span}', fr: '{count} postes en {span}' },
    fullTime: { en: '{span} full-time', fr: '{span} à plein temps' },
    previousRole: { en: 'Previous role', fr: 'Poste précédent' },
    nextRole: { en: 'Next role', fr: 'Poste suivant' },
    rolesByYear: { en: 'Roles by year', fr: 'Postes par année' },
  },
  projects: {
    title: { en: 'Projects', fr: 'Projets' },
    eyebrow: { en: '{count} projects · {span}', fr: '{count} projets · {span}' },
    toShow: { en: 'Projects to show', fr: 'Projets à afficher' },
    featured: { en: 'Featured', fr: 'En vedette' },
    all: { en: 'All', fr: 'Tous' },
    showAll: { en: 'Show all {count} projects', fr: 'Voir les {count} projets' },
    unfinished: { en: '…and many unfinished ones.', fr: '…et bien d’autres inachevés.' },
    openDetails: { en: 'Open details for {name}', fr: 'Voir les détails de {name}' },
    builtWith: { en: 'Built with', fr: 'Réalisé avec' },
    featuredMark: { en: 'Featured', fr: 'En vedette' },
    featuredTitle: { en: 'Featured project', fr: 'Projet en vedette' },
    close: { en: 'Close', fr: 'Fermer' },
    closeDetails: { en: 'Close project details', fr: 'Fermer les détails du projet' },
    previousImage: { en: 'Previous image', fr: 'Image précédente' },
    nextImage: { en: 'Next image', fr: 'Image suivante' },
    imageOf: { en: 'Image {index} of {total}', fr: 'Image {index} sur {total}' },
    showImageOf: { en: 'Show image {index} of {total}', fr: 'Afficher l’image {index} sur {total}' },
    olderNewer: { en: 'Older and newer projects', fr: 'Projets plus anciens et plus récents' },
    byYear: { en: 'Projects by year', fr: 'Projets par année' },
    older: { en: 'Older', fr: 'Plus ancien' },
    newer: { en: 'Newer', fr: 'Plus récent' },
    oldest: { en: 'Oldest', fr: 'Le plus ancien' },
    newest: { en: 'Newest', fr: 'Le plus récent' },
    linkNewTab: { en: 'Opens in a new tab', fr: 'Ouvre dans un nouvel onglet' },
    linkSource: { en: 'Source', fr: 'Source' },
    linkOpen: { en: 'Open', fr: 'Ouvrir' },
    linkVideo: { en: 'Video', fr: 'Vidéo' },
  },
  footer: {
    findMe: { en: 'Find me', fr: 'Me trouver' },
    myFriends: { en: 'My friends', fr: 'Mes amis' },
    lastUpdate: { en: 'Last update {date}', fr: 'Dernière mise à jour {date}' },
  },
  language: {
    reading: { en: 'Reading', fr: 'Lecture' },
    speaking: { en: 'Speaking', fr: 'Expression orale' },
    writing: { en: 'Writing', fr: 'Écriture' },
    listening: { en: 'Listening', fr: 'Compréhension orale' },
    proficiency: { en: '{name}: {level} proficiency', fr: '{name} : niveau {level}' },
    skillPercent: { en: '{skill}: {value}%', fr: '{skill} : {value} %' },
  },
  common: {
    visitWebsite: { en: 'Visit website', fr: 'Visiter le site' },
  },
  error: {
    eyebrow: { en: 'Error {code}', fr: 'Erreur {code}' },
    title404: { en: 'Nothing charted here.', fr: 'Rien de tracé ici.' },
    title500: { en: 'Something broke along the way.', fr: 'Quelque chose s’est brisé en chemin.' },
    lead404: {
      en: 'This address does not point to a page. It may have moved, or it may never have existed.',
      fr: 'Cette adresse ne mène à aucune page. Elle a peut-être été déplacée, ou n’a jamais existé.',
    },
    lead500: {
      en: 'The page failed to load. Reloading usually fixes it.',
      fr: 'La page n’a pas pu se charger. La recharger règle souvent le problème.',
    },
    requested: { en: 'Requested', fr: 'Demandé' },
    goHome: { en: 'Go home', fr: 'Accueil' },
    seeProjects: { en: 'See projects', fr: 'Voir les projets' },
    tryAgain: { en: 'Try again', fr: 'Réessayer' },
    constellation: { en: 'The number {code} drawn as a constellation', fr: 'Le nombre {code} dessiné en constellation' },
  },
} satisfies MessageTree
