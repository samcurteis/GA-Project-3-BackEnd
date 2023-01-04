import express from 'express';
import entriesController from '../controllers/entriesController.js';
import countriesController from '../controllers/countriesController.js';
import userController from '../controllers/userController.js'
import secureRoute from '../middleware/secureRoute.js';

const Router = express.Router();

Router.route('/countries/:id/entries').post(secureRoute,entriesController.createEntry);

Router.route('/countries/:id/entries/:entryId')
  .delete(secureRoute, entriesController.deleteEntry)
  .put(secureRoute, entriesController.updateEntry);


Router.route('/countries').get(countriesController.getAllCountries);
Router.route('/countries/:id').get(countriesController.getSingleCountry)

Router.route('/countries/search').get(countriesController.searchCountry)

Router.route('/register').post(userController.registerUser);

Router.route('/login').post(userController.loginUser);


export default Router;
