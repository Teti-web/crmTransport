import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import "./login.scss";
import Navbar from "../../components/navbar/Navbar";
import { useHttp } from "../../hooks/http.hook";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../../context/AuthContext";

const Login = () => {
  const auth = useContext(AuthContext);
  const { request } = useHttp();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const changeHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };
  const loginHandler = async () => {
    try {
      const data = await request("/api/users/login", "POST", { ...form });
      auth.login(data.token, data.userId);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      toast.error(message);
    }
  };
  return (
    <section className="home">
      <Navbar link="/contact" nameLink="Contact Us" />
      <ToastContainer />
      <div id="login" className="forms">
        <div className="face face-front">
          <div className="content">
            <h2>Sign In</h2>

            <div className="field-wrapper">
              <input
                type="email"
                name="email"
                placeholder="email"
                onChange={changeHandler}
              />
              <label>email</label>
            </div>
            <div className="field-wrapper">
              <input
                type="password"
                name="password"
                placeholder="password"
                onChange={changeHandler}
                autocomplete="new-password"
              />
              <label>password</label>
            </div>
            <div className="field-wrapper">
              <input type="button" value="Sign IN " onClick={loginHandler} />
            </div>

            <Link className="signup" to="/register">
              Not a user? Sign up
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Login;
