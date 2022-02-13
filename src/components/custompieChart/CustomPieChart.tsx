import React, { useCallback, useEffect, useState } from "react";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";
import "./customPieChart.css"

import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

interface ICustomPieChart {
    data: any[];
    filterOptions: any[];
    defaultFilterOption?: any;
    filterFunc?: (arg0: any) => boolean;
}

const CustomPieChart = React.memo(({data, filterOptions, defaultFilterOption, filterFunc}: ICustomPieChart) => {
  const [dataKey, setDataKey] = useState(defaultFilterOption ? defaultFilterOption.value : filterOptions[0].value);
  const [filterValue, setFilterValue] = useState(defaultFilterOption = defaultFilterOption || filterOptions[0]);

  const changeFilterOption = useCallback((e) => setDataKey(e.value), []);

  const filteredData = filterFunc ? data.filter(filterFunc) : [...data];

  

  const COLORS = ['#FF8042', '#FFBB28', '#00C49F', '#0088FE'];

  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index, value, tooltipPayload, ...rest }: any) => {
          const RADIAN = Math.PI / 180;
          // eslint-disable-next-line
          const radius = 25 + innerRadius + (outerRadius - innerRadius);
          // eslint-disable-next-line
          const x = cx + radius * Math.cos(-midAngle * RADIAN);
          // eslint-disable-next-line
          const y = cy + radius * Math.sin(-midAngle * RADIAN); 
          const dataKey = tooltipPayload[0]["dataKey"];

          let count = filteredData[index];
          dataKey.split(".").forEach((str: string) => {
            count = count[str];
          })
        
    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${(filteredData[index].label).toUpperCase()} - ${(count)}`}
      </text>
    );
  };

    return <div className="custom-pie-chart">
      {filterOptions.length > 1 && <div id="dropdown-container" ><Dropdown className="pie-chart-dropdown" controlClassName='pie-chart-dropdown-control'  menuClassName='pie-chart-dropdown-menu' onChange={changeFilterOption} options={filterOptions} value={filterValue} placeholder="Select an option" /> </div>}
        <ResponsiveContainer width="99%" height={240}>
    <PieChart >
      <Pie data={filteredData} dataKey={dataKey} cx="50%" cy="50%" innerRadius="60%" outerRadius="75%" fill="#8884d8" label={(dataKey, ...rest) => renderCustomizedLabel(dataKey, ...rest)}>
      {filteredData.map((item, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
    </PieChart>
  </ResponsiveContainer>
    </div>

})

export default CustomPieChart;