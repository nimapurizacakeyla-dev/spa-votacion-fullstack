import { useMemo, useState } from "react";

function VotingView({ candidates, onVote, onRemoveVote }) {

  const [spaceFilter, setSpaceFilter] = useState(""); // espacio libre

  // Obtener espacios únicos y válidos
  const spaces = useMemo(() => {
    return [
      ...new Set(
        candidates
          .map(c => c.espacio)
          .filter(Boolean)
      )
    ];
  }, [candidates]);

  // Filtrar candidatos
  const filteredCandidates = useMemo(() => {
    if (!spaceFilter.trim()) return candidates; // si está vacío, mostrar todos
    return candidates.filter(c => c.espacio?.toLowerCase().includes(spaceFilter.toLowerCase()));
  }, [candidates, spaceFilter]);

  // Estadísticas
  const totalVotos = candidates.reduce(
    (acc, candidate) => acc + candidate.votos,
    0
  );

  const maxVotos =
    filteredCandidates.length > 0
      ? Math.max(...filteredCandidates.map(c => c.votos))
      : 0;

  return (
    <section className="view">

      <section className="card">

        <h2>Panel de votación</h2>

        {/* FILTRO POR ESPACIO LIBRE */}
        <div className="filter-bar">

          <label>Filtrar por espacio</label>

          <input
            type="text"
            placeholder="Escriba el espacio académico"
            value={spaceFilter}
            onChange={(e) => setSpaceFilter(e.target.value)}
            list="space-list"
          />

          {/* Opciones automáticas sugeridas */}
          <datalist id="space-list">
            {spaces.map((space) => (
              <option key={space} value={space} />
            ))}
          </datalist>

        </div>

        {filteredCandidates.length === 0 ? (
          <p className="muted">
            No hay candidatos para este espacio académico.
          </p>
        ) : (

          <div className="voting-cards">

            {filteredCandidates.map((candidate) => {

              const porcentaje =
                totalVotos > 0
                  ? ((candidate.votos / totalVotos) * 100).toFixed(1)
                  : "0.0";

              const inicial =
                candidate.nombre?.trim()?.charAt(0)?.toUpperCase() || "?";

              const isLeader =
                candidate.votos === maxVotos && maxVotos > 0;

              return (

                <article
                  key={candidate.id}
                  className={`vote-card ${isLeader ? "leader-card" : ""}`}
                >

                  <div className="vote-card-header">

                    <div className="vote-card-profile">

                      <div className="vote-avatar">
                        {inicial}
                      </div>

                      <div>

                        <h3>{candidate.nombre}</h3>

                        {/* ESPACIO ACADÉMICO */}
                        <span className="sub-badge">
                          {candidate.espacio || "Sin espacio"}
                        </span>

                      </div>

                    </div>

                    <span className="badge">
                      Votos: {candidate.votos}
                    </span>

                  </div>

                  <p className="vote-card-text">
                    {candidate.propuesta}
                  </p>

                  <div className="vote-stats">

                    <div className="vote-stats-row">
                      <span>Porcentaje actual</span>
                      <strong>{porcentaje}%</strong>
                    </div>

                    <div className="progress">
                      <div
                        className="progress-bar"
                        style={{ width: `${porcentaje}%` }}
                      ></div>
                    </div>

                  </div>

                  <div className="vote-card-footer">

                    <button
                      onClick={() => onVote(candidate.id)}
                    >
                      Votar
                    </button>

                    <button
                      className="secondary"
                      onClick={() => onRemoveVote(candidate.id)}
                    >
                      Quitar voto
                    </button>

                  </div>

                </article>

              );
            })}

          </div>

        )}

      </section>

    </section>
  );
}

export default VotingView;