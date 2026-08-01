import { useState, useEffect } from "react";
import datos from "./data/datos.json";
import PantallaPrincipal from "./pages/PantallaPrincipal";
import PantallaInterior from "./pages/PantallaInterior";

function App() {
  const [cursoActivo, setCursoActivo] = useState(null);

  // Cuando el usuario selecciona un curso, agregamos una entrada al historial
  const seleccionarCurso = (curso) => {
    setCursoActivo(curso);
    window.history.pushState({ curso: curso.id }, "", `#${curso.id}`);
  };

  // Cuando vuelve (botón ← de la app), retrocedemos en el historial
  const volver = () => {
    window.history.back();
  };

  // Escuchamos el botón "atrás" físico del navegador/celular
  useEffect(() => {
    const manejarAtras = () => {
      // Si no hay hash en la URL, estamos en la pantalla principal
      if (!window.location.hash) {
        setCursoActivo(null);
      } else {
        // Buscamos el curso según el hash de la URL
        const id = window.location.hash.replace("#", "");
        const curso = datos.cursos.find(c => c.id === id);
        setCursoActivo(curso || null);
      }
    };

    window.addEventListener("popstate", manejarAtras);
    return () => window.removeEventListener("popstate", manejarAtras);
  }, []);

  return (
    <>
      {cursoActivo === null ? (
        <PantallaPrincipal
          plataforma={datos.plataforma}
          cursos={datos.cursos}
          onSeleccionarCurso={seleccionarCurso}
        />
      ) : (
        <PantallaInterior
          plataforma={datos.plataforma}
          curso={cursoActivo}
          onVolver={volver}
        />
      )}
    </>
  );
}

export default App;