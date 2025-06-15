import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface MobileCarouselProps {
  sections: Array<{
    title: string;
    subtitle: string;
    feature: string;
    color: string;
    image: string;
  }>;
  currentSection: number;
  setCurrentSection: (index: number) => void;
}

export const MobileCarousel = ({ sections, currentSection, setCurrentSection }: MobileCarouselProps) => {
  console.log('MobileCarousel component rendering with sections:', sections);
  console.log('Current section:', currentSection);
  
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe && currentSection < sections.length - 1) {
      setCurrentSection(currentSection + 1);
    }
    if (isRightSwipe && currentSection > 0) {
      setCurrentSection(currentSection - 1);
    }
  };

  const nextSection = () => {
    if (currentSection < sections.length - 1) {
      setCurrentSection(currentSection + 1);
    }
  };

  const prevSection = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
    }
  };

  if (!sections || sections.length === 0) {
    console.log('No sections provided to MobileCarousel');
    return <div className="h-screen bg-red-500 flex items-center justify-center text-white">No sections data</div>;
  }

  const currentSectionData = sections[currentSection];
  if (!currentSectionData) {
    console.log('Current section data not found:', currentSection);
    return <div className="h-screen bg-yellow-500 flex items-center justify-center text-black">Section data not found</div>;
  }

  console.log('Rendering section:', currentSectionData);

  return (
    <div className="relative h-screen w-full overflow-hidden bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 flex flex-col">
      {/* Test visibility with bright background - REMOVE FOR PRODUCTION */}
      {/* <div className="absolute inset-0 bg-blue-500 opacity-20" /> */}
      
      {/* Animated background pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(15,23,42,0.8)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.8)_1px,transparent_1px)] bg-[size:80px_80px] sm:bg-[size:100px_100px] animate-pulse" />
      
      {/* Gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 via-transparent to-slate-950/50" />

      {/* Main Content Area - Takes up available space and centers content */}
      <div 
        className="relative flex-grow flex items-center justify-center p-3 sm:p-4 z-10 w-full"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <div className="w-full max-w-xs sm:max-w-sm">
          <div className="bg-slate-900/95 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 border border-slate-700/50 text-center shadow-2xl">
            {/* Screenshot Display */}
            <div className="mb-4 sm:mb-6 flex justify-center">
              {/* Responsive Phone Mockup */}
              <div className="relative w-[calc(100vw*0.4)] max-w-[10rem] sm:w-48 h-[calc(100vw*0.4*(19.5/9))] max-h-[20rem] sm:h-[24rem] bg-slate-800 rounded-xl sm:rounded-3xl border-2 sm:border-4 border-slate-700 p-1 sm:p-2 shadow-inner">
                <img
                  src={currentSectionData.image}
                  alt={currentSectionData.title}
                  className="w-full h-full object-cover rounded-md sm:rounded-2xl"
                  // Add loading="lazy" for potential performance improvement
                  loading="lazy"
                />
              </div>
            </div>

            <h2 className="text-lg sm:text-xl md:text-2xl font-black mb-2 sm:mb-3 md:mb-4 text-white leading-tight">
              {currentSectionData.title}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mb-3 sm:mb-4 md:mb-6 leading-relaxed">
              {currentSectionData.subtitle}
            </p>
            
            <div className="inline-block bg-gradient-to-r from-emerald-500/20 to-emerald-400/20 rounded-lg sm:rounded-xl px-3 py-2 sm:px-4 sm:py-3 md:px-6 backdrop-blur-sm border border-emerald-500/30">
              <span className="text-emerald-400 font-semibold text-[0.6rem] sm:text-xs md:text-sm">
                {currentSectionData.feature}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation and Indicators Area - Fixed height at the bottom */}
      <div className="relative z-20 py-4 sm:py-6 px-2 sm:px-4"> {/* Added horizontal padding */}
        {/* Navigation Buttons */}
        <Button
          variant="outline"
          size="icon"
          className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 transform bg-slate-900/80 hover:bg-slate-800/90 border-slate-700 backdrop-blur-sm text-white w-8 h-8 sm:w-10 sm:h-10"
          onClick={prevSection}
          disabled={currentSection === 0}
        >
          <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
        </Button>

        <Button
          variant="outline"
          size="icon"
          className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 transform bg-slate-900/80 hover:bg-slate-800/90 border-slate-700 backdrop-blur-sm text-white w-8 h-8 sm:w-10 sm:h-10"
          onClick={nextSection}
          disabled={currentSection === sections.length - 1}
        >
          <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
        </Button>

        {/* Progress Dots and Swipe Indicator Container */}
        <div className="flex flex-col items-center space-y-2 sm:space-y-3">
          {/* Progress Dots */}
          <div className="flex justify-center space-x-2 sm:space-x-3">
            {sections.map((_, i) => (
              <button
                key={i}
                className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                  i === currentSection 
                    ? 'bg-emerald-400 scale-125' 
                    : 'bg-slate-500 hover:bg-slate-400'
                }`}
                onClick={() => setCurrentSection(i)}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>

          {/* Swipe Indicator Text - Smaller and less prominent */}
          <div className="text-center text-slate-500 text-xs sm:text-sm">
            <span>Desliza o toca para navegar</span>
          </div>
        </div>
      </div>
    </div>
  );
};
