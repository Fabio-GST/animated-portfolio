import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import ReactMarkdown from "react-markdown";
import "./portfolio.scss";
import { motion, useScroll, useSpring, useTransform, AnimatePresence } from "framer-motion";

const langColors = {
  JavaScript: "#f7df1e",
  TypeScript: "#3178c6",
  Python: "#3776ab",
  Node: "#339933",
  React: "#61dafb",
};
const DEFAULT_COLOR = "#da4ea2";

/** Projetos reais + ideias de projetos fullstack */
const PROJECT_IDEAS = [
  {
    id: 0,
    name: "Regularizador",
    description: "SaaS de higienização e enriquecimento de bases de dados (mailings) com dashboard analítico.",
    language: "TypeScript",
    images: ["/regularizador.png", "/regularizador02.png", "/regularizador03.png"],
    private: true,
    details: `## Sobre o Projeto
Plataforma **Regularizador - DATA MANAGEMENT** para sanitização, enriquecimento e análise de bases de contatos (CSV). Sistema multi-tenant com painel admin e área do cliente.

### Stack de Tecnologias
- **Frontend:** Next.js 16 (App Router), React 18, TypeScript, Tailwind, MUI (Data Grid), Radix UI, Redux Toolkit, TanStack React Query, ApexCharts/Recharts, Socket.IO client
- **Backend:** AdonisJS 6 (Node.js), Lucid ORM, Vine (validação), Auth
- **Banco:** MySQL
- **Filas:** RabbitMQ — processamento assíncrono de mailings
- **Cache:** Redis — cancelamento de processamentos, estado auxiliar
- **Tempo real:** Socket.IO — acompanhamento ao vivo do progresso
- **Integração:** NextDados (enriquecimento), webhooks

### Lógica do Sistema
- **Dois perfis:** Admin (\`/admin/*\`) e Cliente (\`/clients/*\`), com autenticação separada
- **Pipeline de higienização:** Upload CSV → API publica na fila RabbitMQ → Consumer processa em streaming (validação de telefones, pontuação SIP/WhatsApp) → persiste no MySQL e gera CSV de saída
- **Progresso em tempo real** via Socket.IO para cada mailing
- **Enriquecimentos:** fluxo paralelo com criação, processamento via NextDados e webhook de retorno
- **Créditos:** Sistema de billing/planos; processamento consome créditos
- **API para clientes:** Criação de mailings via \`api_token\` (POST /clients/mailings/api-create)`,
  },
  {
    id: 1,
    name: "CRM Comercial",
    description: "Plataforma CRM para gestão de leads, pipeline de vendas e relacionamento com clientes.",
    language: "TypeScript",
    images: ["/crm1.png", "/crm2.png", "/crm3.png"],
    private: true,
    details: `## Sobre o Projeto
Plataforma **CRM Comercial** para centralizar o gerenciamento de clientes, leads e oportunidades de negócio com dashboard analítico em tempo real.

### Stack de Tecnologias
- **Frontend:** Next.js (App Router), React, TypeScript, TailwindCSS, shadcn/ui, TanStack Query, Recharts
- **Backend:** Node.js + AdonisJS, Lucid ORM, Auth JWT
- **Banco:** PostgreSQL
- **Realtime:** Socket.IO — atualizações ao vivo no pipeline
- **Email:** Integração com SMTP para disparo de follow-ups

### Funcionalidades Principais
- **Pipeline de vendas** visual (Kanban por estágio)
- **Gestão de leads** com scoring e segmentação
- **Dashboard analítico** — conversão, receita, funil, metas
- **Histórico de interações** por cliente (ligações, emails, reuniões)
- **Tarefas e follow-ups** com alertas automáticos
- **Relatórios** exportáveis (PDF, Excel)
- **Multi-usuário** com perfis e permissões (admin, vendedor, gestor)

### Diferenciais
- Visualização de funil com métricas de conversão por etapa
- Integração com agenda para agendamento de reuniões
- Filtros avançados por origem, status, responsável e período`,
  },
  {
    id: 8,
    name: "Plataforma de SMS",
    description: "Sistema de envio e gestão de campanhas de SMS em massa com painel analítico.",
    language: "TypeScript",
    images: ["/sms1.png", "/sms2.png"],
    private: true,
    details: `## Sobre o Projeto
Plataforma para **gestão e disparo de campanhas de SMS em massa**, com painel analítico, controle de créditos e relatórios de entrega.

### Stack de Tecnologias
- **Frontend:** React, TypeScript, TailwindCSS
- **Backend:** Node.js + AdonisJS
- **Banco:** MySQL / PostgreSQL
- **Filas:** RabbitMQ — processamento assíncrono de disparos
- **Integração:** Operadoras de SMS via API

### Funcionalidades Principais
- Criação e agendamento de campanhas de SMS
- Upload de listas de contatos (CSV)
- Painel analítico — entregues, falhos, taxa de abertura
- Gestão de créditos e planos
- Histórico detalhado de campanhas
- Multi-usuário com perfis e permissões`,
  },

];

/* ─── Modal de detalhes da ideia ───────────────────── */
const IdeaModal = ({ item, onClose }) => {
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
              style={{ background: langColors[item.language] || DEFAULT_COLOR }}
            />
            <h3>{item.name}</h3>
            {item.language && <span className="langLabel">{item.language}</span>}
            <span className="projectBadge">Detalhes do Projeto</span>
          </div>
          <div className="readmeActions">
            {!item.private && (
              <a href="https://github.com/Fabio-GST" target="_blank" rel="noreferrer" className="ghLink">
                Meu GitHub ↗
              </a>
            )}
            <button className="closeBtn" onClick={onClose} aria-label="Fechar">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <div className="readmeBody">
          <div className="markdownContent">
            <ReactMarkdown>{item.details}</ReactMarkdown>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

/* ─── Preview da imagem (lightbox) ─────────────────── */
const ImagePreview = ({ images, alt, projectName, onClose }) => {
  const [current, setCurrent] = useState(0);
  const imgs = useMemo(() => (Array.isArray(images) ? [...images] : [images]), [images]);

  const goPrev = useCallback(() => {
    setCurrent((i) => (i > 0 ? i - 1 : imgs.length - 1));
  }, [imgs.length]);

  const goNext = useCallback(() => {
    setCurrent((i) => (i < imgs.length - 1 ? i + 1 : 0));
  }, [imgs.length]);

  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape" || e.key === "Enter") onClose();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose, goPrev, goNext]);

  const currentSrc = imgs[current];
  if (!currentSrc) return null;

  return (
    <motion.div
      className="imagePreviewOverlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <motion.div
        className="imagePreviewWrapper"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
        onClick={(e) => e.stopPropagation()}
      >
        <header className="previewHeader">
          <span className="previewTitle">{projectName || alt}</span>
          <div className="previewMeta">
            {imgs.length > 1 && (
              <span className="slideCounter">{current + 1} / {imgs.length}</span>
            )}
            <span className="keyboardHint">Esc para fechar · ← → para navegar</span>
          </div>
          <button className="previewCloseBtn" onClick={onClose} aria-label="Fechar">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </header>

        <div className="previewCarousel">
          {imgs.length > 1 && (
            <button
              className="carouselBtn prev"
              onClick={goPrev}
              aria-label="Anterior"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
          )}
          <div className="previewImageFrame">
            <AnimatePresence mode="wait">
              <motion.img
                key={currentSrc}
                src={currentSrc}
                alt={`${alt} (${current + 1}/${imgs.length})`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              />
            </AnimatePresence>
          </div>
          {imgs.length > 1 && (
            <button
              className="carouselBtn next"
              onClick={goNext}
              aria-label="Próximo"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          )}
        </div>

        {imgs.length > 1 && (
          <div className="carouselDots">
            {imgs.map((_, i) => (
              <button
                key={i}
                className={`dot ${i === current ? "active" : ""}`}
                onClick={() => setCurrent(i)}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

/* ─── Carrossel no card ────────────────────────────── */
const ProjectCarousel = ({ images, alt, onImageClick }) => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    const id = setInterval(() => setCurrent((i) => (i + 1) % images.length), 5000);
    return () => clearInterval(id);
  }, [images.length]);

  return (
    <div className="projectCarousel" onClick={onImageClick} role="button" tabIndex={0} onKeyDown={(e) => e.key === "Enter" && onImageClick()} aria-label="Ampliar imagem">
      <AnimatePresence mode="wait">
        <motion.img
          key={images[current]}
          src={images[current]}
          alt={alt}
          className="projectImage"
          loading="lazy"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        />
      </AnimatePresence>
      {images.length > 1 && (
        <>
          <button
            className="carouselArrow left"
            onClick={(e) => { e.stopPropagation(); setCurrent((i) => (i > 0 ? i - 1 : images.length - 1)); }}
            aria-label="Anterior"
          >
            ‹
          </button>
          <button
            className="carouselArrow right"
            onClick={(e) => { e.stopPropagation(); setCurrent((i) => (i + 1) % images.length); }}
            aria-label="Próximo"
          >
            ›
          </button>
          <div className="carouselDotsCard">
            {images.map((_, i) => (
              <button
                key={i}
                className={`dot ${i === current ? "active" : ""}`}
                onClick={(e) => { e.stopPropagation(); setCurrent(i); }}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

/* ─── Card de projeto/ideia ─────────────────────────── */
const Single = ({ item, onDetails }) => {
  const ref = useRef();
  const [previewOpen, setPreviewOpen] = useState(false);
  const { scrollYProgress } = useScroll({ target: ref });
  const y = useTransform(scrollYProgress, [0, 1], [-260, 260]);
  const color = langColors[item.language] || DEFAULT_COLOR;
  const images = item.images || (item.image ? [item.image] : []);
  const isRealProject = images.length > 0 || !!item.private;
  const isReversed = item._index % 2 === 0;

  return (
    <section style={{ "--accent": color }}>
      <div className="container">
        <motion.div
          className={`wrapper${isReversed ? " reversed" : ""}`}
          initial={{ opacity: 0, x: isReversed ? 60 : -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="repoVisual" ref={ref}>
            {images.length > 0 ? (
              images.length > 1 ? (
                <ProjectCarousel
                  images={images}
                  alt={item.name}
                  onImageClick={() => setPreviewOpen(true)}
                />
              ) : (
                <img
                  src={images[0]}
                  alt={item.name}
                  className="projectImage"
                  loading="lazy"
                  onClick={() => setPreviewOpen(true)}
                />
              )
            ) : (
              <div className="visualFallback" />
            )}
            <div className="visualOverlay">
              <div className="langBadge">
                <span className="langDot" style={{ background: color }} />
                {item.language || "—"}
              </div>
              <span className={`stat ${isRealProject ? "projectBadge" : "ideaBadge"}`}>
                {isRealProject ? "🚀 Projeto" : "💡 Ideia"}
              </span>
            </div>
          </div>

          <motion.div className="textContainer" style={{ y }}>
            <span className="accentBar" />
            <span className="repoIndex">
              {String(item._index).padStart(2, "0")}
            </span>
            <h2>{item.name}</h2>
            <p>{item.description}</p>
            <div className="btnGroup">
              <button className="btn primary" onClick={() => onDetails(item)}>
                Ver Detalhes
              </button>
              {!item.private && (
                <a href="https://github.com/Fabio-GST" target="_blank" rel="noreferrer">
                  <button className="btn outline">Meu GitHub ↗</button>
                </a>
              )}
            </div>
          </motion.div>
        </motion.div>
      </div>

      <AnimatePresence>
        {previewOpen && images.length > 0 && (
          <ImagePreview
            key="image-preview"
            images={images}
            alt={item.name}
            projectName={item.name}
            onClose={() => setPreviewOpen(false)}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

/* ─── Portfolio principal ─────────────────────────── */
const Portfolio = () => {
  const ref = useRef();
  const [activeIdea, setActiveIdea] = useState(null);
  const ideas = PROJECT_IDEAS.map((p, i) => ({ ...p, _index: i + 1 }));

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["end end", "start start"],
  });
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  const handleClose = useCallback(() => setActiveIdea(null), []);

  return (
    <>
      <div className="portfolio" ref={ref}>
        <div className="progress">
          <h1>Projetos e Ideias Fullstack</h1>
          <motion.div style={{ scaleX }} className="progressBar" />
        </div>

        {ideas.map((item) => (
          <Single item={item} key={item.id} onDetails={setActiveIdea} />
        ))}
      </div>

      <AnimatePresence>
        {activeIdea && (
          <IdeaModal item={activeIdea} onClose={handleClose} />
        )}
      </AnimatePresence>
    </>
  );
};

export default Portfolio;
