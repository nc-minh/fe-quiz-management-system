import React, { memo } from 'react';
import './headDash.scss';
import { UnorderedListOutlined } from '@ant-design/icons';

function HeaderDash() {
  return (
    <div className="headerDash">

      <div className="headerDash-navbar">

        <div className="headerDash-navbar-title">

          <UnorderedListOutlined />

          Dashboard

        </div>

      </div>

    </div>
  );
}

export default memo(HeaderDash);
