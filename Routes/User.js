const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

// !Import Schema
const userSchema = require('../Schemas/userSchema');

// !create user Collection
const userCollection = mongoose.model('user', userSchema);
router.get('/', async (req, res) => {});
router.get('/:id', async (req, res) => {});
router.post('/', async (req, res) => {});
router.put('/:id', async (req, res) => {});
router.delete('/:id', async (req, res) => {});

module.exports = router;
