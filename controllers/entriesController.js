// import Entry from '../models/entry.js';
import Entry from '../models/entry.js';
import Country from '../models/country.js';
import User from '../models/user.js';

async function getAllEntries(_req, res, next) {
  try {
    const entries = await Entry.find();
    return res.status(200).json(entries);
  } catch (e) {
    next(e);
  }
}

async function createEntry(req, res, next) {
  try {
    const entry = await Entry.create({
      ...req.body,
      addedBy: req.currentUser._id,
      username: req.currentUser.username
    });

    await Country.updateOne(
      { _id: entry.country },
      { $push: { entries: entry._id } }
    );

    await User.updateOne(
      { _id: entry.addedBy },
      { $push: { entries: entry._id } }
    );

    return res.status(201).json(entry);
  } catch (e) {
    next(e);
  }
}

async function deleteEntry(req, res, next) {
  try {
    const entry = await Entry.findById(req.params.id);

    if (!entry) {
      return res.status(404).send({ message: 'No entry found' });
    }
    if (
      !entry.addedBy.equals(req.currentUser._id)
      // || !req.currentUser.isAdmin - add back after updating seed file
    ) {
      return res.status(401).send({ message: 'Unauthorized' });
    }

    await Country.findOneAndUpdate(
      { _id: entry.country },
      { $unset: { entries: req.params.id } }
    );

    await User.findOneAndUpdate(
      { _id: entry.addedBy },
      { $unset: { entries: req.params.id } }
    );

    await Entry.findByIdAndDelete(req.params.id);

    return res.status(200).json({ message: 'Successfully deleted entry' });
  } catch (error) {
    next(error);
  }
}

async function updateEntry(req, res, next) {
  try {
    const entry = await Entry.findById(req.params.id);

    if (!entry) {
      return res.status(404).send({ message: 'No entry found' });
    }

    if (entry.addedBy.equals(req.currentUser._id) || req.currentUser.isAdmin) {
      entry.set(req.body);
      const updatedEntry = await entry.save();
      return res.status(200).json(updatedEntry);
    }

    return res.status(301).json({ message: 'Unauthorized' });
  } catch (error) {
    next(error);
  }
}

export default { getAllEntries, createEntry, deleteEntry, updateEntry };
