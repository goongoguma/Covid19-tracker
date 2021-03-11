import React from 'react';
import { 
  BarChart, 
  CartesianGrid, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Cell, 
  Bar, 
  ResponsiveContainer 
} from "recharts";
  
function InfoChart({ data }) {
  const colors = ['#CE8296','#008080', '#7D7D7D'];
  let formatData;

  if (data?.error) {
    return <p>Invalid data</p>
  }

  if (data) {
    const { confirmed, recovered, deaths } = data;
    const formattedData = { confirmed, recovered, deaths };
    formatData = Object.keys(formattedData).map((key, index) => { return {name: key, value: data[key].value, color: colors[index]} });
  }
 
  return ( 
    formatData ? 
    <div style={
      formatData[0].name === "error" ? 
      {display: "none"} : 
      { width: '100%', height: '250px'}}
    >
      <ResponsiveContainer>
        <BarChart data={formatData}>
          <CartesianGrid strokeDasharray='3 3'/>
          <XAxis dataKey='name' />
          <YAxis>
            {/* <Label value="Label" position="left" /> */}
          </YAxis>
          <Tooltip />
          <Bar dataKey='value' name='count'>
            {
              formatData.map((data) => (
                <Cell key={data.color} fill={data.color} />
              ))
            }
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div> 
    : ""
  );
};

export default InfoChart
