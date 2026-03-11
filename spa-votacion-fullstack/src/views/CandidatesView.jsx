import { useMemo, useState } from "react";
import CandidateList from "../components/CandidateList";

function CandidatesView({ candidates, onEdit, onDelete, onVote }) {

  const [query, setQuery] = useState("");
  const [spaceFilter, setSpaceFilter] = useState("todos");

  // Obtener espacios únicos y válidos
  const spaces = useMemo(() => {
    return [
      ...new Set(
        candidates
          .map(c => c.espacio)
          .filter(Boolean) // elimina undefined o vacíos
      )
    ];
  }, [candidates]);

  // Filtrar candidatos
  const filteredCandidates = useMemo(() => {

    const text = query.trim().toLowerCase();

    return candidates.filter(candidate => {

      const matchText =
        candidate.nombre.toLowerCase().includes(text) ||
        candidate.propuesta.toLowerCase().includes(text);

      const matchSpace =
        spaceFilter === "todos" || candidate.espacio === spaceFilter;

      return matchText && matchSpace;

    });

  }, [candidates, query, spaceFilter]);

  return (
    <section className="view">

      <section className="card">

        <h2>Listado de candidatos</h2>

        <div className="filter-bar">

          {/* BUSCADOR */}
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar por nombre o propuesta"
          />

          {/* FILTRO POR ESPACIO */}
          <select
            value={spaceFilter}
            onChange={(e) => setSpaceFilter(e.target.value)}
          >

            <option value="todos">Todos los espacios</option>

            {spaces.map((space) => (
              <option key={space} value={space}>
                {space}
              </option>
            ))}

          </select>

          <span className="filter-count">
            Mostrando {filteredCandidates.length} de {candidates.length}
          </span>

        </div>

        <CandidateList
          candidates={filteredCandidates}
          onEdit={onEdit}
          onDelete={onDelete}
          onVote={onVote}
        />

      </section>

    </section>
  );
}

export default CandidatesView;