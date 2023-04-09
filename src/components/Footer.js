import React from "react";
import { BsLinkedin, BsGithub, BsTwitter } from "react-icons/bs";

const Footer = () => {
  return (
    <footer>
      <div>
        <h1>About us</h1>
        <p>
          We are dedicated to covering the latest developments, news, and
          opinions in the field of technology. we provides insights into the
          latest technological trends, gadgets, and software, as well as
          offering tips and tutorials on how to get the most out of these
          products.
        </p>
      </div>
      <div>
        <h1>Newsletter</h1>
        <p>Stay update with our latest blogs</p>
        <form action="">
          <input type="text" placeholder="Enter email here...." />
          <button>send</button>
        </form>
      </div>
      <div>
        <h1>Follow Us</h1>
        <p>Let us be social</p>
        <ul>
          <li>
            <a href="https://twitter.com/EricNiyokwize10">
              <BsTwitter />
            </a>
          </li>
          <li>
            <a href="https://www.linkedin.com/in/eric-niyokwizerwa-489b74251/">
              <BsLinkedin />
            </a>
          </li>
          <li>
            <a href="https://github.com/ERicNiyo73">
              <BsGithub />
            </a>
          </li>
          {/* <li>
            <a href="https://www.instagram.com/niyitanga.r/">
              <BsInstagram />
            </a>
          </li> */}
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
