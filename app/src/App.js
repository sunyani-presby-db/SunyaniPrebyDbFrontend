import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import HomePage from './ui/home_page';
import LoginPage from './ui/login';
import ProtectedRoute from './ui/protected_route';
import 'antd/dist/antd.css';

function App() {
  return (
    <Router>
      <Switch>
        <Route path = "/login" component = {LoginPage}/>
        {/* <Route path = "/" component = {HomePage} /> */}
        <Route path = "/">
          <ProtectedRoute compoonent = {HomePage}/>

        </Route>
        
      </Switch>

    </Router>
  );
}

export default App;
