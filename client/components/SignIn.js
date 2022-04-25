import React from "react";

const SignIn = () => {
  return (
    <div className="auth-container">
      <div>
        <form>
          <label htmlFor="username">
            <small>Username:</small>
          </label>
          <input name="username" type="text" />
          <label htmlFor="password">
            <small>Password:</small>
          </label>
          <input name="password" type="password"></input>
        </form>
      </div>
      <div></div>
    </div>
  );
};

export default SignIn;
