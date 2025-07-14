const app = require('./app');
const { startLiberarReservasJob } = require('./jobs/liberarReservasJob');

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  startLiberarReservasJob(); // Launch cron job at start
});
