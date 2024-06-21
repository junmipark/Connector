import React from 'react';
import ReactDOM from 'react-dom/client';
import ConnectorApp from './pjm/ConnectorApp';

const root = ReactDOM.createRoot(document.getElementById('root'));

let qnaStorage = window.localStorage.getItem('qnaStorage');

if (!qnaStorage) {
  qnaStorage = []
} else {
  qnaStorage = JSON.parse(qnaStorage);
}

root.render(
  <React.StrictMode>
    <ConnectorApp qnaStorage={qnaStorage} />
  </React.StrictMode>
);