import { RefObject, useEffect, useState } from 'react';

export default function useInViewport(target: RefObject<Element>, options?: IntersectionObserverInit) {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [intersectionRatio, setIntersectionRatio] = useState(0);

  useEffect(() => {
    if (!target.current) {
      return () => {};
    }

    const intersectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        setIsIntersecting(entry.isIntersecting);
        setIntersectionRatio(entry.intersectionRatio);
      });
    }, options);
    intersectionObserver.observe(target.current);
    return () => {
      intersectionObserver.disconnect();
    };
  }, [target.current, options]);

  return [isIntersecting, intersectionRatio] as const;
}
