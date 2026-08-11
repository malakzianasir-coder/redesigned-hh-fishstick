import { Suspense } from 'react'

import { ArticleCard } from '@/components/articles/ArticleCard'
import { CategoryFilter } from '@/components/articles/CategoryFilter'
import {
  formatArticleDate,
  SUCCESS_STORY_CATEGORY_LABELS,
} from '@/lib/content/article-helpers'
import { getSuccessStories } from '@/lib/content/loaders'
import type { SuccessStory, SuccessStoriesHubContent, SuccessStoryCategory } from '@/lib/content/types'

const STORY_CATEGORIES: SuccessStoryCategory[] = [
  'successful-surgeries',
  'life-saving-treatments',
  'dialysis-recovery',
]

type SuccessStoriesHubContentProps = {
  hub: SuccessStoriesHubContent
  stories: SuccessStory[]
  featured?: SuccessStory[]
  activeCategory?: SuccessStoryCategory
}

export function SuccessStoriesHubContent({
  hub,
  stories,
  featured = [],
  activeCategory,
}: SuccessStoriesHubContentProps) {
  const categoryOptions = STORY_CATEGORIES.map((value) => SUCCESS_STORY_CATEGORY_LABELS[value])
  const allStories = getSuccessStories()
  const categoryCounts = Object.fromEntries(
    STORY_CATEGORIES.map((value) => [
      SUCCESS_STORY_CATEGORY_LABELS[value],
      allStories.filter((story) => story.category === value).length,
    ]),
  )
  const showFeatured = !activeCategory && featured.length > 0

  return (
    <div className="bg-white">
      <section>
        <div className="container mx-auto flex flex-col gap-8 px-6 py-[30px] lg:px-[30px] lg:py-[60px]">
          <div className="flex flex-col gap-[6px] text-center">
            <p className="kicker">{hub.kicker}</p>
            <h1 className="text-h2M font-bold text-primary-blue lg:text-h2">{hub.heading}</h1>
            <p className="mx-auto max-w-3xl text-b16 text-primary-blue/85">{hub.lede}</p>
          </div>

          <Suspense fallback={<div className="h-10" />}>
            <CategoryFilter
              categories={categoryOptions}
              basePath="/success-stories"
              label="Categories"
              counts={categoryCounts}
              allCount={allStories.length}
            />
          </Suspense>

          {showFeatured ? (
            <div className="flex flex-col gap-6">
              <h2 className="text-h5M font-bold text-primary-blue lg:text-h5">Featured story</h2>
              <div className="card-grid card-grid--2 mx-auto max-w-5xl">
                {featured.map((story) => (
                  <ArticleCard
                    key={story.slug}
                    variant="story"
                    title={story.heading || story.title}
                    excerpt={story.subHeading || story.title}
                    href={`/success-stories/${story.slug}`}
                    image={story.thumbnail}
                    date={formatArticleDate(story.publishedDate)}
                    category={SUCCESS_STORY_CATEGORY_LABELS[story.category]}
                  />
                ))}
              </div>
            </div>
          ) : null}

          <div className="flex flex-col gap-6">
            <h2 className="text-h5M font-bold text-primary-blue lg:text-h5">Patient stories</h2>
            {stories.length > 0 ? (
              <div className="card-grid card-grid--3">
                {stories.map((story) => (
                  <ArticleCard
                    key={story.slug}
                    variant="story"
                    title={story.heading || story.title}
                    excerpt={story.subHeading || story.title}
                    href={`/success-stories/${story.slug}`}
                    image={story.thumbnail}
                    date={formatArticleDate(story.publishedDate)}
                    category={SUCCESS_STORY_CATEGORY_LABELS[story.category]}
                  />
                ))}
              </div>
            ) : (
              <p className="text-b16 text-primary-blue/85">No stories match this category.</p>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
