'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import useEmblaCarousel from 'embla-carousel-react'
import bannerOne from '@/assets/banner1.jpg'
import bannerTwo from '@/assets/banner2.jpg'
import bannerThree from '@/assets/banner3.jpg'

import { Button } from "@/components/ui/button";

const Banner = () => {
  const images = [
    bannerOne,bannerTwo,bannerThree
  ]
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true })
  const [currentIndex, setCurrentIndex] = useState(0)

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setCurrentIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    onSelect()
    emblaApi.on('select', onSelect)
    
 
    const autoplay = setInterval(() => {
      if (emblaApi.canScrollNext()) {
        emblaApi.scrollNext()
      } else {
        emblaApi.scrollTo(0)
      }
    }, 4000) 

    return () => {
      emblaApi.off('select', onSelect)
      clearInterval(autoplay)
    }
  }, [emblaApi, onSelect])
  return (
    <div className="relative h-[90vh] w-full overflow-hidden">
      <div className="absolute inset-0" ref={emblaRef}>
        <div className="flex h-full">
          {images.map((src, index) => (
            <div className="relative h-full min-w-full" key={index}>
              <Image
                src={src}
                alt={`Slide ${index + 1}`}
                layout="fill"
                objectFit="cover"
                priority={index === 0}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="absolute inset-0 bg-black bg-opacity-50" />
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center text-white">
        <h1 className="mb-4 text-3xl font-bold leading-tight md:text-5xl lg:text-6xl">
          Effortless Sweets Recipes to Satisfy Your Cravings!
        </h1>
        <p className="mb-6 max-w-2xl text-base md:text-lg lg:text-xl">
          Satisfy your sweet tooth with simple, delicious recipes that anyone can make in minutes. Perfect for beginners and experts alike!
        </p>
        <Button size="lg" className="bg-[#2563eb] text-white hover:bg-[#2563eb]/90 "
        style={{borderRadius:"10px"}}
        >
          Get Start
        </Button>
      </div>
      <div className="absolute bottom-4 left-0 right-0 z-20 flex justify-center space-x-2">
        {images.map((_, index) => (
          <div
            key={index}
            className={`h-2 w-2 rounded-full ${
              index === currentIndex ? 'bg-white' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Banner;
