import React from "react";

import "../index.css";

const Notification = ({ msg }) => {
  return (
    <div className={msg.type === "error" ? "error" : "success"}>
      <p>{msg.content}</p>
    </div>
  );
};

export default Notification;
