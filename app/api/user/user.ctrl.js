const models = require('../../models');

const show = (req, res)=> {
  const id = parseInt(req.params.id, 10);
  if (Number.isNaN(id)) return res.status(400).end();

  models.User.findOne({
    where: {id}
  }).then(user => {
    if (!user) return res.status(404).end();
    res.json(user);
  });
};

const index = (req, res) => {
  const limit = parseInt(req.query.limit, 10);
  if (Number.isNaN(limit)) return res.status(400).send();

  const offset = parseInt(req.query.offset, 10);
  if (Number.isNaN(offset)) return res.status(400).end();

  models.User.findAll({offset, limit,order: 'id asc'}).then(users => res.json(users));
};

const destroy = (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (Number.isNaN(id)) return res.status(400).end();

  models.User.destroy({
    where: {id}
  }).then(_=> res.status(204).end());
};

const create = (req, res) => {
  const name = req.body.name;
  if (!name || !name.length) return res.status(400).end();

  models.User.create({name})
      .then(user => res.status(201).json(user))
      .catch(e => {
        if (e.name === 'SequelizeUniqueConstraintError') {
          return res.status(409).end();
        }
        res.status(500).send(e.name);
      });
};

const update = (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (Number.isNaN(id)) return res.status(400).end();

  const name = req.body.name;
  if (!name) return res.status(400).end();

  models.User.findOne({where: {id}}).then(user => {
    if (!user) return res.status(404).end();
    user.name = name;
    user.save()
        .then(user => res.json(user))
        .catch(e => {
          if (e.name === 'SequelizeUniqueConstraintError') {
            return res.status(409).end();
          }
          res.status(500).send(e.name);
        })
  });
};

module.exports = {index, show, update, create, destroy};
