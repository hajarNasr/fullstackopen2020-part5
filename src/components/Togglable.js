import React, { useState, forwardRef, useImperativeHandle } from "react";
import PropTypes from "prop-types";

const Togglable = forwardRef((props, ref) => {
  const [isVisible, setIsVisible] = useState(false);
  const toggle = isVisible ? "block" : "none";
  const toggleVisible = () => setIsVisible(!isVisible);

  useImperativeHandle(ref, () => toggleVisible);

  return (
    <>
      <div style={{ display: `${toggle}` }} className="togglable-children">
        {props.children}
      </div>
      {isVisible ? (
        <button onClick={toggleVisible}>{props.cancelBtnText}</button>
      ) : (
        <button onClick={toggleVisible} className="show-btn">
          {props.showBtnText}
        </button>
      )}
    </>
  );
});

Togglable.propTypes = {
  showBtnText: PropTypes.string.isRequired,
  cancelBtnText: PropTypes.string.isRequired,
};

Togglable.displayName = "Togglable";

export default Togglable;
