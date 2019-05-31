const express = require('express');
const router = express.Router();
const {
  postRegister
} = require('../controllers/index');


/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', {
    title: 'Whiskey Outlet - Home'
  });
});

// REGISTER A USER

/* GET /register. */
router.get('/register', (req, res, next) => {
  res.send('GET /register');
});

/* POST /register. */
router.post('/register', postRegister);

//===============================

// LOGIN A USER

/* GET /login. */
router.get('/login', (req, res, next) => {
  res.send('GET /login');
});

/* POST /login. */
router.post('/login', (req, res, next) => {
  res.send('POST /login');
});

//=================================

// USERS PROFILE

/* GET /profile. */
router.get('/profile', (req, res, next) => {
  res.send('GET /profile');
});

// PUT /profile/:users_id 
router.put('/profile/:user_id', (req, res, next) => {
  res.send('PUT /profile/:user_id');
});

/* DESTROY /profile/:user_id. */
router.delete('/profile/:user_id', (req, res, next) => {
  res.send('DESTROY /profile/:user_id');
});

//========================================

// USER PASSWORDS

/* GET /forgot-password. */
router.get('/forgot', (req, res, next) => {
  res.send('GET /forgot');
});

// PUT /forgot-password
router.put('/forgot', (req, res, next) => {
  res.send('PUT /forgot');
});

/* GET /reset-password/:token. */
router.get('/reset/:token', (req, res, next) => {
  res.send('GET /reset/:token');
});

// PUT /reset-password/:token
router.put('/reset/:token', (req, res, next) => {
  res.send('PUT /reset/:token');
});

//=======================================

module.exports = router;