import React from 'react';
import classnames from 'classnames';
import './Toggle.css';

const Toggle = ({checked, onChange, children}) => {
  const getClassnames = () => {
    return classnames(['toggle', {'active': checked}]);
  }

  return (
    <div className="toggle-group">
      <label className={getClassnames()}>
        <input type="checkbox" checked={checked} onChange={onChange} />
        <span className="toggle-switch"></span>
      </label>
      <label>{children}</label>
    </div>
  )
}

export default Toggle;
