"use client"

import React from "react"
import useEmblaCarousel from "embla-carousel-react"

type CarouselProps = {
  children: React.ReactNode
}

function Carousel({ children }: CarouselProps) {
    const [emblaRef, emblaApi] = useEmblaCarousel()
    const [selectedIndex, setSelectedIndex] = React.useState(0)
    const [scrollSnaps, setScrollSnaps] = React.useState<number[]>([])
    const intervalRef = React.useRef<NodeJS.Timeout | null>(null)

    React.useEffect(() => {
      if (!emblaApi) return

      setScrollSnaps(emblaApi.scrollSnapList())

      const onSelect = () => {
        setSelectedIndex(emblaApi.selectedScrollSnap())
      }

      emblaApi.on("select", onSelect)
      onSelect()
    }, [emblaApi])

    const startAutoplay = React.useCallback(() => {
      if (!emblaApi) return
      if (intervalRef.current) clearInterval(intervalRef.current)

      intervalRef.current = setInterval(() => {
        if (!emblaApi) return

        if (emblaApi.canScrollNext()) {
          emblaApi.scrollNext()
        } else {
          emblaApi.scrollTo(0)
        }
      }, 4000)
    }, [emblaApi])

    React.useEffect(() => {
      startAutoplay()
      return () => {
        if (intervalRef.current) clearInterval(intervalRef.current)
      }
    }, [startAutoplay])

    const scrollTo = (index: number) => {
      if (!emblaApi) return
      emblaApi.scrollTo(index)
      startAutoplay()
    }

    return (
      <div className="relative w-full">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">{children}</div>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-4">
          {scrollSnaps.map((_, index) => {
            const isActive = selectedIndex === index
            return (
              <button
                key={index}
                onClick={() => scrollTo(index)}
                className={`transition-all rounded-full nt-sm:h-5 mb-lg:h-4 h-3 ${
                  isActive
                    ? "nt-sm:w-12 mb-lg:w-8 w-5 bg-green"
                    : "nt-sm:w-5  mb-lg:w-4 w-3 bg-[#6C6A6A] hover:bg-dark-grey cursor-pointer"
                }`}
              />
            )
          })}
        </div>
      </div>
    )
}

function CarouselContent({ children }: { children: React.ReactNode }) {
  return (
    <>
      {React.Children.map(children, (child) => (
        <div className="min-w-full">{child}</div>
      ))}
    </>
  )
}

function CarouselItem({
  children,
  className = "",
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={`min-w-0 shrink-0 grow-0 basis-full ${className}`}
      role="group"
      aria-roledescription="slide"
    >
      {children}
    </div>
  )
}

export { Carousel, CarouselContent, CarouselItem }