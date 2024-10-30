import React from 'react';
import classes from './Input.module.css';

const input = (props) => {
  let inputElement = null;
  let inputClasses = [classes.InputElement];
  if (props.invalid === 'true' && props.touched === 'true') {
    inputClasses.push(classes.InValid);
  }

  switch (props.inputtype) {
    case 'input':
      inputElement = <input className={inputClasses.join(' ')} {...props} />;
      break;
    case 'textarea':
      inputElement = <textarea className={inputClasses.join(' ')} {...props} />;
      break;
    default:
      inputElement = <input className={inputClasses.join(' ')} {...props} />;
  }
  return (
    <div className={classes.Input}>
      <label className={classes.Label}>{props.label}</label>
      {inputElement}
      <p style={{ color: 'red' }}>{props.errmessage}</p>
    </div>
  );
};

export default input;