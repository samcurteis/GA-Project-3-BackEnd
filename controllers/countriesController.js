import Country from '../models/country.js';

const getAllCountries = async (_req, res, next) => {
  try {
    const country = await Country.find();
    return res.status(200).json(country);
  } catch (e) {
    next(e);
  }
};

const getSingleCountry = async (req, res, next) => {
  try {
    const country = await Country.findById(req.params.id);
    return country
      ? res.status(200).json(country)
      : res
          .status(404)
          .json({ message: `No country with id ${req.params.id}` });
  } catch (e) {
    next(e);
  }
};


async function searchCountry(req, res, next) {
  try {
    const { search } = req.query;
    const country = await Country.find({
        name: { $regex: search, $options: 'i' } 
    });
    return res.status(200).json(country);
  } catch (error) {
    next(error);
  }
}

export default {getAllCountries, getSingleCountry, searchCountry}