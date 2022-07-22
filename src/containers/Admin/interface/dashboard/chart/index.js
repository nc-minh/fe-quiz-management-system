/* eslint-disable react/jsx-props-no-spreading */
import React, { memo } from "react";
import './chartDash.scss';
import { Line } from '@ant-design/plots';

function ChartDash() {
  const data = [
    {
      year: 'Jan',
      value: 30,
    },
    {
      year: 'Feb',
      value: 40,
    },
    {
      year: 'Mar',
      value: 35,
    },
    {
      year: 'Apr',
      value: 50,
    },
    {
      year: 'May',
      value: 90,
    },
    {
      year: 'Jun',
      value: 60,
    },
    {
      year: 'Jul',
      value: 70,
    },
    {
      year: 'Aug',
      value: 120,
    },
    {
      year: 'Sep',
      value: 130,
    },
    {
      year: 'Oct',
      value: 80,
    },
    {
      year: 'Nov',
      value: 100,
    },
    {
      year: 'Dev',
      value: 88,
    },
  ];

  const config = {
    data,
    xField: 'year',
    yField: 'value',
    label: {},
    point: {
      size: 5,
      shape: 'diamond',
      style: {
        fill: 'white',
        stroke: '#5B8FF9',
        lineWidth: 2,
      },
    },
    tooltip: {
      showMarkers: false,
    },
    state: {
      active: {
        style: {
          shadowBlur: 4,
          stroke: '#000',
          fill: 'red',
        },
      },
    },
    interactions: [
      {
        type: 'marker-active',
      },
    ],
  };

  return (
    <div className="chartDash">
      <div className="chartDash-container">
        <div className="chartDash-container-title">Examination</div>
        <Line {...config} />
      </div>
    </div>
  );
}

export default memo(ChartDash);
