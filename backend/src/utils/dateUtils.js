const { DateTime } = require('luxon');

function convertirAhorarioMexico(utcString) {
  return DateTime
    .fromISO(utcString, { zone: 'utc' })
    .setZone('America/Mexico_City')
    .toISO();
}

module.exports = { convertirAhorarioMexico };
