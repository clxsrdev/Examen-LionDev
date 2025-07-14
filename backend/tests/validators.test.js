const { validateDuration } = require('../src/utils/validators');

describe('validateDuration', () => {
  test('permite duración menor o igual a 2 horas', () => {
    expect(() => {
      validateDuration('2025-07-12 10:00:00', '2025-07-12 12:00:00');
    }).not.toThrow();
  });

  test('lanza error si duración excede 2 horas', () => {
    expect(() => {
      validateDuration('2025-07-12 10:00:00', '2025-07-12 13:00:00');
    }).toThrow('La reserva no puede ser mayor a 2 horas');
  });

  test('lanza error si horario_fin es antes de horario_inicio', () => {
    expect(() => {
      validateDuration('2025-07-12 12:00:00', '2025-07-12 10:00:00');
    }).toThrow('El horario de fin debe ser posterior al de inicio');
  });
});
