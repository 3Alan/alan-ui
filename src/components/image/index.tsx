import { FC, ImgHTMLAttributes, SyntheticEvent } from 'react';
import LazyImage from './LazyImage';
import './index.scss';
import RawImage from './Image';

export interface ImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  lazy?: boolean;
  onError?: (e: SyntheticEvent<HTMLImageElement>) => void;
}

const isSupportRawLazyLoading = !('loading' in HTMLImageElement.prototype);

const Image: FC<ImageProps> = ({ src, alt, width, height, lazy }) => {
  if (lazy && !isSupportRawLazyLoading) {
    return <LazyImage src={src} alt={alt} width={width} height={height} />;
  }

  return <RawImage width={width} height={height} src={src} alt={alt} loading={lazy ? 'lazy' : 'eager'} />;
};

Image.defaultProps = {
  lazy: false
};

export default Image;
