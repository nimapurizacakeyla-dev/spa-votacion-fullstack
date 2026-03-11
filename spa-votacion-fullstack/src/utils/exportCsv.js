export function exportCandidatesToCsv(candidates) {
  const sorted = [...candidates].sort((a, b) => a.id - b.id);
  const headers = ["id", "nombre", "propuesta", "espacio", "votos"];
  const rows = sorted.map(c => [
    c.id,
    `"${String(c.nombre).replace(/"/g, '""')}"`,
    `"${String(c.propuesta).replace(/"/g, '""')}"`,
    `"${String(c.espacio).replace(/"/g, '""')}"`,
    c.votos ?? 0
  ]);
  const csvContent = "\uFEFF" + [headers.join(";"), ...rows.map(r => r.join(";"))].join("\r\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "candidatos_fullstack.csv";
  a.click();
  URL.revokeObjectURL(url);
}
