import mongoose from 'mongoose';

const countrySchema = new mongoose.Schema({
  name: { type: String, required: true },
  code: { type: String, required: false },
  continent: { type: String, required: false },
  entries: [{ type: mongoose.Types.ObjectId, ref: 'Entry' }],
  addedBy: [{ type: mongoose.Types.ObjectId, ref: 'User' }]
});

export default mongoose.model('Country', countrySchema);
