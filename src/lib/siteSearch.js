import servicesData from '../data/servicesData.js'
import providersData from '../data/providersData.js'
import locationsData from '../data/locationsData.js'

const STATIC_PAGES = [
  {
    id: 'page-home',
    type: 'page',
    title: 'Plan Your Visit',
    url: '/',
    description: 'Homepage with primary calls to action, care navigation, and access to ICHS services.',
    keywords: ['home', 'visit', 'appointment', 'mychart', 'patient resources'],
  },
  {
    id: 'page-services',
    type: 'page',
    title: 'Services',
    url: '/services',
    description: 'Browse medical, dental, behavioral health, wellness, and specialized services.',
    keywords: ['care', 'medical', 'dental', 'behavioral health', 'wellness'],
  },
  {
    id: 'page-locations',
    type: 'page',
    title: 'Find a Location',
    url: '/location',
    description: 'Find clinic sites across Seattle, Shoreline, Bellevue, and Auburn.',
    keywords: ['clinic', 'address', 'map', 'zip code', 'nearest'],
  },
  {
    id: 'page-providers',
    type: 'page',
    title: 'Find a Provider',
    url: '/providers',
    description: 'Search ICHS doctors, dentists, behavioral health specialists, and other providers.',
    keywords: ['doctor', 'dentist', 'provider', 'specialist', 'language'],
  },
  {
    id: 'page-about',
    type: 'page',
    title: 'About ICHS',
    url: '/about',
    description: 'Mission, history, leadership, and community-centered care at ICHS.',
    keywords: ['mission', 'history', 'leadership', 'community', 'organization'],
  },
  {
    id: 'page-careers',
    type: 'page',
    title: 'Careers at ICHS',
    url: '/careers',
    description: 'Employment opportunities and hiring information for ICHS.',
    keywords: ['jobs', 'careers', 'employment', 'hr', 'open positions'],
  },
]

function tokenize(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9\s&-]/g, ' ')
    .split(/\s+/)
    .filter(Boolean)
}

function buildIndex() {
  const serviceEntries = servicesData.map((service) => ({
    id: `service-${service.id}`,
    type: 'service',
    title: service.name,
    url: `/services/${service.id}`,
    description: service.description,
    keywords: [
      service.category,
      ...(service.subServices || []).flatMap((item) => [item.name, item.description]),
      service.funFact?.name || '',
      service.funFact?.text || '',
    ],
  }))

  const providerEntries = providersData.map((provider) => ({
    id: `provider-${provider.id}`,
    type: 'provider',
    title: provider.name,
    url: `/providers/${provider.id}`,
    description: `${provider.role} specializing in ${provider.specialty} at ${provider.location}.`,
    keywords: [
      provider.role,
      provider.specialty,
      provider.location,
      provider.langs,
      provider.bio,
      ...(provider.services || []),
    ],
  }))

  const locationEntries = locationsData.map((location) => ({
    id: `location-${location.id}`,
    type: 'location',
    title: location.name,
    url: `/location/${location.id}`,
    description: location.description,
    keywords: [
      location.address,
      location.phone || '',
      location.transitInfo || '',
      location.parkingInfo || '',
      ...(location.types || []),
      ...(location.servicesOffered || []),
    ],
  }))

  return [...STATIC_PAGES, ...serviceEntries, ...providerEntries, ...locationEntries].map((entry) => {
    const searchableText = [entry.title, entry.description, ...(entry.keywords || [])].join(' ')
    return {
      ...entry,
      normalizedTitle: entry.title.toLowerCase(),
      searchableText: searchableText.toLowerCase(),
      tokens: tokenize(searchableText),
    }
  })
}

const SEARCH_INDEX = buildIndex()

export function searchSite(rawQuery) {
  const query = rawQuery.trim().toLowerCase()
  if (!query) return []

  const queryTokens = tokenize(query)

  return SEARCH_INDEX
    .map((entry) => {
      let score = 0

      if (entry.normalizedTitle === query) score += 120
      if (entry.normalizedTitle.startsWith(query)) score += 60
      if (entry.normalizedTitle.includes(query)) score += 35
      if (entry.searchableText.includes(query)) score += 18

      queryTokens.forEach((token) => {
        if (entry.tokens.includes(token)) score += 12
        if (entry.normalizedTitle.includes(token)) score += 8
      })

      return { ...entry, score }
    })
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score || a.title.localeCompare(b.title))
}
