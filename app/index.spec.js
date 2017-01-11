const should = require('should');
const request = require('supertest');
const app = require('./index');

const assertUser = (user, id) => {
  user.should.have.properties('id', 'name')
  user.id.should.be.a.Number;
  user.name.should.be.a.String;
  if (id) user.id.should.be.equal(id);
};

describe('users', ()=> {
  describe('GET /users', ()=> {
    describe('success', ()=> {
      const limit = 2;
      let _res;
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
  describe('GET /usres:id', ()=> {
    describe('success', ()=> {
      const id = 2;
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
  })
  describe('DELETE /users/:id', ()=> {
    describe('success', ()=> {
      it('204를 응답한다', done=> {
        request(app)
            .delete('/users/1')
            .expect(204)
            .end(done)
      })
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
});
