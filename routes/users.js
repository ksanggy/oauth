const router = require('express').Router();
const verify = require('./verifyToken');

router.get('/', verify,(req, res)=>{
  console.log('reqest made');
  res.json({_id : req.user._id});
});

module.exports = router;