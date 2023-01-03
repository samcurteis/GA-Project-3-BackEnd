import mongoose from 'mongoose';

const entrySchema = new mongoose.Schema({
  country: { type: mongoose.Schema.ObjectId, ref: 'Country' },
  text: { type: String, required: true, min: 1, max: 300 }
});

export default mongoose.model('Entry', entrySchema);
