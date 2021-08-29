import { FC, useEffect } from 'react';

const cls = 'mask';

export interface MaskProps {
  color?: string;
}

const Mask: FC<MaskProps> = ({ color }) => {
  useEffect(() => {
    document.body.style.height = '100%';
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.removeProperty('height');
      document.body.style.removeProperty('overflow');
    };
  }, []);

  return <div className={`${cls}`} style={{ backgroundColor: color }} />;
};

Mask.defaultProps = {
  color: '#00000073'
};

export default Mask;
