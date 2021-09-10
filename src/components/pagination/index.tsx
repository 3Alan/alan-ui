import classNames from 'classnames';
import { FC, useCallback, useMemo } from 'react';
import { RoughWrap } from '../roughWrap';

const cls = 'alan-pagination';

interface PaginationProps {
  /**
   * 总页数
   */
  total: number;
  /**
   * 当前页
   */
  current: number;
  pageSize: number;
  disabled?: boolean;
  onChange: (currentPage: number) => void;
}

export const Pagination: FC<PaginationProps> = (props) => {
  const { disabled = false, current, pageSize, total, onChange } = props;

  // TODO: hover效果后面迁移到RoughWrap组件中

  const totalPage = useMemo(() => Math.ceil(total / pageSize), [total, pageSize]);

  const pagerList = useMemo(() => {
    const numList = Array.from(Array(totalPage + 1).keys()).slice(1);
    return numList;
  }, [current]);

  const activeProps = useCallback(
    (item) => {
      if (!disabled && item === current) {
        return { stroke: '#3B82F6' };
      }
      return { stroke: '#9CA3AF' };
    },
    [current]
  );

  const onPrev = () => {
    if (!disabled && current !== 1) onChange(current - 1);
  };

  const onNext = () => {
    if (!disabled && current !== totalPage) onChange(current + 1);
  };

  const onPagerClick = (item: number) => {
    if (!disabled) onChange(item);
  };

  return (
    <ul className={cls}>
      <RoughWrap
        className={classNames({ [`${cls}-disabled`]: disabled || current === 1 })}
        onClick={onPrev}
        shapProps={disabled || current === 1 ? { stroke: '#E5E7EB' } : { stroke: '#9CA3AF' }}
        customElement="li"
        shap="rectTangle"
      >
        {'<'}
      </RoughWrap>
      {pagerList.map((item) => (
        <RoughWrap
          className={classNames({ [`${cls}-active`]: !disabled && item === current })}
          key={item}
          customElement="li"
          shap="rectTangle"
          shapProps={activeProps(item)}
          onClick={() => onPagerClick(item)}
        >
          {item}
        </RoughWrap>
      ))}
      <RoughWrap
        onClick={onNext}
        className={classNames({ [`${cls}-disabled`]: disabled || current === totalPage })}
        shapProps={disabled || current === totalPage ? { stroke: '#E5E7EB' } : { stroke: '#9CA3AF' }}
        customElement="li"
        shap="rectTangle"
      >
        {'>'}
      </RoughWrap>
    </ul>
  );
};

Pagination.defaultProps = {
  disabled: false
};

export default Pagination;
