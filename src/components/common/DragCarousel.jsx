import React, { useRef, useState } from 'react';

const DragCarousel = ({ items, renderItem, itemClassName = "" }) => {
  const carouselRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - carouselRef.current.offsetLeft);
    setScrollLeft(carouselRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX) * 2; // scroll speed multiplier
    carouselRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleScroll = () => {
    if (!carouselRef.current) return;
    const container = carouselRef.current;
    const centerPosition = container.scrollLeft + container.clientWidth / 2;
    
    let closestIndex = 0;
    let minDistance = Infinity;

    Array.from(container.children).forEach((child, index) => {
      // Get child center relative to container's content area
      const childCenter = child.offsetLeft + child.clientWidth / 2;
      const distance = Math.abs(childCenter - centerPosition);
      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = index;
      }
    });

    if (closestIndex !== activeIndex) {
      setActiveIndex(closestIndex);
    }
  };

  return (
    <div 
      ref={carouselRef}
      onMouseDown={handleMouseDown}
      onMouseLeave={handleMouseLeave}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      onScroll={handleScroll}
      className={`flex overflow-x-auto gap-4 md:gap-8 pb-10 px-1/2 relative [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] ${isDragging ? "cursor-grabbing" : "cursor-grab snap-x snap-mandatory"}`}
      style={{ paddingLeft: 'calc(50% - 170px)', paddingRight: 'calc(50% - 170px)' }}
    >
      {items.map((item, index) => {
        const isActive = index === activeIndex;
        return (
          <div key={index} className={`shrink-0 snap-center ${itemClassName}`}>
             {renderItem(item, isActive)}
          </div>
        );
      })}
    </div>
  );
};

export default DragCarousel;
