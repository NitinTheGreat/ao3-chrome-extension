import React from 'react';
import "../css/Login.css";

const Login = () => {
  return (
    <div className="signup-container">
      <div className="signup-box">
        <h1>SIGN UP</h1>
        <p>Sign up now to unlock exclusive tools that will enhance your AO3 experience & keep your fanfiction journey organized and enjoyable.</p>
        <form>
          <input type="text" placeholder="Username" className="input-field" />
          <input type="email" placeholder="Email" className="input-field" />
          <input type="password" placeholder="Password" className="input-field" />
          <input type="password" placeholder="Confirm Password" className="input-field" />
          <div className="or-divider">
            <hr className="divider" />
            <span>OR</span>
            <hr className="divider" />
          </div>
          <button className="google-signup">
            <img src="https://upload.wikimedia.org/wikipedia/commons/4/4a/Logo_2013_Google.png" alt="Google Logo" />
            Sign up with Google
          </button>
          <button className="signup-button">SIGNUP</button>
        </form>
        <p className="login-link">Already have an account? <a href="#">Login</a></p>
      </div>
    </div>
  );
};

export default Login;
