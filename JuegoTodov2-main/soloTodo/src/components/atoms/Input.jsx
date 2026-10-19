import React from 'react';

function Input({ type = 'text', className = '', ...props }) {
  return (
    <input
      type={type}
      className={`form-control admin-input-field ${className}`}
      {...props}
    />
  );
}

export default Input;