-- DATABASE SCHEMA: MEETING ROOMS

-- ============================================
-- Table: salas
-- ============================================

CREATE TABLE IF NOT EXISTS salas (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(255) NOT NULL,
  ubicacion VARCHAR(255),
  capacidad INTEGER,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- Table: reservas
-- ============================================

CREATE TABLE IF NOT EXISTS reservas (
  id SERIAL PRIMARY KEY,
  sala_id INTEGER REFERENCES salas(id) ON DELETE CASCADE,
  horario_inicio TIMESTAMP WITH TIME ZONE NOT NULL,
  horario_fin TIMESTAMP WITH TIME ZONE NOT NULL,
  estado VARCHAR(20) DEFAULT 'activa' CHECK (estado IN ('activa', 'liberada')),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- Indexes to improve performance
-- ============================================

CREATE INDEX IF NOT EXISTS idx_reservas_sala_id ON reservas(sala_id);
CREATE INDEX IF NOT EXISTS idx_reservas_estado ON reservas(estado);
