import { Login, Profile, Signup } from './Pages';
import { AuthRoute, PrivateRoute } from './routes';
import { BrowserRouter, Switch, Redirect } from 'react-router-dom';

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Redirect exact path="/" to="/login" />
        <AuthRoute exact path="/login" component={Login} />
        <AuthRoute exact path="/signup" component={Signup} />
        <PrivateRoute exact path="/profile" component={Profile} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
