import React, { memo } from 'react';
import { Outlet } from 'react-router-dom';

import './adminContainer.scss';
import MenuAdmin from './menu';

function AdminPage() {
  return (
    <div>
      <div className="admin-page">

        <div className="admin-page-container">

          <div className="admin-container-menu">

            <MenuAdmin />

          </div>

          <div className="admin-container-interface">

            <Outlet />

          </div>

        </div>

      </div>
    </div>
  );
}

export default memo(AdminPage);
