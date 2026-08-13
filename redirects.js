const redirects = async () => {
  const internetExplorerRedirect = {
    destination: '/ie-incompatible.html',
    has: [
      {
        type: 'header',
        key: 'user-agent',
        value: '(.*Trident.*)', // all ie browsers
      },
    ],
    permanent: false,
    source: '/:path((?!ie-incompatible.html$).*)', // all pages except the incompatibility page
  }

  const patientCareRedirects = [
    {
      source: '/patient-care',
      destination: '/patient-welfare',
      permanent: true,
    },
    {
      source: '/patient-care/:slug',
      destination: '/patient-welfare/:slug',
      permanent: true,
    },
  ]

  const leadershipProfileRedirects = [
    {
      source: '/leadership/haji-inam-elahi-asar',
      destination: '/leadership/inam-elahi-asar',
      permanent: true,
    },
  ]

  const aboutRedirects = [
    {
      source: '/about',
      destination: '/about-us',
      permanent: true,
    },
  ]

  const serviceRedirects = [
    {
      source: '/services/pathology',
      destination: '/services/clinical-laboratory',
      permanent: true,
    },
  ]

  return [
    internetExplorerRedirect,
    ...patientCareRedirects,
    ...leadershipProfileRedirects,
    ...aboutRedirects,
    ...serviceRedirects,
  ]
}

export default redirects
