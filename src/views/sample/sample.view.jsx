import PropTypes from 'prop-types';
import React from 'react';

import { Button } from 'components';

export const SampleView = ({ message = 'hello' }) => {
  const handleClick = () => {
    window.alert(message);
  };

  return (
    <div>
      <h1>Lorem ipsum</h1>
      <Button text='Click me' onClick={handleClick} />
    </div>
  );
};

SampleView.propTypes = {
  message: PropTypes.string,
};
