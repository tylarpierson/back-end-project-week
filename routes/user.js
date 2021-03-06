const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../modules/users');

const router = express.Router();

router
  .route('/')
  .get((req, res) => {
    User
      .find()
      .then(users => {
        if (users.length === 0) {
          res.status(204).json('there are no current users in our database');
        } else {
          res.status(200).json(users);
        }
      })
      .catch(err => {
        res.status(500).json('something went wrong');
      })
  });

router 
  .route('/:id')
  .get((req, res) => {
    const { id } = req.params;
    User 
      .findById(id)
      .then(user => {
        res.status(200).json(user);
      })
      .catch(err => {
        res.status(500).json('no user with that specific ID');
      })
  })
  .put((req, res) => {
    const { id } = req.params;
    const updates = req.body;
    User
      .findByIdAndUpdate(id, updates, { new: true })
      .then(updated => {
        res.status(200).json(updated);
      })
      .catch(err => {
        res.status(500).json('error updating user, please try again');
      })
  })
  .delete((req, res) => {
    const { id } = req.params;
    User 
      .findByIdAndRemove(id)
      .then(deleted => {
        res.status(200).json('user successfully deleted');
      })
      .catch(err => {
        res.status(500).json('cannot delete user specified');
      })
  });

module.exports = router;