import { useState } from "react";
import "../styles/PantallaPrincipal.css";

const ICONOS_CURSO = {
  segundo: "🧬",
  quinto: "🌍",
  sexto: "🔬"
};

const COLORES_CURSO = {
  segundo: { sombra: "rgba(83,74,183,0.20)", fondo: "#EEEDFE", texto: "#26215C", subtexto: "#534AB7", stat: "stat-segundo" },
  quinto:  { sombra: "rgba(29,158,117,0.20)", fondo: "#E1F5EE", texto: "#04342C", subtexto: "#0F6E56", stat: "stat-quinto" },
  sexto:   { sombra: "rgba(216,90,48,0.20)",  fondo: "#FAECE7", texto: "#4A1B0C", subtexto: "#993C1D", stat: "stat-sexto" }
};

function contarNuevos(recursos) {
  return recursos.filter(r => r.estado === "nuevo").length;
}

export default function PantallaPrincipal({ plataforma, cursos, onSeleccionarCurso }) {
  return (
    <div className="pp-app">

      {/* NAVBAR */}
      <nav className="pp-navbar">
        <div className="pp-nav-left">
          <div className="pp-logo-colegio">
            <span className="pp-logo-colegio-inner">UE<br/>NAB</span>
          </div>
          <div className="pp-navbar-info">
            <div className="pp-navbar-logo">BioGeo <span>·</span> Prof. Franz</div>
            <div className="pp-navbar-inst">{plataforma.institucion}</div>
          </div>
        </div>
        <div className="pp-nav-right">
          <div className="pp-logo-area">🌿</div>
          <div className="pp-gestion">{plataforma.gestion}</div>
        </div>
      </nav>

      {/* HERO */}
      <div className="pp-hero">
        <svg className="pp-mol-fondo" viewBox="0 0 680 210" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
          <circle cx="60" cy="105" r="22" stroke="#AFA9EC" strokeWidth="1.5" fill="none"/>
          <circle cx="140" cy="60" r="14" stroke="#AFA9EC" strokeWidth="1.2" fill="none"/>
          <circle cx="200" cy="140" r="18" stroke="#7F77DD" strokeWidth="1.5" fill="none"/>
          <circle cx="300" cy="80" r="24" stroke="#AFA9EC" strokeWidth="1.5" fill="none"/>
          <circle cx="380" cy="150" r="16" stroke="#AFA9EC" strokeWidth="1.2" fill="none"/>
          <circle cx="460" cy="60" r="20" stroke="#7F77DD" strokeWidth="1.5" fill="none"/>
          <circle cx="540" cy="130" r="14" stroke="#AFA9EC" strokeWidth="1.2" fill="none"/>
          <circle cx="620" cy="80" r="18" stroke="#AFA9EC" strokeWidth="1.5" fill="none"/>
          <circle cx="100" cy="40" r="5" fill="#7F77DD"/>
          <circle cx="250" cy="55" r="6" fill="#5DCAA5"/>
          <circle cx="410" cy="90" r="5" fill="#7F77DD"/>
          <circle cx="580" cy="50" r="6" fill="#5DCAA5"/>
          <line x1="60" y1="105" x2="100" y2="40" stroke="#AFA9EC" strokeWidth="1"/>
          <line x1="100" y1="40" x2="140" y2="60" stroke="#AFA9EC" strokeWidth="1"/>
          <line x1="140" y1="60" x2="200" y2="140" stroke="#AFA9EC" strokeWidth="1"/>
          <line x1="200" y1="140" x2="250" y2="55" stroke="#7F77DD" strokeWidth="1"/>
          <line x1="250" y1="55" x2="300" y2="80" stroke="#AFA9EC" strokeWidth="1"/>
          <line x1="300" y1="80" x2="380" y2="150" stroke="#AFA9EC" strokeWidth="1"/>
          <line x1="380" y1="150" x2="410" y2="90" stroke="#AFA9EC" strokeWidth="1"/>
          <line x1="410" y1="90" x2="460" y2="60" stroke="#AFA9EC" strokeWidth="1"/>
          <line x1="460" y1="60" x2="540" y2="130" stroke="#AFA9EC" strokeWidth="1"/>
          <line x1="540" y1="130" x2="580" y2="50" stroke="#AFA9EC" strokeWidth="1"/>
          <line x1="580" y1="50" x2="620" y2="80" stroke="#7F77DD" strokeWidth="1"/>
        </svg>
        <div className="pp-hero-overlay"></div>
        <div className="pp-hero-content">
          <div className="pp-hero-tag">🌍 ÁREA BIOLOGÍA · GEOGRAFÍA</div>
          <h1 className="pp-hero-title">Elige tu <span>curso</span></h1>
          <p className="pp-hero-sub">Accede a todos tus materiales, apps y simulacros</p>
          <p className="pp-hero-inst">{plataforma.institucion} · El Alto, Bolivia</p>
        </div>
      </div>

      {/* CONTENIDO */}
      <div className="pp-contenido">
        <div className="pp-section-label">Selecciona tu grado</div>
        <div className="pp-cursos-grid">
          {cursos.map(curso => {
            const col = COLORES_CURSO[curso.id] || COLORES_CURSO.segundo;
            const nuevos = contarNuevos(curso.recursos);
            return (
              <div
                key={curso.id}
                className="pp-curso-card"
                style={{ boxShadow: `0 12px 32px ${col.sombra}, 0 3px 10px ${col.sombra}` }}
                onClick={() => onSeleccionarCurso(curso)}
              >
                <div className="pp-curso-arrow">→</div>
                <div className="pp-curso-blob" style={{ background: col.fondo }}>
                  {ICONOS_CURSO[curso.id]}
                </div>
                <div className="pp-curso-grado" style={{ color: col.texto }}>{curso.grado}</div>
                <div className="pp-curso-nombre" style={{ color: col.subtexto }}>{curso.nombre}</div>
                <div className="pp-curso-stats">
                  <span className={`pp-stat pp-${col.stat}`} style={{ background: col.fondo, color: col.subtexto }}>
                    {curso.recursos.length} recursos
                  </span>
                  {nuevos > 0 && (
                    <span className="pp-stat pp-stat-nuevo">🆕 {nuevos} nuevo{nuevos > 1 ? "s" : ""}</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* FOOTER */}
      <div className="pp-footer">
        <div className="pp-footer-text">© {plataforma.gestion} · Prof. Franz Vidal Condori · Área Biología-Geografía</div>
        <div className="pp-footer-badge">Gestión {plataforma.gestion}</div>
      </div>

    </div>
  );
}