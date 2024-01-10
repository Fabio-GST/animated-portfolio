import { useRef } from "react";
import "./services.scss";
import { motion, useInView } from "framer-motion";

const variants = {
  initial: {
    x: -500,
    y: 100,
    opacity: 0,
  },
  animate: {
    x: 0,
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      staggerChildren: 0.1,
    },
  },
};

const Services = () => {
  const ref = useRef();
  const isInView = useInView(ref, { margin: "-100px" });

  return (
    <motion.div
      className="services"
      variants={variants}
      initial="initial"
      ref={ref}
      animate={isInView ? "animate" : undefined}
    >
      <motion.div className="textContainer" variants={variants}>
        <p>
          Especializo-me em utilizar tecnologia para impulsionar a sua marca para a frente.
        </p>
        <hr />
      </motion.div>
      <motion.div className="titleContainer" variants={variants}>
        <div className="title">
          <img src="/people.webp" alt="" />
          <h1>
            <motion.b whileHover={{ color: "orange" }}>Soluções</motion.b>{" "}
            Inovadoras
          </h1>
        </div>
        <div className="title">
          <h1>
            <motion.b whileHover={{ color: "orange" }}>Para o Seu</motion.b>{" "}
            Negócio.
          </h1>
          <button>O QUE FAÇO?</button>
        </div>
      </motion.div>
      <motion.div className="listContainer" variants={variants}>
        <motion.div
          className="box"
          whileHover={{ background: "lightgray", color: "black" }}
        >
          <h2>Next.js</h2>
          <p>
            Construindo aplicações web eficientes e escaláveis com Next.js.
          </p>
          <button>Explorar</button>
        </motion.div>
        <motion.div
          className="box"
          whileHover={{ background: "lightgray", color: "black" }}
        >
          <h2>TypeScript</h2>
          <p>
            Desenvolvendo código robusto e de fácil manutenção usando TypeScript.
          </p>
          <button>Descobrir</button>
        </motion.div>
        <motion.div
          className="box"
          whileHover={{ background: "lightgray", color: "black" }}
        >
          <h2>JavaScript</h2>
          <p>
            Criando interfaces de usuário interativas e dinâmicas com JavaScript.
          </p>
          <button>Saber Mais</button>
        </motion.div>
        <motion.div
          className="box"
          whileHover={{ background: "lightgray", color: "black" }}
        >
          <h2>Python</h2>
          <p>
            Implementando soluções versáteis e poderosas com Python.
          </p>
          <button>Explorar</button>
        </motion.div>
        <motion.div
          className="box"
          whileHover={{ background: "lightgray", color: "black" }}
        >
          <h2>Power BI</h2>
          <p>
            Criando visualizações de dados perspicazes e relatórios de inteligência de negócios com Power BI.
          </p>
          <button>Descobrir</button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Services;
