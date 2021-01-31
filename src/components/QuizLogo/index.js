import styled from 'styled-components';

import React from 'react';
import PropTypes from 'prop-types';

function Logo({ className }) {
  return (
    <svg className={className} width="200" height="67" viewBox="0 0 200 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    
     <text x="5" y="50" fill="white" > QUIZ NERD </text>
     <path stroke="green" d="M5 60 l215 0" />
   
      <defs>
        <clipPath id="clip0">
          <rect width="200" height="67" fill="white" />
          
        </clipPath>
      </defs>
    </svg>
  );
}

Logo.propTypes = {
  className: PropTypes.string.isRequired,
};

const QuizLogo = styled(Logo)`
  margin: auto;
  display: block;
  font-size: 40px;
  font-family:serif;

  @media screen and (max-width: 500px) {
    margin: 0;
  }
`;

export default QuizLogo;
