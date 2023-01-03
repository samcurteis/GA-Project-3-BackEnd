import Entry from '../models/entry.js';
import Country from '../models/country.js';

async function createEntry(req, res, next) {
  try {
    const entry = await Entry.create({
      ...req.body
    });

    return res.status(201).json(entry);
  } catch (e) {
    next(e);
  }
}

async function deleteEntry(req, res, next) {
  try {
    country = await Country.findById(req.params.id);

    if (!country) {
      return res.status(404).send({ message: 'No country found' });
    }

    const entry = country.entries.id(req.params.entryId);

    if (!entry) {
      return res.status(404).send({ message: 'No entry found' });
    }

    // **** COMMENT BACK IN WHEN USER/ ADMIN IS SET UP ****
    // if (
    //   !entry.entryBy.equals(req.currentUser._id) ||
    //   !req.currentUser.isAdmin
    // ) {
    //   return res.status(401).send({ message: 'Unauthorized'})
    // }

    entry.remove();

    const savedCountry = await country.save();

    return res.status(200).json(savedCountry);
  } catch (error) {
    next(error);
  }
}

async function updateEntry(req, res, next) {
  try {
    const country = await Country.findById(req.params.id);

    if (!country) {
      return res.status(404).send({ message: 'No country found' });
    }

    const entry = country.entries.id(req.params.entryId);

    if (!entry) {
      return res.status(404).send({ message: 'No entry found' });
    }

    // **** COMMENT BACK IN WHEN USER/ ADMIN IS SET UP ****
    // if (
    //   !entry.entryBy.equals(req.currentUser._id)
    // ) {
    //   return res.status(401).send({ message: 'Unauthorized'})
    // }

    entry.set(req.body);
    const savedCountry = await country.save();

    return res.status(200).json(savedCountry);
  } catch (error) {
    next(error);
  }
}

export default { createEntry, deleteEntry, updateEntry };
