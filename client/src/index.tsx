import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter as Router} from 'react-router-dom'
import './index.css';
import App from './components/App/App';
import Store from './store/store';

interface State {
  store: Store
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const store = new Store();

export const Context = createContext<State>({
  store
})
root.render(
  <Router>
    <Context.Provider value={{
      store
    }}>
      <App />
    </Context.Provider>
  </Router>
);

