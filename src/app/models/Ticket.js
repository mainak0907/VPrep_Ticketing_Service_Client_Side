import mongoose from 'mongoose';

const TicketSchema = new mongoose.Schema({
  issue: String,
  email: String,
  rollNumber: String,
  severity: { type: String, enum: ['Low', 'Medium', 'High'], default: 'Low' },
  companyName: String,
  category: {
    type: String,
    enum: ['OD for Placement Activities', 'ReCAT', 'Problems in Link/Company Portal', 'Unclear Eligibility Criteria', 'Miscellaneous'],
  },
  reply: { type: String, default: '' }, // New reply field, initially empty
  status: { type: String, enum: ['Open', 'Closed'], default: 'Open' }, // New status field, default is Open
  createdAt: { type: Date, default: Date.now },
},
{
  versionKey: false  // Disable the __v field
});

export default mongoose.models.Ticket || mongoose.model('Ticket', TicketSchema);

