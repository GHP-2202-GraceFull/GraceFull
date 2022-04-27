import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { withRouter, Route, Switch, Redirect } from "react-router-dom";
import { Login, Signup } from "./components/AuthForm";
import AllProducts from "./components/AllProducts";
import Home from "./components/Home";
import SingleProduct from "./components/SingleProduct";
// import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import Cart from "./components/Cart";
import LandingPage from "./components/LandingPage";
import { me } from "./store";
import AdminDash from "./components/Admin/AdminDash";
import AllOrders from "./components/AllOrders";
import Thankyou from "./components/Thankyou";
import Card from "./components/Payment"
/**
 * COMPONENT
 */

class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData();
  }

  render() {
    const { isLoggedIn } = this.props;

    return (
      <div>
        {isLoggedIn ? (
          <Switch>
            <Route exact path="/" component={LandingPage} />
            {/* <Redirect to="/" /> */}
            <Route exact path="/products" component={AllProducts} />
            <Route exact path="/cart" component={Cart} />
            <Route path="/products/:id" component={SingleProduct} />
            <Route exact path="/checkout" component={Checkout} />
            <Route path="/admin" component={AdminDash} />
            <Route exact path="/orders" component={AllOrders} />
            <Route exact path ='/thankyou' component={Thankyou} />
            <Route exact path ='/payment' component={Card} />
          </Switch>
        ) : (
          <Switch>
            <Route path="/" exact component={LandingPage} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route exact path="/products" component={AllProducts} />
            <Route exact path="/checkout" component={Checkout} />
            <Route exact path="/cart" component={Cart} />
            <Route path="/products/:id" component={SingleProduct} />
            <Route exact path ='/thankyou' component={Thankyou} />
            <Route exact path ='/payment' component={Card} />
          </Switch>
        )}
      </div>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.auth that has a truthy id.
    // Otherwise, state.auth will be an empty object, and state.auth.id will be falsey
    isLoggedIn: !!state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      dispatch(me());
    },
  };
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes));
