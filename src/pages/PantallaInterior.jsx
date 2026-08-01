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
        <span className={`pi-t-badge pi-b-${recurso.estado}`}>
          {ICONOS_ESTADO[recurso.estado] || recurso.estado}
        </span>
        <span className="pi-t-arrow">→</span>
      </div>
    </div>
  );
}

export default function PantallaInterior({ plataforma, curso, onVolver }) {
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

      <div className="pi-contenido">
        {CATEGORIAS.map(cat => {
          const recursos = curso.recursos.filter(r => r.categoria === cat.id);
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