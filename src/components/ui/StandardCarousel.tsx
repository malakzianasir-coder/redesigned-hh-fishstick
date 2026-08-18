'use client'

import React, { useRef, useState, useEffect } from 'react'
import { CaretLeft, CaretRight } from '@phosphor-icons/react'
import { cn } from '@/utilities/ui'

type StandardCarouselProps = {
  children: React.ReactNode
  className?: string
  itemWidthClass?: string
  ariaLabel?: string
}

export function StandardCarousel({ 
  children, 
  className, 
  itemWidthClass = 'w-[85vw] sm:w-[320px] md:w-[350px]', 
  ariaLabel 
}: StandardCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
      setCanScrollLeft(scrollLeft > 0)
      setCanScrollRight(Math.ceil(scrollLeft + clientWidth) < scrollWidth)
    }
  }

  useEffect(() => {
    checkScroll()
    window.addEventListener('resize', checkScroll)
    return () => window.removeEventListener('resize', checkScroll)
  }, [])

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const firstItem = scrollRef.current.firstElementChild as HTMLElement
      const itemWidth = firstItem ? firstItem.offsetWidth : 300
      const gap = 24 // 1.5rem (gap-6)
      const scrollAmount = itemWidth + gap
      
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      })
    }
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return
    setIsDragging(true)
    setStartX(e.pageX - scrollRef.current.offsetLeft)
    setScrollLeft(scrollRef.current.scrollLeft)
  }

  const handleMouseLeave = () => {
    setIsDragging(false)
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return
    e.preventDefault()
    const x = e.pageX - scrollRef.current.offsetLeft
    const walk = (x - startX) * 2 // Scroll-fast multiplier
    scrollRef.current.scrollLeft = scrollLeft - walk
  }

  return (
    <div className={cn("relative", className)} aria-label={ariaLabel}>
      {/* Scrollable Container */}
      <div 
        ref={scrollRef}
        className={cn(
          "flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-8 pt-4 px-[7.5vw] lg:px-[30px] -mx-6 lg:-mx-[30px]",
          isDragging ? "cursor-grabbing snap-none scroll-auto" : "cursor-grab"
        )}
        onScroll={checkScroll}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
      >
        {React.Children.map(children, (child, index) => (
          <div key={index} className={cn("snap-center lg:snap-start shrink-0", itemWidthClass)}>
            {child}
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between pointer-events-none px-2 sm:px-4">
        <button
          type="button"
          onClick={() => scroll('left')}
          disabled={!canScrollLeft}
          className="pointer-events-auto h-10 w-10 sm:h-12 sm:w-12 flex items-center justify-center rounded-full bg-white shadow-e2 text-primary-blue transition-all disabled:opacity-0 disabled:scale-95 hover:bg-primary-red hover:text-white"
          aria-label="Previous slide"
        >
          <CaretLeft size={20} weight="bold" className="sm:hidden" />
          <CaretLeft size={24} weight="bold" className="hidden sm:block" />
        </button>
        <button
          type="button"
          onClick={() => scroll('right')}
          disabled={!canScrollRight}
          className="pointer-events-auto h-10 w-10 sm:h-12 sm:w-12 flex items-center justify-center rounded-full bg-white shadow-e2 text-primary-blue transition-all disabled:opacity-0 disabled:scale-95 hover:bg-primary-red hover:text-white"
          aria-label="Next slide"
        >
          <CaretRight size={20} weight="bold" className="sm:hidden" />
          <CaretRight size={24} weight="bold" className="hidden sm:block" />
        </button>
      </div>
      
      {/* Mobile Navigation Indicators / Buttons could be added here if needed, but native scroll is intuitive */}
    </div>
  )
}
