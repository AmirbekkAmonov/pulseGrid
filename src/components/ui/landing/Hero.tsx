import HeroImg from '../../common/landing/HeroImg';
import Button from '../../common/landing/button';
import arrow from '../../../assets/icons/arrow.svg';
import { motion } from 'framer-motion';

function LandingHero() {
  return (
    <section className="landing-hero">
      <div className="hero_container">
        <div className="landing-hero__content">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1,
              ease: 'easeOut',
              delay: 0.4,
            }}
          >
            Simple monitoring.
          </motion.h2>

          <motion.h4
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1,
              ease: 'easeOut',
              delay: 0.6,
            }}
          >
            PulseGrid is the easiest way to monitor your servers connect in
            minutes and get real-time alerts straight to your team.
          </motion.h4>

          <motion.div
            className="landing-hero__content-buttons"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1,
              ease: 'easeOut',
              delay: 0.8,
            }}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <Button text="Start now " border={false} icon={arrow} />
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <Button text="Contact sales " border={true} icon={arrow} />
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          className="landing-hero__image"
          initial={{ opacity: 0, y: 50 }} // ⬇️ pastdan boshlanadi
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 1.4,
            ease: 'easeOut',
            delay: 1, // Chapdagi matnlar tugagandan keyin chiqadi
          }}
        >
          <HeroImg />
        </motion.div>
      </div>
    </section>
  );
}

export default LandingHero;
