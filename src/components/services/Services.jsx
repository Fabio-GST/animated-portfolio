import { useRef } from "react";
import "./services.scss";
import { motion, useInView } from "framer-motion";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiJavascript,
  SiNodedotjs,
  SiPython,
  SiTailwindcss,
  SiPostgresql,
  SiDocker,
  SiGit,
} from "react-icons/si";

const techs = [
  {
    Icon: SiReact,
    color: "#61DAFB",
    name: "React",
    desc: "Interfaces reativas e componentizadas com alta performance.",
    tag: "Frontend",
  },
  {
    Icon: SiNextdotjs,
    color: "#ffffff",
    name: "Next.js",
    desc: "Apps fullstack com SSR, SSG e App Router.",
    tag: "Frontend",
  },
  {
    Icon: SiTypescript,
    color: "#3178C6",
    name: "TypeScript",
    desc: "Código tipado e robusto para projetos escaláveis.",
    tag: "Linguagem",
  },
  {
    Icon: SiJavascript,
    color: "#F7DF1E",
    name: "JavaScript",
    desc: "Lógica dinâmica e interatividade no cliente e servidor.",
    tag: "Linguagem",
  },
  {
    Icon: SiNodedotjs,
    color: "#339933",
    name: "Node.js",
    desc: "APIs e serviços backend escaláveis com JavaScript.",
    tag: "Backend",
  },
  {
    Icon: SiPython,
    color: "#3776AB",
    name: "Python",
    desc: "Automação, scripts e back-end versátil.",
    tag: "Backend",
  },
  {
    Icon: SiTailwindcss,
    color: "#06B6D4",
    name: "Tailwind CSS",
    desc: "Estilização utilitária rápida e consistente.",
    tag: "Estilo",
  },
  {
    Icon: SiPostgresql,
    color: "#4169E1",
    name: "PostgreSQL",
    desc: "Banco relacional robusto para dados complexos.",
    tag: "Banco de Dados",
  },
  {
    Icon: SiDocker,
    color: "#2496ED",
    name: "Docker",
    desc: "Containerização de apps para ambientes reproduzíveis.",
    tag: "DevOps",
  },
  {
    Icon: SiGit,
    color: "#F05032",
    name: "Git",
    desc: "Controle de versão e fluxo colaborativo de código.",
    tag: "DevOps",
  },
];

const container = {
  initial: {},
  animate: { transition: { staggerChildren: 0.07 } },
};

const item = {
  initial: { opacity: 0, y: 28 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] },
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
          Ferramentas escolhidas para cobrir todo o ciclo de desenvolvimento — do design ao deploy — com qualidade e eficiência.
        </p>
      </motion.div>

      <motion.div className="grid" variants={container}>
        {techs.map(({ Icon, color, name, desc, tag }) => (
          <motion.div
            className="box"
            key={name}
            variants={item}
            style={{ "--tech-color": color }}
            whileHover={{ y: -6, transition: { duration: 0.2 } }}
          >
            <span className="icon" style={{ color }}>
              <Icon />
            </span>
            <h2>{name}</h2>
            <p>{desc}</p>
            <span className="tag">{tag}</span>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default Services;
