import React, {FC, useEffect, useState} from 'react';
import cl from "../../styles/components/ChartRandomizerButton.module.scss"
import {IChartItem} from "../../types/charts";

interface ChartRandomizerButtonProps {
  autogenTimeout: number,
  callback: React.Dispatch<React.SetStateAction<IChartItem[]>>
}

const ChartRandomizerButton:FC<ChartRandomizerButtonProps> = ({autogenTimeout, callback}) => {
  const [genSecondsLeft, setGenSecondsLeft] = useState<number>(autogenTimeout)

  const generateHandler = () => {
    callback([
      { name: "Landing Page", time: parseInt((Math.random() * (50 - 1) + 1).toFixed(1)) + parseFloat((Math.random() * (0.99 - 0.01) + 0.01).toFixed(1)) },
      { name: "Configurator", time: parseInt((Math.random() * (50 - 1) + 1).toFixed(1)) + parseFloat((Math.random() * (0.99 - 0.01) + 0.01).toFixed(1)) },
      { name: "Check-out", time: parseInt((Math.random() * (50 - 1) + 1).toFixed(1)) + parseFloat((Math.random() * (0.99 - 0.01) + 0.01).toFixed(1)) },
      { name: "Deal", time: parseInt((Math.random() * (50 - 1) + 1).toFixed(1)) + parseFloat((Math.random() * (0.99 - 0.01) + 0.01).toFixed(1)) },
    ])
    setGenSecondsLeft(autogenTimeout)
  }

  useEffect(() => {
    if (genSecondsLeft <= 0) {
      generateHandler()
    }
  }, [genSecondsLeft, generateHandler])

  useEffect(() => {
    const autoGenInterval = setInterval(() => {
      setGenSecondsLeft(prev => prev -= 1)
    }, 1000)

    return () => {
      clearInterval(autoGenInterval)
    }
  }, [autogenTimeout])

  return (
    <button className={cl.btn} onClick={generateHandler}>
      Random data ({genSecondsLeft})
    </button>
  );
};

export default ChartRandomizerButton;
