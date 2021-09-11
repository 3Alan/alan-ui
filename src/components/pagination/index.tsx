import classNames from 'classnames';
import { FC, memo, useCallback, useMemo } from 'react';
import { generateRange, uniqueArray } from '../../utils';
import { RoughWrap } from '../roughWrap';

const cls = 'alan-pagination';

export interface PaginationProps {
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

/**
 * 分页组件
 *
 * 超过6页才会显示快速跳页按钮
 */
export const Pagination: FC<PaginationProps> = (props) => {
  const { disabled = false, current, pageSize, total, onChange } = props;

  // TODO: hover效果后面迁移到RoughWrap组件中

  const totalPage = useMemo(() => Math.ceil(total / pageSize), [total, pageSize]);

  const showJumpPre = useMemo(() => totalPage > 6 && current > 5, [current]);
  const showJumpNext = useMemo(() => totalPage > 6 && (current < totalPage - 3 || current < 6), [current, totalPage]);

  const pagerList = useMemo(() => {
    let numList;

    if (showJumpPre) {
      if (showJumpNext) {
        numList = [1, '<<', current - 1, current, current + 1, '>>', totalPage];
      } else {
        let arr;
        if (totalPage - current < 5) {
          arr = [...generateRange(totalPage - 4, current), ...generateRange(current, totalPage)];
        } else {
          arr = generateRange(current, totalPage);
        }
        numList = [1, '<<', ...uniqueArray(arr)];
      }
    } else if (showJumpNext) {
      const arr = generateRange(1, 5);
      numList = [...arr, '>>', totalPage];
    } else {
      numList = generateRange(1, totalPage);
    }

    return numList;
  }, [current]);

  const activeProps = useCallback(
    (item) => {
      if (item === '<<' || item === '>>') {
        return { stroke: '' };
      }

      if (disabled) {
        if (item === current) {
          return { stroke: '#6B7280', fillStyle: 'hachure', fill: '#9CA3AF' };
        }
        return { stroke: '#9CA3AF', fillStyle: 'hachure', fill: '#D1D5DB' };
      }

      if (item === current) {
        return { stroke: '#3B82F6' };
      }
      return { stroke: '#9CA3AF' };
    },
    [current]
  );

  const buttonProps = useCallback(
    (condition) => {
      if (disabled) {
        return { stroke: '#9CA3AF', fillStyle: 'hachure', fill: '#D1D5DB' };
      }
      if (condition) {
        return { stroke: '#E5E7EB' };
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

  const onPagerClick = (item: number | string) => {
    let onChangePageSize;
    if (item === '<<') {
      onChangePageSize = current - 5 > 0 ? current - 5 : 1;
    } else if (item === '>>') {
      onChangePageSize = current + 5 > totalPage ? totalPage : current + 5;
    } else {
      onChangePageSize = item;
    }
    if (!disabled) onChange(onChangePageSize as number);
  };

  return (
    <ul className={cls}>
      <RoughWrap
        className={classNames({ [`${cls}-disabled`]: disabled || current === 1 })}
        onClick={onPrev}
        shapProps={{ ...buttonProps(current === 1), roughness: 0.5 }}
        customElement="li"
        shap="rectTangle"
      >
        {'<'}
      </RoughWrap>

      {pagerList.map((item) => (
        <RoughWrap
          className={classNames({
            [`${cls}-active`]: !disabled && item === current,
            [`${cls}-disabled`]: disabled,
            [`${cls}-active-disabled`]: disabled && item === current,
            [`${cls}-jump`]: item === '<<' || item === '>>'
          })}
          key={item}
          customElement="li"
          shap="rectTangle"
          shapProps={{ ...activeProps(item), roughness: 0.5 }}
          onClick={() => onPagerClick(item)}
        >
          {item}
        </RoughWrap>
      ))}

      <RoughWrap
        onClick={onNext}
        className={classNames({ [`${cls}-disabled`]: disabled || current === totalPage })}
        shapProps={{ ...buttonProps(current === totalPage), roughness: 0.5 }}
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

export default memo(Pagination);
