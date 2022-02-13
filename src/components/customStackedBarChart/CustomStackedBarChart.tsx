import React from "react";
import { ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar } from "recharts";


interface ICustomStackedBarChart {
    data: any[];
    dataKeyRow: string;
    dataKeyColumns: string[];
}

const CustomStackedBarChart = React.memo(({data, dataKeyRow, dataKeyColumns}: ICustomStackedBarChart) => {

    const COLORS = ['#FF8042', '#FFBB28', '#00C49F', '#0088FE'];


    return (
        <div style={{fontSize: "1.5rem", color:"wheat"}}>
        <ResponsiveContainer width="100%" height={240}>
          <BarChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={dataKeyRow} tick={{fill: 'wheat', fontsize: 20}} />
            <YAxis tick={{fill: 'wheat'}}/>
            <Tooltip />
            <Legend />
            {dataKeyColumns.map((item, index) => (
            <Bar dataKey={item} stackId="a" fill={COLORS[index % COLORS.length]} />
            ))}
          </BarChart>
        </ResponsiveContainer>
        </div>
      );

})

export default CustomStackedBarChart;