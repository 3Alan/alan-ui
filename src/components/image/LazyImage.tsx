import { FC, useEffect, useRef } from 'react';
import { ImageProps } from '.';
import { isBlank } from '../../utils';
import useInViewport from '../../utils/hooks/useInViewPort';
import RawImage from './Image';

type LazyImageProps = Omit<ImageProps, 'lazy'>;

const LazyImage: FC<LazyImageProps> = ({ src, alt, width, height, onError }) => {
  const imgRef = useRef<HTMLImageElement>(null);
  const [isIntersecting] = useInViewport(imgRef);

  useEffect(() => {
    if (isIntersecting) {
      const dataSrc = imgRef.current?.getAttribute('data-src');
      const src = imgRef.current?.src;
      if (isBlank(src)) {
        imgRef.current?.setAttribute('src', dataSrc as string);
        imgRef.current?.removeAttribute('data-src');
      }
    }
  }, [isIntersecting]);

  return <RawImage onError={onError} ref={imgRef} width={width} height={height} data-src={src} alt={alt} />;
};

export default LazyImage;
