type Card = {
  project: string
  stack: Array<string>
  date: string
  description: {
    es: string
    en: string
  }
  website: string
  github: string
  image: string
  likes?: string | number
  alt: string
  late: boolean
}
type ProjectCardType = Array<Card>

// ⚠️ PLACEHOLDER DATA — these are NOT real projects yet.
// Each entry below is an empty placeholder rendered as a "coming soon" card so
// visitors know the portfolio isn't filled in. To publish a real project:
//   1. Fill `project`, `description.{es,en}`, `stack`, `date`, `image`, `alt`,
//      and the `github` / `website` URLs.
//   2. Set `late: false` so it renders as a live project card instead.
const dataCards: ProjectCardType = [
  {
    project: '',
    stack: [],
    date: '',
    description: { es: '', en: '' },
    website: '',
    github: '',
    image: '',
    alt: '',
    late: true,
  },
  {
    project: '',
    stack: [],
    date: '',
    description: { es: '', en: '' },
    website: '',
    github: '',
    image: '',
    alt: '',
    late: true,
  },
  {
    project: '',
    stack: [],
    date: '',
    description: { es: '', en: '' },
    website: '',
    github: '',
    image: '',
    alt: '',
    late: true,
  },
]
export default dataCards
