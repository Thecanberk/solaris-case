import React, { useState, useEffect, useCallback, useMemo } from "react";
import { ISolarisData, ISolarisNormalizeData, ISolarisTimeLine } from "../../App";
import "./Dashboard.css";

import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";
import CustomPieChart from "../../components/custompieChart/CustomPieChart";
import { stringify } from "querystring";
import Card from "../../components/card/Card";
import GridLayout from "react-grid-layout";
import CustomStackedBarChart from "../../components/customStackedBarChart/CustomStackedBarChart";
import { IndexType, Type } from "typescript";
import CustomSimpleLineChart from "../../components/customSimpleLineChart/CustomSimpleLineChart";
import CustomDatePicker from "../../components/customDatePicker/CustomDatePicker";
import { countData, INormalizeStatusData, ITaxonomytatusData, taxonomyData } from "../../utility/dataUtility";
import { time } from "console";
import CustomDropdown from "../../components/customDropdown/CustomDropdown";

interface IDashboard {
  data: ISolarisNormalizeData | undefined;
}

const dataKeyColumns = ["dead", "alive", "unknown"];
const filterOptions = [{value: "status.dead", label:"DEAD"}, {value: "status.alive", label:"ALIVE"}, {value: "status.unknown", label:"UNKNOWN"}];
const taxonomyColumns = ["dead", "alive", "unknown"];

const creatureDataKeyColumns = ["status.alive"];


const Dashboard = ({ data: {timeData, creatureData} }: any) => {
  const [date, setDate] = useState(1);
  const [creatureId, setCreatureId] = useState("100828");
  const ageFilter = useCallback((item) => item.key === "age", []);
  const dietFilter = useCallback((item) => item.key === "diet", []);

  const increaseClicked = useCallback(() => {
     setDate(e => {
      if (timeData.length - e < timeData.length - 1) {
        return e -= 1;
      }
      return e;
     })
  }, [])

  const decreaseClicked = useCallback(() => {setDate(e => {
    if (timeData.length - e - 1 !== 0) {
      return e += 1;
    }
    return e;
  })}, [])

  const creatureIdChange = useCallback((e) => {
    setCreatureId(e.value);
  }, [])

  const timeLineData = useMemo(() => {
    const timeLine: any[] = [];
    timeData.forEach((item: ISolarisTimeLine) => {
      const count = countData(item.solarisDatas, ["status", "diet", "age"], item.timeLine);
      const temp = count.reduce((prev, curr): any => {
        // @ts-ignore
          prev[curr.label] += curr.count;
        return prev;
      }, {"dead": 0, "alive":0, "unknown": 0, "herbivore": 0, "carnivore": 0, "young": 0, "adult": 0, "elder": 0, "timeLine": item.timeLine} )
      timeLine.push(temp);
    })
    return timeLine;
  }, [timeData])
  
  const creatureIds = useMemo(() => (
    Array.from(creatureData.keys())
  ), [creatureData])
  

  const {normalizeDate, youngDietData, taxonomy}: any = useMemo(() => {
    const normalizeDate = countData(timeData[timeData?.length - date].solarisDatas, ["diet", "age"]);
    const youngDietData = countData(timeData[timeData?.length - date].solarisDatas, ["diet"], undefined, (item: any) => (item.age === "young"));
    const taxonomy = taxonomyData(timeData[timeData?.length - date].solarisDatas, 50);
    return {normalizeDate, youngDietData, taxonomy};
  }, [date])

  const creatureCount = useMemo(() => (countData(creatureData.get(creatureId), ["time"])), [creatureId]);

  return (
      
    <div className="container">
      <div className="btn-dashboard-wrapper">
        <CustomDatePicker increaseClicked={increaseClicked} decreaseClicked={decreaseClicked} date={timeData[timeData.length - date].timeLine}></CustomDatePicker>
      </div>
      <div className="wrapper">
        <div className="taxonomy">
          <Card header="TAXONOMY">
            <CustomStackedBarChart
              data={taxonomy}
              dataKeyRow="label"
              dataKeyColumns={taxonomyColumns}
            ></CustomStackedBarChart>
          </Card>
        </div>
        <div className="pie">
          <Card header="AGE">
          <CustomPieChart
              data={normalizeDate}
              filterOptions={filterOptions}
              filterFunc={ageFilter}
            ></CustomPieChart>
          </Card>
        </div>
        <div className="pie">
          <Card header="DIET">
            <CustomPieChart
              data={normalizeDate}
              filterOptions={filterOptions}
              filterFunc={dietFilter}
            ></CustomPieChart>
          </Card>
        </div>
        <div className="pie">
          <Card header="DIET - YOUNG">
            <CustomPieChart
              data={youngDietData}
              filterOptions={filterOptions}
            ></CustomPieChart>
          </Card>
        </div>
        <div className="timeline">
          <Card header="TIMELINE">
            <CustomSimpleLineChart
              data={timeLineData}
              dataKeyRow="timeLine"
              dataKeyColumns={dataKeyColumns}
            ></CustomSimpleLineChart>
          </Card>
        </div>
        <div className="dropdown-dashboard-wrapper">
          <CustomDropdown filterOptions={creatureIds} filterValue={"100828"} onChange={creatureIdChange}></CustomDropdown>
      </div>
        <div className="timeline">
          <Card header="CREATURE TIMELINE">
            <CustomSimpleLineChart
              data={creatureCount}
              dataKeyRow="label"
              dataKeyColumns={creatureDataKeyColumns}
            ></CustomSimpleLineChart>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
