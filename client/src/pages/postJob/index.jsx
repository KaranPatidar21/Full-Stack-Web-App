import { useState } from "react";
import {
  Alert,
  Box,
  Chip,
  FormHelperText,
  Snackbar,
  Typography,
} from "@mui/material";

import PtJobButton from "../../components/ui-component/PtJobButton";
import SearchableMultiSelect from "../../components/ui-component/searchableMultiSelect";
import CustomInputField, { CustomSelectField } from "../../components/ui-component/inputFields";
import { validateForm as validateFormValues } from "../../utils/formValidation";

const categories = ["Delivery", "Retail", "Customer support", "Tutoring", "Driving", "Other"];
const jobTypes = ["Part-time", "Full-time", "Freelance", "Remote", "Walk-in"];
const listingTags = ["Remote", "Verified", "Urgent", "New", "Flexible", "Part-time"];
const payPeriods = ["per month", "per week", "per day", "per hour"];

const initialForm = {
  jobTitle: "",
  companyName: "",
  category: "",
  jobTypes: [],
  location: "",
  pay: "",
  payPeriod: "per month",
  listingTag: "",
  skills: "",
  description: "",
  contactEmail: "",
  contactNumber: "",
  companyWebsite: "",
  deadline: "",
};

const requiredFields = {
  jobTitle: "Job title is required.",
  companyName: "Company name is required.",
  category: "Select a category.",
  jobTypes: "Select at least one job type.",
  location: "Location is required.",
  pay: "Pay is required.",
  description: "Job description is required.",
  contactEmail: "Contact email is required.",
};

function PostJob() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  function updateField(name, value) {
    setForm((currentForm) => ({ ...currentForm, [name]: value }));
    setErrors((currentErrors) => ({ ...currentErrors, [name]: "" }));
  }

  function validateForm() {
    const nextErrors = validateFormValues({
      form,
      requiredFields,
      validators: {
        contactEmail: {
          rule: /^\S+@\S+\.\S+$/,
          message: "Enter a valid email address.",
        },
      },
    });
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (validateForm()) {
      setSubmitted(true);
    }
  }

  return (
    <Box component="main" className="post-job-page">
      <Box component="form" className="post-job-card" onSubmit={handleSubmit} noValidate>
        <Typography component="h1" className="post-job-title">Post a job</Typography>
        <Typography className="post-job-subtitle">Find the right person for your opportunity.</Typography>

        <Box className="post-job-sections-grid">
          <FormSection number="1" title="Role details">
          <Field
            label="Job title"
            name="jobTitle"
            value={form.jobTitle}
            onChange={(event) => updateField("jobTitle", event.target.value)}
            placeholder="e.g. Weekend Delivery Partner"
            error={errors.jobTitle}
            fullWidth
          />
          <Box className="post-job-grid post-job-grid-two">
            <Field
              label="Company name"
              name="companyName"
              value={form.companyName}
              onChange={(event) => updateField("companyName", event.target.value)}
              placeholder="e.g. Swiggy Instamart"
              error={errors.companyName}
            />
            <SelectField
              label="Category"
              name="category"
              value={form.category}
              onChange={(event) => updateField("category", event.target.value)}
              options={categories}
              error={errors.category}
            />
          </Box>
          </FormSection>

          <FormSection number="2" title="Work type and location">
          <SearchableMultiSelect
            label="Job type"
            hint="select all that apply"
            name="jobTypes"
            options={jobTypes}
            value={form.jobTypes}
            onChange={(value) => updateField("jobTypes", value)}
            error={errors.jobTypes}
          />
          <Field
            label="Location"
            name="location"
            value={form.location}
            onChange={(event) => updateField("location", event.target.value)}
            placeholder="e.g. Andheri West, Mumbai or Remote"
            error={errors.location}
            fullWidth
          />
          </FormSection>

          <FormSection number="3" title="Pay and listing tag">
          <Box className="post-job-grid post-job-grid-pay">
            <Field
              label="Pay"
              name="pay"
              type="number"
              value={form.pay}
              onChange={(event) => updateField("pay", event.target.value)}
              placeholder="e.g. 500"
              error={errors.pay}
            />
            <SelectField
              label="Pay period"
              name="payPeriod"
              value={form.payPeriod}
              onChange={(event) => updateField("payPeriod", event.target.value)}
              options={payPeriods}
            />
          </Box>
          <OptionGroup
            label="Listing tag"
            hint="shown as the badge on your card, pick one"
            options={listingTags}
            selected={form.listingTag ? [form.listingTag] : []}
            onToggle={(option) => updateField("listingTag", form.listingTag === option ? "" : option)}
            exclusive
          />
          </FormSection>

          <FormSection number="4" title="Skills and description">
          <Field
            label="Skills / keywords"
            name="skills"
            value={form.skills}
            onChange={(event) => updateField("skills", event.target.value)}
            placeholder="e.g. React, Communication, Two-wheeler"
            fullWidth
          />
          <Field
            label="Job description"
            name="description"
            value={form.description}
            onChange={(event) => updateField("description", event.target.value)}
            placeholder="Describe responsibilities, shift timings, and what makes this role a good fit..."
            error={errors.description}
            multiline
            minRows={4}
            fullWidth
          />
          </FormSection>
        </Box>

        <Box className="post-job-contact-section">
          <FormSection number="5" title="Contact and deadline">
          <Box className="post-job-grid post-job-grid-contact">
            <Field
              label="Contact email"
              name="contactEmail"
              type="email"
              value={form.contactEmail}
              onChange={(event) => updateField("contactEmail", event.target.value)}
              placeholder="hiring@company.com"
              error={errors.contactEmail}
            />
            <Field
              label="Contact number"
              name="contactNumber"
              type="tel"
              value={form.contactNumber}
              onChange={(event) => updateField("contactNumber", event.target.value)}
              placeholder="e.g. +91 98765 43210"
            />
            <Field
              label="Company website"
              name="companyWebsite"
              type="url"
              value={form.companyWebsite}
              onChange={(event) => updateField("companyWebsite", event.target.value)}
              placeholder="https://company.com"
            />
            <DeadlineField
              label="Application deadline"
              name="deadline"
              value={form.deadline}
              onChange={(event) => updateField("deadline", event.target.value)}
            />
          </Box>
          </FormSection>
        </Box>

        <PtJobButton
          className="post-job-actions"
          buttons={[{
            label: "Post job",
            type: "submit",
            className: "post-job-submit",
            props: { "aria-label": "Post job" },
          }]}
        />
      </Box>

      <Snackbar open={submitted} autoHideDuration={3500} onClose={() => setSubmitted(false)}>
        <Alert severity="success" onClose={() => setSubmitted(false)}>Your job post is ready to publish.</Alert>
      </Snackbar>
    </Box>
  );
}

function FormSection({ number, title, children }) {
  return (
    <Box className="post-job-section">
      <Typography component="h2" className="post-job-section-title">
        <span>{number}</span>{title}
      </Typography>
      {children}
    </Box>
  );
}

function Field({ label, error, ...props }) {
  return (
    <Box className="post-job-field">
      <CustomInputField
        {...props}
        id={props.name}
        label={label}
        fullWidth
        size="small"
        error={Boolean(error)}
        helperText={error}
        placeholder={props.placeholder}
        InputLabelProps={{ shrink: undefined, ...props.InputLabelProps }}
        className="post-job-input"
      />
    </Box>
  );
}

function DeadlineField({ label, name, value, onChange }) {
  const [inputType, setInputType] = useState(value ? "date" : "text");

  return (
    <Box className="post-job-field">
      <CustomInputField
        id={name}
        name={name}
        label={label}
        type={inputType}
        value={value}
        onChange={onChange}
        onFocus={() => setInputType("date")}
        onBlur={() => {
          if (!value) setInputType("text");
        }}
        fullWidth
        size="small"
        className="post-job-input"
      />
    </Box>
  );
}

function SelectField({ label, name, value, onChange, options, error }) {
  return <CustomSelectField label={label} name={name} value={value} onChange={onChange} options={options} error={error} className="post-job-field" />;
}

function OptionGroup({ label, hint, options, selected, onToggle, error }) {
  return (
    <Box className="post-job-field post-job-option-group">
      <Typography className="post-job-label">{label} {hint && <small>{hint}</small>}</Typography>
      <Box className="post-job-options">
        {options.map((option) => (
          <Chip
            key={option}
            label={option}
            clickable
            onClick={() => onToggle(option)}
            color={selected.includes(option) ? "primary" : "default"}
            className="post-job-option"
          />
        ))}
      </Box>
      {error && <FormHelperText error>{error}</FormHelperText>}
    </Box>
  );
}

export default PostJob;