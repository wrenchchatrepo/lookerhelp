import React, { useState } from 'react';

const Accordion = ({ items }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  const onTitleClick = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="accordion">
      {items.map((item, index) => (
        <div key={index} className="accordion-item">
          <div
            className="accordion-header"
            onClick={() => onTitleClick(index)}
          >
            <h4>{item.title}</h4>
            <span>{activeIndex === index ? '−' : '+'}</span>
          </div>
          <div className={`accordion-content ${activeIndex === index ? 'active' : ''}`}>
            {item.content}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Accordion;
