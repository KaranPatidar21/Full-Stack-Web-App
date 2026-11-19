import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    employerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    jobTitle: { type: String, required: true, trim: true, maxlength: 120 },
    companyName: { type: String, required: true, trim: true, maxlength: 120 },
    category: { type: String, required: true, trim: true },
    jobTypes: {
      type: [String],
      required: true,
      validate: [(value) => value.length > 0, "At least one job type is required."],
    },
    location: { type: String, required: true, trim: true, maxlength: 160 },
    pay: { type: Number, required: true, min: 0 },
    payPeriod: { type: String, required: true, trim: true },
    listingTag: { type: String, trim: true, default: "" },
    skills: { type: String, trim: true, default: "" },
    description: { type: String, required: true, trim: true, maxlength: 5000 },
    contactEmail: { type: String, required: true, trim: true, lowercase: true },
    contactNumber: { type: String, trim: true, default: "" },
    companyWebsite: { type: String, trim: true, default: "" },
    deadline: { type: Date, default: null },
  },
  { timestamps: true }
);

export default mongoose.model("Job", jobSchema);
