/**
 * Frontend form validation utilities for Althexus application.
 */

// Email regex pattern matching standard RFC-style email format
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isValidEmail(email) {
  if (!email || typeof email !== "string") return false;
  return EMAIL_REGEX.test(email.trim());
}

/**
 * Validates international phone numbers.
 * - Allows optional leading + for country codes (+1, +44, +91, etc.)
 * - Allows common formatting characters: spaces, hyphens, parentheses
 * - Rejects letters and invalid characters
 * - Validates standard E.164 international length (7 to 15 digits)
 */
export function isValidPhone(phone) {
  if (!phone || typeof phone !== "string") return false;
  const trimmed = phone.trim();

  // Must only contain +, digits, spaces, hyphens, and parentheses
  if (!/^\+?[0-9\s\-\(\)]+$/.test(trimmed)) {
    return false;
  }

  // Strip non-digit characters and check international E.164 digit range (7 to 15 digits)
  const digitsOnly = trimmed.replace(/\D/g, "");
  return digitsOnly.length >= 7 && digitsOnly.length <= 15;
}

/**
 * Validates Full Name:
 * - Allows letters (including international accents), spaces, hyphens, apostrophes, periods, and suffixes/numerals with numbers (e.g., "Prince XYZ IV").
 * - Rejects empty values, values containing ONLY numbers, values containing ONLY symbols, and names exceeding 100 characters.
 */
export function isValidName(name) {
  if (!name || typeof name !== "string") return false;
  const trimmed = name.trim();

  // Cap maximum length to 100 characters
  if (trimmed.length < 2 || trimmed.length > 100) {
    return false;
  }

  // Must contain at least one letter character
  const hasLetter = /[a-zA-Z\u00C0-\u024F\u0400-\u04FF\u0600-\u06FF]/.test(trimmed);
  if (!hasLetter) {
    return false;
  }

  // Allowed character set for names: letters, digits, spaces, hyphens, apostrophes, periods, parentheses, commas
  const validChars = /^[a-zA-Z0-9\u00C0-\u024F\u0400-\u04FF\u0600-\u06FF\s\-\'\.\,\(\)]+$/;
  return validChars.test(trimmed);
}

export function validateInquiryForm(form) {
  const errors = {};

  // Full Name Validation
  if (!form.name || !form.name.trim()) {
    errors.name = "Full name is required.";
  } else if (form.name.trim().length > 100) {
    errors.name = "Full name must be 100 characters or less.";
  } else if (!isValidName(form.name)) {
    errors.name = "Please enter a valid full name.";
  }

  // Email Address: Required, valid format
  if (!form.email || !form.email.trim()) {
    errors.email = "Email address is required.";
  } else if (!isValidEmail(form.email)) {
    errors.email = "Please enter a valid email address.";
  }

  // Phone Number: Required, valid international phone number
  if (!form.phone || !form.phone.trim()) {
    errors.phone = "Phone number is required.";
  } else if (!isValidPhone(form.phone)) {
    errors.phone = "Please enter a valid phone number.";
  }

  // Service Required: Required, must select a valid option
  if (!form.serviceRequired || form.serviceRequired === "Select a service") {
    errors.serviceRequired = "Please select a service.";
  }

  // Project Description: Required
  if (!form.projectDescription || !form.projectDescription.trim()) {
    errors.projectDescription = "Project description is required.";
  }

  return errors;
}

export function validateRequestSolutionForm(formData) {
  const errors = {};

  // Full Name Validation
  if (!formData.name || !formData.name.trim()) {
    errors.name = "Full name is required.";
  } else if (formData.name.trim().length > 100) {
    errors.name = "Full name must be 100 characters or less.";
  } else if (!isValidName(formData.name)) {
    errors.name = "Please enter a valid full name.";
  }

  // Email Address: Required, valid format
  if (!formData.email || !formData.email.trim()) {
    errors.email = "Email address is required.";
  } else if (!isValidEmail(formData.email)) {
    errors.email = "Please enter a valid email address.";
  }

  // Phone Number: Required, valid international phone number
  if (!formData.phone || !formData.phone.trim()) {
    errors.phone = "Phone number is required.";
  } else if (!isValidPhone(formData.phone)) {
    errors.phone = "Please enter a valid phone number.";
  }

  // Service Required: Required
  if (!formData.service || formData.service === "Select a service") {
    errors.service = "Please select a service.";
  }

  // Project Details: Required
  if (!formData.message || !formData.message.trim()) {
    errors.message = "Project details are required.";
  }

  return errors;
}

export function validateJobApplicationForm(form, resume) {
  const errors = {};

  // Full Name Validation
  if (!form.name || !form.name.trim()) {
    errors.name = "Full name is required.";
  } else if (form.name.trim().length > 100) {
    errors.name = "Full name must be 100 characters or less.";
  } else if (!isValidName(form.name)) {
    errors.name = "Please enter a valid full name.";
  }

  // Email Address: Required, valid format
  if (!form.email || !form.email.trim()) {
    errors.email = "Email address is required.";
  } else if (!isValidEmail(form.email)) {
    errors.email = "Please enter a valid email address.";
  }

  // Phone Number: Validate format if user entered a number
  if (form.phone && form.phone.trim() && !isValidPhone(form.phone)) {
    errors.phone = "Please enter a valid phone number.";
  }

  // Resume: Required
  if (!resume) {
    errors.resume = "Please upload your resume.";
  }

  return errors;
}
