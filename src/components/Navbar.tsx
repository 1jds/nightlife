import { useState, useRef } from "react";

function Navbar() {
  const loginModalRef = useRef<HTMLDialogElement>(null);
  const [loginDialogContent, setLoginDialogContent] =
    useState<React.ReactNode>(null);

  const toggleLoginDialog = () => {
    if (!loginModalRef) {
      return;
    }
    loginModalRef.current?.hasAttribute("open")
      ? loginModalRef.current.close()
      : loginModalRef.current?.showModal();
  };

  return (
    <>
      <nav className="navbar">
        <p>BAR BUDDIES</p>
        {/* if authed = Username My Plans Logout  else = Login*/}
        <a href="#">User Name</a>
        <a href="#">My Plans</a>
        <a onClick={toggleLoginDialog} href="#">
          Logout
        </a>
        {/* <a href="#">Login</a> */}
        <dialog ref={loginModalRef}>{loginDialogContent}</dialog>
      </nav>
    </>
  );
}

export default Navbar;
