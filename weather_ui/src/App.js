import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Navigation from './components/login_and_register_folder/Navigation.js';
import Login_register_page from './pages/login_and_register_form';
import Weather_page from './pages/weather_page';

function App() {
  return (
    <Router>
      <div>
      <Navigation />
        <Routes>
          <Route exact path="/" element={<Login_register_page/>} />
          <Route path="/home" element={<Weather_page/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
