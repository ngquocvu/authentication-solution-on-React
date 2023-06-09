import './App.css';
import Router from './routes';

import { MantineProvider } from '@mantine/core';

function App() {
  return (
    <MantineProvider>
      <Router />
    </MantineProvider>
  );
}

export default App;
