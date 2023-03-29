import React from "react";
import './index.css';
import logo from '../assets/logoH5.svg';
import telegram from "./img/telegram.svg";
import viber from "./img/viber.svg";
import vk from "./img/vk.svg";

export function Footer(params) {
  return(
    <footer className="footer">
       
        <div className="top">


          <div className="social">
              <h1 className="soc"> Соц. сети</h1>
              <ul className="socials contacts__socials">
								<li className="socials__item">
									<a className="socials__link" href="https://t.me/stMihaile">
										<img src={telegram} alt="telegram" className="socials__icon"/>
									</a>
                  </li>
								
								<li className="socials__item">
									<a className="socials__link" href="https://skobelkin.ru/viber/9379935153">
										<img src={viber} alt="viber" className="socials__icon"/>
									</a>
								</li>
									<li className="socials__item">
									<a className="socials__link" href="https://vk.com/sipatrov_m">
										<img src={vk} alt="vk" className="socials__icon"/>
									</a>
								</li>
							</ul> 
            </div>

           <div className="contact">
              <h1> Контакты</h1>
              <h3> тел: +79999999999</h3>
              <h3> email: ... @mail.ru</h3>
            </div>

            <div className="faq"> 
              <h2> Часто задаваемые</h2>
              <h2> вопросы</h2>
              <h3> FAQ </h3>
            </div>

        </div>

        <div className="bottom"> 
      
        <a href="/" title="Логотип">
             <img src={logo} alt="Логотоп" className="logo"/>
             <h1>Кухня выходного дня</h1>
            </a>
  
        </div>

    </footer>
  )

};