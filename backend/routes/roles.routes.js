const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    "data": ["admin", "edit", "view"],
    "message": "Roles",
    "status": 200
  })
});

module.exports = router;
