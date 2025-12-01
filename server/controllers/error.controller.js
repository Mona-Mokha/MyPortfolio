function handleError(req, res) {
  // generic express error handler (not used extensively here)
  const message = getErrorMessage(req?.error || "An error occurred");
  res.status(500).json({ error: message });
}

function getErrorMessage(err) {
  if (!err) return "An unknown error occurred";

  // Mongo duplicate key error
  if (err.code && err.code === 11000) {
    // Attempt to extract a helpful field name from keyValue or errmsg
    const key = err.keyValue ? Object.keys(err.keyValue)[0] : null;
    const val = err.keyValue ? err.keyValue[key] : null;
    if (key && val) return `${key.charAt(0).toUpperCase() + key.slice(1)} '${val}' already exists`;
    return "Duplicate key error";
  }

  // Mongoose validation errors
  if (err.errors) {
    const firstKey = Object.keys(err.errors)[0];
    if (firstKey && err.errors[firstKey].message) return err.errors[firstKey].message;
  }

  // If the error has a message property, return it
  if (err.message) return err.message;

  // Fallback to stringifying the error
  try {
    return JSON.stringify(err);
  } catch (e) {
    return String(err);
  }
}

export default {
  handleError,
  getErrorMessage,
};
