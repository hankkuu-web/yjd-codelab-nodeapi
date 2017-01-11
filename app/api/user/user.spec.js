const should = require('should');
const request = require('supertest');
const app = require('../../index');
const db = require('../../../bin/db');
const models = require('../../models');

const assertUser = (user, id) => {
  user.should.have.properties('id', 'name')
  user.id.should.be.a.Number;
  user.name.should.be.a.String;
  if (id) user.id.should.be.equal(id);
};

describe('users', ()=> {
  describe('GET /users', ()=> {
    describe('success', ()=> {
      const users = [{name:'Alice'},{name:'Bek'},{name:'Chris'}];
      const limit = 2;
      let _res;
      before('Sync db', ()=> db.sync());
      before('Insert users', ()=> models.User.bulkCreate(users));
      before(done=>{
        request(app)
            .get(`/users?limit=${limit}&offset=0`)
            .expect(200)
            .end((err, res)=> {
              if (err) throw err;
              _res = res;
              done();
            });
      });

      it('유저 객체를 담은 배열을 응답한다', ()=> {
        _res.body.should.be.instanceof(Array);
        _res.body.forEach(user=> assertUser(user))
      });
      it('최대 limit 갯수만큼 응답한다', ()=> {
        _res.body.should.have.length(limit);
      });
    });
    describe('error', ()=> {
      it('limit이 숫자형이 아니면 400을 응답한다', done=> {
        request(app)
            .get('/users?limit=a')
            .expect(400)
            .end(done);
      });
      it('offset이 숫자형이 아니면 400을 응답한다', done=> {
        request(app)
            .get('/users?offset=a')
            .expect(400)
            .end(done);
      });
    });
  });
  describe('GET /usres/:id', ()=> {
    const users = [{name:'Alice'}];
    before('Sync db', ()=> db.sync());
    before('Insert users', ()=> models.User.bulkCreate(users));
    describe('success', ()=> {
      const id = 1;
      let _res;
      before(done => {
        request(app)
            .get(`/users/${id}`)
            .expect(200)
            .end((err, res) => {
              if (err) throw err;
              _res = res;
              done();
            })
      });
      it('id가 1인 유저 객체를 반환한다', ()=> assertUser(_res.body, id));
    });
    describe('error', ()=> {
      it('id가 숫자가 아닐경우 400으로 응답한다', done=> {
        request(app)
            .get('/users/id')
            .expect(400)
            .end(done)
      });
      it('id로 유저를 찾을수 없을 경우 404로 응답한다', done=> {
        request(app)
            .get('/users/4')
            .expect(404)
            .end(done)
      })
    })
  });

  describe('DELETE /users/:id', ()=> {
    describe('success', ()=> {
      const users = [{name:'Alice'}];
      before('Sync db', ()=> db.sync());
      before('Insert users', ()=> models.User.bulkCreate(users));

      it('204를 응답한다', done=> {
        request(app)
            .delete('/users/1')
            .expect(204)
            .end(done)
      });
    });
    describe('error', ()=> {
      it('id가 숫자가 아닐경우 400으로 응답한다', done=> {
        request(app)
            .delete('/users/id')
            .expect(400)
            .end(done)
      });
    })
  })

  describe('POST /users', ()=> {
    const users = [{name:'Alice'}];
    before('Sync db', ()=> db.sync());
    before('Insert users', ()=> models.User.bulkCreate(users));

    describe('success', ()=>{
      const user = {name: 'daniel'};
      let _res;
      before(done => {
        request(app)
            .post('/users')
            .send(user)
            .expect(201)
            .end((err, res) => {
              if (err) throw err;
              _res = res;
              done();
            });
      });
      it('생성된 유저 객체를 반환한다', ()=> assertUser(_res.body));
      it('입력한 name을 반환한다', ()=> _res.body.name.should.be.equal(user.name));
    });
    describe('error', ()=> {
      it('name 파라매터 누락시 400을 반환한다', done=> {
        request(app)
            .post('/users')
            .send({})
            .expect(400)
            .end(done);
      });
      it('name이 중복일 경우 409를 반환한다',done=> {
        request(app)
            .post('/users')
            .send({name: users[0].name})
            .expect(409).end(done);
      })
    });
  });

  describe('PUT /users/:id', ()=> {
    const users = [{name:'Alice'},{name:'Bek'}];
    before('Sync db', ()=> db.sync());
    before('Insert users', ()=> models.User.bulkCreate(users));

    describe('success', ()=> {
      it('변경된 정보를 응답한다', done=> {
        const editedName = 'Alice2';
        request(app)
            .put('/users/1')
            .send({name: editedName})
            .expect(200)
            .end((err, res)=> {
              if (err) throw err;
              res.body.should.have.property('name', editedName);
              done();
            })
      })
    });
    describe('error', ()=> {
      it('정수가 아닌 id일 경우 400 응답', done=> {
        request(app)
            .put('/users/id')
            .send({name: 'updated name'})
            .expect(400)
            .end(done)
      });
      it('name이 없을 경우 400 응답', done=> {
        request(app)
            .put('/users/1')
            .send({})
            .expect(400)
            .end(done)
      });
      it('없는 유저일 경우 404 응답', done=> {
        request(app)
            .put('/users/999')
            .send({name: 'frank'})
            .expect(404)
            .end(done);
      });
      it('이름이 중복일 경우 409 응답', done=> {
        request(app)
            .put('/users/1')
            .send({name: users[1].name})
            .expect(409)
            .end(done);
      });
    });
  })
});
