import Country from '../models/country';

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


export default {getAllCountries, getSingleCountry}