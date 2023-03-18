import { motion } from "framer-motion";
import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { styles } from "../styles";
import { EarthCanvas } from "./canvas";
import SectionWrapper from "../hoc/SectionWrapper";
import { slideIn } from "../utils/motion";

const Contact = () => {
  const formRef = useRef();
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({ ...form, [name]: value})
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs.send(
      "service_rjkiuz5",
      "template_ves1r5t",
      {
        name: form.name,
        to_name: 'Rafael',
        from_email: form.email,
        to_email: 'rafaeldubois974@gmail.com',
        message: form.message,

      },
      'YM5DLgJY81EdPNukU'

    )
    .then((result) => {
      setLoading(false);
      formRef.current.reset();
      setForm({
        name: "",
        email: "",
        message: "",
      });
      alert("Message sent successfully");
    }, (error) => {
      setLoading(false);
      alert("Message failed to send");
    })
  };

  return (
    <div className="xl:mt-12 xl:flex-row flex-col-reverse flex gap-10 overflow-hidden">
      <motion.div
        variants={slideIn("left", "tween", 0.2, 1)}
        className="flex-[0.75] bg-black-100 p-8 rounded-2xl"
      >
        <p className={styles.sectionSubText}>Get in touch</p>
        <h3 className={styles.sectionHeadText}>Contact.</h3>
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="mt-12 flex flex-col gap-8"
        >
          <label className="flex flex-col">
            <span className="text-white font-medium mb-4">Your Name</span>
            <input type="text" 
            name="name" 
            value={form.name}
            onChange={handleChange}
            placeholder="Enter your name"
            className="bg-tertiary py-4 px-6 text-white placeholder:text-secondary text-white rounded-lg outlined-none border-none font-medium"
            />
          </label>
          <label className="flex flex-col">
            <span className="text-white font-medium mb-4">Your Email</span>
            <input type="email" 
            name="email" 
            value={form.email}
            onChange={handleChange}
            placeholder="Enter your email"
            className="bg-tertiary py-4 px-6 text-white placeholder:text-secondary text-white rounded-lg outlined-none border-none font-medium"
            />
          </label>
          <label className="flex flex-col">
            <span className="text-white font-medium mb-4">Your Message</span>
            <textarea 
            rows="7"
            name="message" 
            value={form.message}
            onChange={handleChange}
            placeholder="Enter your message"
            className="bg-tertiary py-4 px-6 text-white placeholder:text-secondary text-white rounded-lg outlined-none border-none font-medium"
            />
          </label>
          <button type="submit" className="bg-teryiary py-3 px-8 text-white w-fit shadow-md shadow-primary  outlined-none rounded-xl ">
            {loading ? "Sending..." : "Send"}
          </button>
        </form>
      </motion.div>
      <motion.div variants={slideIn("right", "tween", 0.2, 1)} className="xl:flex-1 xl:h-auto md:h-[500px] h-[350px]">
        <EarthCanvas />
      </motion.div>
    </div>
  );
};

export default SectionWrapper(Contact, "contact");
