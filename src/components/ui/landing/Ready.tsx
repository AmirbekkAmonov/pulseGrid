import Button from '../../common/landing/button';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const Ready = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="ready" ref={ref}>
      <div className="container">
        <motion.h2
          initial={{ opacity: 0, y: 80 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 80 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          Ready to Get Started?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
        >
          Stop wasting time on complex monitoring. Start tracking your servers
          with PulseGrid today - simple, fast, and affordable.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.4 }}
        >
          <Button
            text="Get free trial"
            onClick={() => {
              console.log('Get free trial');
            }}
          />
        </motion.div>
      </div>
    </section>
  );
};

export default Ready;
