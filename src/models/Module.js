import mongoose from "mongoose";

const moduleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  sign: {
    type: String,
    required: true,
    unique: true,
    uppercase: true,
    trim: true
  },
  icon: {
    type: String,
    default: '📚'
  },
  academicLevel: {
    type: String,
    required: true,
    enum: [
      'preparatoryYear1',
      'preparatoryYear2',
      'secondCycleYear1',
      'secondCycleYear2',
      'secondCycleYear3'
    ]
  },
  specialty: {
    type: String,
    enum: [
      'financialMarket',
      'accountingAudit',
      'corporateFinance',
      'banksInsurance',
      null
    ],
    default: null
  }
}, { timestamps: true });

export const Module = mongoose.models.Module || mongoose.model("Module", moduleSchema);