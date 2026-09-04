import { figure } from './objects/figure'
import { richText } from './objects/richText'
import { about } from './documents/about'
import { education } from './documents/education'
import { experience } from './documents/experience'
import { language } from './documents/language'
import { project } from './documents/project'
import { quote } from './documents/quote'
import { siteSettings } from './documents/siteSettings'
import { skill } from './documents/skill'
import { skillCategory } from './documents/skillCategory'
import { social } from './documents/social'

export const schemaTypes = [
  // Objects
  figure,
  richText,
  // Documents
  siteSettings,
  about,
  experience,
  education,
  language,
  skillCategory,
  skill,
  project,
  quote,
  social,
]
