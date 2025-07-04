import { useState } from 'react';
import { useForm as useReactHookForm, UseFormProps, UseFormReturn, FieldValues, SubmitHandler, SubmitErrorHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';

interface UseZodFormProps<T extends FieldValues> extends Omit<UseFormProps<T>, 'resolver'> {
  schema: z.ZodType<T>;
  onSubmit?: SubmitHandler<T>;
  onError?: SubmitErrorHandler<T>;
}

interface UseFormResult<T extends FieldValues> extends UseFormReturn<T> {
  isSubmitting: boolean;
  handleSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
}

/**
 * Custom hook that combines react-hook-form with zod validation
 * @param props Configuration options including zod schema and submit handlers
 * @returns Enhanced useForm return value with isSubmitting state
 */
export function useZodForm<T extends FieldValues>({
  schema,
  onSubmit,
  onError,
  ...formProps
}: UseZodFormProps<T>): UseFormResult<T> {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Initialize react-hook-form with zod resolver
  const form = useReactHookForm<T>({
    ...formProps,
    resolver: zodResolver(schema),
  });

  // Custom submit handler that tracks submission state
  const handleSubmit = async (e?: React.BaseSyntheticEvent) => {
    if (!onSubmit) return;
    
    setIsSubmitting(true);
    
    try {
      await form.handleSubmit(async (data) => {
        try {
          await onSubmit(data);
        } catch (error) {
          // Handle any errors thrown in the onSubmit function
          console.error('Form submission error:', error);
          toast.error(error instanceof Error ? error.message : 'An error occurred during form submission');
        }
      }, (errors) => {
        // Handle validation errors
        if (onError) onError(errors);
        console.error('Form validation errors:', errors);
      })(e);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    ...form,
    isSubmitting,
    handleSubmit,
  };
}

/**
 * Helper function to create a form schema with common field validations
 */
export const formFields = {
  // String fields
  name: (options?: { required?: boolean; min?: number; max?: number; message?: string }) => {
    let schema = z.string().trim();
    
    if (options?.min) schema = schema.min(options.min, options.message || `Must be at least ${options.min} characters`);
    if (options?.max) schema = schema.max(options.max, options.message || `Must be at most ${options.max} characters`);
    if (options?.required !== false) schema = schema.min(1, options?.message || 'Required');
    
    return schema;
  },
  
  email: (options?: { required?: boolean; message?: string }) => {
    let schema = z.string().trim().email('Invalid email address');
    if (options?.required !== false) schema = schema.min(1, options?.message || 'Email is required');
    return schema;
  },
  
  password: (options?: { required?: boolean; min?: number; message?: string }) => {
    let schema = z.string();
    const min = options?.min || 8;
    
    if (options?.required !== false) {
      schema = schema.min(1, options?.message || 'Password is required');
    }
    
    if (schema.min) {
      schema = schema.min(min, options?.message || `Password must be at least ${min} characters`);
    }
    
    return schema;
  },
  
  // Number fields
  number: (options?: { required?: boolean; min?: number; max?: number; message?: string }) => {
    let schema = z.number({
      invalid_type_error: 'Must be a number',
      required_error: options?.message || 'Required',
    });
    
    if (options?.min !== undefined) schema = schema.min(options.min, options.message || `Must be at least ${options.min}`);
    if (options?.max !== undefined) schema = schema.max(options.max, options.message || `Must be at most ${options.max}`);
    
    if (options?.required === false) {
      return z.number().optional();
    }
    
    return schema;
  },
  
  // Date fields
  date: (options?: { required?: boolean; min?: Date; max?: Date; message?: string }) => {
    let schema = z.date({
      invalid_type_error: 'Must be a valid date',
      required_error: options?.message || 'Date is required',
    });
    
    if (options?.min) schema = schema.min(options.min, options.message || `Date must be after ${options.min.toLocaleDateString()}`);
    if (options?.max) schema = schema.max(options.max, options.message || `Date must be before ${options.max.toLocaleDateString()}`);
    
    if (options?.required === false) {
      return z.date().optional();
    }
    
    return schema;
  },
  
  // Boolean fields
  boolean: (options?: { required?: boolean; message?: string }) => {
    const schema = z.boolean({
      required_error: options?.message || 'This field is required',
    });
    
    if (options?.required === false) {
      return schema.optional();
    }
    
    return schema;
  },
  
  // Array fields
  array: <T>(schema: z.ZodType<T>, options?: { required?: boolean; min?: number; max?: number; message?: string }) => {
    let arraySchema = z.array(schema);
    
    if (options?.min !== undefined) arraySchema = arraySchema.min(options.min, options.message || `Must have at least ${options.min} items`);
    if (options?.max !== undefined) arraySchema = arraySchema.max(options.max, options.message || `Must have at most ${options.max} items`);
    
    if (options?.required === false) {
      return arraySchema.optional();
    }
    
    return arraySchema;
  },
  
  // Phone number field with basic validation
  phone: (options?: { required?: boolean; message?: string }) => {
    let schema = z.string().trim()
      .regex(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/, 'Invalid phone number format');
    
    if (options?.required !== false) {
      schema = schema.min(1, options?.message || 'Phone number is required');
    } else {
      return z.string().regex(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/, 'Invalid phone number format').optional();
    }
    
    return schema;
  },
  
  // URL field with validation
  url: (options?: { required?: boolean; message?: string }) => {
    let schema = z.string().trim().url('Invalid URL');
    
    if (options?.required !== false) {
      schema = schema.min(1, options?.message || 'URL is required');
    } else {
      return z.string().url('Invalid URL').optional();
    }
    
    return schema;
  },
  
  // Enum field for dropdown selections
  enum: <T extends [string, ...string[]]>(values: T, options?: { required?: boolean; message?: string }) => {
    const schema = z.enum(values, {
      required_error: options?.message || 'Please select an option',
      invalid_type_error: 'Invalid selection',
    });
    
    if (options?.required === false) {
      return schema.optional();
    }
    
    return schema;
  },
};

export default useZodForm;