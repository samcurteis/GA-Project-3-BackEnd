import express from 'express';
import entriesController from '../controllers/entriesController.js';

const Router = express.Router();

Router.route('/countries/:id').post(entriesController.createEntry);

Router.route('/countries/:id/entries/:entryId')
  .delete(entriesController.deleteEntry)
  .put(entriesController.updateEntry);
