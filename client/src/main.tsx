import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import Store from './store/store.ts';

interface StateStore {
  store: Store;
}

const store = new Store();

export const Context = createContext<StateStore>({
  store,
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Context.Provider
    value={{
      store,
    }}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Context.Provider>,
);
