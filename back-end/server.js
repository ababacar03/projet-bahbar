
const app = require('./app');
const run = require('./database/connect');
const PORT = process.env.PORT || 3000;

run().then(() => {
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch(err => {
  console.error('Failed to connect to the database:', err);
  process.exit(1); 
});
