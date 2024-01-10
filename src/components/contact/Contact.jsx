import { useRef, useState } from "react";
import "./contact.scss";
import { motion, useInView } from "framer-motion";

const variants = {
  initial: {
    y: 500,
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      staggerChildren: 0.1,
    },
  },
};

const Contact = () => {
  const ref = useRef();
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const isInView = useInView(ref, { margin: "-100px" });

  const createMailtoLink = () => {
    const name = encodeURIComponent(document.getElementById("name").value);
    const email = encodeURIComponent(document.getElementById("email").value);
    const message = encodeURIComponent(document.getElementById("message").value);

    const mailtoLink = `mailto:gustavofabio2001@gmail.com?subject=New Contact Form Submission&body=Name: ${name}%0AEmail: ${email}%0AMessage: ${message}`;

    window.location.href = mailtoLink;
  };

  return (
    <motion.div
      ref={ref}
      className="contact"
      variants={variants}
      initial="initial"
      whileInView="animate"
    >
      <motion.div className="textContainer" variants={variants}>
        <motion.h1 variants={variants}>Let’s work together</motion.h1>
        <motion.div className="item" variants={variants}>
          <h2>E-Mail</h2>
          <span>gustavofabio2001@gmail.com</span>
        </motion.div>
        <motion.div className="item" variants={variants}>
          <h2>Endereço</h2>
          <span>São Paulo, SP</span>
        </motion.div>
        <motion.div className="item" variants={variants}>
          <h2>Phone</h2>
          <span>11 98387 5629</span>
        </motion.div>
      </motion.div>
      <div className="formContainer">
        <motion.form
          onSubmit={(e) => {
            e.preventDefault();
            createMailtoLink();
          }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 4, duration: 1 }}
        >
          <input type="text" required placeholder="Name" id="name" />
          <input type="email" required placeholder="Email" id="email" />
          <textarea rows={8} placeholder="Message" id="message" />
          <button type="submit">Submit</button>
          {error && "Error"}
          {success && "Success"}
        </motion.form>
      </div>
    </motion.div>
  );
};

export default Contact;
