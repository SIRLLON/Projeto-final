import React, { useRef } from "react";

export default function MobileGestures({ onSwipeLeft, onSwipeRight, children }) {
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const minSwipeDistance = 50;

  const onTouchStart = (e) => {
    touchStartX.current = e.changedTouches[0].screenX;
  };

  const onTouchEnd = (e) => {
    touchEndX.current = e.changedTouches[0].screenX;
    const dx = touchEndX.current - touchStartX.current;

    if (Math.abs(dx) > minSwipeDistance) {
      if (dx > 0 && onSwipeRight) onSwipeRight();
      if (dx < 0 && onSwipeLeft) onSwipeLeft();
    }
  };

  return (
    <div
      style={{ width: '100%', height: '100%' }}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {children}
    </div>
  );
}
