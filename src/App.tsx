import React, { useEffect, useState } from 'react';
import './App.css';

import * as solarisData from './Solaris-2.json';
import Dashboard from './pages/Dashboard/Dashboard';
import Loading from './components/loading/Loading';
import logo from "./saturnLogo.png";



enum Status {
  ALIVE = "alive",
  DEAD = "dead",
  UNKNOWN = "unknown"
}
export interface ISolarisData {
  status: any;
  age: string;
  diet: string;
  taxonomy: string[];
  id: string;
  time?: string;
}

export interface ISolarisTimeLine {
  timeLine: string;
  solarisDatas: ISolarisData[];
}

export interface ISolarisNormalizeData {
  creatureData: Map<string, ISolarisData[]>;
  timeData: ISolarisTimeLine[];

}

const loadData = () => {
  const creatureData: Map<string,ISolarisData[]> = new Map<string,ISolarisData[]>();
  let aliveCreatures: ISolarisData[] = [];

  let solData: ISolarisTimeLine[] = [];

  (solarisData as any).default.forEach((item: any) => {
    const time = new Date(item[0]).toLocaleDateString();

    solData.push({timeLine: time, solarisDatas: item[1]});

    item[1].forEach((data: ISolarisData) => {
      const status: Status = data.status as Status;
      if (creatureData.get(data.id) == null) {
        creatureData.set(data.id, [{...data, status, time}]);
      } else {
        creatureData.get(data.id)?.push({...data, status, time});
      }
    })
  });

  creatureData.forEach((value, key) => {
    value[value.length - 1].status === Status.UNKNOWN && aliveCreatures.push(value[value.length - 1]);
  });

  return {timeData: solData, creatureData}
}

function App() {
  const [data, setData] = useState<ISolarisNormalizeData | undefined>();
  useEffect(() => {
    const loadedData = loadData();
    setData(loadedData);
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <div className='App-main'>
        <div className='App-text'> WELCOME TO SOLARIS DASHBOARD </div>
        <img src={logo} alt="Logo" className='App-logo'/>   
        </div>   
        </header>
      {!!data ? <Dashboard data={data}></Dashboard> : <Loading/>}
    </div>
  );
}

export default App;
