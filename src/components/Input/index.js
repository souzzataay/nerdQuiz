import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const InputBase = styled.input`
    width:100%;
    padding:15px;
    font-size:14px;
    border:1px solid ${({theme}) => theme.colors.inputBorder};
    color: ${({theme}) => theme.colors.contrastText};
    background-color:${({theme}) => theme.colors.inputBg};
    border-radius:${({theme}) => theme.colors.borderRadius};
    outline:0px;
    margin-bottom:25px;
    ::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
    color: #00ff00;
 
}

   
    `;

export default function Input({ onChange, placeholder, ...props }){
  return(
    <div>
          <InputBase 
            placeholder={placeholder} 
            onChange={onChange}
            {...props}

            />
        </div>
  );
}

Input.defaultProp = {
    value:'',
};

Input.propTypes = {
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
};