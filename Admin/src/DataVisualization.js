// // UserChart.js
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import Chart from 'react-google-charts';

// const UserChart = () => {
//   const [userData, setUserData] = useState([]);

//   useEffect(() => {
//     // Fetch data from MySQL
//     axios.get('http://localhost:8001/api/usersInfo')
//       .then(response => {
//         setUserData(response.data);
//       })
//       .catch(error => {
//         console.error('Error fetching data:', error);
//       });
//   }, []);

//   // Prepare data for Google Chart
//   const chartData = [['Zip Code', 'Number of Users']];
//   userData.forEach(user => {
//     const zipCode = user.zipCode.toString(); // Assuming zipCode is a string in the database
//     const existingRow = chartData.find(row => row[0] === zipCode);

//     if (existingRow) {
//       existingRow[1]++;
//     } else {
//       chartData.push([zipCode, 1]);
//     }
//   });

//   return (
//     <div>
//       <Chart
//         width={'500px'}
//         height={'300px'}
//         chartType="BarChart"
//         loader={<div>Loading Chart</div>}
//         data={chartData}
//         options={{
//           chart: {
//             title: 'Number of Users by Zip Code',
//           },
//         }}
//       />
//     </div>
//   );
// };

// export default UserChart;

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import * as d3 from "d3";

// export default function LinePlot({
//   data,
//   width = 640,
//   height = 400,
//   marginTop = 20,
//   marginRight = 20,
//   marginBottom = 20,
//   marginLeft = 20
// }) {
//   const x = d3.scaleLinear([0, data.length - 1], [marginLeft, width - marginRight]);
//   const y = d3.scaleLinear(d3.extent(data), [height - marginBottom, marginTop]);
//   const line = d3.line((d, i) => x(i), y);
//   return (
//     <svg width={width} height={height}>
//       <path fill="none" stroke="currentColor" stroke-width="1.5" d={line(data)} />
//       <g fill="white" stroke="currentColor" stroke-width="1.5">
//         {data.map((d, i) => (<circle key={i} cx={x(i)} cy={y(d)} r="2.5" />))}
//       </g>
//     </svg>
//   );
// }

import React, { useEffect, useRef } from 'react';
import axios from 'axios';
import * as d3 from 'd3';

const UserChart = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    // Fetch data from MySQL
    axios
      .get('http://localhost:8001/api/usersInfo')
      .then(response => {
        drawChart(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const drawChart = data => {
    const margin = { top: 20, right: 20, bottom: 20, left: 20 };
    const width = 500 - margin.left - margin.right;
    const height = 300 - margin.top - margin.bottom;

    const svg = d3.select(chartRef.current).attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom);

    const x = d3.scaleBand().range([0, width]).padding(0.1);
    const y = d3.scaleLinear().range([height, 0]);

    x.domain(data.map(d => d.zipCode));
    y.domain([0, d3.max(data, d => d.userCount)]);

    svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`)
      .selectAll('.bar')
      .data(data)
      .enter().append('rect')
      .attr('class', 'bar')
      .attr('x', d => x(d.zipCode))
      .attr('width', x.bandwidth())
      .attr('y', d => y(d.userCount))
      .attr('height', d => height - y(d.userCount));

    // Add x-axis
    svg.append('g')
      .attr('transform', `translate(${margin.left},${height + margin.top})`)
      .call(d3.axisBottom(x));

    // Add y-axis
    svg.append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`)
      .call(d3.axisLeft(y));
  };

  return (
    <div className="chart-container">
        <h2 className="chart-title">Customer based on zip code</h2>
    <svg ref={chartRef}></svg>
    </div>
  );
};

export default UserChart;
