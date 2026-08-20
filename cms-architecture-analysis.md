# CMS Architecture Analysis

This document outlines the current static site architecture to inform the design of the new CMS.

## 1. Page Layouts & Data Spread

### Route: `/ (Home)`
- **Data Spread (Loaders):** None
- **Components Used:** HomePage
- **Slug Management:** Static Route

### Route: `/[slug]`
- **Data Spread (Loaders):** getPayload
- **Components Used:** PayloadRedirects, PageClient, LivePreviewListener, RenderHero, RenderBlocks, Metadata
- **Slug Management:** Generated statically via `generateStaticParams`

### Route: `/about-us`
- **Data Spread (Loaders):** getAboutUs
- **Components Used:** ContentHubPage, MarketingSupportCTA
- **Slug Management:** Static Route

### Route: `/contact`
- **Data Spread (Loaders):** getFormById
- **Components Used:** MarketingBreadcrumb, DynamicForm
- **Slug Management:** Static Route

### Route: `/departments`
- **Data Spread (Loaders):** getDepartments
- **Components Used:** MarketingBreadcrumb, DepartmentsHubContent
- **Slug Management:** Static Route

### Route: `/departments/[slug]`
- **Data Spread (Loaders):** getDepartment, getDepartments
- **Components Used:** Metadata, DepartmentDetailContent
- **Slug Management:** Generated statically via `generateStaticParams`

### Route: `/dev/components`
- **Data Spread (Loaders):** None
- **Components Used:** ComponentShowcase
- **Slug Management:** Static Route

### Route: `/doctors`
- **Data Spread (Loaders):** getDoctorsHub
- **Components Used:** MarketingBreadcrumb, DoctorsHubContent
- **Slug Management:** Static Route

### Route: `/doctors/[slug]`
- **Data Spread (Loaders):** getDoctor, getDoctorsHub
- **Components Used:** Metadata, DoctorProfilePage
- **Slug Management:** Generated statically via `generateStaticParams`

### Route: `/doctors/heads-of-departments`
- **Data Spread (Loaders):** getDoctorsHub
- **Components Used:** MarketingBreadcrumb, DoctorsHubContent
- **Slug Management:** Static Route

### Route: `/doctors/visiting-consultants`
- **Data Spread (Loaders):** getDoctorsHub
- **Components Used:** MarketingBreadcrumb, DoctorsHubContent
- **Slug Management:** Static Route

### Route: `/donate`
- **Data Spread (Loaders):** getDonateContent
- **Components Used:** DonatePage
- **Slug Management:** Static Route

### Route: `/donate/[slug]`
- **Data Spread (Loaders):** getDonateContent, getDonation, getDonations
- **Components Used:** Metadata, DonationCauseContent
- **Slug Management:** Generated statically via `generateStaticParams`

### Route: `/donate/[slug]/donate`
- **Data Spread (Loaders):** getDonation, getDonations, getSiteSettings
- **Components Used:** Metadata, DonationCheckout
- **Slug Management:** Generated statically via `generateStaticParams`

### Route: `/donate/failed`
- **Data Spread (Loaders):** None
- **Components Used:** MarketingBreadcrumb, Link
- **Slug Management:** Static Route

### Route: `/donate/how-to-donate`
- **Data Spread (Loaders):** getHowToDonate
- **Components Used:** HowToDonateHubContent
- **Slug Management:** Static Route

### Route: `/donate/how-to-donate/[method]`
- **Data Spread (Loaders):** getHowToDonate, getHowToDonateMethod, getHowToDonateMethods
- **Components Used:** Metadata, HowToDonateMethodContent
- **Slug Management:** Generated statically via `generateStaticParams`

### Route: `/donate/online`
- **Data Spread (Loaders):** getSiteSettings
- **Components Used:** DonationCheckout
- **Slug Management:** Static Route

### Route: `/donate/what-you-can-support`
- **Data Spread (Loaders):** getWhatYouCanSupport
- **Components Used:** WhatYouCanSupportHubContent
- **Slug Management:** Static Route

### Route: `/donate/what-you-can-support/[cause]`
- **Data Spread (Loaders):** getWhatYouCanSupport, getWhatYouCanSupportCause, getWhatYouCanSupportCauses
- **Components Used:** Metadata, WhatYouCanSupportCauseContent
- **Slug Management:** Generated statically via `generateStaticParams`

### Route: `/ds`
- **Data Spread (Loaders):** None
- **Components Used:** InteractiveCard
- **Slug Management:** Static Route

### Route: `/ds/at-a-glance`
- **Data Spread (Loaders):** None
- **Components Used:** DsCatalogFrame
- **Slug Management:** Static Route

### Route: `/ds/dept-service-patterns`
- **Data Spread (Loaders):** None
- **Components Used:** DsCatalogFrame
- **Slug Management:** Static Route

### Route: `/ds/elements`
- **Data Spread (Loaders):** None
- **Components Used:** DsCatalogFrame
- **Slug Management:** Static Route

### Route: `/ds/hero-quote`
- **Data Spread (Loaders):** None
- **Components Used:** HeroQuoteDemo
- **Slug Management:** Static Route

### Route: `/ds/hub-page-patterns`
- **Data Spread (Loaders):** None
- **Components Used:** DsCatalogFrame
- **Slug Management:** Static Route

### Route: `/ds/illustrations`
- **Data Spread (Loaders):** getPatientWelfareHub
- **Components Used:** MarketingBreadcrumb, JumpNav, BlockHeader, MarketingHeroSection, Illustration, IllustrationsCatalog
- **Slug Management:** Static Route

### Route: `/ds/mega-menu`
- **Data Spread (Loaders):** None
- **Components Used:** DsCatalogFrame
- **Slug Management:** Static Route

### Route: `/events`
- **Data Spread (Loaders):** getEventsHub, getHolidayCalendar, getHospitalEvents
- **Components Used:** MarketingBreadcrumb, EventsHubContent
- **Slug Management:** Static Route

### Route: `/events/[slug]`
- **Data Spread (Loaders):** getHospitalEvent, getHospitalEvents, getRelatedHospitalEvents
- **Components Used:** Metadata, ArticlePageTemplate
- **Slug Management:** Generated statically via `generateStaticParams`

### Route: `/lab-tests`
- **Data Spread (Loaders):** getLabTestsHub
- **Components Used:** MarketingBreadcrumb, LabTestsHubContent, GlobalCtaSection
- **Slug Management:** Static Route

### Route: `/leadership`
- **Data Spread (Loaders):** getLeadership
- **Components Used:** LeadershipContent
- **Slug Management:** Static Route

### Route: `/leadership/inam-elahi-asar`
- **Data Spread (Loaders):** getProfile
- **Components Used:** ProfileContent
- **Slug Management:** Static Route

### Route: `/leadership/messages`
- **Data Spread (Loaders):** getLeadershipMessages
- **Components Used:** LeadershipMessagesContent
- **Slug Management:** Static Route

### Route: `/leadership/messages/chairman`
- **Data Spread (Loaders):** getChairmansMessage
- **Components Used:** SingleMessageContent
- **Slug Management:** Static Route

### Route: `/leadership/messages/president`
- **Data Spread (Loaders):** getPresidentsMessage
- **Components Used:** SingleMessageContent
- **Slug Management:** Static Route

### Route: `/leadership/mian-abdul-waheed`
- **Data Spread (Loaders):** getProfile
- **Components Used:** ProfileContent
- **Slug Management:** Static Route

### Route: `/lp/[slug]`
- **Data Spread (Loaders):** getLandingPage, getLandingPages
- **Components Used:** Metadata, LandingMockupPage
- **Slug Management:** Generated statically via `generateStaticParams`

### Route: `/news`
- **Data Spread (Loaders):** getFeaturedNews, getNewsCategories, getNewsHub, getNewsPage
- **Components Used:** MarketingBreadcrumb, NewsHubContent
- **Slug Management:** Static Route

### Route: `/news/[slug]`
- **Data Spread (Loaders):** getNewsArticle, getNewsArticles, getRelatedNews
- **Components Used:** Metadata, ArticlePageTemplate
- **Slug Management:** Generated statically via `generateStaticParams`

### Route: `/news/page/[pageNumber]`
- **Data Spread (Loaders):** getFeaturedNews, getNewsCategories, getNewsHub, getNewsPage
- **Components Used:** Metadata, MarketingBreadcrumb, NewsHubContent
- **Slug Management:** Generated statically via `generateStaticParams`

### Route: `/our-impact`
- **Data Spread (Loaders):** getOurImpact
- **Components Used:** OurImpactContent
- **Slug Management:** Static Route

### Route: `/our-purpose`
- **Data Spread (Loaders):** getOurPurpose
- **Components Used:** OurPurposeContent
- **Slug Management:** Static Route

### Route: `/our-supporters`
- **Data Spread (Loaders):** getOurSupporters
- **Components Used:** OurSupportersContent
- **Slug Management:** Static Route

### Route: `/patient-welfare`
- **Data Spread (Loaders):** getPatientWelfareHub
- **Components Used:** PatientCareHubContent
- **Slug Management:** Static Route

### Route: `/patient-welfare/[slug]`
- **Data Spread (Loaders):** getPatientWelfare, getPatientWelfarePages
- **Components Used:** Metadata, PatientWelfareDetailContent
- **Slug Management:** Generated statically via `generateStaticParams`

### Route: `/search`
- **Data Spread (Loaders):** None
- **Components Used:** Search, ArticleCard, Link, Metadata
- **Slug Management:** Static Route

### Route: `/services`
- **Data Spread (Loaders):** getServices
- **Components Used:** MarketingBreadcrumb, ServicesHubContent
- **Slug Management:** Static Route

### Route: `/services/[slug]`
- **Data Spread (Loaders):** getService, getServices
- **Components Used:** Metadata, ServiceDetailContent
- **Slug Management:** Generated statically via `generateStaticParams`

### Route: `/success-stories`
- **Data Spread (Loaders):** getFeaturedSuccessStories, getSuccessStoriesByCategory, getSuccessStoriesHub
- **Components Used:** MarketingBreadcrumb, SuccessStoriesHubContent
- **Slug Management:** Static Route

### Route: `/success-stories/[slug]`
- **Data Spread (Loaders):** getRelatedSuccessStories, getSuccessStory, getSuccessStories
- **Components Used:** Metadata, ArticlePageTemplate
- **Slug Management:** Generated statically via `generateStaticParams`

### Route: `/thank-you`
- **Data Spread (Loaders):** getPayload
- **Components Used:** MarketingBreadcrumb, Link, Illustration
- **Slug Management:** Static Route

