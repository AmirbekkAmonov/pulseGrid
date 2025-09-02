import { FaXTwitter } from 'react-icons/fa6';
import PulseLogo from '../../../assets/images/PulseLogo.svg';
import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube } from 'react-icons/fa';
function Footer() {
  return (
    <footer className="landing-footer">
      <div className="container">
        <div className="landing-footer__content">
          <a href="/" className="landing-footer__content__logo">
            <img src={PulseLogo} alt="logo" />
          </a>
          <ul className="landing-footer__content__links">
            <li className="landing-footer__content__links__item">
              <a href="/">Products</a>
            </li>
            <li className="landing-footer__content__links__item">
              <a href="/">About us</a>
            </li>
            <li className="landing-footer__content__links__item">
              <a href="/">Link Three</a>
            </li>
            <li className="landing-footer__content__links__item">
              <a href="/">Link Four</a>
            </li>
            <li className="landing-footer__content__links__item">
              <a href="/">Link Five</a>
            </li>
          </ul>
          <div className="landing-footer__content__social">
            <a href="/">
              <FaFacebook />
            </a>
            <a href="/">
              <FaInstagram />
            </a>
            <a href="/">
              <FaXTwitter />
            </a>
            <a href="/">
              <FaLinkedin />
            </a>
            <a href="/">
              <FaYoutube />
            </a>
          </div>
        </div>
        <div className="landing-footer__bottom">
          <p>2023 Relume. All right reserved.</p>
          <div className="landing-footer__bottom__links">
            <a href="/">Privacy Policy</a>
            <a href="/">Terms of Service</a>
            <a href="/">Cookies Settings</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
