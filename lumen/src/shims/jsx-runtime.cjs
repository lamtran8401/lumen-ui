const React = window.React;
const jsx = (type, props, key) => React.createElement(type, key === undefined ? props : { ...props, key });
module.exports = { Fragment: React.Fragment, jsx, jsxs: jsx, jsxDEV: jsx };
