import React, { createContext, useContext, useId } from "react";
import { FormProvider, Controller, useFormContext } from "react-hook-form";
import { Form, FloatingLabel } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

/**
 * React Hook Form + Bootstrap integration
 *
 * Components:
 * - <FormContainer> → wraps the form provider
 * - <FormField> → connects field to React Hook Form
 * - <FormItem> → wraps individual inputs (Bootstrap layout)
 * - <FormLabel> → label with error highlighting
 * - <FormControl> → input/textarea/select component
 * - <FormDescription> → helper text below the input
 * - <FormMessage> → shows validation errors
 */

// Contexts
const FormFieldContext = createContext();
const FormItemContext = createContext();

// 🧩 Top-level Form Provider
export const FormContainer = ({ methods, onSubmit, children }) => (
  <FormProvider {...methods}>
    <Form noValidate onSubmit={methods.handleSubmit(onSubmit)}>
      {children}
    </Form>
  </FormProvider>
);

// 🧩 Field Wrapper (Controller binding)
export const FormField = ({ name, control, render }) => (
  <FormFieldContext.Provider value={{ name }}>
    <Controller name={name} control={control} render={render} />
  </FormFieldContext.Provider>
);

// 🧩 Wrapper for a single input + label + feedback
export const FormItem = ({ children, className = "" }) => {
  const id = useId();
  return (
    <FormItemContext.Provider value={{ id }}>
      <div className={`mb-3 ${className}`}>{children}</div>
    </FormItemContext.Provider>
  );
};

// 🧩 Label component (Bootstrap + error-aware)
export const FormLabel = ({ children }) => {
  const { name } = useContext(FormFieldContext);
  const { formState } = useFormContext();
  const error = formState.errors?.[name];
  return (
    <Form.Label htmlFor={name} className={error ? "text-danger" : ""}>
      {children}
    </Form.Label>
  );
};

// 🧩 Input Control (binds error + id)
export const FormControl = ({ as = "input", ...props }) => {
  const { name } = useContext(FormFieldContext);
  const { control } = useFormContext();
  const { formState } = useFormContext();
  const error = formState.errors?.[name];
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Form.Control
          {...field}
          {...props}
          id={name}
          isInvalid={!!error}
          as={as}
        />
      )}
    />
  );
};

// 🧩 Description text (helper)
export const FormDescription = ({ children }) => (
  <Form.Text className="text-muted small">{children}</Form.Text>
);

// 🧩 Error Message
export const FormMessage = () => {
  const { name } = useContext(FormFieldContext);
  const { formState } = useFormContext();
  const error = formState.errors?.[name];
  return error ? (
    <Form.Control.Feedback type="invalid">
      {error.message}
    </Form.Control.Feedback>
  ) : null;
};
