const should = require('should');
const request = require('supertest');
const app = require('./index');

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
        _res.body.forEach(user => user.should.have.properties('id', 'name'))
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
});
