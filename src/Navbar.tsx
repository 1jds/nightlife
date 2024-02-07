function Navbar() {
  return (
    <nav className="navbar">
      <p>BAR BUDDIES</p>
      {/* if authed = Username My Plans Logout  else = Login*/}
      <a>User Name</a>
      <a>My Plans</a>
      <a>Logout</a>
      {/* <a>Login</a> */}
    </nav>
  );
}

export default Navbar;
