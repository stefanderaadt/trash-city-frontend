import React from 'react';

const Button = ({ onClick, children, fullwidth, className, busy, disabled }) => {
  const onClickEvent = e => {
    if (disabled || busy) return;
    onClick(e);
  };

  const classes = ['button'];

  if (fullwidth) {
    classes.push('full-width');
  }

  if (disabled) {
    classes.push('disabled');
  }

  return (
    <div
      onClick={onClickEvent}
      className={`${classes.join(' ')} ${className}`}
      role="button"
      onKeyDown={onClickEvent}
      tabIndex={0}
    >
      {busy && <i className="icon-busy icon-hour-glass" />}
      {children}
    </div>
  );
};

export default Button;
