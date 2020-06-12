import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';

// [ REDUX ]
import { Provider } from 'react-redux';
import { store, persistor } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';

// [ STYLING ]
import './index.css';

// [ COMPONENTS ]
import ECommerceApp from './ECommerceApp';



ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <PersistGate persistor={persistor} >
        <ECommerceApp />
      </PersistGate>
    </BrowserRouter>
  </Provider>,
  document.getElementById('eCommerceApp')
);

serviceWorker.register();