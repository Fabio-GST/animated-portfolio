import { useEffect, useState } from 'react';
import './hero.scss';
import { motion } from 'framer-motion';

const textVariants = {
  initial: { opacity: 0, y: 30 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94], staggerChildren: 0.12 },
  },
  scrollButton: {
    opacity: 0,
    y: 8,
    transition: { duration: 1.8, repeat: Infinity },
  },
};

const sliderVariants = {
  initial: { x: 0 },
  animate: {
    x: '-220%',
    transition: { repeat: Infinity, repeatType: 'mirror', duration: 24 },
  },
};

const Hero = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    fetch('https://api.github.com/users/Fabio-GST')
      .then((r) => r.json())
      .then(setProfile)
      .catch(() => {});
  }, []);

  return (
    <div className="hero">
      <div className="wrapper">
        <motion.div
          className="textContainer"
          variants={textVariants}
          initial="initial"
          animate="animate"
        >
          <motion.div variants={textVariants} className="eyebrow">
            <span className="dot" />
            <span>Disponível para novos projetos</span>
          </motion.div>

          <motion.h2 variants={textVariants}>Fabio Gustavo</motion.h2>

          <motion.h1 variants={textVariants}>
            Fullstack Dev<br />& Data Analyst
          </motion.h1>

          <motion.p variants={textVariants} className="subtext">
            Construo aplicações web modernas e transformo dados em decisões. Next.js, TypeScript, Python e Power BI.
          </motion.p>

          <motion.div variants={textVariants} className="buttons">
            <button>
              <a href="#Projetos">Ver Projetos</a>
            </button>
            <button>
              <a href="#Contato">Fale Comigo</a>
            </button>
          </motion.div>

          {profile && (
            <motion.div variants={textVariants} className="githubStats">
              <a
                href={profile.html_url}
                target="_blank"
                rel="noreferrer"
                className="statItem"
              >
                <span className="statNum">{profile.public_repos}</span>
                <span className="statLabel">Repos</span>
              </a>
              <span className="statDivider" />
              <a
                href={`${profile.html_url}?tab=followers`}
                target="_blank"
                rel="noreferrer"
                className="statItem"
              >
                <span className="statNum">{profile.followers}</span>
                <span className="statLabel">Seguidores</span>
              </a>
              <span className="statDivider" />
              <a
                href={`${profile.html_url}?tab=following`}
                target="_blank"
                rel="noreferrer"
                className="statItem"
              >
                <span className="statNum">{profile.following}</span>
                <span className="statLabel">Seguindo</span>
              </a>
            </motion.div>
          )}

          <motion.div variants={textVariants} className="scrollHint">
            <motion.img animate="scrollButton" variants={textVariants} src="/scroll.png" alt="" />
            <span>Role para explorar</span>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        className="slidingTextContainer"
        variants={sliderVariants}
        initial="initial"
        animate="animate"
      >
        Developer · Analyst ·
      </motion.div>

      <div className="imageContainer">
        {profile && (
          <motion.img
            src={profile.avatar_url}
            alt={profile.name}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          />
        )}
      </div>
    </div>
  );
};

export default Hero;
