import React, { useState } from "react";
import db from "../firebase";
import { addDoc, collection } from "firebase/firestore";
// import "./Form.css";
import BannerImg from "../assets/mtc-banner.png";

function Form() {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    whatsapp: "",
    social: "",
    gender: "",
    role: "",
    experience: "",
    location: "",
    about: "",
  });

  const [modal, setModal] = useState({
    isOpen: false,
    type: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value, files, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === "file" ? files[0] : value,
    });
  };

  const handleReset = () => {
    setFormData({
      firstname: "",
      lastname: "",
      email: "",
      phone: "",
      whatsapp: "",
      gender: "",
      role: "",
      experience: "",
      location: "",
      about: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const collectionRef = collection(db, "teamApplications");
      await addDoc(collectionRef, formData);

      setModal({
        isOpen: true,
        type: "success",
        message: "Your application has been successfully submitted! Thank you for applying to MichTobbaCares INC! We will get in touch with you as soon as possible!",
      });

      handleReset();
    } catch (error) {
      setModal({
        isOpen: true,
        type: "error",
        message: "There was an error submitting your application. Please try again or refresh your browser.",
      });
      console.error("Error submitting application: ", error);
    }
  };

  const closeModal = () => {
    setModal({ isOpen: false, type: "", message: "" });
  };

  return (
    <div className="container">
      <img src={BannerImg} alt="Banner" className="bannerImg" />
      <h1>Join Our Media Production Team</h1>

      <form onSubmit={handleSubmit}>
        <label htmlFor="firstname">First Name*</label>
        <input
          type="text"
          placeholder="Enter First Name"
          name="firstname"
          value={formData.firstname}
          onChange={handleChange}
          required
        />

        <label htmlFor="lastname">Last Name*</label>
        <input
          type="text"
          placeholder="Enter Last Name"
          name="lastname"
          value={formData.lastname}
          onChange={handleChange}
          required
        />

        <label htmlFor="email">Email*</label>
        <input
          type="email"
          placeholder="Enter Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <label htmlFor="phone">Phone Number*</label>
        <input
          type="number"
          placeholder="Enter Phone Number"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
        />

        <label htmlFor="whatsapp">WhatsApp Number*</label>
        <input
          type="number"
          placeholder="Enter WhatsApp Number"
          name="whatsapp"
          value={formData.whatsapp}
          onChange={handleChange}
          required
        />

        <label htmlFor="social">Social Media*</label>
        <input
          type="text"
          placeholder="Enter Instagram username"
          name="social"
          value={formData.social}
          onChange={handleChange}
          required
        />

        <label htmlFor="gender">Gender*</label>
        <div>
          <input
            type="radio"
            name="gender"
            value="Male"
            onChange={handleChange}
            required
          /> Male <br />
          <input
            type="radio"
            name="gender"
            value="Female"
            onChange={handleChange}
            required
          /> Female
        </div>

        <label htmlFor="role">Role You're Applying For*</label>
        <select
          name="role"
          id="role"
          value={formData.role}
          onChange={handleChange}
          required
        >
          <option value="" disabled>Select a role</option>
          <option value="Cinematographer">Cinematographer</option>
          <option value="Videographer">Videographer</option>
          <option value="Video Editor">Video Editor</option>
          <option value="Photographer">Photographer</option>
          <option value="Graphic Designer">Graphic Designer</option>
          <option value="Sound Engineer">Sound Engineer</option>
          <option value="Light Engineer">Light Engineer</option>
          <option value="Video Mixer">Video Mixer</option>
        </select>

        <label htmlFor="experience">Experience*</label>
        <input
          type="number"
          placeholder="Enter experience (in years)"
          name="experience"
          value={formData.experience}
          onChange={handleChange}
          required
        />

        <label htmlFor="location">Location*</label>
        <input
          type="text"
          placeholder="Enter Location"
          name="location"
          value={formData.location}
          onChange={handleChange}
          required
        />

        <label htmlFor="about">What else should we know about you?</label>
        <textarea
          name="about"
          id="about"
          cols={30}
          rows={5}
          placeholder="Enter here"
          value={formData.about}
          onChange={handleChange}
        ></textarea>

        <div className="buttons">
          <button type="button" onClick={handleReset}>
            Reset
          </button>
          <button type="submit">
            Submit
          </button>
        </div>
      </form>

      {modal.isOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>{modal.type === "success" ? "Success" : "Error"}</h2>
            <p>{modal.message}</p>
            <button onClick={closeModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Form;