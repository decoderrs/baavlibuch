import './App.css';
import Main from './Component/MainComponent';
import { BrowserRouter } from 'react-router-dom';
import { ConfigureStore } from './Redux/configureStore';
import { Provider } from 'react-redux';

const store = ConfigureStore();

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="App">
          <Main></Main>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
