/**
 * Form validation utility with mobile-specific validation rules
 */
export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export class ValidationUtils {
  /**
   * Validate email format
   */
  static validateEmail(email: string): ValidationResult {
    const errors: string[] = [];
    
    if (!email) {
      errors.push('Email is required');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.push('Please enter a valid email address');
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  }

  /**
   * Validate password strength
   */
  static validatePassword(password: string): ValidationResult {
    const errors: string[] = [];
    
    if (!password) {
      errors.push('Password is required');
    } else {
      if (password.length < 6) {
        errors.push('Password must be at least 6 characters long');
      }
      
      if (!/(?=.*[a-zA-Z])/.test(password)) {
        errors.push('Password must contain at least one letter');
      }
      
      if (!/(?=.*\d)/.test(password)) {
        errors.push('Password must contain at least one number');
      }
      
      // Check for strong password (optional but recommended)
      if (password.length >= 8 && /(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])/.test(password)) {
        // Strong password - no additional errors
      } else if (password.length < 8 || !/(?=.*[a-zA-Z])(?=.*\d)/.test(password)) {
        // Weak password
        if (password.length >= 6 && /(?=.*[a-zA-Z])(?=.*\d)/.test(password)) {
          // Medium strength - acceptable
        } else {
          errors.push('Password is too weak');
        }
      }
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  }

  /**
   * Validate name fields
   */
  static validateName(name: string, fieldName: string = 'Name'): ValidationResult {
    const errors: string[] = [];
    
    if (!name) {
      errors.push(`${fieldName} is required`);
    } else {
      if (name.trim().length < 2) {
        errors.push(`${fieldName} must be at least 2 characters long`);
      }
      
      if (!/^[a-zA-Z\s'-]+$/.test(name)) {
        errors.push(`${fieldName} can only contain letters, spaces, hyphens, and apostrophes`);
      }
      
      if (name.trim().length > 50) {
        errors.push(`${fieldName} must be less than 50 characters`);
      }
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  }

  /**
   * Validate date of birth
   */
  static validateDateOfBirth(dob: string): ValidationResult {
    const errors: string[] = [];
    
    if (!dob) {
      errors.push('Date of birth is required');
    } else {
      const birthDate = new Date(dob);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();
      
      if (birthDate > today) {
        errors.push('Date of birth cannot be in the future');
      } else if (age < 13) {
        errors.push('You must be at least 13 years old to register');
      } else if (age > 120) {
        errors.push('Please enter a valid date of birth');
      }
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  }

  /**
   * Validate phone number
   */
  static validatePhoneNumber(phone: string): ValidationResult {
    const errors: string[] = [];
    
    if (!phone) {
      errors.push('Phone number is required');
    } else {
      // Remove all non-digit characters for validation
      const cleanPhone = phone.replace(/\D/g, '');
      
      if (cleanPhone.length < 10 || cleanPhone.length > 15) {
        errors.push('Phone number must be between 10-15 digits');
      }
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  }

  /**
   * Validate complaint title
   */
  static validateComplaintTitle(title: string): ValidationResult {
    const errors: string[] = [];
    
    if (!title) {
      errors.push('Complaint title is required');
    } else {
      if (title.trim().length < 5) {
        errors.push('Title must be at least 5 characters long');
      }
      
      if (title.trim().length > 100) {
        errors.push('Title must be less than 100 characters');
      }
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  }

  /**
   * Validate complaint description
   */
  static validateComplaintDescription(description: string): ValidationResult {
    const errors: string[] = [];
    
    if (!description) {
      errors.push('Complaint description is required');
    } else {
      if (description.trim().length < 10) {
        errors.push('Description must be at least 10 characters long');
      }
      
      if (description.trim().length > 1000) {
        errors.push('Description must be less than 1000 characters');
      }
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  }

  /**
   * Validate complaint category
   */
  static validateComplaintCategory(category: string): ValidationResult {
    const errors: string[] = [];
    const validCategories = [
      'Service Quality',
      'Product Issue',
      'Billing',
      'Technical Support',
      'Staff Behavior',
      'Delivery',
      'Refund/Exchange',
      'Other'
    ];
    
    if (!category) {
      errors.push('Please select a complaint category');
    } else if (!validCategories.includes(category)) {
      errors.push('Please select a valid complaint category');
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  }

  /**
   * Validate OTP
   */
  static validateOTP(otp: string): ValidationResult {
    const errors: string[] = [];
    
    if (!otp) {
      errors.push('OTP is required');
    } else {
      if (!/^\d{4}$/.test(otp)) {
        errors.push('OTP must be a 4-digit number');
      }
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  }

  /**
   * Validate file upload
   */
  static validateFileUpload(file: File | null, maxSizeMB: number = 5): ValidationResult {
    const errors: string[] = [];
    
    if (file) {
      // Check file size
      const maxSizeBytes = maxSizeMB * 1024 * 1024;
      if (file.size > maxSizeBytes) {
        errors.push(`File size must be less than ${maxSizeMB}MB`);
      }
      
      // Check file type
      const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'];
      if (!validTypes.includes(file.type)) {
        errors.push('File must be an image (JPEG, PNG, GIF) or PDF');
      }
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  }

  /**
   * Validate multiple files
   */
  static validateMultipleFiles(files: File[], maxFiles: number = 3, maxSizeMB: number = 5): ValidationResult {
    const errors: string[] = [];
    
    if (files.length > maxFiles) {
      errors.push(`You can upload a maximum of ${maxFiles} files`);
    }
    
    // Validate each file
    files.forEach((file, index) => {
      const fileValidation = this.validateFileUpload(file, maxSizeMB);
      if (!fileValidation.isValid) {
        errors.push(`File ${index + 1}: ${fileValidation.errors.join(', ')}`);
      }
    });
    
    return {
      isValid: errors.length === 0,
      errors
    };
  }

  /**
   * Comprehensive form validation
   */
  static validateComplaintForm(formData: {
    title: string;
    description: string;
    category: string;
    files?: File[];
  }): ValidationResult {
    const allErrors: string[] = [];
    
    const titleValidation = this.validateComplaintTitle(formData.title);
    const descriptionValidation = this.validateComplaintDescription(formData.description);
    const categoryValidation = this.validateComplaintCategory(formData.category);
    
    allErrors.push(...titleValidation.errors);
    allErrors.push(...descriptionValidation.errors);
    allErrors.push(...categoryValidation.errors);
    
    if (formData.files && formData.files.length > 0) {
      const filesValidation = this.validateMultipleFiles(formData.files);
      allErrors.push(...filesValidation.errors);
    }
    
    return {
      isValid: allErrors.length === 0,
      errors: allErrors
    };
  }

  /**
   * Get password strength level
   */
  static getPasswordStrength(password: string): 'weak' | 'medium' | 'strong' {
    if (!password) return 'weak';
    
    if (password.length >= 8 && 
        /(?=.*[a-zA-Z])/.test(password) && 
        /(?=.*\d)/.test(password) && 
        /(?=.*[!@#$%^&*])/.test(password)) {
      return 'strong';
    }
    
    if (password.length >= 6 && 
        /(?=.*[a-zA-Z])/.test(password) && 
        /(?=.*\d)/.test(password)) {
      return 'medium';
    }
    
    return 'weak';
  }
}

export default ValidationUtils;
