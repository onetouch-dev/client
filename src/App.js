import { BrowserRouter, Switch, Redirect } from 'react-router-dom';

import { Login, Profile, Signup, ChangePassword } from './Pages';
import { AuthRoute, PrivateRoute } from './routes';

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Redirect exact path="/" to="/login" />
        <AuthRoute exact path="/login" component={Login} />
        <AuthRoute exact path="/signup" component={Signup} />
        <PrivateRoute exact path="/profile" component={Profile} />
        <PrivateRoute exact path="/change-password" component={ChangePassword} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
