import React from "react";

export const ContentFrame = ({ refProp }) => {
  return (
    <div
      style={{
        position: "fixed",
        left: 0,
        top: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
      }}
      ref={refProp}
    />
  );
};
