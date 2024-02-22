import LoginModalRegisterContent from "./LoginModalRegisterContent";
import appleLogo from "/apple-logo.svg";
import googleLogo from "/google-logo.svg";
import gitHubLogo from "/github-logo.svg";
import { Dispatch, ReactNode, SetStateAction, useState } from "react";

type LoginModalLoginContentProps = {
  setLoginDialogContent: Dispatch<SetStateAction<ReactNode>>;
  toggleLoginDialog: () => void;
  userAuthed: null | {
    userId: number;
    username: string;
  };
  setUserAuthed: Dispatch<
    SetStateAction<{ userId: number; username: string } | null>
  >;
};

const LoginModalLoginContent = (props: LoginModalLoginContentProps) => {
  const [userLoginDetails, setUserLoginDetails] = useState<{
    username: string;
    password: string;
  }>({ username: "", password: "" });

  // Handle login/authentication
  const handleLoginSubmit: React.MouseEventHandler<HTMLButtonElement> = (
    e
  ): void => {
    e.preventDefault();

    const formData = { ...userLoginDetails };
    const jsonData = JSON.stringify(formData);

    // Send JSON data using fetch
    // const URL = "http://localhost:3001";
    // const URL = "https://nightlife-8ddy.onrender.com";
    fetch("/api/login", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        // "Access-Control-Allow-Origin": "https://nightlifeapp.onrender.com",
      },
      body: jsonData,
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle response data
        console.log(
          "And the response data from this fetch request is... : ",
          data
        );
        if (data.loginSuccessful) {
          props.setUserAuthed({
            userId: data.userId,
            username: data.username,
          });
          props.toggleLoginDialog();
        }
      })
      .catch((error) => {
        // Handle errors
        console.error("Error:", error);
      });
  };

  return (
    <>
      <h2 className="login-modal-header">Log in to your account</h2>
      <div className="login-modal-OAuth-btns flex-column">
        <button className="btn-OAuth">
          <img className="OAuth-logo" alt="Google logo" src={googleLogo} />
          <span>Continue with Google</span>
        </button>
        <button className="btn-OAuth">
          <img className="OAuth-logo" alt="GitHub logo" src={gitHubLogo} />
          <span>Continue with GitHub</span>
        </button>
        <button className="btn-OAuth">
          <img className="OAuth-logo" alt="Apple logo" src={appleLogo} />
          <span>Continue with Apple</span>
        </button>
      </div>
      <div className="login-modal-divider">
        <div className="line"></div>
        <p>OR</p>
        <div className="line"></div>
      </div>
      <form id="loginForm" className="login-form">
        {/* Username Input */}
        <div className="flex-column">
          <label className="login-form-input-label" htmlFor="username">
            Username
          </label>
          <input
            className="login-form-input"
            type="text"
            id="loginUsername"
            name="username"
            placeholder="Username (max 15 chars)"
            value={userLoginDetails?.username}
            onChange={(e): void => {
              setUserLoginDetails((prevState) => ({
                ...prevState,
                username: e.target.value,
              }));
            }}
            required
          />
        </div>

        {/* Password Input */}
        <div className="flex-column">
          <label className="login-form-input-label" htmlFor="password">
            Password
          </label>
          <input
            className="login-form-input"
            type="password"
            id="loginUassword"
            name="password"
            placeholder="Password"
            value={userLoginDetails?.password}
            onChange={(e): void => {
              setUserLoginDetails((prevState) => ({
                ...prevState,
                password: e.target.value,
              }));
            }}
            required
          />
        </div>

        {/* Submit Button */}
        <button
          className="btn-yellow"
          type="submit"
          onClick={(e) => handleLoginSubmit(e)}
        >
          Sign In
        </button>
        <p className="login-modal-footer">
          Don't have an account yet?{" "}
          <a
            className="login-modal-footer-sign-up-link"
            href="#"
            onClick={() => {
              props.setLoginDialogContent(
                <LoginModalRegisterContent
                  toggleLoginDialog={props.toggleLoginDialog}
                />
              );
            }}
          >
            Sign up
          </a>
        </p>
      </form>
    </>
  );
};
export default LoginModalLoginContent;
