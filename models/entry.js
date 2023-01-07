import mongoose from 'mongoose';
import mongooseUniqueValidator from 'mongoose-unique-validator';

const entrySchema = new mongoose.Schema({
  country: { type: mongoose.Schema.ObjectId, ref: 'Country' },
  text: { type: String, required: true, min: 1, max: 300 },
  addedBy: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  username: { type: mongoose.Schema.ObjectId, ref: 'User', required: true }
});

entrySchema.plugin(mongooseUniqueValidator);

export default mongoose.model('Entry', entrySchema);
