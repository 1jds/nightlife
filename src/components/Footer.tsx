import yelpLogo from "../assets/yelp_logo.svg";
import fccLogo from "../assets/fcc_secondary_small.svg";

const Footer = () => {
  // Return JSX
  return (
    <footer>
      <p>
        <span>This application implements a project from Free Code Camp </span>
        <a href="https://www.freecodecamp.org/learn/coding-interview-prep/take-home-projects/build-a-nightlife-coordination-app">
          <img
            className="align-bottom"
            src={fccLogo}
            alt="Free Code Camp logo"
            width="22"
            height="22"
          ></img>
        </a>
      </p>
      <p>
        To view the sourcecode for this application{" "}
        <a
          className="footer-link"
          href="https://github.com/1jds/nightlife-server"
        >
          see the GitHub repo here.
        </a>
      </p>
      <p>
        <span>The API data used here is from </span>
        <a href="https://www.yelp.com/">
          <img
            className="align-bottom"
            src={yelpLogo}
            alt="Yelp logo"
            width="39"
            height="20"
          ></img>
        </a>
      </p>
    </footer>
  );
};
export default Footer;
