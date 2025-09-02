import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import lowerImage from '../../../assets/images/Placeholder.svg';

function Lower() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="lower" ref={ref}>
      <div className="container">
        <motion.div
          className="lower__content"
          initial={{ opacity: 0, y: 80 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 80 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <motion.h2
            initial={{ opacity: 0, y: 60 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.4 }}
          >
            Lower Cost
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 60 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.6 }}
          >
            Get reliable server monitoring without expensive subscriptions or
            hidden infrastructure costs.
          </motion.p>
        </motion.div>

        <motion.div
          className="lower__image"
          initial={{ opacity: 0, y: 100 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
          transition={{ duration: 1, ease: 'easeOut', delay: 1 }}
        >
          <img src={lowerImage} alt="Lower" />
        </motion.div>
      </div>
    </section>
  );
}

export default Lower;
