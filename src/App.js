import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import './App.css';
import SignIn from './components/Auth/SignIn';
import SignUp from './components/Auth/SignUp';
import Home from './components/Home';
import LandingPage from './components/LandingPage';
import Navbar from './components/UI/Navbar';
import Footer from './components/UI/Footer';
import { useAuthContext } from './hooks/useAuthContext';
import Profile from './components/Users/Profile';
import Dashboard from './components/Dashboard/Dashboard';
import OnlineUsers from './components/Users/OnlineUsers';
import CreateProject from './components/Dashboard/CreateProject';
import AllProjects from './components/Dashboard/AllProjects';
import SingleProject from './components/Dashboard/SingleProject';
import EditProfile from './components/Users/EditProfile';
import FetchProfiles from './components/Home/FetchProfiles';
import MessagingPage from './components/Messaging/MessagingPage'
import SingleConversation from './components/Messaging/SingleConversation'
import AdminPanel from './components/admin/adminPanel';
import GoogleCalendar from './components/Calendar/GoogleCalendar';
import Calendar from './components/Calendar/Calendar';
import MyCalendar from './components/Calendar/MyCalendar';
import Transactions from './components/Transactions/Transactions';
import StaticCalendar from './components/Calendar/Calendar';
import PublicProfile from "./components/Users/PublicProfile"

import AllConversations from './components/Messaging/AllConversations'

function App() {
  const { authIsReady, user } = useAuthContext();

  return (
    <>
      <div className="min-h-max">
        {/* <div>
      <Navbar />
      </div> */}
        <div>
          {authIsReady && (
            <BrowserRouter>
              <Switch>
                <Route exact path="/">
                  <LandingPage />
                </Route>
                <Route exact path="/landing">
                  <LandingPage />
                </Route>
                <Route exact path="/home">
                  {user ? <Home /> : <Redirect to="/signin" />}
                </Route>
                <Route path="/home" component={Home} />
                <Route path="/signin">
                  <SignIn />
                </Route>
                <Route path="/signup">
                  {user ? <Redirect to="/" /> : <SignUp />}
                </Route>
                <Route exact path="/publicprofile/:id">
                  <PublicProfile />
                </Route>
                <Route exact path="/profile/:id">
                  {!user && <Redirect to="/signin" />}
                  <Profile />
                </Route>
                <Route exact path="/editprofile/:id">
                  {!user && <Redirect to="/signin" />}
                  <EditProfile />
                </Route>
                <Route path="/dashboard">
                  {!user && <Redirect to="/signin" />}
                  {user && <Dashboard />}
                </Route>
                <Route path="/createproject">
                  {!user && <Redirect to="/signin" />}
                  {user && <CreateProject />}
                </Route>
                <Route path="/projects/:id">
                  {!user && <Redirect to="/signin" />}
                  {user && <SingleProject />}
                </Route>
                <Route path="/fetchProfiles">
                  <FetchProfiles />
                </Route>
                <Route path="/calendar">
                  {!user && <Redirect to="/signin" />}
                  {user && <GoogleCalendar />}
                </Route>
                <Route path="/mycalendar">
                  {/* <MyCalendar/> */}
                  <StaticCalendar />
                </Route>
                <Route path="/transaction">
                  <Transactions />
                </Route>
                <Route path="/messages">
                  {/* <MessagingPage /> */}
                </Route>
                <Route path="/conversations/:id">
                  {!user && <Redirect to="/login" />}
                  {user && <SingleConversation />}
                </Route>
                <Route path="/allconversations">
                  {!user && <Redirect to="/login" />}
                  {user && <AllConversations />}
                </Route>
                <Route exact path="/admin">
                  <AdminPanel />
                </Route>
              </Switch>
            </BrowserRouter>
          )}
        </div>
        <Footer />
      </div>
    </>
  );
}

export default App;
