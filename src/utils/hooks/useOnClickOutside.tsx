import { MutableRefObject, useEffect } from 'react';

type EventType = MouseEvent | TouchEvent;

export default function useOnClickOutside(
  ref: MutableRefObject<HTMLElement | null | undefined>,
  handler: (event: EventType) => void
) {
  useEffect(() => {
    const listener = (event: any) => {
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }

      handler(event);
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
}
