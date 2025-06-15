
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
    <div className="relative h-screen w-full overflow-hidden bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900">
      {/* Test visibility with bright background */}
      <div className="absolute inset-0 bg-blue-500 opacity-20" />
      
      {/* Animated background pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(15,23,42,0.8)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.8)_1px,transparent_1px)] bg-[size:100px_100px] animate-pulse" />
      
      {/* Gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 via-transparent to-slate-950/50" />

      {/* Main Content */}
      <div 
        className="relative h-full flex items-center justify-center p-4 z-10"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <div className="w-full max-w-sm">
          <div className="bg-slate-900/95 backdrop-blur-xl rounded-3xl p-8 border border-slate-700/50 text-center shadow-2xl">
            {/* Screenshot Display */}
            <div className="mb-6 flex justify-center">
              <div className="relative w-48 h-[24rem] bg-slate-800 rounded-3xl border-4 border-slate-700 p-2 shadow-inner">
                <img
                  src={currentSectionData.image}
                  alt={currentSectionData.title}
                  className="w-full h-full object-cover rounded-2xl"
                />
              </div>
            </div>

            <h2 className="text-2xl font-black mb-4 text-white leading-tight">
              {currentSectionData.title}
            </h2>
            <p className="text-sm text-slate-200 mb-6 leading-relaxed">
              {currentSectionData.subtitle}
            </p>
            
            <div className="inline-block bg-gradient-to-r from-emerald-500/20 to-emerald-400/20 rounded-xl px-6 py-3 backdrop-blur-sm border border-emerald-500/30">
              <span className="text-emerald-400 font-semibold text-sm">
                {currentSectionData.feature}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <Button
        variant="outline"
        size="icon"
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-slate-900/90 border-slate-600 hover:bg-slate-800 backdrop-blur-sm"
        onClick={prevSection}
        disabled={currentSection === 0}
      >
        <ChevronLeft className="h-4 w-4 text-white" />
      </Button>

      <Button
        variant="outline"
        size="icon"
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-slate-900/90 border-slate-600 hover:bg-slate-800 backdrop-blur-sm"
        onClick={nextSection}
        disabled={currentSection === sections.length - 1}
      >
        <ChevronRight className="h-4 w-4 text-white" />
      </Button>

      {/* Progress Dots */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-30">
        {sections.map((_, i) => (
          <button
            key={i}
            className={`w-3 h-3 rounded-full transition-all duration-500 ${
              i === currentSection 
                ? 'bg-emerald-400 scale-125' 
                : 'bg-slate-500'
            }`}
            onClick={() => setCurrentSection(i)}
          />
        ))}
      </div>

      {/* Swipe Indicator */}
      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 text-white/60 text-sm z-30 text-center">
        <span>Desliza o toca las flechas para navegar</span>
      </div>
    </div>
  );
};
