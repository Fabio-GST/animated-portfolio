import Sidebar from "../sidebar/Sidebar";
import "./navbar.scss";
import { motion } from "framer-motion";
import { FaLinkedin, FaGithub, FaWhatsapp, FaEnvelope } from 'react-icons/fa';

const Navbar = () => {
  return (
    <div className="navbar">
      {/* Sidebar */}
      <Sidebar/>
      <div className="wrapper">
        <motion.span
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          Fabio Gustavo
        </motion.span>
        <div className="social">
          <a href="https://www.linkedin.com/in/fabio-gustavo/" target="_blank" rel="noopener noreferrer">
            <FaLinkedin className="white-icon" />
          </a>
          <a href="https://github.com/Fabio-GST" target="_blank" rel="noopener noreferrer">
            <FaGithub className="white-icon" />
          </a>
          <a href="https://api.whatsapp.com/send?phone=5511983875629" target="_blank" rel="noopener noreferrer">
            <FaWhatsapp className="white-icon" />
          </a>
          <a href="mailto:gustavofabio2001@gmail.com">
            <FaEnvelope className="white-icon" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
