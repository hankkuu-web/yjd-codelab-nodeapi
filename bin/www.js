const app = require('../app');
const db = require('./db');

db.sync().then(_=> {
  console.log('Database sync')
  app.listen(3000, () => console.log(`Run at http://localhost:3000`));
});
