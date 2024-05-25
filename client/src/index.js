import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { WorkoutsContextProvider } from './contexts/workoutsContext';
import { UsersContextProvider } from './contexts/usersContext';
import { SocketContextProvider } from './contexts/socketContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <SocketContextProvider>
      <UsersContextProvider>
        <WorkoutsContextProvider>
          <App />
        </WorkoutsContextProvider>
      </UsersContextProvider>
    </SocketContextProvider>
  </React.StrictMode>
);
