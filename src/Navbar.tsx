function Navbar() {
  return (
    <div className="navbar">
      <p>BAR BUDDIES</p>
      <div>
        {/* Name of person logged in goes here conditionally if they are logged in... */}
        <a>Home</a>
        <a>Login</a>
      </div>
    </div>
  );
}

export default Navbar;
