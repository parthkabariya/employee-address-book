import React from 'react';
import PropTypes from "prop-types";

const Toast = ({message}) => {
  return (
    <div className={'toaster-wrapper' +((message == false)?' fade-out':'')} >
      {message}
    </div>
  );
};

Toast.propTypes = {
  message: PropTypes.any,
};

export default Toast;
