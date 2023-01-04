import express from 'express';
import secureRoute from '../middleware/secureRoute.js';
import entriesController from '../controllers/entriesController.js';
import countriesController from '../controllers/countriesController.js';
import userController from '../controllers/userController.js';

const Router = express.Router();

Router.route('/countries/:id').get(countriesController.getSingleCountry);

Router.route('/entries/:id')
  .delete(secureRoute, entriesController.deleteEntry)
  .put(secureRoute, entriesController.updateEntry);

Router.route('/entries')
  .get(entriesController.getAllEntries)
  .post(secureRoute, entriesController.createEntry);

Router.route('/countries').get(countriesController.getAllCountries);

Router.route('/register').post(userController.registerUser);

Router.route('/login').post(userController.loginUser);

export default Router;
