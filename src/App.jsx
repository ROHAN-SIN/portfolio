import { useEffect, useRef } from "react";
import "./App.css";

// ── DATA ────────────────────────────────────────────────
const SKILLS = [
  { icon: "⚛️", name: "React / Next.js",    desc: "Building fast, scalable frontend applications with modern React patterns and server-side rendering.",        pct: 92 },
  { icon: "🎨", name: "UI / UX Design",      desc: "Crafting intuitive, visually striking interfaces using Figma, with a strong eye for design systems.",         pct: 88 },
  { icon: "🟢", name: "Node.js / Express",   desc: "Developing robust REST APIs and backend services with Node.js and database integration.",                      pct: 85 },
  { icon: "🗄️", name: "Database Design",     desc: "Designing efficient schemas with MongoDB, PostgreSQL, and MySQL for complex data relationships.",              pct: 80 },
  { icon: "☁️", name: "Cloud & DevOps",      desc: "Deploying and managing applications on AWS, Vercel, and Docker containerization workflows.",                   pct: 75 },
  { icon: "📱", name: "Responsive Design",   desc: "Creating pixel-perfect, mobile-first designs that look stunning on every screen size.",                        pct: 90 },
];

const PROJECTS = [
  {
    emoji: "🛒",
    gradient: "linear-gradient(135deg,#1a0a3c,#3d1a7a)",
    tags: ["React", "Node.js", "MongoDB"],
    name: "E-Commerce Platform",
    desc: "A full-featured online store with cart, payments, admin dashboard, and real-time inventory management.",
  },
  {
    emoji: "📊",
    gradient: "linear-gradient(135deg,#0a1a30,#0a4a7a)",
    tags: ["Next.js", "TypeScript", "Prisma"],
    name: "Analytics Dashboard",
    desc: "Real-time data visualization dashboard with interactive charts, custom reports, and team collaboration features.",
  },
  {
    emoji: "💬",
    gradient: "linear-gradient(135deg,#0a2a1a,#0a6a3a)",
    tags: ["React Native", "Firebase", "WebRTC"],
    name: "Chat Application",
    desc: "Real-time messaging app with video calls, file sharing, end-to-end encryption, and group features.",
  },
];

// ── CUSTOM CURSOR ────────────────────────────────────────
function Cursor() {
  const dotRef  = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    let mx = 0, my = 0, rx = 0, ry = 0;

    const onMove = (e) => {
      mx = e.clientX; my = e.clientY;
      dotRef.current.style.left = mx + "px";
      dotRef.current.style.top  = my + "px";
    };

    const animate = () => {
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      ringRef.current.style.left = rx + "px";
      ringRef.current.style.top  = ry + "px";
      requestAnimationFrame(animate);
    };

    document.addEventListener("mousemove", onMove);
    animate();

    const hoverEls = document.querySelectorAll("a,button,.skill-card,.project-card,.stat-card,.contact-link");
    const addHover    = () => { dotRef.current.classList.add("hover");    ringRef.current.classList.add("hover"); };
    const removeHover = () => { dotRef.current.classList.remove("hover"); ringRef.current.classList.remove("hover"); };
    hoverEls.forEach((el) => { el.addEventListener("mouseenter", addHover); el.addEventListener("mouseleave", removeHover); });

    return () => {
      document.removeEventListener("mousemove", onMove);
      hoverEls.forEach((el) => { el.removeEventListener("mouseenter", addHover); el.removeEventListener("mouseleave", removeHover); });
    };
  }, []);

  return (
    <>
      <div className="cursor" ref={dotRef} />
      <div className="cursor-ring" ref={ringRef} />
    </>
  );
}

// ── SCROLL REVEAL HOOK ───────────────────────────────────
function useReveal() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            if (e.target.classList.contains("stagger")) {
              e.target.querySelectorAll(".skill-card").forEach((c) => c.classList.add("visible"));
            }
          }
        });
      },
      { threshold: 0.15 }
    );
    document.querySelectorAll(".reveal,.stagger,.about-stats").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

// ── NAV ──────────────────────────────────────────────────
function Nav() {
  return (
    <nav>
      <div className="logo">R.</div>
      <ul>
        {["about","skills","projects","contact"].map((s) => (
          <li key={s}><a href={`#${s}`}>{s.charAt(0).toUpperCase()+s.slice(1)}</a></li>
        ))}
      </ul>
    </nav>
  );
}

// ── HERO ─────────────────────────────────────────────────
function Hero() {
  return (
    <section id="hero">
      <div className="hero-bg" />
      <div className="grid-lines" />
      <div className="floating-orb orb1" />
      <div className="floating-orb orb2" />

      <div className="hero-content">
        <div className="hero-badge">
          <span className="badge-dot" />
          Available for Work
        </div>
        <h1 className="hero-name">
          <span className="line">Hello, I'm</span>
          <span className="line highlight">Rohan</span>
        </h1>
        <p className="hero-subtitle">
          Full Stack Developer & UI Designer crafting<br />
          beautiful digital experiences that matter.
        </p>
        <div className="hero-cta">
          <a href="#projects" className="btn btn-primary">View My Work →</a>
          <a href="#contact"  className="btn btn-outline">Get In Touch</a>
        </div>
      </div>

      <div className="hero-avatar">
        <div className="avatar-ring">
          <div className="orbit-dot" />
          <div className="avatar-inner">
            <img src="167.jpg" alt="Rohan" style={{backgroundSize:"cover", backgroundPosition:"center"}} />
          </div>
        </div>
      </div>

      <div className="scroll-indicator">
        <div className="scroll-line" />
        <span>Scroll</span>
      </div>
    </section>
  );
}

// ── ABOUT ────────────────────────────────────────────────
function About() {
  return (
    <section id="about">
      <div className="section-label">Who I Am</div>
      <h2 className="section-title">
        Passionate about creating<br />meaningful experiences
      </h2>

      <div className="about-grid">
        <div className="reveal">
          <p className="section-desc" style={{ maxWidth: "100%" }}>
            I'm Rohan, a creative developer with a passion for building modern,
            user-centric web applications. I blend clean code with thoughtful design
            to create products that are both functional and beautiful.
          </p>
          <p className="section-desc" style={{ maxWidth: "100%", marginTop: "1rem" }}>
            With expertise in frontend and backend technologies, I deliver complete
            digital solutions — from concept to deployment. Let's build something
            extraordinary together.
          </p>

          <div className="about-stats stagger">
           
          </div>
        </div>

        <div className="about-image-wrapper reveal">
          <div className="about-photo">
            <span style={{ zIndex: 1, position: "relative", fontSize: "5rem" }}>👤</span>
            <div className="photo-overlay" />
          </div>
          <div className="about-tag tag1"><span className="tag-icon">💻</span>Full Stack Dev</div>
          <div className="about-tag tag2"><span className="tag-icon">🎨</span>UI/UX Designer</div>
        </div>
      </div>
    </section>
  );
}

// ── SKILLS ───────────────────────────────────────────────
function Skills() {
  return (
    <section id="skills">
      <div className="section-label">What I Do</div>
      <h2 className="section-title reveal">Skills & Technologies</h2>
      <p className="section-desc reveal">The tools and technologies I use to bring ideas to life.</p>

      <div className="skills-grid stagger">
        {SKILLS.map(({ icon, name, desc, pct }) => (
          <div className="skill-card" key={name} style={{ "--pct": `${pct}%` }}>
            <div className="skill-icon">{icon}</div>
            <div className="skill-name">{name}</div>
            <div className="skill-desc">{desc}</div>
            <div className="skill-bar"><div className="skill-fill" /></div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ── PROJECTS ─────────────────────────────────────────────
function Projects() {
  return (
    <section id="projects">
      <div className="section-label">My Work</div>
      <h2 className="section-title reveal">Featured Projects</h2>
      <p className="section-desc reveal">A selection of projects that showcase my skills and creativity.</p>

      <div className="projects-grid stagger">
        {PROJECTS.map(({ emoji, gradient, tags, name, desc }) => (
          <div className="project-card" key={name}>
            <div className="project-thumb">
              <div className="thumb-gradient" style={{ background: gradient }} />
              <div className="thumb-text">{emoji}</div>
            </div>
            <div className="project-body">
              <div className="project-tags">
                {tags.map((t) => <span className="tag" key={t}>{t}</span>)}
              </div>
              <div className="project-name">{name}</div>
              <div className="project-desc">{desc}</div>
              <a href="#" className="project-link">View Project →</a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ── CONTACT ──────────────────────────────────────────────
function Contact() {
  return (
    <section id="contact">
      <div className="contact-inner">
        <div className="section-label">Get In Touch</div>
        <h2 className="section-title reveal">Let's Work Together</h2>
        <p className="section-desc reveal" style={{ margin: "0 auto", textAlign: "center" }}>
          Have a project in mind? I'd love to hear about it. Let's create something amazing!
        </p>

        <div className="contact-glow reveal">
          <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>✉️</div>
          <h3 className="contact-heading">Drop me a message</h3>
          <p className="contact-sub">Available for freelance & full-time opportunities</p>
          <a href="mailto:rohan@example.com" className="btn btn-primary" style={{ display: "inline-flex" }}>
            Send Email →
          </a>

          <div className="contact-links">
            {[["🐙","GitHub"],["💼","LinkedIn"],["🐦","Twitter"],["📸","Instagram"]].map(([icon,label]) => (
              <a href="#" className="contact-link" key={label}>
                <span>{icon}</span> {label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── FOOTER ───────────────────────────────────────────────
function Footer() {
  return (
    <footer>
      <p>Designed & Built with ❤️ by <strong>Rohan</strong> · 2024</p>
    </footer>
  );
}

// ── ROOT ─────────────────────────────────────────────────
export default function App() {
  useReveal();

  return (
    <>
      <Cursor />
      <Nav />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Contact />
      <Footer />
    </>
  );
}