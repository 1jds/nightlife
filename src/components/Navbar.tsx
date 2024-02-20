import { useState, useRef, Dispatch, SetStateAction } from "react";
import LoginModalLoginContent from "./LoginModalLoginContent";
import LoginModalRegisterContent from "./LoginModalRegisterContent";
import closeSvg from "../../public/close_FILL0_wght400_GRAD0_opsz24.svg";

type NavbarProps = {
  userAuthed: null | {
    userId: number;
    username: string;
  };
  setUserAuthed: Dispatch<
    SetStateAction<{ userId: number; username: string } | null>
  >;
};

function Navbar(props: NavbarProps) {
  const loginModalRef = useRef<HTMLDialogElement>(null);
  const [loginDialogContent, setLoginDialogContent] =
    useState<React.ReactNode>(null);

  const toggleLoginDialog = (): void => {
    if (!loginModalRef) {
      return;
    }
    loginModalRef.current?.hasAttribute("open")
      ? loginModalRef.current.close()
      : loginModalRef.current?.showModal();
  };

  // Handle logout
  const logOut = (): void => {
    fetch("https://nightlife-8ddy.onrender.com/logout", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle response data
        console.log(
          "And the response data from the logout request is... : ",
          data
        );
        if (data.logoutSuccessful) {
          props.setUserAuthed(null);
        }
      })
      .catch((error) => {
        // Handle errors
        console.error("Error:", error);
      });
  };

  return (
    <>
      <nav className="navbar">
        <p>BAR BUDDIES</p>
        {/* if authed = Username My Plans Logout;  else = Login*/}

        {props.userAuthed ? (
          <>
            <a href="#">Welcome {props.userAuthed.username}!</a>
            <a href="#">My Plans</a>
            <a
              onClick={() => {
                logOut();
              }}
              href="#"
            >
              Logout
            </a>
          </>
        ) : (
          <a
            onClick={() => {
              setLoginDialogContent(
                <LoginModalLoginContent
                  {...props}
                  setLoginDialogContent={setLoginDialogContent}
                  toggleLoginDialog={toggleLoginDialog}
                />
              );
              toggleLoginDialog();
            }}
            href="#"
          >
            Login
          </a>
        )}
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
