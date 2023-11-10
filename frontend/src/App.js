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
import Select from './components/Select';
import PostForm from './components2/feed/PostForm';
import Searchuser from './components2/feed/Searchuser';


// import Chat from './components/Chat';


function App() {
  return (
    <>
      <AuthState>
        <NoteState>
          <Router>
            <Switch>
              <Route path="/movies">
                <Nav />
                <NewNav />
                <Movies />
              </Route>
              <Route path="/pdf">
                <Nav />
                <NewNav />
                <Pdf />
              </Route>
              <Route path="/images">
                <Nav />
                <NewNav />
                <Images />
              </Route>
              <Route path="/video">
                <Nav />
                <NewNav />
                <Video />
              </Route>
              <Route path="/notes">
                <Nav />
                <NewNav />
                <About />
              </Route>
              <Route path="/searchuser">
                <Searchuser />
              </Route>
              <Route path="/createpost">
                <PostForm />
              </Route>
              <Route path="/social">
                <SHome />
              </Route>
              <Route path="/select">
                <Select />
              </Route>
              <Route path="/">
                <Nav />
                <NewNav />
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
