import { MdEmail, MdLocationOn, MdPhone } from 'react-icons/md';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="contact" id="contact" ref={ref}>
      <div className="container">
        <motion.div
          className="contact__content"
          initial={{ opacity: 0, y: 80 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 80 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <motion.div
            className="contact__content__info"
            initial={{ opacity: 0, y: 60 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
          >
            <h2>Contact Us</h2>
            <p>
              We're here to help you with any questions you have. Please fill
              out the form below and we'll get back to you as soon as possible.
            </p>
          </motion.div>

          <motion.div
            className="contact__content__social"
            initial={{ opacity: 0, y: 60 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.4 }}
          >
            <motion.a
              className="contact__content__social__item"
              href="mailto:support@pulsegrid.io"
            >
              <MdEmail size={20} />
              <span>support@pulsegrid.io</span>
            </motion.a>

            <motion.a
              className="contact__content__social__item"
              href="tel:+1234567890"
            >
              <MdPhone size={20} />
              <span>+1234567890</span>
            </motion.a>

            <motion.a
              className="contact__content__social__item"
              href="https://www.google.com/maps/place/123+Main+St,+Anytown,+USA"
              target="_blank"
            >
              <MdLocationOn size={20} />
              <span>123 Main St, Anytown, USA</span>
            </motion.a>
          </motion.div>
        </motion.div>

        <motion.div
          className="contact__form"
          initial={{ opacity: 0, y: 100 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.6 }}
        >
          <motion.div
            className="contact__form__input"
            initial={{ opacity: 0, y: 60 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.8 }}
          >
            <label htmlFor="name">Name</label>
            <input type="text" id="name" />
          </motion.div>

          <motion.div
            className="contact__form__input"
            initial={{ opacity: 0, y: 60 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 1.0 }}
          >
            <label htmlFor="email">Email</label>
            <input type="email" id="email" />
          </motion.div>

          <motion.div
            className="contact__form__input"
            initial={{ opacity: 0, y: 60 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 1.2 }}
          >
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              placeholder="Type your message..."
              rows={8}
            />
          </motion.div>

          <motion.div
            className="contact__form__checkbox"
            initial={{ opacity: 0, y: 60 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 1.4 }}
          >
            <input type="checkbox" id="checkbox" />
            <label htmlFor="checkbox">
              I accept the <a href="#">Terms</a>
            </label>
          </motion.div>

          <motion.button
            className="contact__form__button"
            initial={{ opacity: 0, y: 60 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 1.6 }}
            whileHover={{
              scale: 1.05,
              transition: { duration: 0.3, ease: 'easeOut' },
            }}
          >
            Submit
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}

export default Contact;
