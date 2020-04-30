import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from "react-redux";
import { IntlProvider } from "react-intl";
import { store } from "./store";

ReactDOM.render(
  <Provider store={store}>
    <IntlProvider locale="en">
      <App />
    </IntlProvider>
  </Provider>
  ,
  document.getElementById('root')
);

serviceWorker.unregister();
