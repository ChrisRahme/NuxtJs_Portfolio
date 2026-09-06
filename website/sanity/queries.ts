import { defineQuery } from 'groq'

// Every content type has a `show` toggle; `show != false` also keeps documents that never set it.
// References are filtered before dereferencing (`[@->show != false]->`): filtering after `->` yields nulls.

// Localized fields are internationalized arrays: [{ language, value }, ...] (see studio/ and website/i18n).
// Each one is resolved to a single value with `coalesce(field[language == $lang][0].value, field[language == "en"][0].value)`,
// so the query returns plain strings/blocks in the active language and falls back to English.
// So every query below takes a `$lang` parameter; useContentQuery() passes the active locale (see composables/useContentQuery.ts).

// Fields shared by every skill reference (experience tasks, projects, categories).
const SKILL_FIELDS = `_id, name, icon, svg, color, inConstellation, inSkillsList`

const IMAGE_FIELDS = `asset, alt, hotspot, crop`

export const SITE_SETTINGS_QUERY = defineQuery(`
  *[_type == "siteSettings"][0]{
    site{
      title,
      "description": coalesce(description[language == $lang][0].value, description[language == "en"][0].value)
    },
    home{
      "description": coalesce(description[language == $lang][0].value, description[language == "en"][0].value),
      "heroEyebrow": coalesce(heroEyebrow[language == $lang][0].value, heroEyebrow[language == "en"][0].value),
      heroTitle,
      "heroLead": coalesce(heroLead[language == $lang][0].value, heroLead[language == "en"][0].value),
      "aboutGreeting": coalesce(aboutGreeting[language == $lang][0].value, aboutGreeting[language == "en"][0].value)
    },
    resume{
      "description": coalesce(description[language == $lang][0].value, description[language == "en"][0].value),
      "eyebrow": coalesce(eyebrow[language == $lang][0].value, eyebrow[language == "en"][0].value),
      title,
      "summary": coalesce(summary[language == $lang][0].value, summary[language == "en"][0].value),
      phone,
      email,
      "cv": cv.asset->url
    },
    projects{
      "description": coalesce(description[language == $lang][0].value, description[language == "en"][0].value),
      "lead": coalesce(lead[language == $lang][0].value, lead[language == "en"][0].value)
    },
    footer{ friends[]{ _key, name, url, color, "image": image{ ${IMAGE_FIELDS} } } }
  }
`)

export const ABOUTS_QUERY = defineQuery(`
  *[_type == "about" && show != false] | order(orderRank asc){
    _id,
    "title": coalesce(title[language == $lang][0].value, title[language == "en"][0].value),
    emoji,
    "image": image{ ${IMAGE_FIELDS} },
    "caption": coalesce(caption[language == $lang][0].value, caption[language == "en"][0].value),
    "text": coalesce(text[language == $lang][0].value, text[language == "en"][0].value),
    button{
      "text": coalesce(text[language == $lang][0].value, text[language == "en"][0].value),
      link
    }
  }
`)

export const SKILL_CATEGORIES_QUERY = defineQuery(`
  *[_type == "skillCategory" && show != false] | order(orderRank asc){
    _id,
    "title": coalesce(title[language == $lang][0].value, title[language == "en"][0].value),
    color,
    "skills": skills[@->show != false]->{ ${SKILL_FIELDS} }
  }
`)

export const EXPERIENCE_QUERY = defineQuery(`
  *[_type == "experience" && show != false] | order(start asc){
    _id,
    "title": coalesce(title[language == $lang][0].value, title[language == "en"][0].value),
    company,
    type,
    career,
    start,
    end,
    "logo": logo{ ${IMAGE_FIELDS} },
    link,
    color,
    "description": coalesce(description[language == $lang][0].value, description[language == "en"][0].value),
    tasks[]{
      _key,
      "title": coalesce(title[language == $lang][0].value, title[language == "en"][0].value),
      "lines": coalesce(lines[language == $lang][0].value, lines[language == "en"][0].value),
      "skills": skills[@->show != false]->{ ${SKILL_FIELDS} }
    }
  }
`)

export const EDUCATION_QUERY = defineQuery(`
  *[_type == "education" && show != false] | order(start asc){
    _id,
    "title": coalesce(title[language == $lang][0].value, title[language == "en"][0].value),
    institution,
    start,
    end,
    "logo": logo{ ${IMAGE_FIELDS} },
    link,
    color,
    icon
  }
`)

export const LANGUAGES_QUERY = defineQuery(`
  *[_type == "language" && show != false] | order(orderRank asc){
    _id,
    "name": coalesce(name[language == $lang][0].value, name[language == "en"][0].value),
    flag,
    reading,
    speaking,
    writing,
    listening,
    proficiency
  }
`)

export const PROJECTS_QUERY = defineQuery(`
  *[_type == "project" && show != false] | order(year desc, orderRank asc){
    _id,
    "name": coalesce(name[language == $lang][0].value, name[language == "en"][0].value),
    slug,
    "summary": coalesce(summary[language == $lang][0].value, summary[language == "en"][0].value),
    "description": coalesce(description[language == $lang][0].value, description[language == "en"][0].value),
    "images": images[]{ _key, ${IMAGE_FIELDS} },
    links[]{ _key, icon, url, label },
    "skills": skills[@->show != false]->{ ${SKILL_FIELDS} },
    tags,
    year,
    featured
  }
`)

export const QUOTES_QUERY = defineQuery(`
  *[_type == "quote" && show != false]{
    _id,
    "text": coalesce(text[language == $lang][0].value, text[language == "en"][0].value)
  }
`)

export const SOCIALS_QUERY = defineQuery(`
  *[_type == "social" && show != false] | order(orderRank asc){
    _id,
    name,
    icon,
    color,
    url
  }
`)
