-- Insert example rooms
INSERT INTO salas (nombre, ubicacion, capacidad)
VALUES
  ('Sala A', 'Floor 1', 10),
  ('Sala B', 'Floor 2', 8),
  ('Sala C', 'Floor 3', 6);

-- Insert example reservations
INSERT INTO reservas (sala_id, horario_inicio, horario_fin, estado)
VALUES
  (1, '2025-07-12 10:00:00', '2025-07-12 11:00:00', 'activa'),
  (2, '2025-07-12 09:00:00', '2025-07-12 10:30:00', 'liberada');
