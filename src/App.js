import Signup from "./Components/Signup";
import Login from "./Components/Login";
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import { AuthProvider } from "./Context/Auth";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Switch>
          <Route path="/signup" component={Signup}/>
          <Route path="/login" component={Login}/>
        </Switch>
      </AuthProvider>
    </Router>
  );
}

export default App;
