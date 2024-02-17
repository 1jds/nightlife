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
    <div className="dialog-content-wrapper">
      <h2>Sign In</h2>
      <form id="loginForm" className="login-form">
        {/* Username Input */}
        <label htmlFor="username">Username:</label>
        <input
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

        {/* Password Input */}
        <label htmlFor="password">Password:</label>
        <input
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

        {/* Submit Button */}
        <button
          className="btn"
          type="submit"
          onClick={(e) => props.handleLoginSubmit(e)}
        >
          Sign In
        </button>
      </form>
      <p>
        Don't have an account yet? <a href="#">Sign up</a>
      </p>
    </div>
  );
};
export default LoginModalLoginContent;
