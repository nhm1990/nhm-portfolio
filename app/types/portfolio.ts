export interface Client {
  name: string
  icon: string
}

interface Stat {
  label: string
  value: string
}

export interface Project {
  id: number
  title: string
  category: string
  description: string
  icon: string
  technologies: string[]
  stats?: Stat[]
}

export interface PortfolioContent {
  locale: string
  hero: {
    greeting: string
    title: string
    description: string
  }
  clients: {
    title: string
    subtitle: string
    cta: string
    list: Client[]
  }
  portfolio: {
    title: string
    subtitle: string
    explore: string
    projects: Project[]
  }
  contact: {
    title: string
    subtitle: string
    email: string
    linkedin: string
    github: string
  }
}
