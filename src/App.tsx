import { Provider } from 'react-redux';
import './App.css';
import Router from './routes';

import { MantineProvider } from '@mantine/core';
import { store } from './redux/store';

function App() {
  return (
    <Provider store={store}>
      <MantineProvider>
        <Router />
      </MantineProvider>
    </Provider>
  );
}

export default App;
