import React from 'react';
import './loginContainer.scss';

import HandleLogin from './auth/handleLogin';
import HeaderContainer from '../../components/Header';
import FooterContainer from '../../components/Footer';

function LoginContainer() {
  return (
    <div>

      <HeaderContainer />

      <div className="login-page">

        <div className="login-background" />

        <div className="login-container">

          <div className="login-container-box">

            <div className="login-box-logo">

              <div className="login-logo-image" />

            </div>

            <div className="login-box-title">

              <span>Welcome to TELIO!</span>

            </div>

            <HandleLogin />

          </div>

        </div>

      </div>

      <FooterContainer />

    </div>
  );
}

export default LoginContainer;
