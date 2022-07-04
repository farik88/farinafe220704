import React, {FC, useEffect, useState} from 'react';
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
    return chartItem
  })

  return parseFloat(passedTime.toFixed(2))
}

const ChartGroup:FC<ChartGroupProps> = ({data}) => {
  const [viewMode, setViewMode] = useState<chartGroupModeType>('horizontal')
  const [totalTime, setTotalTime] = useState<number>(0)
  const rootNodeRef = React.useRef() as React.MutableRefObject<HTMLInputElement>;
  const innerNodeRef = React.useRef() as React.MutableRefObject<HTMLInputElement>;
  const [viewModeBreakPoint, setViewModeBreakPoint] = useState<null|number>(null)

  useEffect(() => {
    // Calc is need to switch view mode
    const resizeWatcher = setInterval(() => {
      if (viewMode === "horizontal" && innerNodeRef.current.scrollWidth > rootNodeRef.current.scrollWidth) {
        setViewModeBreakPoint(window.innerWidth)
        setViewMode("vertical")
      }

      if (viewMode === "vertical" && viewModeBreakPoint !== null && viewModeBreakPoint < window.innerWidth) {
        setViewMode("horizontal")
      }
    }, 200)

    return () => {
      clearInterval(resizeWatcher)
    }
  })

  useEffect(() => {
    // Calc total time
    let totalTime = 0;
    data.map((chartItem) => totalTime += chartItem.time)
    setTotalTime(parseFloat(totalTime.toFixed(2)))
  }, [data])

  return (
    <div className={cl.group} ref={rootNodeRef}>
      <div className={getInnerClasses(viewMode).join(' ')} ref={innerNodeRef}>
        {data.map((chartItem, index) =>
          <ChartItem key={chartItem.name} data={chartItem} startFrom={getPassedTime(data, index)} totalTime={totalTime} viewMode={viewMode}/>
        )}
      </div>
    </div>
  );
};

export default ChartGroup;
