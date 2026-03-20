import { useEffect, useRef, useState, useCallback } from "react";
import ReactMarkdown from "react-markdown";
import "./portfolio.scss";
import { motion, useScroll, useSpring, useTransform, AnimatePresence } from "framer-motion";

const langColors = {
  JavaScript:        "#f7df1e",
  TypeScript:        "#3178c6",
  Python:            "#3776ab",
  HTML:              "#e34c26",
  CSS:               "#563d7c",
  "Jupyter Notebook":"#da5b0b",
  Dart:              "#00b4ab",
  Shell:             "#89e051",
  Go:                "#00add8",
  Rust:              "#dea584",
  Java:              "#b07219",
  "C#":              "#178600",
};
const DEFAULT_COLOR = "#da4ea2";

/**
 * Adicione aqui a imagem de cada projeto usando o nome exato do repositório.
 * Pode usar URLs externas ou imagens locais em /public (ex: "/meu-projeto.png").
 * Repos sem entrada aqui usarão um fundo gradiente baseado na linguagem.
 */
const PROJECT_IMAGES = {
  // "nome-do-repo": "https://url-da-imagem.com/imagem.png",
  // "outro-repo":   "/imagem-local.png",
};

/* ─── Modal de README ─────────────────────────────── */
const ReadmeModal = ({ repo, onClose }) => {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]   = useState(false);

  useEffect(() => {
    fetch(`https://api.github.com/repos/Fabio-GST/${repo.name}/readme`, {
      headers: { Accept: "application/vnd.github.v3+json" },
    })
      .then((r) => {
        if (!r.ok) throw new Error();
        return r.json();
      })
      .then((data) => {
        setContent(atob(data.content));
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, [repo.name]);

  useEffect(() => {
    const handler = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <motion.div
      className="readmeOverlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <motion.div
        className="readmePanel"
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <div className="readmePanelHeader">
          <div className="repoMeta">
            <span
              className="langDot"
              style={{ background: langColors[repo.language] || DEFAULT_COLOR }}
            />
            <h3>{repo.name.replace(/-/g, " ")}</h3>
            {repo.language && <span className="langLabel">{repo.language}</span>}
          </div>
          <div className="readmeActions">
            <a href={repo.html_url} target="_blank" rel="noreferrer" className="ghLink">
              Ver no GitHub ↗
            </a>
            <button className="closeBtn" onClick={onClose} aria-label="Fechar">✕</button>
          </div>
        </div>

        <div className="readmeBody">
          {loading && (
            <div className="readmeState">
              <div className="spinner" />
              <span>Carregando README…</span>
            </div>
          )}
          {error && (
            <div className="readmeState error">
              <span>📄 README não encontrado neste repositório.</span>
            </div>
          )}
          {!loading && !error && content && (
            <div className="markdownContent">
              <ReactMarkdown>{content}</ReactMarkdown>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

/* ─── Card de projeto ─────────────────────────────── */
const Single = ({ item, onReadme }) => {
  const ref = useRef();
  const { scrollYProgress } = useScroll({ target: ref });
  const y = useTransform(scrollYProgress, [0, 1], [-260, 260]);
  const color = langColors[item.language] || DEFAULT_COLOR;
  const customImage = PROJECT_IMAGES[item.name];

  return (
    <section>
      <div className="container">
        <div className="wrapper">
          <div className="repoVisual" ref={ref} style={{ "--accent": color }}>
            {customImage ? (
              <img
                src={customImage}
                alt={item.name}
                className="projectImage"
                loading="lazy"
              />
            ) : (
              <div className="visualFallback" />
            )}
            <div className="visualOverlay">
              <div className="langBadge">
                <span className="langDot" style={{ background: color }} />
                {item.language || "—"}
              </div>
              <div className="statsRow">
                {item.stargazers_count > 0 && (
                  <span className="stat">
                    <svg viewBox="0 0 16 16" fill="currentColor" width="13"><path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.75.75 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25z"/></svg>
                    {item.stargazers_count}
                  </span>
                )}
                {item.forks_count > 0 && (
                  <span className="stat">
                    <svg viewBox="0 0 16 16" fill="currentColor" width="13"><path d="M5 5.372v.878c0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75v-.878a2.25 2.25 0 1 1 1.5 0v.878a2.25 2.25 0 0 1-2.25 2.25h-1.5v2.128a2.251 2.251 0 1 1-1.5 0V8.5h-1.5A2.25 2.25 0 0 1 3.5 6.25v-.878a2.25 2.25 0 1 1 1.5 0z"/></svg>
                    {item.forks_count}
                  </span>
                )}
                {item.open_issues_count > 0 && (
                  <span className="stat">
                    <svg viewBox="0 0 16 16" fill="currentColor" width="13"><path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"/><path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zM1.5 8a6.5 6.5 0 1 0 13 0 6.5 6.5 0 0 0-13 0z"/></svg>
                    {item.open_issues_count}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Texto */}
          <motion.div className="textContainer" style={{ y }}>
            <span className="repoIndex">
              {String(item._index).padStart(2, "0")}
            </span>
            <h2>{item.name.replace(/-/g, " ")}</h2>
            <p>{item.description || "Sem descrição disponível."}</p>
            <div className="btnGroup">
              <button className="btn primary" onClick={() => onReadme(item)}>
                Ver README
              </button>
              <a href={item.html_url} target="_blank" rel="noreferrer">
                <button className="btn outline">GitHub ↗</button>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

/* ─── Portfolio principal ─────────────────────────── */
const Portfolio = () => {
  const ref = useRef();
  const [repos, setRepos]       = useState([]);
  const [loading, setLoading]   = useState(true);
  const [activeRepo, setActive] = useState(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["end end", "start start"],
  });
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  useEffect(() => {
    fetch("https://api.github.com/users/Fabio-GST/repos?sort=updated&per_page=10")
      .then((r) => r.json())
      .then((data) => {
        const list = Array.isArray(data)
          ? data.filter((r) => !r.fork).slice(0, 6).map((r, i) => ({ ...r, _index: i + 1 }))
          : [];
        setRepos(list);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleClose = useCallback(() => setActive(null), []);

  return (
    <>
      <div className="portfolio" ref={ref}>
        <div className="progress">
          <h1>Projetos em Destaque</h1>
          <motion.div style={{ scaleX }} className="progressBar" />
        </div>

        {loading ? (
          <section>
            <div className="loadingState">
              <div className="spinner" />
            </div>
          </section>
        ) : (
          repos.map((repo) => (
            <Single item={repo} key={repo.id} onReadme={setActive} />
          ))
        )}
      </div>

      <AnimatePresence>
        {activeRepo && (
          <ReadmeModal repo={activeRepo} onClose={handleClose} />
        )}
      </AnimatePresence>
    </>
  );
};

export default Portfolio;
