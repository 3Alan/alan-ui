import { useDeepCompareEffect } from 'ahooks';
import { useState } from 'react';

export default function useStateFromProp<T>(initialValue: T) {
  const [value, setValue] = useState<T>(initialValue);

  useDeepCompareEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return [value, setValue] as const;
}
