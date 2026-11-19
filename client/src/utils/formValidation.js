export function validateForm({ form, requiredFields, validators = {} }) {
  const errors = {};

  Object.entries(requiredFields).forEach(([field, message]) => {
    const value = form[field];
    if (!value || (Array.isArray(value) && value.length === 0)) {
      errors[field] = message;
    }
  });

  Object.entries(validators).forEach(([field, validator]) => {
    const value = form[field];
    if (value && !validator.rule.test(value)) {
      errors[field] = validator.message;
    }
  });

  return errors;
}
