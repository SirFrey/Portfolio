type Localized<T = string> = { es: T; en: T }

export type Card = {
  id: 'messaging' | 'resorsi' | 'bot'
  project: string
  /** One line saying what kind of thing it is. */
  kind: Localized
  stack: Array<string>
  date: string
  description: Localized
  points: Localized<string[]>
  website: string
  github: string
  image: string
  alt: string
}
type ProjectCardType = Array<Card>

const dataCards: ProjectCardType = [
  {
    id: 'messaging',
    project: 'Resorsi Messaging',
    kind: {
      es: 'Bandeja de WhatsApp compartida para un equipo de reclutamiento',
      en: 'Shared WhatsApp inbox for a recruiting team',
    },
    stack: ['React', 'TypeScript', 'Bun', 'Postgres', 'WhatsApp Cloud API', 'MCP'],
    date: '2026',
    description: {
      es: 'El equipo de Resorsi lee y responde todas sus líneas de WhatsApp desde la web, con la <strong>ficha de Zoho CRM</strong> de cada persona al lado del chat. Los teléfonos siguen funcionando con la app de siempre.',
      en: "Resorsi's team reads and answers every WhatsApp line from the web, with each person's <strong>Zoho CRM record</strong> beside the chat. The phones keep working with the usual app.",
    },
    points: {
      es: [
        'Varias líneas de WhatsApp en un solo lugar; cada persona ve solo las que le compartieron',
        'Respuestas desde la web: texto, archivos, notas de voz y plantillas',
        'Servidor MCP: Claude lee y responde con los permisos de cada persona',
      ],
      en: [
        'Several WhatsApp lines in one place; each person sees only the ones shared with them',
        'Replies from the web: text, files, voice notes and templates',
        "MCP server: Claude reads and replies with each person's own access",
      ],
    },
    website: '',
    github: '',
    image: '',
    alt: '',
  },
  {
    id: 'resorsi',
    project: 'resorsi.com',
    kind: {
      es: 'Sitio y blog de una empresa de staffing en Latinoamérica',
      en: 'Website and blog for a LATAM staffing company',
    },
    stack: ['Next.js 16', 'React 19', 'Payload CMS', 'SQLite', 'Tailwind CSS'],
    date: '2026',
    description: {
      es: 'La página que conecta empresas de EE. UU. con talento latinoamericano. El equipo de marketing publica el blog desde un <strong>CMS propio</strong> y los formularios crean leads y candidatos directamente en Zoho CRM.',
      en: 'The site that connects US companies with Latin American talent. Marketing publishes the blog from a <strong>self-hosted CMS</strong>, and the forms create leads and candidates straight in Zoho CRM.',
    },
    points: {
      es: [
        'Blog con búsqueda, filtros y scroll infinito',
        'Navegación con View Transitions',
        'Roles y vista previa de borradores: marketing publica sin un desarrollador',
      ],
      en: [
        'Blog with search, filters and infinite scroll',
        'Navigation with View Transitions',
        'Roles and draft previews: marketing publishes without a developer',
      ],
    },
    website: 'https://resorsi.com',
    github: '',
    image: '/images/projects/resorsi.webp',
    alt: 'resorsi.com',
  },
  {
    id: 'bot',
    project: 'Recepcionista IA',
    kind: {
      es: 'Asistente de WhatsApp para una clínica dental',
      en: 'WhatsApp assistant for a dental clinic',
    },
    stack: ['Cloudflare Workers', 'Durable Objects', 'D1', 'Hono', 'React', 'DeepSeek'],
    date: '2025',
    description: {
      es: 'Responde a los pacientes en el <strong>número de WhatsApp que la clínica ya tenía</strong>: precios, horarios y citas. Cuando hace falta una persona, pasa el chat al panel de la clínica.',
      en: 'Answers patients on the <strong>WhatsApp number the clinic already had</strong>: prices, hours and appointments. When a person is needed, it hands the chat to the clinic dashboard.',
    },
    points: {
      es: [
        'Entiende notas de voz y fotos, no solo texto',
        'Citas sincronizadas con Cal.com, con recordatorios',
        'El bot se pausa cuando la doctora responde, desde el panel o su teléfono',
      ],
      en: [
        'Understands voice notes and photos, not only text',
        'Appointments synced with Cal.com, with reminders',
        'The bot pauses when the dentist replies, from the dashboard or her phone',
      ],
    },
    website: '',
    github: '',
    image: '',
    alt: '',
  },
]
export default dataCards
