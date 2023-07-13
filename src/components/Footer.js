import React from "react";
import { useForm } from "react-hook-form";
import { Report } from "notiflix/build/notiflix-report-aio";
import { useContext } from "react";
import { AppContext } from "../context/AppProvider";
import { useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "../axios/axios";
import { BsLinkedin, BsGithub, BsTwitter } from "react-icons/bs";
const schema = yup.object().shape({
  email: yup.mixed().test("required", "Choose an Image for blog", (value) => {
    return value && value.length;
  }),
  email: yup.string().required(),
});
const Footer = () => {
  const { auth } = useContext(AppContext);
  const [error, setError] = useState("");
  const [email, setemail] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = async ({ email }) => {
    if (!email) {
      setError("Description is required");
      return;
    } else {
      setError("");
    }
    try {
      const formData = new FormData();
      formData.append("email", email);
      await axios.post("/letter", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${auth?.token}`,
        },
      });
      Report.success("You made it!", "Thank you for subscribin to us ", "Ok", {
        timeout: 2000,
      });
      setTimeout(() => {
        window.location.reload(true);
      }, 3000);
      reset();
    } catch (error) {
      console.log(error.response);
    }
  };

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
        <h1>Subscribe to us</h1>
        <p>And Stay update with our latest Tech stories</p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            placeholder="Enter email here...."
            {...register("email")}
          />
          <span className="error">{errors?.title?.message}</span>
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
