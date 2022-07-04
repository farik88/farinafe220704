import React from 'react';
import "./styles/general/index.scss"
import cl from "./styles/App.module.scss"
import ChartGroup from "./components/charts/ChartGroup";
import {IChartItem} from "./types/charts";

function App() {
  const chartsData:IChartItem[] = [
    { name: "Landing Page", time: 7.4 },
    { name: "Configurator", time: 0.2 },
    { name: "Check-out", time: 7.0 },
    { name: "Deal", time: 3.8 },
  ]

  return (
    <div className={cl.app}>
      <ChartGroup data={chartsData}/>
    </div>
  );
}

export default App;
