import { useState, useRef } from "react";
import LoginModalLoginContent from "./LoginModalLoginContent";

type NavbarProps = {
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

function Navbar(props: NavbarProps) {
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
        <a
          onClick={() => {
            setLoginDialogContent(<LoginModalLoginContent {...props} />);
            toggleLoginDialog();
          }}
          href="#"
        >
          Logout
        </a>
        {/* <a href="#">Login</a> */}
        <dialog ref={loginModalRef}>
          <button onClick={toggleLoginDialog}>Close</button>
          {loginDialogContent}
        </dialog>
      </nav>
    </>
  );
}

export default Navbar;
