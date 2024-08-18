import React, { useState } from 'react';
import "../css/SignUp.css";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setsetshowConfirmPassword] = useState(false)
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const toggleConfirmPasswordVisibility=()=>{
    setsetshowConfirmPassword(!showConfirmPassword)
  }

  return (
    <div className="page-border">
    <div className="page-container">
      <div className="image-container">
        <img src="background-signup.jpeg" alt="" />
        {/* <img src="signup-bg.png" alt="" /> */}
      </div>
      <div className="signup">
        <h1>SIGN UP</h1>
        <p>Sign up now to unlock exclusive tools that will enhance your AO3 experience & keep your fanfiction journey organized and enjoyable.</p>
        <form>
          {/* first */}
          <div className="input-box">
            <div className="input-fields">
              <span className="icon"><svg xmlns="http://www.w3.org/2000/svg" width="19" height="24" viewBox="0 0 19 24" fill="none">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M9.75006 1.25C8.49028 1.25 7.2821 1.75044 6.3913 2.64124C5.5005 3.53204 5.00006 4.74022 5.00006 6C5.00006 7.25978 5.5005 8.46796 6.3913 9.35876C7.2821 10.2496 8.49028 10.75 9.75006 10.75C11.0098 10.75 12.218 10.2496 13.1088 9.35876C13.9996 8.46796 14.5001 7.25978 14.5001 6C14.5001 4.74022 13.9996 3.53204 13.1088 2.64124C12.218 1.75044 11.0098 1.25 9.75006 1.25ZM6.50006 6C6.50006 5.13805 6.84247 4.3114 7.45196 3.7019C8.06145 3.09241 8.8881 2.75 9.75006 2.75C10.612 2.75 11.4387 3.09241 12.0482 3.7019C12.6576 4.3114 13.0001 5.13805 13.0001 6C13.0001 6.86195 12.6576 7.6886 12.0482 8.2981C11.4387 8.90759 10.612 9.25 9.75006 9.25C8.8881 9.25 8.06145 8.90759 7.45196 8.2981C6.84247 7.6886 6.50006 6.86195 6.50006 6ZM9.75006 12.25C7.43706 12.25 5.30506 12.776 3.72606 13.664C2.17006 14.54 1.00006 15.866 1.00006 17.5V17.602C0.999056 18.764 0.998056 20.222 2.27706 21.264C2.90606 21.776 3.78706 22.141 4.97706 22.381C6.16906 22.623 7.72406 22.75 9.75006 22.75C11.7761 22.75 13.3301 22.623 14.5241 22.381C15.7141 22.141 16.5941 21.776 17.2241 21.264C18.5031 20.222 18.5011 18.764 18.5001 17.602V17.5C18.5001 15.866 17.3301 14.54 15.7751 13.664C14.1951 12.776 12.0641 12.25 9.75006 12.25ZM2.50006 17.5C2.50006 16.649 3.12206 15.725 4.46106 14.972C5.77706 14.232 7.64506 13.75 9.75106 13.75C11.8551 13.75 13.7231 14.232 15.0391 14.972C16.3791 15.725 17.0001 16.649 17.0001 17.5C17.0001 18.808 16.9601 19.544 16.2761 20.1C15.9061 20.402 15.2861 20.697 14.2261 20.911C13.1691 21.125 11.7241 21.25 9.75006 21.25C7.77606 21.25 6.33006 21.125 5.27406 20.911C4.21406 20.697 3.59406 20.402 3.22406 20.101C2.54006 19.544 2.50006 18.808 2.50006 17.5Z" fill="#5A5A5A" fill-opacity="0.3" />
                <path d="M3.65253 13.5333L3.65247 13.5333C2.07531 14.4212 0.850056 15.7874 0.850056 17.5V17.6019V17.602L0.850042 17.6178C0.849022 18.7702 0.847673 20.293 2.18231 21.3803L2.18236 21.3803C2.83721 21.9134 3.74426 22.2854 4.94721 22.528C6.15288 22.7728 7.71892 22.9 9.75006 22.9C11.7811 22.9 13.3461 22.7728 14.5537 22.528C15.7568 22.2854 16.6629 21.9134 17.3187 21.3804L17.3188 21.3803C18.6525 20.2938 18.6511 18.7724 18.6501 17.6204L18.6501 17.602V17.6019V17.5C18.6501 15.7874 17.4248 14.4212 15.8487 13.5333L15.8485 13.5332C14.2422 12.6304 12.0849 12.1 9.75006 12.1C7.41618 12.1 5.25788 12.6304 3.65253 13.5333ZM14.9655 15.1027L14.9656 15.1028C16.2832 15.8432 16.8501 16.7268 16.8501 17.5C16.8501 18.8221 16.8017 19.4794 16.1814 19.9836L16.1812 19.9838C15.8372 20.2646 15.2434 20.5526 14.1964 20.764L14.1963 20.764C13.1529 20.9752 11.7189 21.1 9.75006 21.1C7.78121 21.1 6.34622 20.9752 5.30385 20.764L5.30374 20.764C4.25683 20.5526 3.66292 20.2646 3.31877 19.9847C2.6984 19.4795 2.65006 18.822 2.65006 17.5C2.65006 16.7268 3.21781 15.8432 4.53458 15.1027C5.82426 14.3775 7.66598 13.9 9.75106 13.9C11.8341 13.9 13.6758 14.3775 14.9655 15.1027ZM9.75006 1.1C8.4505 1.1 7.20416 1.61625 6.28523 2.53518C5.3663 3.4541 4.85006 4.70044 4.85006 6C4.85006 7.29956 5.3663 8.5459 6.28523 9.46482C7.20416 10.3838 8.4505 10.9 9.75006 10.9C11.0496 10.9 12.296 10.3838 13.2149 9.46482C14.1338 8.5459 14.6501 7.29956 14.6501 6C14.6501 4.70044 14.1338 3.4541 13.2149 2.53518C12.296 1.61625 11.0496 1.1 9.75006 1.1ZM6.65006 6C6.65006 5.17783 6.97666 4.38933 7.55803 3.80797C8.13939 3.22661 8.92789 2.9 9.75006 2.9C10.5722 2.9 11.3607 3.22661 11.9421 3.80797C12.5234 4.38933 12.8501 5.17783 12.8501 6C12.8501 6.82217 12.5234 7.61067 11.9421 8.19203C11.3607 8.77339 10.5722 9.1 9.75006 9.1C8.92789 9.1 8.13939 8.77339 7.55803 8.19203C6.97666 7.61067 6.65006 6.82217 6.65006 6Z" stroke="#5A5A5A" stroke-opacity="0.3" stroke-width="0.3" />
              </svg></span>
              <input type="text" placeholder="Username" />
            </div>
          </div>
          {/* first ends */}
          {/* second */}
          <div className="input-box">
            <div className="input-fields">
              <span className="icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="16" viewBox="0 0 24 16" fill="none">
                <path d="M1 1H23M1 1V15M1 1L8.85714 8M23 1V15M23 1L15.1429 8M23 15H1M23 15L15.1429 8M1 15L8.85714 8M8.85714 8L11.3348 10.2074C11.7139 10.5451 12.2861 10.5451 12.6652 10.2074L15.1429 8" stroke="#5A5A5A" stroke-opacity="0.3" stroke-width="1.7" stroke-linejoin="round" />
              </svg></span>
              <input type="email" placeholder="Email" />
            </div>

          </div>
          {/* second ends */}
          {/* third */}
          <div className="input-box">
            <div className="input-fields">
              <span className="icon"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="22" viewBox="0 0 16 22" fill="none">
                <path d="M4 8.5H2C1.44772 8.5 1 8.94771 1 9.5V19.5C1 20.0523 1.44772 20.5 2 20.5H14C14.5523 20.5 15 20.0523 15 19.5V9.5C15 8.94772 14.5523 8.5 14 8.5H12M4 8.5V6.26472C4 5.41716 4.03774 4.54628 4.41336 3.7865C5.92055 0.737835 10.0794 0.737834 11.5866 3.7865C11.9623 4.54628 12 5.41716 12 6.26472V8.5M4 8.5H12" stroke="#5A5A5A" stroke-opacity="0.3" stroke-width="2" />
                <circle cx="8" cy="14.5" r="1" fill="#5A5A5A" fill-opacity="0.3" />
                <circle cx="8" cy="14.5" r="1.5" stroke="#5A5A5A" stroke-opacity="0.3" />
              </svg></span>
              <input type={showPassword ? "text" : "password"} placeholder="Password" />
              <span className="toggle-password" onClick={togglePasswordVisibility}>
  {showPassword ? (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-eye">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
      <circle cx="12" cy="12" r="3"></circle>
    </svg>
  ) : (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-eye-off">
      <path d="M17.94 17.94A10.94 10.94 0 0 1 12 20.94C6.48 20.94 1.73 16.19 1.73 12c0-.75.08-1.47.22-2.17m1.43-3.43A10.93 10.93 0 0 1 12 3.06c5.52 0 10.27 4.75 10.27 8.94 0 .75-.08 1.47-.22 2.17m-1.43 3.43L4.1 4.1m2.23 2.23L12 12"></path>
      <path d="M1 1l22 22"></path>
    </svg>
  )}
</span>

            </div>
          </div>
          {/* third ends */}
          {/* fourth */}
          <div className="input-box">
            <div className="input-fields">
              <span className="icon"><svg xmlns="http://www.w3.org/2000/svg" width="21" height="24" viewBox="0 0 21 24" fill="none">
                <path d="M9 10.5201H7C6.44772 10.5201 6 10.9678 6 11.5201V21.5201C6 22.0724 6.44772 22.5201 7 22.5201H19C19.5523 22.5201 20 22.0724 20 21.5201V11.5201C20 10.9678 19.5523 10.5201 19 10.5201H17M9 10.5201V8.28483C9 7.43727 9.03774 6.56639 9.41336 5.80661C10.9206 2.75795 15.0794 2.75794 16.5866 5.80661C16.9623 6.56639 17 7.43727 17 8.28483V10.5201M9 10.5201H17" stroke="#5A5A5A" stroke-opacity="0.3" stroke-width="2" />
                <circle cx="13" cy="16.5201" r="1" fill="#5A5A5A" fill-opacity="0.3" />
                <circle cx="13" cy="16.5201" r="1.5" stroke="#5A5A5A" stroke-opacity="0.3" />
                <path d="M4 7.78308H2C1.44772 7.78308 1 8.2308 1 8.78308V18.7831C1 19.3354 1.44772 19.7831 2 19.7831H5M4 7.78308V7.27093C4 5.30248 4.30721 3.09425 5.99766 2.0857C7.97149 0.908088 10.2747 1.56962 11 3.02014M4 7.78308H8" stroke="#5A5A5A" stroke-opacity="0.3" stroke-width="2" />
              </svg></span>
              <input type="password" placeholder="Confirm Password" />
              <span className="toggle-password" onClick={toggleConfirmPasswordVisibility}>
  {showConfirmPassword ? (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-eye">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
      <circle cx="12" cy="12" r="3"></circle>
    </svg>
  ) : (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-eye-off">
      <path d="M17.94 17.94A10.94 10.94 0 0 1 12 20.94C6.48 20.94 1.73 16.19 1.73 12c0-.75.08-1.47.22-2.17m1.43-3.43A10.93 10.93 0 0 1 12 3.06c5.52 0 10.27 4.75 10.27 8.94 0 .75-.08 1.47-.22 2.17m-1.43 3.43L4.1 4.1m2.23 2.23L12 12"></path>
      <path d="M1 1l22 22"></path>
    </svg>
  )}
</span>

            </div>
          </div>
          {/* fourth ends */}

          <div className="or-divider">
            <hr className="divider" />
            <span>OR</span>
            <hr className="divider" />
          </div>
          <button className="google-signup">
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
              <path d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4191C28.045 27.2142 24.3525 30 20 30C14.4775 30 9.99998 25.5225 9.99998 20C9.99998 14.4775 14.4775 10 20 10C22.5491 10 24.8683 10.9617 26.6341 12.5325L31.3483 7.81834C28.3716 5.04417 24.39 3.33334 20 3.33334C10.7958 3.33334 3.33331 10.7958 3.33331 20C3.33331 29.2042 10.7958 36.6667 20 36.6667C29.2041 36.6667 36.6666 29.2042 36.6666 20C36.6666 18.8825 36.5516 17.7917 36.3425 16.7358Z" fill="#FFC107" />
              <path d="M5.255 12.2425L10.7308 16.2583C12.2125 12.59 15.8008 10 20 10C22.5492 10 24.8683 10.9617 26.6342 12.5325L31.3483 7.81834C28.3717 5.04417 24.39 3.33334 20 3.33334C13.5983 3.33334 8.04667 6.9475 5.255 12.2425Z" fill="#FF3D00" />
              <path d="M20 36.6667C24.305 36.6667 28.2166 35.0192 31.1741 32.34L26.0158 27.975C24.2863 29.2903 22.1729 30.0017 20 30C15.665 30 11.9841 27.2358 10.5975 23.3783L5.16248 27.5658C7.92081 32.9633 13.5225 36.6667 20 36.6667Z" fill="#4CAF50" />
              <path d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.7618 25.1804 27.5778 26.7943 26.0133 27.9758L26.0158 27.9742L31.1742 32.3392C30.8092 32.6708 36.6667 28.3333 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z" fill="#1976D2" />
            </svg>
            Sign up with Google
          </button>
          <button className="signup-button">SIGN UP</button>
        </form>
        <p className="login-link">Already have an account? <a href="#">Login</a></p>
      </div>
    </div>
    </div>
  );
};

export default SignUp;
