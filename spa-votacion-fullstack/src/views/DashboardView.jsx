import SummaryCards from "../components/SummaryCards";

function DashboardView({ candidates }) {
  const totalVotos = candidates.reduce((acc, candidate) => acc + candidate.votos, 0);

  const topCandidates = [...candidates]
    .sort((a, b) => b.votos - a.votos)
    .slice(0, 3);

  const leader = topCandidates.length > 0 ? topCandidates[0] : null;

  return (
    <section className="view">
      <section className="card">
        <h2>Dashboard</h2>
        <p className="muted">
          Vista general del proceso de votación para representante del curso Full Stack.
        </p>
      </section>

      <SummaryCards candidates={candidates} />

      <div className="dashboard-grid">
        <section className="card">
          <h2>Resumen general</h2>

          <div className="dashboard-info">
            <div className="dashboard-info-item">
              <span className="dashboard-label">Total de candidatos</span>
              <strong>{candidates.length}</strong>
            </div>

            <div className="dashboard-info-item">
              <span className="dashboard-label">Total de votos</span>
              <strong>{totalVotos}</strong>
            </div>

            <div className="dashboard-info-item">
              <span className="dashboard-label">Candidato líder</span>
              <strong>{leader ? leader.nombre : "Sin datos"}</strong>
            </div>
          </div>
        </section>

        <section className="card">
          <h2>Top 3 candidatos</h2>

          {topCandidates.length === 0 ? (
            <p className="muted">Aún no hay candidatos registrados.</p>
          ) : (
            <div className="top-list">
              {topCandidates.map((candidate, index) => {
                const porcentaje =
                  totalVotos > 0 ? ((candidate.votos / totalVotos) * 100).toFixed(1) : "0.0";

                const inicial = candidate.nombre?.trim()?.charAt(0)?.toUpperCase() || "?";

                return (
                  <article className="top-card" key={candidate.id}>
                    <div className="top-card-header">
                      <div className="top-profile">
                        <div className="top-avatar">{inicial}</div>

                        <div>
                          <h3>{candidate.nombre}</h3>
                          <span className="top-position">
                            {index === 0
                              ? "Primer lugar"
                              : index === 1
                              ? "Segundo lugar"
                              : "Tercer lugar"}
                          </span>
                        </div>
                      </div>

                      <span className="badge">{candidate.votos} votos</span>
                    </div>

                    <p className="top-text">{candidate.propuesta}</p>

                    <div className="top-progress-block">
                      <div className="vote-stats-row">
                        <span>Participación</span>
                        <strong>{porcentaje}%</strong>
                      </div>

                      <div className="progress">
                        <div
                          className="progress-bar"
                          style={{ width: `${porcentaje}%` }}
                        ></div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </section>
      </div>
    </section>
  );
}

export default DashboardView;