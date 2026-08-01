import { useState } from "react";
import datos from "./data/datos.json";
import PantallaPrincipal from "./pages/PantallaPrincipal";
import PantallaInterior from "./pages/PantallaInterior";

function App() {
  const [cursoActivo, setCursoActivo] = useState(null);

  return (
    <>
      {cursoActivo === null ? (
        <PantallaPrincipal
          plataforma={datos.plataforma}
          cursos={datos.cursos}
          onSeleccionarCurso={setCursoActivo}
        />
      ) : (
        <PantallaInterior
          plataforma={datos.plataforma}
          curso={cursoActivo}
          onVolver={() => setCursoActivo(null)}
        />
      )}
    </>
  );
}

export default App;