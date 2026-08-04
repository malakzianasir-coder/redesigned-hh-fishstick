const SITE_URL =
  process.env.NEXT_PUBLIC_SERVER_URL ||
  process.env.VERCEL_PROJECT_PRODUCTION_URL ||
  'https://example.com'

const news = require('./content/news.json')
const events = require('./content/events.json')
const successStories = require('./content/success-stories.json')
const departments = require('./content/departments.json')
const services = require('./content/services.json')
const patientWelfare = require('./content/patient-welfare.json')
const donations = require('./content/donations.json')

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: SITE_URL,
  generateRobotsTxt: true,
  exclude: ['/pages-sitemap.xml', '/admin/*'],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        disallow: '/admin/*',
      },
    ],
    additionalSitemaps: [`${SITE_URL}/pages-sitemap.xml`],
  },
  additionalPaths: async () => {
    const paths = [
      '/',
      '/departments',
      '/services',
      '/doctors',
      '/lab-tests',
      '/donate',
      '/patient-welfare',
      '/our-purpose',
      '/our-impact',
      '/our-supporters',
      '/leadership',
      '/news',
      '/events',
      '/success-stories',
      '/search',
      '/contact',
      '/donate/mock',
      '/thank-you',
    ]

    departments.forEach((item) => paths.push(`/departments/${item.slug}`))
    services.forEach((item) => paths.push(`/services/${item.slug}`))
    patientWelfare.forEach((item) => paths.push(`/patient-welfare/${item.slug}`))
    donations.forEach((item) => paths.push(`/donations/${item.slug}`))

    news.articles.forEach((article) => {
      if (article._status === 'published') paths.push(`/news/${article.slug}`)
    })

    events.hospitalEvents.forEach((event) => {
      if (event._status === 'published') paths.push(`/events/${event.slug}`)
    })

    successStories.stories.forEach((story) => {
      if (story._status === 'published') paths.push(`/success-stories/${story.slug}`)
    })

    const landingPages = require('./content/landing-pages.json')
    landingPages.pages.forEach((page) => {
      if (page._status === 'published') paths.push(`/lp/${page.slug}`)
    })

    return paths.map((loc) => ({
      loc,
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date().toISOString(),
    }))
  },
}
