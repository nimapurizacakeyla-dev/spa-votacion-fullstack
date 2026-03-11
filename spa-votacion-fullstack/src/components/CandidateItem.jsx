function CandidateItem({ candidate, onEdit, onDelete, onVote, showActions = true }) {

  return (

    <div className="candidate-item">

      <div>

        <h3>{candidate.nombre}</h3>

        <p>
          <strong>Espacio:</strong> {candidate.espacio}
        </p>

        <p>{candidate.propuesta}</p>

        <span className="badge">
          Votos: {candidate.votos}
        </span>

      </div>

      {showActions && (

        <div className="actions">

          <button onClick={() => onVote(candidate.id)}>
            Votar
          </button>

          <button
            className="secondary"
            onClick={() => onEdit(candidate)}
          >
            Editar
          </button>

          <button
            className="danger"
            onClick={() => onDelete(candidate.id)}
          >
            Eliminar
          </button>

        </div>

      )}

    </div>

  );
}

export default CandidateItem;