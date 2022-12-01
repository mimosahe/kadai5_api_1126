import React from 'react';
import ReactDOM from 'react-dom/client';

import Weather from "./components/Weather";
import Schedule from "./components/Schedule";

const App = () => {
  return (
    <>
      <h2>きょうの予定</h2>
      <Weather />
      <Schedule />
    </>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
