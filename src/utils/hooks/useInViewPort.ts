import { RefObject, useEffect, useState, useRef } from 'react';

export default function useInViewport(target: RefObject<Element>, options?: IntersectionObserverInit) {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [intersectionRatio, setIntersectionRatio] = useState(0);
  const io = useRef<IntersectionObserver>();

  useEffect(() => {
    if (!target.current) {
      return () => {};
    }

    io.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        setIsIntersecting(entry.isIntersecting);
        setIntersectionRatio(entry.intersectionRatio);
      });
    }, options);
    io.current.observe(target.current);
    return () => {
      io.current?.disconnect();
    };
  }, [target.current, options]);

  const disconnect = () => {
    io.current?.disconnect();
  };

  return [isIntersecting, intersectionRatio, disconnect] as const;
}
