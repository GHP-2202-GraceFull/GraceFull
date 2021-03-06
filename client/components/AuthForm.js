import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { useLocation } from "react-router-dom";
import { authenticate } from "../store";

//TODO: Possible separate into two components to avoid excessive conditionals? // might updating back-end routes for user authentication

const AuthForm = (props) => {
  const { name, displayName, handleSubmit, error } = props;
  const location = useLocation();
  return (
    <div id="auth-wrapper">
      <div className="auth-container">
        <form onSubmit={handleSubmit} name={name}>
          <div>
            <label htmlFor="username">
              <small>Username:</small>
            </label>
            <input name="username" type="text" />
          </div>
          <div>
            <label htmlFor="password">
              <small>Password:</small>
            </label>
            <input name="password" type="password" />
          </div>
          {location.pathname === "/signup" && (
            <div>
              <label htmlFor="email">
                <small>Email:</small>
              </label>
              <input name="email" type="text" />
            </div>
          )}
          <div>
            <button className="button" type="submit" id="log-in-button">
              {location.pathname === "/signup" ? <>Sign Up</> : <>Sign In</>}
            </button>
          </div>
          {error && error.response && <div> {error.response.data} </div>}
        </form>
        {location.pathname === "/login" ? (
          <div id="auth-infobox">
            <div>
              <h3>New customer?</h3>
              <p>Create an account with us to:</p>
              <ul>
                <li>Earn rewards for your purchases</li>
                <li>Checkout faster</li>
                <li>Keep track of past orders</li>
              </ul>
            </div>
            <Link to="/signup">
              <button type="button" id="sign-up-button" className="button">
                Sign Up
              </button>
            </Link>
          </div>
        ) : (
          <div id="auth-infobox">
            <div>
              <h3>Already have an account?</h3>
              <p>Click below to navigate back to the log in page. </p>
            </div>
            <Link to="/login">
              <button type="button" id="sign-up-button" className="button">
                Log In
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */

const mapLogin = (state) => {
  return {
    name: "login",
    displayName: "Login",
    error: state.auth.error,
  };
};

const mapSignup = (state) => {
  return {
    name: "signup",
    displayName: "Sign Up",
    error: state.auth.error,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleSubmit(evt) {
      evt.preventDefault();
      const formName = evt.target.name;
      const username = evt.target.username.value;
      const password = evt.target.password.value;
      let email = null;
      if (formName === "signup") {
        email = evt.target.email.value;
      }
      dispatch(authenticate(username, password, email, formName));
    },
  };
};

export const Login = connect(mapLogin, mapDispatch)(AuthForm);
export const Signup = connect(mapSignup, mapDispatch)(AuthForm);
