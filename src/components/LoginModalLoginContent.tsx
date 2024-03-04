import LoginModalRegisterContent from "./LoginModalRegisterContent";
import gitHubLogo from "../assets/github-logo.svg";
import { Dispatch, ReactNode, SetStateAction, useState } from "react";

// Types for this component
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
  setVenuesAttendingIds: Dispatch<SetStateAction<string[]>>;
};

const LoginModalLoginContent = (props: LoginModalLoginContentProps) => {
  // Component state
  const [userLoginDetails, setUserLoginDetails] = useState<{
    username: string;
    password: string;
  }>({ username: "", password: "" });

  // Component Logic
  // Handle login/authentication
  const handleLoginSubmit: React.MouseEventHandler<HTMLButtonElement> = (
    e
  ): void => {
    e.preventDefault();
    const formData = { ...userLoginDetails };
    const jsonData = JSON.stringify(formData);
    fetch("/api/login", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: jsonData,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.loginSuccessful) {
          props.setUserAuthed({
            userId: data.userId,
            username: data.username,
          });
          props.setVenuesAttendingIds([...data.venuesAttendingIds]);
          props.toggleLoginDialog();
        }
      })
      .catch((error): void => {
        console.error("Error logging in with local strategy... :", error);
      });
  };

  // Return JSX
  return (
    <>
      <h2 className="login-modal-header">Log in to your account</h2>
      <div className="login-modal-OAuth-btns flex-column">
        <a href="/api/login/github" className="btn-OAuth">
          <img className="OAuth-logo" alt="GitHub logo" src={gitHubLogo} />
          <span>Continue with GitHub</span>
        </a>
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
            minLength={1}
            maxLength={15}
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
            autoComplete="current-password"
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
          <button
            className="login-modal-footer-sign-up-link"
            onClick={() => {
              props.setLoginDialogContent(
                <LoginModalRegisterContent
                  toggleLoginDialog={props.toggleLoginDialog}
                />
              );
            }}
          >
            Sign up
          </button>
        </p>
      </form>
    </>
  );
};
export default LoginModalLoginContent;
