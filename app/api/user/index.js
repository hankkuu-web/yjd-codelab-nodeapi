const express = require('express');
const router = express.Router();
const ctrl = require('./user.ctrl');

router.get('/:id', ctrl.show);
router.get('/', ctrl.index);
router.delete('/:id', ctrl.destroy);
router.post('/',ctrl.create);
router.put('/:id', ctrl.update);

module.exports = router;
