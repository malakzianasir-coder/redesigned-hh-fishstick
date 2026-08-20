// storage-adapter-import-placeholder
import { mongooseAdapter } from '@payloadcms/db-mongodb' // database-adapter-import

import sharp from 'sharp' // sharp-import
import path from 'path'
import { buildConfig, PayloadRequest } from 'payload'
import { fileURLToPath } from 'url'

import { Categories } from './collections/Categories'
import { FormDefinitions } from './collections/FormDefinitions'
import { LandingPages } from './collections/LandingPages'
import { Media } from './collections/Media'
import { NewsletterSubmissions } from './collections/NewsletterSubmissions'
import { Pages } from './collections/Pages'
import { Posts } from './collections/Posts'
import { Users } from './collections/Users'
import { LegacyPages } from './collections/LegacyPages'
import { LegacySiteConfig } from './globals/LegacySiteConfig'
import { LabTests } from './collections/LabTests'
import { Donations } from './collections/Donations'
import { Doctors } from './collections/Doctors'
import { Services } from './collections/Services'
import { DonationCauses } from './collections/DonationCauses'
import { PatientWelfarePages } from './collections/PatientWelfarePages'
import { SuccessStories } from './collections/SuccessStories'
import { News } from './collections/News'
import { Events } from './collections/Events'
import { Departments } from './collections/Departments'
import { Footer } from './Footer/config'
import { Header } from './Header/config'
import { plugins } from './plugins'
import { defaultLexical } from '@/fields/defaultLexical'
import { getServerSideURL } from './utilities/getURL'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    components: {
      // The `BeforeLogin` component renders a message that you see while logging into your admin panel.
      // Feel free to delete this at any time. Simply remove the line below and the import `BeforeLogin` statement on line 15.
      beforeLogin: ['@/components/BeforeLogin'],
      // The `BeforeDashboard` component renders the 'welcome' block that you see after logging into your admin panel.
      // Feel free to delete this at any time. Simply remove the line below and the import `BeforeDashboard` statement on line 15.
      beforeDashboard: ['@/components/BeforeDashboard'],
    },
    importMap: {
      baseDir: path.resolve(dirname),
    },
    user: Users.slug,
    livePreview: {
      breakpoints: [
        {
          label: 'Mobile',
          name: 'mobile',
          width: 375,
          height: 667,
        },
        {
          label: 'Tablet',
          name: 'tablet',
          width: 768,
          height: 1024,
        },
        {
          label: 'Desktop',
          name: 'desktop',
          width: 1440,
          height: 900,
        },
      ],
    },
  },
  // This config helps us configure global or default features that the other editors can inherit
  editor: defaultLexical,
  // database-adapter-config-start
  db: mongooseAdapter({
    url: process.env.DATABASE_URI,
  }),
  // database-adapter-config-end
  collections: [
    Pages,
    Posts,
    LandingPages,
    FormDefinitions,
    NewsletterSubmissions,
    Media,
    Categories,
    Users,
    Donations,
    Departments,
    Doctors,
    Services,
    News,
    Events,
    DonationCauses,
    PatientWelfarePages,
    SuccessStories,
    LabTests,
    LegacyPages,
  ],
  cors: [getServerSideURL()].filter(Boolean),
  globals: [Header, Footer, LegacySiteConfig],
  plugins: [
    ...plugins,
    // storage-adapter-placeholder
  ],
  secret: process.env.PAYLOAD_SECRET,
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  jobs: {
    access: {
      run: ({ req }: { req: PayloadRequest }): boolean => {
        // Allow logged in users to execute this endpoint (default)
        if (req.user) return true

        // If there is no logged in user, then check
        // for the Vercel Cron secret to be present as an
        // Authorization header:
        const authHeader = req.headers.get('authorization')
        return authHeader === `Bearer ${process.env.CRON_SECRET}`
      },
    },
    tasks: [],
  },
})
