type LoginModalLoginContentProps = {
  userLoginDetails: {
    username: string;
    password: string;
  };
  setUserLoginDetails: React.Dispatch<
    React.SetStateAction<{
      username: string;
      password: string;
    }>
  >;
  handleLoginSubmit: React.MouseEventHandler<HTMLButtonElement>;
};

const LoginModalLoginContent = (props: LoginModalLoginContentProps) => {
  const { userLoginDetails } = props;
  return (
    <>
      <h2 className="login-modal-header">Log in to your Bar Buddies Account</h2>
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
              props.setUserLoginDetails((prevState) => ({
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
              props.setUserLoginDetails((prevState) => ({
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
          onClick={(e) => props.handleLoginSubmit(e)}
        >
          Sign In
        </button>
      </form>
      <p className="login-modal-footer">
        Don't have an account yet?{" "}
        <a className="login-modal-footer-sign-up-link" href="#">
          Sign up
        </a>
      </p>
    </>
  );
};
export default LoginModalLoginContent;
