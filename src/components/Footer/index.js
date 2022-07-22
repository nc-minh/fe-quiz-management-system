import React from 'react';
import './footerContainer.scss';

import { AiOutlineFacebook, AiOutlineMail } from 'react-icons/ai';
import { TiSocialGooglePlus } from 'react-icons/ti';
import { BsInstagram, BsTelephone } from 'react-icons/bs';

function Footer() {
  return (
    <div>
      <div className="footer-page">

        <div className="footer-page-container">

          <div className="footer-container-box">

            <a href="/" className="footer-box-logo">
              <div className="footer-logo-image" />
            </a>

            <div className="footer-box-social">

              <a href="https://www.facebook.com/telio.careers/">
                <AiOutlineFacebook size={35} className="footer-social-icon" />
              </a>

              <a href="/">
                <TiSocialGooglePlus size={35} className="footer-social-icon" />
              </a>

              <a href="/">
                <BsInstagram size={28} className="footer-social-icon" />
              </a>

            </div>

          </div>

          <div className="footer-container-link">

            <div className="footer-link-address">

              <p>
                Ha Noi: Capital Place Building, 29 Lieu Giai St, Ngoc Khanh Ward, Ba Dinh Dist,
                Ha Noi
              </p>

              <p>
                Ho Chi Minh: 6th An Phong Building, 518B Dien Bien Phu St, Ward 21,
                Binh Thanh Dist, HCMC
              </p>

            </div>

          </div>

          <div className="footer-container-box">

            <div className="footer-box-contact">

              <div className="footer-contact-title">Contact</div>

              <div className="footer-contact-option">

                <AiOutlineMail size={16} className="footer-contact-icon" />

                Email:
                <a href="/">tuyendung@telio.vn</a>

              </div>

              <div className="footer-contact-option">

                <BsTelephone size={15} className="footer-contact-icon" />

                Phone:
                <a href="/">024 665 72020</a>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Footer;
