import React, { memo } from 'react';

import './dashboard.scss';
import HeaderDash from './header';
import ChartDash from './chart';
import RecentDash from './recent';
import StatisticDash from './statistic';
import GridDash from './grid';

function Dashboard() {
  return (
    <div className="dashboard-page">

      <div className="dashboard-page-container">

        <div className="dashboard-component">

          <HeaderDash />

        </div>

        <div className="dashboard-component ">

          <StatisticDash />

        </div>

        <div className="dashboard-component">

          <ChartDash />

        </div>

        <div className="dashboard-component">

          <RecentDash />

        </div>

        <div className="dashboard-component">

          <GridDash />

        </div>

      </div>

    </div>
  );
}

export default memo(Dashboard);
