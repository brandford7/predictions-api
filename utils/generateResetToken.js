import crypto from "crypto";

// Function to generate a random reset token
export const generateResetToken = () => {
  const buffer = crypto.randomBytes(20);
  return buffer.toString("hex");
};

