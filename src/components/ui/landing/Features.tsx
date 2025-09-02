import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

function Features() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="features" id="features" ref={ref}>
      <div className="container">
        <motion.div
          className="features__content"
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <motion.h2
            initial={{ opacity: 0, y: 80 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 80 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            Features
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 60 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.2 }}
          >
            Everything you need to monitor your servers — without the hassle.
          </motion.p>
        </motion.div>

        <motion.div
          className="features__cards"
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <motion.div
            className="features__card"
            initial={{ opacity: 0, y: 100, rotateX: 15 }}
            animate={
              isInView
                ? { opacity: 1, y: 0, rotateX: 0 }
                : { opacity: 0, y: 100, rotateX: 15 }
            }
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.4 }}
          >
            <h3>One-Command Setup</h3>
            <p>
              Install the PulseGrid metric agent in seconds with a single
              command. No configs, no extra steps.
            </p>
          </motion.div>

          <motion.div
            className="features__card"
            initial={{ opacity: 0, y: 100, rotateX: 15 }}
            animate={
              isInView
                ? { opacity: 1, y: 0, rotateX: 0 }
                : { opacity: 0, y: 100, rotateX: 15 }
            }
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.6 }}
          >
            <h3>Real-Time Metrics</h3>
            <p>
              Track CPU, RAM, disk, network, and uptime with a clean live
              dashboard.
            </p>
          </motion.div>

          <motion.div
            className="features__card"
            initial={{ opacity: 0, y: 100, rotateX: 15 }}
            animate={
              isInView
                ? { opacity: 1, y: 0, rotateX: 0 }
                : { opacity: 0, y: 100, rotateX: 15 }
            }
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.8 }}
          >
            <h3>Instant Alerts</h3>
            <p>
              Stay ahead of downtime with alerts in Slack, Telegram, or email -
              delivered the moment issues appear.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default Features;
