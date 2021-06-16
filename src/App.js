import React, { useState } from 'react';

import TokenContext from './contexts/token';
import Routes from './routes';

function App() {
  const [token, setToken] = useState(sessionStorage.getItem('vscdelivery'));

  return (
    <TokenContext.Provider value={{ token, setToken }}>
      <Routes />
    </TokenContext.Provider>
  );
}

export default App;
