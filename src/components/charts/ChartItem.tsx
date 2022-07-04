import React, {FC} from 'react';
import {chartGroupModeType, IChartItem} from "../../types/charts";
import cl from '../../styles/components/ChartItem.module.scss'

interface ChartItemProps {
  data: IChartItem,
  startFrom: number,
  totalTime: number,
  viewMode: chartGroupModeType,
}

const getItemClasses = (viewMode: chartGroupModeType): string[] => {
  const classes = [cl.item]
  classes.push(viewMode === 'vertical' ? cl.item_vertical : cl.item_horizontal)
  return classes
}

const getBarClasses = (viewMode: chartGroupModeType): string[] => {
  const classes = [cl.bar]
  classes.push(viewMode === 'vertical' ? cl.bar_vertical : cl.bar_horizontal)
  return classes
}

const calcBarLineSize = (viewMode: chartGroupModeType, time: number, startFrom: number, totalTime: number) => {
  if (viewMode === 'horizontal') {
    return  {
      left: (totalTime !== 0 ? startFrom / totalTime * 100 : 0) + '%',
      width: (totalTime !== 0 ? time / totalTime * 100 : 0) + '%'
    }
  }
  if (viewMode === 'vertical') {
    return  {
      bottom: (totalTime !== 0 ? startFrom / totalTime * 100 : 0) + '%',
      height: (totalTime !== 0 ? time / totalTime * 100 : 0) + '%'
    }
  }
}

const ChartItem:FC<ChartItemProps> = ({data, startFrom, totalTime, viewMode}) => {
  return (
    <div className={getItemClasses(viewMode).join(' ')}>
      <div className={cl.item__nameBlock}>
        {data.name}
      </div>
      <div className={cl.item__barBlock}>
        <div className={getBarClasses(viewMode).join(' ')}>
          <div className={cl.bar__inner} style={calcBarLineSize(viewMode, data.time, startFrom, totalTime)}>
            <span className={cl.bar__value}>{data.time}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChartItem;
