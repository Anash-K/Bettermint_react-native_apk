export const validations = {
  nonZeroNumber: {
    required: "Field is required",
    validate: (value: string | number) => {
      const numValue = Number(value);
      if (isNaN(numValue)) {
        return "Field must be a valid number";
      }
      if (numValue <= 0) {
        return "Value must be greater than 0";
      }
      if (numValue < 2) {
        return "Value must be at least 2";
      }
      return true;
    },
  },
  email: {
    required: 'Email is required',
    pattern: {
      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: 'Invalid email address format',
    },
  },
  password: {
    required: "Password is required",
    minLength: {
      value: 6,
      message: "Password must be at least 6 characters long",
    },
  },
  name: {
    required: "Name is required",
    minLength: {
      value: 2,
      message: "Name must be at least 2 characters long",
    },
    maxLength: {
      value: 40,
      message: "Name must be less than 40 characters",
    },
    pattern: {
      value: /^[a-zA-Z\s'-]+$/,
      message:
        "Name can only contain letters, spaces, hyphens, and apostrophes",
    },
  },
  confirmPassword: {
    required: "Confirm password is required",
    validate: (value: string, newPassword: string) => {
      console.log(value, newPassword);

      if (value !== newPassword) {
        return "Passwords do not match";
      }
    },
  },
};
