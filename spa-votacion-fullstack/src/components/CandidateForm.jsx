import { useState, useMemo } from "react";

function CandidateForm({ onSave, editingCandidate, onCancelEdit, showToast, candidates = [] }) {
  const [nombre, setNombre] = useState(editingCandidate?.nombre ?? "");
  const [propuesta, setPropuesta] = useState(editingCandidate?.propuesta ?? "");
  const [espacio, setEspacio] = useState(editingCandidate?.espacio ?? "");
  const [showOptions, setShowOptions] = useState(false);

  // Lista de espacios únicos
  const allSpaces = useMemo(
    () => [...new Set(candidates.map(c => c.espacio).filter(Boolean))],
    [candidates]
  );

  // Filtrar opciones mientras se escribe
  const filteredSpaces = allSpaces.filter(s =>
    s.toLowerCase().includes(espacio.toLowerCase())
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!nombre.trim() || !propuesta.trim() || !espacio.trim()) {
      showToast("error", "Campos obligatorios", "Debes completar nombre, propuesta y espacio académico.");
      return;
    }

    onSave({ nombre: nombre.trim(), propuesta: propuesta.trim(), espacio: espacio.trim() });

    if (!editingCandidate) {
      setNombre("");
      setPropuesta("");
      setEspacio("");
    }
  };

  return (
    <section className="card">
      <h2>{editingCandidate ? "Editar candidato" : "Registrar candidato"}</h2>

      <form onSubmit={handleSubmit} className="form">

        <label>
          Nombre del candidato
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Ej: Ana Gómez"
          />
        </label>

        <label>
          Propuesta
          <textarea
            value={propuesta}
            onChange={(e) => setPropuesta(e.target.value)}
            placeholder="Describe la propuesta del candidato"
            rows="4"
          />
        </label>

        <label style={{ position: "relative" }}>
          Espacio académico
          {!editingCandidate ? (
            <>
              <input
                type="text"
                value={espacio}
                onChange={(e) => {
                  setEspacio(e.target.value);
                  setShowOptions(true);
                }}
                placeholder="Escriba el espacio académico"
                autoComplete="off"
                onBlur={() => setTimeout(() => setShowOptions(false), 150)} // permite click en opción
              />
              {showOptions && filteredSpaces.length > 0 && (
                <ul
                  style={{
                    position: "absolute",
                    background: "white",
                    border: "1px solid #ccc",
                    width: "100%",
                    maxHeight: "150px",
                    overflowY: "auto",
                    margin: 0,
                    padding: 0,
                    listStyle: "none",
                    zIndex: 10
                  }}
                >
                  {filteredSpaces.map((s) => (
                    <li
                      key={s}
                      style={{ padding: "5px", cursor: "pointer" }}
                      onMouseDown={() => { // onMouseDown evita perder foco antes de click
                        setEspacio(s);
                        setShowOptions(false);
                      }}
                    >
                      {s}
                    </li>
                  ))}
                </ul>
              )}
            </>
          ) : (
            <input
              type="text"
              value={espacio}
              onChange={(e) => setEspacio(e.target.value)}
              placeholder="Escriba el espacio académico"
            />
          )}
        </label>

        <div className="actions">
          <button type="submit">{editingCandidate ? "Actualizar" : "Guardar"}</button>
          {editingCandidate && (
            <button type="button" className="secondary" onClick={onCancelEdit}>
              Cancelar edición
            </button>
          )}
        </div>
      </form>
    </section>
  );
}

export default CandidateForm;