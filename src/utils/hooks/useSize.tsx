import { MutableRefObject, useEffect, useState } from 'react';

export function useSize(target: MutableRefObject<HTMLElement | null | undefined>) {
  const [state, setState] = useState({ width: 1, height: 1 });

  useEffect(() => {
    if (target && target.current) {
      setState({
        width: target.current.offsetWidth,
        height: target.current.offsetHeight
      });
    }
  }, [target]);

  return state;
}
