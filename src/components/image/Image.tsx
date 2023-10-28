import { forwardRef, SyntheticEvent, useState } from 'react';
import cn from 'classnames';
import { ImageProps } from '.';

type RawImageProps = Omit<ImageProps, 'lazy'>;

const cls = 'alan-img';

const RawImage = forwardRef<HTMLImageElement, RawImageProps>(({ alt, width, height, onError, ...restProps }, ref) => {
  const [loaded, setLoaded] = useState(false);

  const handleLoad = () => {
    setLoaded(true);
  };

  const handleError = (e: SyntheticEvent<HTMLImageElement>) => {
    onError?.(e);
  };

  return (
    <img
      ref={ref}
      className={cn({ [`${cls}-loading`]: !loaded })}
      onLoad={handleLoad}
      onError={handleError}
      width={width}
      height={height}
      alt={alt}
      {...restProps}
    />
  );
});

export default RawImage;
