import React, { useState } from "react";
import './index.css';
import logo from '../assets/logo8.svg';
import telegram from "./img/telegram.svg";
import viber from "./img/viber.svg";
import vk from "./img/vkontakte.svg";
import { Link } from "react-router-dom";

export function Footer(params) {
  const [activeModal, setActiveModal] = useState(true);
  return (
    <footer className="footer">

      <div className="top">



        <div className="faq">
          <div className="title_faq"> Часто задаваемые вопросы</div>


          <div className="linc_faq">
            <Link
              to={'/faq'}
              style={{ cursor: 'pointer', position: 'relative' }}
              onClick={() => setActiveModal(true)}

            ><span className='spanFaq'>FAQ</span></Link>

          </div >
        </div>

      </div>

      <div className="bottom">

        <div className="social">
          <h1 className="soc"> Соц. сети</h1>
          <ul className="socials contacts__socials">
            <li className="socials__item">
              <a className="socials__link" href="https://t.me/stMihaile">
                <img src={telegram} alt="telegram" className="socials__icon" />
              </a>
            </li>

            <li className="socials__item">
              <a className="socials__link" href="https://skobelkin.ru/viber/9379935153">
                <img src={viber} alt="viber" className="socials__icon" />
              </a>
            </li>
            <li className="socials__item">
              <a className="socials__link" href="https://vk.com/sipatrov_m">
                <img src={vk} alt="vk" className="socials__icon" />
              </a>
            </li>
          </ul>
        </div>

        <a className="logo_footer" href="/" title="Логотип">
          <img src={logo} alt="Логотоп" className="logo" />
        </a>

        <div className="contact">
          <h1> Контакты</h1>
          <h3> тел: +79999999999</h3>
          <h3> email: ... @mail.ru</h3>
        </div>


      </div>

    </footer>
  )

};