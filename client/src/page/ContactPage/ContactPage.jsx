import React from "react";
import "./contactpage.scss";
import Navbar from "../../components/navbar/Navbar";

const ContactPage = () => {
  return (
    <section className="contact">
      <Navbar link="/" nameLink="Home" />

      <div className="container contact-container">
        <h1 className="contact-title">Contact Us</h1>
        <p className="contact-suptitle">
          Have questions or any problem,
          <br /> We'd love to hear from you!
        </p>

        <form className="form-container">
          <div className="style-input wide">
            <input type="text" required />
            <label>Name</label>
          </div>

          <div className="columns">
            <div className="style-input w-50">
              <input type="text" required />
              <label>Email</label>
            </div>

            <div className="style-input w-50">
              <input type="text" required />
              <label>Phone Number</label>
            </div>
          </div>

          <div className="style-input wide">
            <textarea required></textarea>
            <label>Message</label>
          </div>

          <div className="btn-container">
            <button className="submit-btn">Send Message</button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ContactPage;
