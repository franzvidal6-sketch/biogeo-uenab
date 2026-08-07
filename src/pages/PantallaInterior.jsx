import { useState } from "react";
import "../styles/PantallaInterior.css";

const CATEGORIAS = [
  { id: "anuncio",   label: "Anuncios",            icono: "📢", clase: "anun" },
  { id: "texto",     label: "Texto del área",       icono: "📄", clase: "texto" },
  { id: "app",       label: "Aplicaciones",         icono: "🧩", clase: "app" },
  { id: "simulacro", label: "Simulacros de examen", icono: "📝", clase: "sim" },
];

const ICONOS_ESTADO = {
  nuevo:       "🆕 Nuevo",
  actualizado: "🔄 Actualizado",
  disponible:  "Disponible",
};

function Tarjeta({ recurso }) {
  const handleClick = () => {
    if (recurso.link) window.open(recurso.link, "_blank");
  };

  const handleShare = (e) => {
    e.stopPropagation();
    const urlAbs = recurso.link ? new URL(recurso.link, window.location.origin).href : window.location.href;
    const texto = `${recurso.titulo} - ${urlAbs}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(texto)}`, "_blank");
  };

  if (recurso.categoria === "anuncio") {
    return (
      <div className="pi-anuncio-card">
        <div className="pi-anuncio-dot"></div>
        <div className="pi-anuncio-body">
          <div className="pi-a-titulo">{recurso.titulo}</div>
          <div className="pi-a-texto">{recurso.descripcion}</div>
          <div className="pi-a-fecha">{recurso.fecha}</div>
        </div>
      </div>
    );
  }

  return (
    <div className={`pi-tarjeta pi-t-${recurso.categoria}`} onClick={handleClick}>
      <div className={`pi-t-icon-wrap pi-iw-${recurso.categoria}`}>
        {recurso.categoria === "texto"     && "📖"}
        {recurso.categoria === "app"       && "🎮"}
        {recurso.categoria === "simulacro" && "📝"}
      </div>
      <span className={`pi-t-tema-pill pi-tp-${recurso.categoria}`}>{recurso.tema}</span>
      <div className="pi-t-titulo">{recurso.titulo}</div>
      <div className="pi-t-desc">{recurso.descripcion}</div>
      <div className="pi-t-footer">
        <div className="pi-t-footer-left">
          <span className={`pi-t-badge pi-b-${recurso.estado}`}>
            {ICONOS_ESTADO[recurso.estado] || recurso.estado}
          </span>
          <button className="pi-t-share" onClick={handleShare} aria-label="Compartir por WhatsApp">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.39 1.26 4.81L2 22l5.42-1.36a9.9 9.9 0 0 0 4.62 1.14h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 1.67c2.19 0 4.24.85 5.79 2.4a8.17 8.17 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.25 8.24a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.21.81.86-3.13-.2-.32a8.15 8.15 0 0 1-1.27-4.39c0-4.55 3.71-8.11 8.36-8.11Zm-4.53 4.5c-.16 0-.42.06-.64.31-.22.25-.85.83-.85 2.02s.87 2.35.99 2.51c.12.16 1.7 2.68 4.19 3.65 2.07.81 2.49.65 2.94.61.45-.04 1.46-.6 1.66-1.18.2-.58.2-1.08.14-1.18-.06-.1-.22-.16-.46-.28-.24-.12-1.46-.72-1.68-.8-.23-.08-.39-.12-.56.12-.16.24-.64.8-.78.97-.15.16-.29.18-.53.06-.24-.12-1.03-.38-1.96-1.21-.72-.65-1.21-1.44-1.36-1.68-.14-.24-.02-.37.11-.49.11-.11.24-.29.36-.43.12-.15.16-.25.24-.41.08-.16.04-.31-.02-.43-.06-.12-.56-1.36-.77-1.86-.2-.49-.41-.42-.56-.43h-.48Z"/></svg>
          </button>
        </div>
        <span className="pi-t-arrow">→</span>
      </div>
    </div>
  );
}

export default function PantallaInterior({ plataforma, curso, onVolver }) {
  const [busqueda, setBusqueda] = useState("");

  const recursosVisibles = curso.recursos.filter(r => {
    if (!busqueda.trim()) return true;
    const q = busqueda.trim().toLowerCase();
    return (
      r.titulo.toLowerCase().includes(q) ||
      (r.tema || "").toLowerCase().includes(q) ||
      (r.descripcion || "").toLowerCase().includes(q)
    );
  });

  return (
    <div className="pi-app">

      <nav className="pi-navbar">
        <div className="pi-nav-left">
          <button className="pi-nav-back" onClick={onVolver}>←</button>
          <div className="pi-logo-colegio">
            <span className="pi-logo-inner">UE<br/>NAB</span>
          </div>
          <div className="pi-navbar-info">
            <div className="pi-navbar-logo">BioGeo <span>·</span> Prof. Franz</div>
            <div className="pi-navbar-inst">{plataforma.institucion}</div>
          </div>
        </div>
        <div className="pi-logo-area">🌿</div>
      </nav>

      <div className="pi-curso-header">
        <svg className="pi-mol-fondo" viewBox="0 0 680 160" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
          <circle cx="60" cy="80" r="20" stroke="#AFA9EC" strokeWidth="1.5" fill="none"/>
          <circle cx="200" cy="40" r="14" stroke="#AFA9EC" strokeWidth="1.2" fill="none"/>
          <circle cx="320" cy="100" r="18" stroke="#7F77DD" strokeWidth="1.5" fill="none"/>
          <circle cx="480" cy="50" r="22" stroke="#AFA9EC" strokeWidth="1.5" fill="none"/>
          <circle cx="600" cy="110" r="14" stroke="#7F77DD" strokeWidth="1.2" fill="none"/>
          <circle cx="130" cy="130" r="5" fill="#7F77DD"/>
          <circle cx="260" cy="70" r="4" fill="#5DCAA5"/>
          <circle cx="400" cy="130" r="5" fill="#AFA9EC"/>
          <circle cx="540" cy="90" r="4" fill="#7F77DD"/>
          <circle cx="650" cy="40" r="4" fill="#AFA9EC"/>
          <line x1="60" y1="80" x2="130" y2="130" stroke="#AFA9EC" strokeWidth="1"/>
          <line x1="130" y1="130" x2="200" y2="40" stroke="#AFA9EC" strokeWidth="1"/>
          <line x1="200" y1="40" x2="260" y2="70" stroke="#AFA9EC" strokeWidth="1"/>
          <line x1="260" y1="70" x2="320" y2="100" stroke="#7F77DD" strokeWidth="1"/>
          <line x1="320" y1="100" x2="400" y2="130" stroke="#AFA9EC" strokeWidth="1"/>
          <line x1="400" y1="130" x2="480" y2="50" stroke="#AFA9EC" strokeWidth="1"/>
          <line x1="480" y1="50" x2="540" y2="90" stroke="#7F77DD" strokeWidth="1"/>
          <line x1="540" y1="90" x2="600" y2="110" stroke="#AFA9EC" strokeWidth="1"/>
          <line x1="600" y1="110" x2="650" y2="40" stroke="#AFA9EC" strokeWidth="1"/>
        </svg>
        <div className="pi-header-overlay"></div>
        <div className="pi-header-content">
          <div className="pi-breadcrumb">← Inicio · Selección de curso</div>
          <div className="pi-curso-titulo">{curso.grado} <span>Secundaria</span></div>
          <div className="pi-curso-subtitulo">Biología · Geografía — Gestión {plataforma.gestion}</div>
          <div className="pi-stats-row">
            <span className="pi-cstat">{curso.recursos.length} recursos disponibles</span>
          </div>
        </div>
      </div>

      <div className="pi-search-wrap">
        <span className="pi-search-icon">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
        </span>
        <input
          type="text"
          className="pi-search-input"
          placeholder="Buscar por tema o titulo..."
          value={busqueda}
          onChange={e => setBusqueda(e.target.value)}
        />
        {busqueda && (
          <button className="pi-search-clear" onClick={() => setBusqueda("")} aria-label="Limpiar busqueda">✕</button>
        )}
      </div>

      <div className="pi-contenido">
        {recursosVisibles.length === 0 && (
          <div className="pi-sin-resultados">No se encontraron recursos para "{busqueda}".</div>
        )}
        {CATEGORIAS.map(cat => {
          const recursos = recursosVisibles.filter(r => r.categoria === cat.id);
          if (recursos.length === 0) return null;
          return (
            <div key={cat.id} className="pi-seccion">
              <div className="pi-seccion-header">
                <div className={`pi-seccion-icono pi-si-${cat.clase}`}>{cat.icono}</div>
                <div className="pi-seccion-titulo">{cat.label}</div>
                <div className="pi-seccion-count">{recursos.length} recurso{recursos.length > 1 ? "s" : ""}</div>
              </div>
              <div className={cat.id === "anuncio" ? "pi-lista" : "pi-grilla"}>
                {recursos.map(r => <Tarjeta key={r.id} recurso={r} />)}
              </div>
            </div>
          );
        })}
      </div>

      <div className="pi-footer">
        <div className="pi-footer-text">© {plataforma.gestion} · Prof. Franz Vidal Condori · Área Biología-Geografía</div>
        <div className="pi-footer-badge">Gestión {plataforma.gestion}</div>
      </div>

    </div>
  );
}