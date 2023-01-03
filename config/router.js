import express from 'express';
import countriesController from '../controllers/countriesController.js'

const Router = express.Router();

Router.route('/countries').get(countriesController.getAllCountries);

export default Router