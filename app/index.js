const express = require('express');
const app = express();

// 임시데이터
let users = [{
  id: 1,
  name: 'Alice'
}, {
  id: 2,
  name: 'Bek'
}, {
  id: 3,
  name: 'Chris'
}];

// 라우팅 설정 
app.get('/users', (req, res) => {
  // 여기에 라우팅 로직을 작성하면 됩니다.
  res.json(users);
});

app.get('/', (req, res) => {
  res.send('Hello World!\n')
});

app.listen(3000, () => {
  console.log(`Run at http://localhost:3000`)
});
