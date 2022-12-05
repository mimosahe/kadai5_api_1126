import React from 'react';
import ReactDOM from 'react-dom/client';

import {Weather} from "./components/Weather";
import Schedule from "./components/Schedule";
import Date from "./components/Date";

const App = () => {
  return (
    <>
      <h2>きょうの予定</h2>
      <Date />
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
