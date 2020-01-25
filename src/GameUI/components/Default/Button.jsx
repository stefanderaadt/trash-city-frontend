import React from 'react';

const Button = ({ onClick, children, fullwidth, className, busy, disabled, link, ...props }) => {
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

  if (link) {
    return (
      <a href={link} className={`${classes.join(' ')} ${className}`} role="button" {...props}>
        {busy && <i className="icon-busy icon-hour-glass" />}
        {children}
      </a>
    );
  }

  return (
    <div
      onClick={onClickEvent}
      className={`${classes.join(' ')} ${className}`}
      role="button"
      onKeyDown={onClickEvent}
      tabIndex={0}
      {...props}
    >
      {busy && <i className="icon-busy icon-hour-glass" />}
      {children}
    </div>
  );
};

export default Button;
