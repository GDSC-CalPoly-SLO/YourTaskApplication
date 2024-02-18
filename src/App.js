import { useState } from 'react';
import './App.css';
import Login from './pages/Login';
import Tasks from './pages/Tasks';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <div className="App">
      {loggedIn ? <Tasks /> : <Login setLoggedIn={setLoggedIn} />}
    </div>
  );
}

export default App;
