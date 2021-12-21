import Signup from "./Components/Signup";
import Login from "./Components/Login";
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import { AuthProvider } from "./Context/Auth";
import Feed from "./Components/Feed";
import Profile from "./Components/Profile";
import PrivateRouting from "./Components/PrivateRouting";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Switch>
          <Route path="/signup" component={Signup}/>
          <Route path="/login" component={Login}/>
          <PrivateRouting path="/profile/:id" component={Profile}/>
          <PrivateRouting path="/" component={Feed}/>
        </Switch>
      </AuthProvider>
    </Router>
  );
}

export default App;
