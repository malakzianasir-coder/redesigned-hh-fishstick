# Page Layouts & Data Spread Analysis

## Route: `/ (Home)`
- **Data Loaders:** None
- **Components Used:** HomePage

## Route: `/[slug]`
- **Data Loaders:** getPayload
- **Components Used:** PayloadRedirects, PageClient, LivePreviewListener, RenderHero, RenderBlocks, Metadata

## Route: `/about-us`
- **Data Loaders:** getAboutUs
- **Components Used:** ContentHubPage, MarketingSupportCTA

## Route: `/contact`
- **Data Loaders:** getFormById
- **Components Used:** MarketingBreadcrumb, DynamicForm

## Route: `/departments`
- **Data Loaders:** getDepartments
- **Components Used:** MarketingBreadcrumb, DepartmentsHubContent

## Route: `/departments/[slug]`
- **Data Loaders:** getDepartment, getDepartments
- **Components Used:** Metadata, DepartmentDetailContent

## Route: `/dev/components`
- **Data Loaders:** None
- **Components Used:** ComponentShowcase

## Route: `/doctors`
- **Data Loaders:** getDoctorsHub
- **Components Used:** MarketingBreadcrumb, DoctorsHubContent

## Route: `/doctors/[slug]`
- **Data Loaders:** getDoctor, getDoctorsHub
- **Components Used:** Metadata, DoctorProfilePage

## Route: `/doctors/heads-of-departments`
- **Data Loaders:** getDoctorsHub
- **Components Used:** MarketingBreadcrumb, DoctorsHubContent

## Route: `/doctors/visiting-consultants`
- **Data Loaders:** getDoctorsHub
- **Components Used:** MarketingBreadcrumb, DoctorsHubContent

## Route: `/donate`
- **Data Loaders:** getDonateContent
- **Components Used:** DonatePage

## Route: `/donate/[slug]`
- **Data Loaders:** getDonateContent, getDonation, getDonations
- **Components Used:** Metadata, DonationCauseContent

## Route: `/donate/[slug]/donate`
- **Data Loaders:** getDonation, getDonations, getSiteSettings
- **Components Used:** Metadata, DonationCheckout

## Route: `/donate/failed`
- **Data Loaders:** None
- **Components Used:** MarketingBreadcrumb, Link

## Route: `/donate/how-to-donate`
- **Data Loaders:** getHowToDonate
- **Components Used:** HowToDonateHubContent

## Route: `/donate/how-to-donate/[method]`
- **Data Loaders:** getHowToDonate, getHowToDonateMethod, getHowToDonateMethods
- **Components Used:** Metadata, HowToDonateMethodContent

## Route: `/donate/online`
- **Data Loaders:** getSiteSettings
- **Components Used:** DonationCheckout

## Route: `/donate/what-you-can-support`
- **Data Loaders:** getWhatYouCanSupport
- **Components Used:** WhatYouCanSupportHubContent

## Route: `/donate/what-you-can-support/[cause]`
- **Data Loaders:** getWhatYouCanSupport, getWhatYouCanSupportCause, getWhatYouCanSupportCauses
- **Components Used:** Metadata, WhatYouCanSupportCauseContent

## Route: `/ds`
- **Data Loaders:** None
- **Components Used:** InteractiveCard

## Route: `/ds/at-a-glance`
- **Data Loaders:** None
- **Components Used:** DsCatalogFrame

## Route: `/ds/dept-service-patterns`
- **Data Loaders:** None
- **Components Used:** DsCatalogFrame

## Route: `/ds/elements`
- **Data Loaders:** None
- **Components Used:** DsCatalogFrame

## Route: `/ds/hero-quote`
- **Data Loaders:** None
- **Components Used:** HeroQuoteDemo

## Route: `/ds/hub-page-patterns`
- **Data Loaders:** None
- **Components Used:** DsCatalogFrame

## Route: `/ds/illustrations`
- **Data Loaders:** getPatientWelfareHub
- **Components Used:** MarketingBreadcrumb, JumpNav, BlockHeader, MarketingHeroSection, Illustration, IllustrationsCatalog

## Route: `/ds/mega-menu`
- **Data Loaders:** None
- **Components Used:** DsCatalogFrame

## Route: `/events`
- **Data Loaders:** getEventsHub, getHolidayCalendar, getHospitalEvents
- **Components Used:** MarketingBreadcrumb, EventsHubContent

## Route: `/events/[slug]`
- **Data Loaders:** getHospitalEvent, getHospitalEvents, getRelatedHospitalEvents
- **Components Used:** Metadata, ArticlePageTemplate

## Route: `/lab-tests`
- **Data Loaders:** getLabTestsHub
- **Components Used:** MarketingBreadcrumb, LabTestsHubContent, GlobalCtaSection

## Route: `/leadership`
- **Data Loaders:** getLeadership
- **Components Used:** LeadershipContent

## Route: `/leadership/inam-elahi-asar`
- **Data Loaders:** getProfile
- **Components Used:** ProfileContent

## Route: `/leadership/messages`
- **Data Loaders:** getLeadershipMessages
- **Components Used:** LeadershipMessagesContent

## Route: `/leadership/messages/chairman`
- **Data Loaders:** getChairmansMessage
- **Components Used:** SingleMessageContent

## Route: `/leadership/messages/president`
- **Data Loaders:** getPresidentsMessage
- **Components Used:** SingleMessageContent

## Route: `/leadership/mian-abdul-waheed`
- **Data Loaders:** getProfile
- **Components Used:** ProfileContent

## Route: `/lp/[slug]`
- **Data Loaders:** getLandingPage, getLandingPages
- **Components Used:** Metadata, LandingMockupPage

## Route: `/news`
- **Data Loaders:** getFeaturedNews, getNewsCategories, getNewsHub, getNewsPage
- **Components Used:** MarketingBreadcrumb, NewsHubContent

## Route: `/news/[slug]`
- **Data Loaders:** getNewsArticle, getNewsArticles, getRelatedNews
- **Components Used:** Metadata, ArticlePageTemplate

## Route: `/news/page/[pageNumber]`
- **Data Loaders:** getFeaturedNews, getNewsCategories, getNewsHub, getNewsPage
- **Components Used:** Metadata, MarketingBreadcrumb, NewsHubContent

## Route: `/our-impact`
- **Data Loaders:** getOurImpact
- **Components Used:** OurImpactContent

## Route: `/our-purpose`
- **Data Loaders:** getOurPurpose
- **Components Used:** OurPurposeContent

## Route: `/our-supporters`
- **Data Loaders:** getOurSupporters
- **Components Used:** OurSupportersContent

## Route: `/patient-welfare`
- **Data Loaders:** getPatientWelfareHub
- **Components Used:** PatientCareHubContent

## Route: `/patient-welfare/[slug]`
- **Data Loaders:** getPatientWelfare, getPatientWelfarePages
- **Components Used:** Metadata, PatientWelfareDetailContent

## Route: `/search`
- **Data Loaders:** None
- **Components Used:** Search, ArticleCard, Link, Metadata

## Route: `/services`
- **Data Loaders:** getServices
- **Components Used:** MarketingBreadcrumb, ServicesHubContent

## Route: `/services/[slug]`
- **Data Loaders:** getService, getServices
- **Components Used:** Metadata, ServiceDetailContent

## Route: `/success-stories`
- **Data Loaders:** getFeaturedSuccessStories, getSuccessStoriesByCategory, getSuccessStoriesHub
- **Components Used:** MarketingBreadcrumb, SuccessStoriesHubContent

## Route: `/success-stories/[slug]`
- **Data Loaders:** getRelatedSuccessStories, getSuccessStory, getSuccessStories
- **Components Used:** Metadata, ArticlePageTemplate

## Route: `/thank-you`
- **Data Loaders:** getPayload
- **Components Used:** MarketingBreadcrumb, Link, Illustration

