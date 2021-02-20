import React, { useState, forwardRef, useImperativeHandle } from "react";

const Togglable = forwardRef((props, ref) => {
  const [isVisible, setIsVisible] = useState(false);
  const toggle = isVisible ? "block" : "none";
  const toggleVisible = () => setIsVisible(!isVisible);

  useImperativeHandle(ref, () => toggleVisible);

  return (
    <>
      <div style={{ display: `${toggle}` }}>{props.children}</div>
      {isVisible ? (
        <button onClick={toggleVisible}>{props.cancelBtnText}</button>
      ) : (
        <button onClick={toggleVisible}>{props.showBtnText}</button>
      )}
    </>
  );
});

export default Togglable;
