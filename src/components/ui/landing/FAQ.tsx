import { useRef, useState } from 'react';
import Button from '../../common/landing/button';
import { IoIosArrowDown } from 'react-icons/io';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';

interface AccordionItem {
  title: string;
  content: string;
}
const accordionItems: AccordionItem[] = [
  {
    title: 'Question text goes here',
    content:
      'PulseGrid is a platform for creating and managing your grid system.',
  },
  {
    title: 'Question text goes here',
    content:
      'PulseGrid is a platform for creating and managing your grid system.',
  },
  {
    title: 'Question text goes here',
    content:
      'PulseGrid is a platform for creating and managing your grid system.',
  },
  {
    title: 'Question text goes here',
    content:
      'PulseGrid is a platform for creating and managing your grid system.',
  },
  {
    title: 'Question text goes here',
    content:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos distinctio libero, animi quas modi mollitia soluta voluptate velit similique aut?',
  },
];

function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const contentRefs = useRef<Array<HTMLDivElement | null>>([]);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="faq" id="faqs" ref={ref}>
      <div className="container">
        <motion.div
          className="faq__content"
          initial={{ opacity: 0, y: 80 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 80 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <motion.div
            className="faq__content__title"
            initial={{ opacity: 0, y: 60 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
          >
            <h2>FAQs</h2>
            <p>Still have a question ? Contact with us !</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.4 }}
            // whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
          >
            <Button text="Contact" border={true} />
          </motion.div>
        </motion.div>

        <motion.div
          className="faq__accordion"
          initial={{ opacity: 0, y: 100 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.6 }}
        >
          {accordionItems.map((item, index) => (
            <motion.div
              key={index}
              className={`accordion-item ${
                openIndex === index ? 'active' : ''
              }`}
              initial={{ opacity: 0, y: 60 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
              transition={{
                duration: 0.6,
                ease: 'easeOut',
                delay: 0.8 + index * 0.1,
              }}
            >
              <button
                className="accordion-header"
                onClick={() => toggleAccordion(index)}
              >
                <span>{item.title}</span>
                <IoIosArrowDown
                  className={`icon ${openIndex === index ? 'rotate' : ''}`}
                />
              </button>
              <div
                ref={(el: HTMLDivElement | null) => {
                  if (el) {
                    contentRefs.current[index] = el;
                  }
                }}
                className="accordion-content"
                style={{
                  maxHeight:
                    openIndex === index
                      ? `${contentRefs.current[index]?.scrollHeight}px`
                      : '0px',
                }}
              >
                <p>{item.content}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default FAQ;
