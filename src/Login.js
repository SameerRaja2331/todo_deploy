import React from "react";

const Login = (props) => {
  const {
    email,
    setEmail,
    password,
    setPassword,
    handleLogin,
    handleSignup,
    hasAccount,
    setHasAccount,
    emailError,
    passwordError,
  } = props;

  return (
    <section className="login">
      <div className="loginContainer">
        <label>Username</label>
        <input
          autoFocus
          type="text"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <p className="errorMsg">{emailError}</p>
        <label>password</label>
        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <p className="errorMsg">{passwordError}</p>
        <div className="btnContainer">
          {hasAccount ? (
            <>
              <button onClick={handleLogin} className="login-page-button">
                Sign In
              </button>
              <p>
                Don't have an account ?
                <span onClick={() => setHasAccount(!hasAccount)}>Sign up</span>
              </p>
            </>
          ) : (
            <>
              <button onClick={handleSignup} className="login-page-button">
                Sign Up
              </button>
              <p>
                Have an account ?
                <span onClick={() => setHasAccount(!hasAccount)}>Sign In</span>
              </p>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default Login;
