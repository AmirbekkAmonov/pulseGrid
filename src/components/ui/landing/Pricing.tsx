import { IoMdCheckmark } from 'react-icons/io';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

function Pricing() {
  const [isMonthly, setIsMonthly] = useState(true);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const handleMonthly = () => {
    setIsMonthly(true);
  };
  const handleYearly = () => {
    setIsMonthly(false);
  };

  return (
    <section className="pricing" id="pricing" ref={ref}>
      <div className="container">
        <motion.div
          className="pricing__text"
          initial={{ opacity: 0, y: 80 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 80 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <motion.h2
            initial={{ opacity: 0, y: 60 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
          >
            Pricing plan
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 60 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.4 }}
          >
            Start small, scale anytime.
          </motion.p>
        </motion.div>

        <motion.div
          className="pricing__buttons"
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.6 }}
        >
          <button
            className={`pricing__button ${isMonthly ? 'active' : ''}`}
            onClick={handleMonthly}
          >
            Monthly
          </button>
          <button
            className={`pricing__button ${!isMonthly ? 'active' : ''}`}
            onClick={handleYearly}
          >
            Yearly
          </button>
        </motion.div>

        <motion.div
          className="pricing__cards"
          initial={{ opacity: 0, y: 100 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.8 }}
        >
          <motion.div
            className="pricing__card"
            initial={{ opacity: 0, y: 80 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 80 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 1.0 }}
          >
            <div className="pricing__card-text">
              <h4>Basic plan</h4>
              <p>Lorem ipsum dolor sit amet</p>
            </div>
            <div className="pricing__card-line"></div>
            <div className="pricing__card-price">
              <h3>
                $19<span>/mo</span>
              </h3>
              <p>or $199 yearly</p>
            </div>

            <div className="pricing__card-button">
              <button>Get started</button>
            </div>
            <div className="pricing__card-line"></div>
            <div className="pricing__card-features">
              <p>
                <IoMdCheckmark size={22} /> <span>Feature text goes here</span>
              </p>
              <p>
                <IoMdCheckmark size={22} /> <span>Feature text goes here</span>
              </p>
              <p>
                <IoMdCheckmark size={22} /> <span>Feature text goes here</span>
              </p>
            </div>
          </motion.div>

          <motion.div
            className="pricing__card"
            initial={{ opacity: 0, y: 80 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 80 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 1.2 }}
          >
            <div className="pricing__card-text">
              <h4>Basic plan</h4>
              <p>Lorem ipsum dolor sit amet</p>
            </div>
            <div className="pricing__card-line"></div>
            <div className="pricing__card-price">
              <h3>
                $29<span>/mo</span>
              </h3>
              <p>or $299 yearly</p>
            </div>

            <div className="pricing__card-button">
              <button>Get started</button>
            </div>
            <div className="pricing__card-line"></div>
            <div className="pricing__card-features">
              <p>
                <IoMdCheckmark size={22} /> <span>Feature text goes here</span>
              </p>
              <p>
                <IoMdCheckmark size={22} /> <span>Feature text goes here</span>
              </p>
              <p>
                <IoMdCheckmark size={22} /> <span>Feature text goes here</span>
              </p>
              <p>
                <IoMdCheckmark size={22} /> <span>Feature text goes here</span>
              </p>
            </div>
          </motion.div>

          <motion.div
            className="pricing__card"
            initial={{ opacity: 0, y: 80 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 80 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 1.4 }}
          >
            <div className="pricing__card-text">
              <h4>Basic plan</h4>
              <p>Lorem ipsum dolor sit amet</p>
            </div>
            <div className="pricing__card-line"></div>
            <div className="pricing__card-price">
              <h3>
                $49<span>/mo</span>
              </h3>
              <p>or $499 yearly</p>
            </div>

            <div className="pricing__card-button">
              <button>Get started</button>
            </div>
            <div className="pricing__card-line"></div>
            <div className="pricing__card-features">
              <p>
                <IoMdCheckmark size={22} /> <span>Feature text goes here</span>
              </p>
              <p>
                <IoMdCheckmark size={22} /> <span>Feature text goes here</span>
              </p>
              <p>
                <IoMdCheckmark size={22} /> <span>Feature text goes here</span>
              </p>
              <p>
                <IoMdCheckmark size={22} /> <span>Feature text goes here</span>
              </p>
              <p>
                <IoMdCheckmark size={22} /> <span>Feature text goes here</span>
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default Pricing;
