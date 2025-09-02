import logo from '../../../assets/images/PulseLogo.svg';
import { NavLink } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import arrow from '../../../assets/icons/arrow.svg';
import Button from '../../common/landing/button';

interface HeaderProps {
  onLogin: () => void;
}

function Header({ onLogin }: HeaderProps) {
  const [isFeaturesOpen, setIsFeaturesOpen] = useState(false);
  const dropdownRef = useRef<HTMLLIElement>(null);
  const headerRef = useRef<HTMLElement>(null); // headerni ref orqali olish

  const toggleFeatures = () => {
    setIsFeaturesOpen(!isFeaturesOpen);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsFeaturesOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Scroll bo'lganda header fonini o'zgartirish
  useEffect(() => {
    const handleScroll = () => {
      if (headerRef.current) {
        if (window.scrollY > 50) {
          headerRef.current.classList.add('scrolled');
        } else {
          headerRef.current.classList.remove('scrolled');
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="landing-header" ref={headerRef}>
      <div className="container">
        <NavLink to="/" className="landing-header__logo">
          <img src={logo} alt="logo" />
        </NavLink>
        <nav className="landing-header__nav">
          <ul>
            <li>
              <a href="#pricing">Pricing</a>
            </li>
            <li>
              <a href="#faqs">FAQs</a>
            </li>
            <li>
              <a href="#contact">Contact</a>
            </li>
            <li
              className={`dropdown ${isFeaturesOpen ? 'open' : ''}`}
              ref={dropdownRef}
            >
              <button className="dropdown-toggle" onClick={toggleFeatures}>
                Features
                <span className="dropdown-arrow">
                  <img src={arrow} alt="arrow" />
                </span>
              </button>
              <ul className={`dropdown-menu ${isFeaturesOpen ? 'open' : ''}`}>
                <li>
                  <a href="#analytics">Analytics</a>
                </li>
                <li>
                  <a href="#reporting">Reporting</a>
                </li>
                <li>
                  <a href="#dashboard">Dashboard</a>
                </li>
                <li>
                  <a href="#integrations">Integrations</a>
                </li>
              </ul>
            </li>
          </ul>
        </nav>
        <Button text="Login" onClick={onLogin} border={false} />
      </div>
    </header>
  );
}

export default Header;
