/* import logo from './logo.svg';
import './App.css'; */
import './styles/styles.scss';
import { BrowserRouter } from 'react-router-dom';

import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header/>
        <Main/>
      </BrowserRouter>
      <Footer/>
    </div>
  );
}

export default App;
