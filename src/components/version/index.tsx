import React from "react";
const { version } = require("../../../package.json");

const Version = () => {
  return /*#__PURE__*/ React.createElement(
    "div",
    {
      className: "absolute bottom-2 right-2",
    },
    /*#__PURE__*/ React.createElement(
      "span",
      {
        className: "text-xs text-gray-500",
      },
      "v",
      version
    )
  );
};

export default Version;
