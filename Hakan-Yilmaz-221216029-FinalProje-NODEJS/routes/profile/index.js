const express = require('express');
const router = express.Router();

router.get('/',(req, res) => {
    res.send('Education Tree PROFILE')
})

module.exports = router;