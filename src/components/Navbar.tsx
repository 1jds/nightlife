import { useState, useRef, Dispatch, SetStateAction, useEffect } from "react";
import LoginModalLoginContent from "./LoginModalLoginContent";
import closeSvg from "../assets/close_FILL0_wght400_GRAD0_opsz24.svg";
import whiteCloseSvg from "../assets/close_FILL0_wght400_GRAD0_opsz24 - white.svg";
import nightlifeSvg from "../assets/nightlife_FILL0_wght400_GRAD0_opsz24.svg";
import hamburgerMenu from "../assets/menu_FILL0_wght400_GRAD0_opsz40.svg";

// Types for this component's props
type NavbarProps = {
  userAuthed: null | {
    userId: number;
    username: string;
  };
  setUserAuthed: Dispatch<
    SetStateAction<{ userId: number; username: string } | null>
  >;
  setIsOnHomePage: React.Dispatch<React.SetStateAction<boolean>>;
  setVenuesAttendingIds: React.Dispatch<React.SetStateAction<string[]>>;
};

const Navbar = (props: NavbarProps) => {
  // Component State
  const loginModalRef = useRef<HTMLDialogElement>(null);
  const [loginDialogContent, setLoginDialogContent] =
    useState<React.ReactNode>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isHamburgerMenuOpen, setIsHamburgerMenuOpen] = useState(false);

  // Component Logic
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 650);
    };
    // Add event listener for window resize
    window.addEventListener("resize", handleResize);
    // Initial check for mobile view on component mount
    handleResize();
    // Remove event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Toggle dialog open/closed
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
    fetch("/api/logout", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.logoutSuccessful) {
          props.setUserAuthed(null);
          props.setIsOnHomePage(true);
          props.setVenuesAttendingIds([]);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  // toggle hamburger menu
  const toggleHamburgerMenu = () => {
    setIsHamburgerMenuOpen((prevState) => !prevState);
  };

  // Return JSX
  return (
    <>
      <nav className="content-grid" aria-label="primary">
        <div className="navbar">
          <button
            className="btn-nav-logo-home"
            onClick={() => props.setIsOnHomePage(true)}
          >
            <p>BAR BUDDIES</p>
            <img
              className="bar-buddies-logo"
              src={nightlifeSvg}
              alt="Bar Buddies nightlife logo"
            />
          </button>
          {/* if authed, show "<Username> My Plans Logout" else show just "Login" */}
          {/* <button aria-expanded="true" class="exposed-button-nav" id="toggle-button-nav" data-playwright-test-label="header-menu-button"><span class="menu-btn-icon"><svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="bars" class="svg-inline--fa fa-bars " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z"></path></svg><span class="sr-only">Menu</span></span><span class="menu-btn-text">Menu</span></button> */}
          {/* <ul aria-labelledby="toggle-button-nav" data-playwright-test-label="header-menu" class="nav-list display-menu"><li><a class="nav-link nav-link-flex nav-link-header undefined" data-test-label="dropdown-donate-button" href="/donate">Donate</a></li><li><a class="nav-link" href="/learn">Curriculum</a></li><li class="nav-line"><a href="https://forum.freecodecamp.org/" class="nav-link nav-link-flex" rel="noopener noreferrer" target="_blank"><span>Forum</span><span class="sr-only">, Opens in new window</span><svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="up-right-from-square" class="svg-inline--fa fa-up-right-from-square " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M352 0c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9L370.7 96 201.4 265.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L416 141.3l41.4 41.4c9.2 9.2 22.9 11.9 34.9 6.9s19.8-16.6 19.8-29.6V32c0-17.7-14.3-32-32-32H352zM80 32C35.8 32 0 67.8 0 112V432c0 44.2 35.8 80 80 80H400c44.2 0 80-35.8 80-80V320c0-17.7-14.3-32-32-32s-32 14.3-32 32V432c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V112c0-8.8 7.2-16 16-16H192c17.7 0 32-14.3 32-32s-14.3-32-32-32H80z"></path></svg></a></li><li><a href="https://freecodecamp.org/news/" class="nav-link nav-link-flex" rel="noopener noreferrer" target="_blank"><span>News</span><span class="sr-only">, Opens in new window</span><svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="up-right-from-square" class="svg-inline--fa fa-up-right-from-square " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M352 0c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9L370.7 96 201.4 265.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L416 141.3l41.4 41.4c9.2 9.2 22.9 11.9 34.9 6.9s19.8-16.6 19.8-29.6V32c0-17.7-14.3-32-32-32H352zM80 32C35.8 32 0 67.8 0 112V432c0 44.2 35.8 80 80 80H400c44.2 0 80-35.8 80-80V320c0-17.7-14.3-32-32-32s-32 14.3-32 32V432c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V112c0-8.8 7.2-16 16-16H192c17.7 0 32-14.3 32-32s-14.3-32-32-32H80z"></path></svg></a></li><li><a href="https://coderadio.freecodecamp.org" class="nav-link nav-link-flex" rel="noopener noreferrer" target="_blank"><span>Radio</span><span class="sr-only">, Opens in new window</span><svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="up-right-from-square" class="svg-inline--fa fa-up-right-from-square " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M352 0c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9L370.7 96 201.4 265.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L416 141.3l41.4 41.4c9.2 9.2 22.9 11.9 34.9 6.9s19.8-16.6 19.8-29.6V32c0-17.7-14.3-32-32-32H352zM80 32C35.8 32 0 67.8 0 112V432c0 44.2 35.8 80 80 80H400c44.2 0 80-35.8 80-80V320c0-17.7-14.3-32-32-32s-32 14.3-32 32V432c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V112c0-8.8 7.2-16 16-16H192c17.7 0 32-14.3 32-32s-14.3-32-32-32H80z"></path></svg></a></li><li><a href="https://contribute.freecodecamp.org/#/" class="nav-link nav-link-flex" rel="noopener noreferrer" target="_blank"><span>Contribute</span><span class="sr-only">, Opens in new window</span><svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="up-right-from-square" class="svg-inline--fa fa-up-right-from-square " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M352 0c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9L370.7 96 201.4 265.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L416 141.3l41.4 41.4c9.2 9.2 22.9 11.9 34.9 6.9s19.8-16.6 19.8-29.6V32c0-17.7-14.3-32-32-32H352zM80 32C35.8 32 0 67.8 0 112V432c0 44.2 35.8 80 80 80H400c44.2 0 80-35.8 80-80V320c0-17.7-14.3-32-32-32s-32 14.3-32 32V432c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V112c0-8.8 7.2-16 16-16H192c17.7 0 32-14.3 32-32s-14.3-32-32-32H80z"></path></svg></a></li><li><a href="https://freecodecamp.libsyn.com/" class="nav-link nav-link-flex" rel="noopener noreferrer" target="_blank"><span>Podcast</span><span class="sr-only">, Opens in new window</span><svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="up-right-from-square" class="svg-inline--fa fa-up-right-from-square " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M352 0c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9L370.7 96 201.4 265.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L416 141.3l41.4 41.4c9.2 9.2 22.9 11.9 34.9 6.9s19.8-16.6 19.8-29.6V32c0-17.7-14.3-32-32-32H352zM80 32C35.8 32 0 67.8 0 112V432c0 44.2 35.8 80 80 80H400c44.2 0 80-35.8 80-80V320c0-17.7-14.3-32-32-32s-32 14.3-32 32V432c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V112c0-8.8 7.2-16 16-16H192c17.7 0 32-14.3 32-32s-14.3-32-32-32H80z"></path></svg></a></li><li class="nav-line"><button aria-describedby="theme-sign-in" aria-disabled="true" aria-pressed="false" class="nav-link nav-link-flex nav-link-header"><span class="sr-only">Night Mode</span><span aria-hidden="true" class="nav-link-dull" id="theme-sign-in">Sign in to change theme.</span></button></li></ul> */}
          {props.userAuthed ? (
            <>
              {isMobile && isHamburgerMenuOpen && (
                <img
                  src={whiteCloseSvg}
                  alt="hamburger nav menu"
                  className={"nav--hamburger-menu-icon"}
                  onClick={toggleHamburgerMenu}
                />
              )}
              {isMobile && !isHamburgerMenuOpen && (
                <img
                  src={hamburgerMenu}
                  alt="hamburger nav menu"
                  className={"nav--hamburger-menu-icon"}
                  onClick={toggleHamburgerMenu}
                />
              )}

              <div
                className={
                  !isMobile
                    ? "nav--hamburger-menu-body-inline"
                    : isHamburgerMenuOpen
                    ? "nav--hamburger-menu-body-open"
                    : "nav--hamburger-menu-body-closed"
                }
              >
                <p
                  className={
                    isMobile
                      ? "nav--hamburger-menu-body-item nav--nav-line"
                      : undefined
                  }
                >
                  <i>Welcome, {props.userAuthed?.username}</i>
                </p>
                <button
                  className={
                    isMobile
                      ? "nav--hamburger-menu-body-item navbar--link-button"
                      : "navbar--link-button"
                  }
                  onClick={() => props.setIsOnHomePage(false)}
                >
                  My Plans
                </button>
                <button
                  className={
                    isMobile
                      ? "nav--hamburger-menu-body-item navbar--link-button"
                      : "navbar--link-button"
                  }
                  onClick={logOut}
                >
                  Logout
                </button>
              </div>
            </>
          ) : (
            <button
              className="navbar--link-button"
              onClick={() => {
                setLoginDialogContent(
                  <LoginModalLoginContent
                    {...props}
                    setLoginDialogContent={setLoginDialogContent}
                    toggleLoginDialog={toggleLoginDialog}
                    setVenuesAttendingIds={props.setVenuesAttendingIds}
                  />
                );
                toggleLoginDialog();
              }}
            >
              Login
            </button>
          )}
          {/* Login/Register dialog to display when 'login' pressed */}
          <dialog className="login-dialog" ref={loginModalRef}>
            <button className="btn-dialog-close" onClick={toggleLoginDialog}>
              <img src={closeSvg} />
            </button>
            {loginDialogContent}
          </dialog>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
