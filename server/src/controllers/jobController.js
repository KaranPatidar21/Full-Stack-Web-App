import Job from "../models/Job.js";
import Joi from "joi";

const jobSchema = Joi.object({
  jobTitle: Joi.string().trim().required().messages({
    "any.required": "Job title is required.",
    "string.empty": "Job title is required.",
  }),
  companyName: Joi.string().trim().required().messages({
    "any.required": "Company name is required.",
    "string.empty": "Company name is required.",
  }),
  category: Joi.string().trim().required().messages({
    "any.required": "Category is required.",
    "string.empty": "Category is required.",
  }),
  jobTypes: Joi.array().items(Joi.string().trim()).min(1).required().messages({
    "any.required": "At least one job type is required.",
    "array.min": "At least one job type is required.",
  }),
  location: Joi.string().trim().required().messages({
    "any.required": "Location is required.",
    "string.empty": "Location is required.",
  }),
  pay: Joi.number().min(0).required().messages({
    "any.required": "Pay must be a valid positive number.",
    "number.base": "Pay must be a valid positive number.",
    "number.min": "Pay must be a valid positive number.",
  }),
  payPeriod: Joi.string().trim().required().messages({
    "any.required": "Pay period is required.",
    "string.empty": "Pay period is required.",
  }),
  listingTag: Joi.string().trim().allow(""),
  skills: Joi.string().trim().allow(""),
  description: Joi.string().trim().required().messages({
    "any.required": "Job description is required.",
    "string.empty": "Job description is required.",
  }),
  contactEmail: Joi.string().trim().email().required().messages({
    "any.required": "Contact email is required.",
    "string.empty": "Contact email is required.",
    "string.email": "Please provide a valid contact email.",
  }),
  contactNumber: Joi.string().trim().allow(""),
  companyWebsite: Joi.string().trim().uri().allow("").messages({
    "string.uri": "Company website must be a valid URL.",
  }),
  deadline: Joi.date().iso().allow(null, "").messages({
    "date.format": "Deadline must be a valid date.",
    "date.base": "Deadline must be a valid date.",
  }),
});

function normalizeJobInput(body) {
  return {
    jobTitle: body.jobTitle?.trim(),
    companyName: body.companyName?.trim(),
    category: body.category?.trim(),
    jobTypes: Array.isArray(body.jobTypes) ? body.jobTypes : [],
    location: body.location?.trim(),
    pay: Number(body.pay),
    payPeriod: body.payPeriod?.trim(),
    listingTag: body.listingTag?.trim() || "",
    skills: body.skills?.trim() || "",
    description: body.description?.trim(),
    contactEmail: body.contactEmail?.trim().toLowerCase(),
    contactNumber: body.contactNumber?.trim() || "",
    companyWebsite: body.companyWebsite?.trim() || "",
    deadline: body.deadline || null,
  };
}

export async function createJob(request, response, next) {
  try {
    const job = normalizeJobInput(request.body);
    const { error, value: validatedJob } = jobSchema.validate(job);
    if (error) return response.status(400).json({ message: error.details[0].message });

    try {
      const createdJob = await Job.create({ ...validatedJob, employerId: request.auth.userId });
      return response.status(201).json({ job: createdJob });
    } catch (error) {
      if (error.name === "ValidationError" || error.name === "CastError") {
        return response.status(400).json({ message: "Please provide valid job details." });
      }
      throw error;
    }
  } catch (error) {
    return next(error);
  }
}

export async function getMyPostedJobs(request, response, next) {
  try {
    const jobs = await Job.find({ employerId: request.auth.userId }).sort({ createdAt: -1 });
    return response.json({ jobs });
  } catch (error) {
    return next(error);
  }
}
