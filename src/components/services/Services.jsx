import { useRef } from "react";
import "./services.scss";
import { motion, useInView } from "framer-motion";

const techs = [
  {
    icon: "⚡",
    name: "Next.js",
    desc: "Apps web eficientes e escaláveis com SSR e SSG.",
    tag: "Frontend",
  },
  {
    icon: "🔷",
    name: "TypeScript",
    desc: "Código robusto e tipado para projetos de longa duração.",
    tag: "Linguagem",
  },
  {
    icon: "🟨",
    name: "JavaScript",
    desc: "Interfaces interativas e dinâmicas do lado do cliente.",
    tag: "Linguagem",
  },
  {
    icon: "🐍",
    name: "Python",
    desc: "Automação, análise de dados e back-end versátil.",
    tag: "Backend",
  },
  {
    icon: "📊",
    name: "Power BI",
    desc: "Dashboards e relatórios de business intelligence.",
    tag: "Analytics",
  },
];

const container = {
  initial: {},
  animate: { transition: { staggerChildren: 0.1 } },
};

const item = {
  initial: { opacity: 0, y: 30 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const Services = () => {
  const ref = useRef();
  const isInView = useInView(ref, { margin: "-80px" });

  return (
    <motion.div
      className="services"
      ref={ref}
      variants={container}
      initial="initial"
      animate={isInView ? "animate" : "initial"}
    >
      <motion.div className="header" variants={item}>
        <div className="titles">
          <h2>Stack &amp; Ferramentas</h2>
          <h1>
            Tecnologias que
            <br />
            <motion.b whileHover={{ color: "inherit" }}>uso no dia a dia</motion.b>
          </h1>
        </div>
        <p className="desc">
          Especializo-me em utilizar tecnologia para impulsionar sua marca. Cada ferramenta foi escolhida para entregar resultados reais.
        </p>
      </motion.div>

      <motion.div className="grid" variants={container}>
        {techs.map((t) => (
          <motion.div className="box" key={t.name} variants={item} whileHover="hover">
            <span className="icon">{t.icon}</span>
            <h2>{t.name}</h2>
            <p>{t.desc}</p>
            <span className="tag">{t.tag}</span>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default Services;
