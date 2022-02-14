import React, { useState, useCallback, useMemo } from "react";
import { ISolarisNormalizeData, ISolarisTimeLine } from "../../App";
import "./Dashboard.css";

import CustomPieChart from "../../components/custompieChart/CustomPieChart";
import Card from "../../components/card/Card";
import CustomStackedBarChart from "../../components/customStackedBarChart/CustomStackedBarChart";
import CustomSimpleLineChart from "../../components/customSimpleLineChart/CustomSimpleLineChart";
import CustomDatePicker from "../../components/customDatePicker/CustomDatePicker";
import { countData, taxonomyData } from "../../utility/dataUtility";
import CustomDropdown from "../../components/customDropdown/CustomDropdown";

interface IDashboard {
  data: ISolarisNormalizeData;
}

const dataKeyColumns = ["dead", "alive", "unknown"];
const filterOptions = [{value: "status.dead", label:"DEAD"}, {value: "status.alive", label:"ALIVE"}, {value: "status.unknown", label:"UNKNOWN"}];
const taxonomyColumns = ["dead", "alive", "unknown"];

const creatureDataKeyColumns = ["status.alive"];


const Dashboard = ({ data: {timeData, creatureData} }: IDashboard) => {
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
  }, [timeData.length])

  const decreaseClicked = useCallback(() => {setDate(e => {
    if (timeData.length - e - 1 !== 0) {
      return e += 1;
    }
    return e;
  })}, [timeData.length])

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
  }, [date, timeData])

  const creatureCount = useMemo(() => {
    const creature = creatureData.get(creatureId) || [];
    return countData(creature, ["time"])
  }, [creatureId, creatureData]);

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
