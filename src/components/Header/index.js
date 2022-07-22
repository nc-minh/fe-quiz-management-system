import React from 'react';
import './headerContainer.scss';

function Header() {
  return (
    <div>
      <div className="header-page">
        <div className="header-page-container">

          <div className="header-menu">

            <a href="/">
              <div className="header-logo-image" />
            </a>

            <div className="header-menu-box">
              <a href="https://telio.vn/vi/" className="header-menu-link">Home</a>
            </div>

          </div>

          <div className="header-language">

            <a href="/" className="header-language-link">English</a>

            <a href="/" className="header-language-link">Vietnamese</a>

          </div>

        </div>
      </div>
    </div>
  );
}

export default Header;
