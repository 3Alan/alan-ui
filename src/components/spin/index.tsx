import { FC } from 'react';
import Mask from '../mask';
import ReactRough, { Path } from '../rough';

const cls = 'spin';

interface SpinProps {
  /**
   * 控制显示
   */
  spinning: boolean;
  /**
   * 是否显示Loading...
   */
  showText?: boolean;
}

export const Spin: FC<SpinProps> = ({ spinning, showText }) => {
  return (
    <>
      {spinning ? (
        <div className={cls}>
          <Mask color="#fff" />
          <div className={`${cls}-content`}>
            <ReactRough width={60} height={60} renderer="svg">
              <Path
                fill="#fff3c0"
                stroke="#ffe266"
                fillStyle="solid"
                roughness={0.3}
                d="M 11.43 49.8 l 15.03 -15.03 c 1.53 -1.53 1.53 -3.99 0 -5.52 L 20.19 22.95 L 14.37 28.77 C 9.93 33.21 10.17 42.12 11.43 49.8 z"
              />
              <Path
                fill="#a4ffd8"
                stroke="#5fe09f"
                fillStyle="solid"
                roughness={0.3}
                d="M 12.69 12.66 l 15.03 15.03 c 1.53 1.53 3.99 1.53 5.52 0 l 6.27 -6.27 L 33.69 15.6 C 29.25 11.16 20.37 11.4 12.69 12.66 z"
              />
              <Path
                fill="#fdd0e4"
                stroke="#ff8fca"
                fillStyle="solid"
                roughness={0.3}
                d="M 49.8 13.92 l -15.03 15.03 c -1.53 1.53 -1.53 3.99 0 5.52 l 6.27 6.27 l 5.82 -5.82 C 51.33 30.48 51.09 21.6 49.8 13.92 z"
              />
              <Path
                fill="#83d3ff"
                stroke="#31caff"
                fillStyle="solid"
                roughness={0.3}
                d="M 48.57 51.03 L 33.51 36 c -1.53 -1.53 -3.99 -1.53 -5.52 0 l -6.27 6.27 l 5.82 5.82 C 32.01 52.53 40.89 52.29 48.57 51.03 z"
              />
            </ReactRough>
            {showText && <span className="loading">Loading</span>}
          </div>
        </div>
      ) : null}
    </>
  );
};

Spin.defaultProps = {
  showText: true
};

export default Spin;
