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
import Video from './components/Video';
import Images from './components/Images';
import Pdf from './components/Pdf';
import NewNav from './components/NewNav';
import AuthState from './context/auth/AuthState';


function App() {
  return (
   <>
   <AuthState>
   <NoteState>
   <Router>
   <NewNav/>
   <Navbar/>
   <Alert message="Welcome To My Drive App Guyzzz By Sahil Khan"/>
      <Switch>
        <Route path="/pdf">
          <Pdf />
        </Route>
        <Route path="/images">
          <Images />
        </Route>
        <Route path="/video">
          <Video />
        </Route>
        <Route path="/notes">
          <About />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
    </NoteState>
   </AuthState>
   </>
  );
}

export default App;
