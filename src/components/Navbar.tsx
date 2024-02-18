import { useState, useRef } from "react";
import LoginModalLoginContent from "./LoginModalLoginContent";
import closeSvg from "../../public/close_FILL0_wght400_GRAD0_opsz24.svg";

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
        <dialog className="login-dialog" ref={loginModalRef}>
          <button className="btn-dialog-close" onClick={toggleLoginDialog}>
            <img src={closeSvg} />
          </button>
          {loginDialogContent}
        </dialog>
      </nav>
    </>
  );
}

export default Navbar;
