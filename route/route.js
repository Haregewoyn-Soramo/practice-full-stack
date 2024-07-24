const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { getUserName, updateUserFile, deleteUserFile, addUserFile, getUserById} = require('../controller/fileController.js');

router.get('/user', getUserName);

router.get('/user/:id', getUserById);

router.patch('/update/:id', updateUserFile);

router.delete('/delete/:id', deleteUserFile);

router.post('/add', addUserFile);


module.exports = router;
