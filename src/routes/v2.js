// v2.js

'use strict';

const express = require('express');
const router = express.Router();
const bearerAuth = require('../auth/middleware/bearer.js');
const permissions = require('../auth/middleware/acl.js');
const dataModules = require('../models');

// This middleware ensures that the proper model is being used for CRUD operations
router.param('model', (req, res, next) => {
  const modelName = req.params.model;
  if (dataModules[modelName]) {
    req.model = dataModules[modelName];
    next();
  } else {
    next('Invalid Model');
  }
});

// POST /api/v2/:model
router.post('/:model', bearerAuth, permissions('create'), async (req, res, next) => {
  try {
    const newRecord = await req.model.create(req.body);
    res.status(201).json(newRecord);
  } catch (e) {
    next(e);
  }
});

// GET /api/v2/:model
router.get('/:model', bearerAuth, permissions('read'), async (req, res, next) => {
  try {
    const allRecords = await req.model.get();
    res.status(200).json(allRecords);
  } catch (e) {
    next(e);
  }
});

// GET /api/v2/:model/ID
router.get('/:model/:id', bearerAuth, permissions('read'), async (req, res, next) => {
  try {
    const id = req.params.id;
    const theRecord = await req.model.get(id);
    if (theRecord) {
      res.status(200).json(theRecord);
    } else {
      res.status(404).send('Record Not Found');
    }
  } catch (e) {
    next(e);
  }
});

// PUT /api/v2/:model/ID
router.put('/:model/:id', bearerAuth, permissions('update'), async (req, res, next) => {
  try {
    const id = req.params.id;
    const obj = req.body;
    const updatedRecord = await req.model.update(id, obj);
    res.status(200).json(updatedRecord);
  } catch (e) {
    next(e);
  }
});

// DELETE /api/v2/:model/ID
router.delete('/:model/:id', bearerAuth, permissions('delete'), async (req, res, next) => {
  try {
    const id = req.params.id;
    await req.model.delete(id);
    res.status(200).json({});
  } catch (e) {
    next(e);
  }
});

module.exports = router;
