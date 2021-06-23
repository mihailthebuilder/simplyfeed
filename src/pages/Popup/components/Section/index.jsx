import React from 'react';

const Section = ({ sectionId, heading, children }) => {
  return (
    <section id={sectionId}>
      <h3>{heading}</h3>
      {children}
    </section>
  );
};

export default Section;
