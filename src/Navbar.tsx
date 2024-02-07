function Navbar() {
  return (
    <nav className="navbar">
      <p>BAR BUDDIES</p>
      {/* if authed = Username My Plans Logout  else = Login*/}
      <a href="#">User Name</a>
      <a href="#">My Plans</a>
      <a href="#">Logout</a>
      {/* <a href="#">Login</a> */}
    </nav>
  );
}

export default Navbar;
