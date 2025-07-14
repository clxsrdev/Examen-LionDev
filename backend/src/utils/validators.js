function validateDuration(horario_inicio, horario_fin, maxHoras = 2) {
  const inicio = new Date(horario_inicio);
  const fin = new Date(horario_fin);
  const diffHoras = (fin - inicio) / (1000 * 60 * 60);

  if (diffHoras <= 0) {
    throw new Error('El horario de fin debe ser posterior al de inicio');
  }

  if (diffHoras > maxHoras) {
    throw new Error(`La reserva no puede ser mayor a ${maxHoras} horas`);
  }
}

function overlaps(horario_inicio1, horario_fin1, horario_inicio2, horario_fin2) {
  return (
    (horario_inicio1 < horario_fin2) &&
    (horario_fin1 > horario_inicio2)
  );
}

module.exports = {
  validateDuration,
  overlaps
};
