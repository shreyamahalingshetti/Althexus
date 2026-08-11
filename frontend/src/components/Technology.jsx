import useReveal from "../hooks/useReveal";
import { technologies } from "../data";

import {
  FaReact,
  FaNodeJs,
  FaJava,
  FaPython,
  FaPhp,
  FaDocker,
  FaGitAlt,
  FaAws,
  FaCloud,
  FaHtml5,
} from "react-icons/fa";

import {
  SiJavascript,
  SiMysql,
  SiMongodb,
  SiFirebase,
  SiFlutter,
  SiCss3,
} from "react-icons/si";



const icons = {
  html: <FaHtml5 />,
  css: <SiCss3 />,
  javascript: <SiJavascript />,
  react: <FaReact />,
  node: <FaNodeJs />,
  java: <FaJava />,
  python: <FaPython />,
  php: <FaPhp />,
  mysql: <SiMysql />,
  mongodb: <SiMongodb />,
  firebase: <SiFirebase />,
  docker: <FaDocker />,
  aws: <FaAws />,
  azure: <FaCloud />,
  git: <FaGitAlt />,
  flutter: <SiFlutter />,
};

export default function Technology() {
  const [ref, visible] = useReveal();

  return (
    <section
      id="technology"
      ref={ref}
      className={`technology reveal ${visible ? "in-view" : ""}`}
    >
      <div className="tech-bg">
  <span className="blob blob1"></span>
  <span className="blob blob2"></span>
  <span className="blob blob3"></span>
</div>

      <div className="section-title">
        <span>TECHNOLOGIES </span>
        <h2>Technologies We Master</h2>

        <p className="section-text">
          We leverage modern technologies to build secure,
          scalable and high-performance digital products.
        </p>
        <div className="tech-stats">

  <div className="tech-stat-card">
    <h3>15+</h3>
    <span>Technologies</span>
  </div>

  <div className="tech-stat-card">
    <h3>50+</h3>
    <span>Projects Delivered</span>
  </div>

  <div className="tech-stat-card">
    <h3>100%</h3>
    <span>Modern Stack</span>
  </div>

</div>
      </div>

      <div className="technology-grid">
        {technologies.map((tech) => (
          <div className="technology-card" key={tech.title}>
            <div className="technology-icon">
              {icons[tech.icon]}
            </div>

            <h3>{tech.title}</h3>

            <p>{tech.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}