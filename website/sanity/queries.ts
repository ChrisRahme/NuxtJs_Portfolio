import { defineQuery } from 'groq'

// Every content type has a `show` toggle; `show != false` also keeps documents that never set it.
// References are filtered before dereferencing (`[@->show != false]->`): filtering after `->` yields nulls.

// Fields shared by every skill reference (experience tasks, projects, categories)
const SKILL_FIELDS = `_id, name, icon, svg, color, inConstellation, inSkillsList`

const IMAGE_FIELDS = `asset, alt, hotspot, crop`

export const SITE_SETTINGS_QUERY = defineQuery(`
  *[_type == "siteSettings"][0]{
    site{ title, description },
    home{ description, heroEyebrow, heroTitle, heroLead, aboutGreeting },
    resume{ description, eyebrow, title, summary, phone, email, "cv": cv.asset->url },
    projects{ description, lead },
    footer{ friends[]{ _key, name, url, color, "image": image{ ${IMAGE_FIELDS} } } }
  }
`)

export const ABOUTS_QUERY = defineQuery(`
  *[_type == "about" && show != false] | order(orderRank asc){
    _id,
    title,
    emoji,
    "image": image{ ${IMAGE_FIELDS} },
    caption,
    text,
    button{ text, link }
  }
`)

export const SKILL_CATEGORIES_QUERY = defineQuery(`
  *[_type == "skillCategory" && show != false] | order(orderRank asc){
    _id,
    title,
    color,
    "skills": skills[@->show != false]->{ ${SKILL_FIELDS} }
  }
`)

export const EXPERIENCE_QUERY = defineQuery(`
  *[_type == "experience" && show != false] | order(start asc){
    _id,
    title,
    company,
    type,
    career,
    start,
    end,
    "logo": logo{ ${IMAGE_FIELDS} },
    link,
    color,
    description,
    tasks[]{
      _key,
      title,
      lines,
      "skills": skills[@->show != false]->{ _id, name }
    }
  }
`)

export const EDUCATION_QUERY = defineQuery(`
  *[_type == "education" && show != false] | order(start asc){
    _id,
    title,
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
    name,
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
    name,
    slug,
    summary,
    description,
    "images": images[]{ _key, ${IMAGE_FIELDS} },
    links[]{ _key, icon, url, label },
    "skills": skills[@->show != false]->{ _id, name },
    tags,
    year,
    featured
  }
`)

export const QUOTES_QUERY = defineQuery(`
  *[_type == "quote" && show != false]{ _id, text }
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
