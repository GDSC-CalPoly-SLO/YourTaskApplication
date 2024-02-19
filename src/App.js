import { useState } from 'react';
import './App.css';
import Login from './pages/Login';
import Home from './pages/Home';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <div className="App">
      {loggedIn ? <Home /> : <Login setLoggedIn={setLoggedIn} />}
    </div>
  );
}

export default App;
