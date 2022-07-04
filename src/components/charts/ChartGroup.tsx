import React, {FC, useEffect, useMemo, useState} from 'react';
import {chartGroupModeType, IChartItem} from "../../types/charts";
import cl from "../../styles/components/ChartGroup.module.scss"
import ChartItem from "./ChartItem";

interface ChartGroupProps {
  data: IChartItem[]
}

const getInnerClasses = (viewMode: chartGroupModeType): string[] => {
  const classes = [cl.group__inner]
  classes.push(viewMode === 'vertical' ? cl.group__inner_vertical : cl.group__inner_horizontal)
  return classes
}

const getPassedTime = (chartItems: IChartItem[], currentIndex: number) => {
  let passedTime = 0

  chartItems.map((chartItem, index) => {
    if (index < currentIndex) {
      passedTime += chartItem.time
    }
  })

  return parseFloat(passedTime.toFixed(2))
}

const ChartGroup:FC<ChartGroupProps> = ({data}) => {
  const [viewMode, setViewMode] = useState<chartGroupModeType>('horizontal')
  const [totalTime, setTotalTime] = useState<number>(0)

  useEffect(() => {
    // Calc total time
    let totalTime = 0;
    data.map((chartItem) => totalTime += chartItem.time)
    setTotalTime(parseFloat(totalTime.toFixed(2)))
  }, [data])

  return (
    <div className={cl.group}>
      <div className={getInnerClasses(viewMode).join(' ')}>
        {data.map((chartItem, index) =>
          <ChartItem key={chartItem.name} data={chartItem} startFrom={getPassedTime(data, index)} totalTime={totalTime} viewMode={viewMode}/>
        )}
      </div>
    </div>
  );
};

export default ChartGroup;
