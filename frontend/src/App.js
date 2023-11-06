import './App.css';
import Home from './components/Home';
import About from './components/About';
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
import Nav from './components/Nav';
import Movies from './components/Movies';
import SHome from './pages/home/SHome';
// import Chat from './components/Chat';


function App() {
  return (
   <>
   <AuthState>
  <Router>
   <SHome />
  </Router>
   {/* <NoteState> */}
   {/* <Router> */}
    {/* <Nav /> */}
   {/* <NewNav/> */}
   {/* <Alert message="Welcome To My Drive App Guyzzz By Sahil Khan"/> */}
      {/* <Switch> */}
        {/* <Route path="/chat">
          <Chat />
        </Route>
        <Route path="/movies">
          <Movies />
        </Route>
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
  //  </AuthState> */}
  </AuthState> 
   </>
  );
}

export default App;
