import { useNavigate } from 'react-router-dom';
import Header from '../../components/layout/landing/Header';
import Footer from '../../components/layout/landing/Footer';
import LandingHero from '../../components/ui/landing/Hero';
import Features from '../../components/ui/landing/Features';
import Simplicity from '../../components/ui/landing/Simplicity';
import Lower from '../../components/ui/landing/Lower';
import Pricing from '../../components/ui/landing/Pricing';
import FAQ from '../../components/ui/landing/FAQ';
import Ready from '../../components/ui/landing/Ready';
import Contact from '../../components/ui/landing/Contact';
const Landing: React.FC = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    // Landing page dan login sahifasiga o'tish
    navigate('/login');
  };
  return (
    <div className="landing">
      <Header onLogin={handleLogin} />
      <LandingHero />
      <Features />
      <Simplicity />
      <Lower />
      <Pricing />
      <FAQ />
      <Ready />
      <Contact />
      <Footer />
    </div>
  );
};

export default Landing;
