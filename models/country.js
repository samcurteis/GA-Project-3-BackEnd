import mongoose from 'mongoose';
import Entry from './entry.js';

const countrySchema = new mongoose.Schema({
  name: { type: String, required: true },
  entries: { type: mongoose.Schema.ObjectId, ref: 'Entry' }
});

export default mongoose.model('Country', countrySchema);
