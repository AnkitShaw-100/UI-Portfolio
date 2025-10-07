import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import { motion } from "framer-motion";
import { OptimizedImage } from "./OptimizedImage";
import useIntersectionObserver from "@/hooks/use-intersection-observer";

interface Poster {
  id: number;
  title: string;
  description: string;
  image: string;
}

const Posters = () => {
  // Optimized carousel settings for better performance
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
    skipSnaps: false,
    // Disable dragFree so Embla snaps smoothly between slides
    dragFree: false,
    containScroll: "keepSnaps",
    startIndex: 1,
  });

  const [activeIndex, setActiveIndex] = useState(1);
  const [isVisible, postersRef] = useIntersectionObserver<HTMLDivElement>({ threshold: 0.1 });

  // Handle active index and optimize loop behavior
  useEffect(() => {
    if (!emblaApi) return;
    
    // Set initial active index
    setActiveIndex(emblaApi.selectedScrollSnap());
    
    // Update active index when selection changes
    const onSelect = () => {
      setActiveIndex(emblaApi.selectedScrollSnap());
    };
    
    // Set up event listeners
    emblaApi.on("select", onSelect);
    
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  const posters: Poster[] = [
    {
      id: 1,
      title: "CSED Website Launch",
      description: "Design and innovation come together in this launch poster.",
      image: "/images/Landing1.png",
    },
    {
      id: 2,
      title: "Sustainalbe Evet Poster",
      description: "Approaching problems with fun and creativity leads to unique and enjoyable solutions.",
      image: "/images/Landing2.png",
    },
    {
      id: 3,
      title: "Portfolio Launch Poster",
      description: "A clean and catchy design for portfolio launch poster",
      image: "/images/Landing3.png",
    },
    {
      id: 4,
      title: "Sustainalbe Evet Poster",
      description: "Approaching problems with fun and creativity leads to unique and enjoyable solutions.",
      image: "/images/Landing4.png",
    },
        {
      id: 5,
      title: "Sustainalbe Evet Poster",
      description: "Approaching problems with fun and creativity leads to unique and enjoyable solutions.",
      image: "/images/Landing5.png",
    },
        {
      id: 6,
      title: "Sustainalbe Evet Poster",
      description: "Approaching problems with fun and creativity leads to unique and enjoyable solutions.",
      image: "/images/Landing6.png",
    },
        {
      id: 7,
      title: "Sustainalbe Evet Poster",
      description: "Approaching problems with fun and creativity leads to unique and enjoyable solutions.",
      image: "/images/Landing7.png",
    },
        {
      id: 8,
      title: "Sustainalbe Evet Poster",
      description: "Approaching problems with fun and creativity leads to unique and enjoyable solutions.",
      image: "/images/Landing8.png",
    }
  ];

  // Auto-scroll with pause on interaction and smooth transitions
  useEffect(() => {
    if (!emblaApi || !isVisible) return;

    let intervalId: number | null = null;

    const startAuto = () => {
      if (intervalId) return;
      intervalId = window.setInterval(() => {
        if (!emblaApi) return;
        if (!emblaApi.canScrollNext()) {
          emblaApi.scrollTo(0);
        } else {
          emblaApi.scrollNext();
        }
      }, 2500);
    };

    const stopAuto = () => {
      if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
      }
    };

    startAuto();

    emblaApi.on("pointerDown", stopAuto);
    emblaApi.on("pointerUp", startAuto);

    // Use emblaApi.rootNode() to attach mouseenter/mouseleave
    const rootNode = emblaApi.rootNode ? emblaApi.rootNode() : null;
    if (rootNode) {
      rootNode.addEventListener("mouseenter", stopAuto);
      rootNode.addEventListener("mouseleave", startAuto);
    }

    return () => {
      stopAuto();
      emblaApi.off("pointerDown", stopAuto);
      emblaApi.off("pointerUp", startAuto);
      if (rootNode) {
        rootNode.removeEventListener("mouseenter", stopAuto);
        rootNode.removeEventListener("mouseleave", startAuto);
      }
    };
  }, [emblaApi, isVisible]);
  
  return (
    <section ref={postersRef} className="relative bg-gradient-to-b from-white to-gray-50/50 py-8 md:py-16 overflow-hidden">
      {/* Blur effects - extended to cover poster area fully */}
      <div className="absolute left-0 top-1/4 bottom-0 w-[50px] md:w-[80px] bg-gradient-to-r from-white via-white/90 to-transparent z-10" />
      <div className="absolute right-0 top-1/4 bottom-0 w-[50px] md:w-[80px] bg-gradient-to-l from-white via-white/90 to-transparent z-10" />

      <div className="container mx-auto px-3 md:px-4 max-w-7xl">
        <div className="text-center max-w-3xl mx-auto mb-8 md:mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4">Graphic Design Skills</h2>
          <div className="w-16 md:w-20 h-1 bg-accent mx-auto mb-4 md:mb-6"></div>
          <p className="text-sm md:text-base text-gray-600">
            Showcasing visual storytelling through diverse design projects that
            combine aesthetics with strategic communication.
          </p>
        </div>

        <div className="relative">
          <div className="embla overflow-hidden" ref={emblaRef}>
            <div className="embla__container flex gap-4 md:gap-8 px-2 md:px-4">
              {posters.map((poster, index) => {
                const distance = Math.abs(activeIndex - index);
                // allow wrap-around for carousel
                const wrapDistance = Math.min(distance, posters.length - distance);
                const shouldLoad = isVisible && wrapDistance <= 1;

                return (
                <motion.div
                  key={index}
                  className={`embla__slide flex-[0_0_100%] sm:flex-[0_0_100%] md:flex-[0_0_76%] lg:flex-[0_0_65%] px-1 md:px-2`}
                  initial={{ scale: 0.9, opacity: 0.5 }}
                  animate={{
                    scale: activeIndex === index ? 1 : 0.9,
                    opacity: activeIndex === index ? 1 : 0.5,
                  }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="group relative aspect-[4/3] md:aspect-[4/3] lg:aspect-[3/2] rounded-lg md:rounded-xl overflow-hidden bg-gray-50 shadow-md hover:shadow-lg transition-all duration-500 mx-0.5 md:mx-1">
                    <div className="w-full h-full flex items-center justify-center">
                      <OptimizedImage
                        src={poster.image}
                        alt={poster.title}
                        shouldLoad={shouldLoad}
                        className="max-w-full max-h-full object-contain object-center transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4">
                        <h4 className="font-semibold text-white text-base md:text-lg mb-1 md:mb-2">
                          {poster.title}
                        </h4>
                        <p className="text-white/80 text-xs md:text-sm">{poster.description}</p>
                      </div>
                    </div>
                  </div>
                 </motion.div>
                );
              })}
            </div>
          </div>

          {/* Navigation buttons - Responsive sizing */}
          <button
            onClick={() => emblaApi?.scrollPrev()}
            className="absolute left-1 sm:left-2 md:left-4 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-black/80 shadow-lg flex items-center justify-center z-20 hover:bg-black transition-colors duration-300 backdrop-blur-sm"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" />
          </button>
          <button
            onClick={() => emblaApi?.scrollNext()}
            className="absolute right-1 sm:right-2 md:right-4 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-black/80 shadow-lg flex items-center justify-center z-20 hover:bg-black transition-colors duration-300 backdrop-blur-sm"
            aria-label="Next slide"
          >
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Posters;
