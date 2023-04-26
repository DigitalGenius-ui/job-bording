import React, { useState } from "react";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import DescriptionIcon from "@mui/icons-material/Description";
import { addresses } from "./data";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const FormDesign = ({ children, header, icon }) => {
  return (
    <>
      <div
        className="bg-darkBlack text-white rounded-md p-4 flex items-center
        gap-4">
        <span className="bg-white/80 text-darkBlack p-1 rounded-full">
          {icon}
        </span>
        <p className="text-lg">{header}</p>
      </div>
      <div>{children}</div>
    </>
  );
};

const Contact = () => {
  const [contact, setContact] = useState({
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    message: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setContact({ ...contact, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(contact);
  };

  return (
    <section className="relative">
      <div className="bg-profileBg fixed h-screen w-full z-[-1]" />
      {/* header  */}
      <div className="size flex justify-between items-center text-white py-[3rem] px-5">
        <h1 className="text-2xl capitalize font-bold">contact us</h1>
        <div className="flex items-center text-sm">
          <p
            className="cursor-pointer hover:text-orang"
            onClick={() => navigate("/")}>
            Home
          </p>
          <span>
            <ArrowRightIcon />
          </span>
          <p>Contact</p>
        </div>
      </div>
      <div className="bg-white">
        {/* contact location  */}
        <div className="size pt-16 rounded-md overflow-hidden">
          <iframe
            title="companyMap"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d30767148.165328432!2d60.947481956192014!3d19.72303560737346!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30635ff06b92b791%3A0xd78c4fa1854213a6!2sIndia!5e0!3m2!1sid!2sid!4v1681466288260!5m2!1sid!2sid"
            width="100%"
            height="450"
            loading="lazy"
            allowFullScreen=""
            referrerPolicy="no-referrer-when-downgrade"></iframe>
        </div>

        {/* form part  */}
        <div className="size py-10 flex flex-col lg:flex-row gap-5">
          {/* address  */}
          <div className="flex-1">
            <FormDesign header="Office Address" icon={<LocationOnIcon />}>
              <div className="shadow-lg mt-5 p-4 py-6">
                {addresses.map((add, i) => (
                  <div key={i} className="py-3 border-b text-gray-600">
                    <p className="float-left mr-1 text-md font-bold">
                      {add.title}:-
                    </p>
                    <p>{add.desc}</p>
                  </div>
                ))}
              </div>
            </FormDesign>
          </div>

          {/* contact form  */}
          <div className="flex-[2]">
            <FormDesign header="Contact Form" icon={<DescriptionIcon />}>
              <div className="shadow-lg mt-5 p-4 py-6">
                <form onSubmit={handleSubmit}>
                  <div className="flex flex-col md:flex-row gap-2">
                    <input
                      className="border border-gray-300 w-full outline-none
                        my-2 p-3"
                      value={contact.firstName}
                      onChange={handleChange}
                      required={true}
                      type="text"
                      name="firstName"
                      placeholder="firstName"
                    />
                    <input
                      className="border border-gray-300 w-full outline-none
                        my-2 p-3"
                      value={contact.lastName}
                      onChange={handleChange}
                      required={true}
                      type="text"
                      name="lastName"
                      placeholder="lastName"
                    />
                  </div>
                  <div className="flex flex-col md:flex-row gap-2">
                    <input
                      className="border border-gray-300 w-full outline-none
                        my-2 p-3"
                      value={contact.email}
                      onChange={handleChange}
                      required={true}
                      type="email"
                      name="email"
                      placeholder="Email Address"
                    />
                    <input
                      className="border border-gray-300 w-full outline-none
                        my-2 p-3"
                      value={contact.subject}
                      onChange={handleChange}
                      required={true}
                      type="text"
                      name="subject"
                      placeholder="Subject"
                    />
                  </div>
                  <textarea
                    className="border border-gray-300 w-full outline-none
                    p-2 mt-2 rounded-sm resize-none input invalid:border-red-400"
                    name="message"
                    placeholder="Message"
                    cols="10"
                    minLength={10}
                    onChange={handleChange}
                    rows="5"></textarea>
                  <span className="error text-red-400">
                    The message should be at least 10 characters
                  </span>

                  <div className="pt-5 text-center">
                    <Button
                      variant="contained"
                      className="!bg-orang !py-3"
                      type="submit">
                      Submit Message
                    </Button>
                  </div>
                </form>
              </div>
            </FormDesign>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
