const express = require("express");

const router = express.Router();

router.route('/login').post()
router.route('/signup').post()

module.exports = router;
