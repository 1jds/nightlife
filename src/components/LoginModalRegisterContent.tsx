import { useState } from "react";

// Types for this component
type LoginModalRegisterContentProps = {
  toggleLoginDialog: any;
};

const LoginModalRegisterContent = (props: LoginModalRegisterContentProps) => {
  // Component State
  const [userRegisterDetails, setUserRegisterDetails] = useState<{
    username: string;
    password: string;
  }>({ username: "", password: "" });
  const [registerError, setRegisterError] = useState<{ error: string } | null>(
    null
  );
  const [registerMessage, setRegisterMessage] = useState<{
    message: string;
  } | null>(null);

  // Component Logic
  // Handle login/authentication
  const handleRegisterSubmit: React.MouseEventHandler<HTMLButtonElement> = (
    e
  ): void => {
    e.preventDefault();
    const formData = { ...userRegisterDetails };
    const jsonData = JSON.stringify(formData);
    fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: jsonData,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          setRegisterError(data);
        } else if (data.message) {
          setRegisterMessage(data);
          setTimeout(props.toggleLoginDialog, 1000);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  // Return JSX
  return (
    <>
      <h2 className="login-modal-header">Register for an account</h2>
      {registerError && (
        <p className="login-modal-register-JSON-response-message fc-maroon">
          {registerError.error}
        </p>
      )}
      {registerMessage && (
        <p className="login-modal-register-JSON-response-message fc-dark-green">
          {registerMessage.message}
        </p>
      )}
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
            autoComplete="username"
            value={userRegisterDetails?.username}
            onChange={(e): void => {
              setUserRegisterDetails((prevState) => ({
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
            autoComplete="new-password"
            value={userRegisterDetails?.password}
            onChange={(e): void => {
              setUserRegisterDetails((prevState) => ({
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
          onClick={(e) => {
            setRegisterError(null);
            setRegisterMessage(null);
            handleRegisterSubmit(e);
          }}
        >
          Register
        </button>
      </form>
    </>
  );
};
export default LoginModalRegisterContent;
