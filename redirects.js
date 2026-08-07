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

  return [internetExplorerRedirect, ...patientCareRedirects]
}

export default redirects
