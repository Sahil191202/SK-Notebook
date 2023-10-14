import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Alert from './components/Alert';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'
import NoteState from './context/notes/NoteState';
import Login from './components/Login';
import Signup from './components/Signup';

function App() {
  return (
   <>
   <NoteState>
   <Router>
   <Navbar/>
   <Alert message="React Is Worlds Chutiya Language"/>
      <Switch>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/signup">
          <Signup />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
    </NoteState>
   </>
  );
}

export default App;
