import express from 'express';
import entriesController from '../controllers/entriesController.js';
import countriesController from '../controllers/countriesController.js';

const Router = express.Router();

Router.route('/countries/:id').post(entriesController.createEntry);

Router.route('/countries/:id/entries/:entryId')
  .delete(entriesController.deleteEntry)
  .put(entriesController.updateEntry);

Router.route('/countries').get(countriesController.getAllCountries);

export default Router;
