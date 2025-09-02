import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import simplicityImage from '../../../assets/images/Placeholder.svg';

function Simplicity() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="simplicity" ref={ref}>
      <div className="container">
        <motion.div
          className="simplicity__image"
          initial={{ opacity: 0, y: 100 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
          transition={{ duration: 1, ease: 'easeOut', delay: 1 }}
        >
          <img src={simplicityImage} alt="Simplicity" />
        </motion.div>

        <motion.div
          className="simplicity__content"
          initial={{ opacity: 0, y: 80 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 80 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <motion.h2
            initial={{ opacity: 0, y: 60 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
          >
            Simplicity First
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 60 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.6 }}
          >
            No complicated configs, no steep learning curve. Install with one
            command and start monitoring instantly.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}

export default Simplicity;
