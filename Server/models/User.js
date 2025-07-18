import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: { type: String, unique: true },
  dob: {
    type: Date,
    set: (value) => {
      if (!value) return value;
      if (value instanceof Date) return value; // already a Date

      // Expecting DD/MM/YYYY format string
      const parts = value.split('/');
      if (parts.length === 3) {
        const [day, month, year] = parts;
        // Create ISO format YYYY-MM-DD string
        const isoDateStr = `${year}-${month}-${day}`;
        return new Date(isoDateStr);
      }

      return value; // fallback, may cause validation error if invalid
    }
  },
  password: String,
});

const User = mongoose.model('User', userSchema);

export default User;
