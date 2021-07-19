import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Search from "../pages/Search";
import PrivateRoute from "../routers/PrivateRoute";
import Navbar from "../components/Navbar";
import Superhero from "../pages/Superhero";
import Error404 from "../pages/Error404";

const AppRouter = () => {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/login" component={Login} />
        <PrivateRoute exact path="/search" component={Search} />
        <PrivateRoute exact path="/superhero/:id" component={Superhero} />
        <PrivateRoute exact path="/" component={Home} />
        <PrivateRoute exact path="*" component={Error404} />
      </Switch>
    </Router>
  );
};

export default AppRouter;
