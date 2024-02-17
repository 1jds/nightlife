import yelpLogo from "../../public/yelp_logo.svg";
import fccLogo from "../../public/fcc_secondary_small.svg";

const Footer = () => {
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
        Credit to Kunal Yadav whose work was referenced in the creation of this
        page.{" "}
        <a
          className="footer-link"
          href="https://github.com/abkunal/Nightlife-Coordination-App"
        >
          See Yadav's sourcecode here.
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
