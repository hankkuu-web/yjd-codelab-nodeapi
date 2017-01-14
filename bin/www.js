const app = require('../app');
const db = require('./db');

app.set('port', process.env.PORT || 3000);


db.sync().then(_=> {
  console.log('Database sync')
  app.listen(app.get('port'), () => console.log(`Run at http://localhost:3000`));
});
