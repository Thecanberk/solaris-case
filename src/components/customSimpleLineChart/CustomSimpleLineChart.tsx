import React from "react";
import { ResponsiveContainer, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line } from "recharts";


interface ICustomSimpleLineChart {
    data: any[];
    dataKeyRow: string;
    dataKeyColumns: string[];
}

const CustomSimpleLineChart = React.memo(({data, dataKeyRow, dataKeyColumns}: ICustomSimpleLineChart) => {

    const COLORS = ['#FF8042', '#FFBB28', '#00C49F', '#0088FE'];

    return (
        <div style={{fontSize: "1.2rem", color:"wheat"}}>
          {}
        <ResponsiveContainer  minWidth={375} width="100%" height={360}>
          <LineChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={dataKeyRow} tick={{fill: 'wheat', fontsize: 20}} />
            <YAxis tick={{fill: 'wheat'}} />
            <Tooltip />
            <Legend />
            {dataKeyColumns.map((columKey, index) => (
                <Line key={`line-${index}`} type="monotone" dataKey={columKey} stroke={COLORS[index % COLORS.length]} />
            ))}
          </LineChart>
        </ResponsiveContainer>
        </div>
      );
})

export default CustomSimpleLineChart;