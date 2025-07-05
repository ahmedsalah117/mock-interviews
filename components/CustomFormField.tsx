import React from 'react'
import { FormControl, FormItem, FormLabel, FormMessage } from './ui/form';
import { Input } from './ui/input';
import {  Control, Controller, FieldValues, Path } from 'react-hook-form';

interface FormFieldProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label: string;
  placeholder: string;
  type?: "text" | "password" | "email"|"file";
}
const CustomFormField =<T extends FieldValues> ({name, control, label, placeholder, type = "text"}:FormFieldProps<T>) => {
  return (
    <Controller name={name} control={control} render={({ field }) => {
      return (
        <FormItem>
          <FormLabel className="label">{label}</FormLabel>
          <FormControl>
            <Input
              className="input"
              placeholder={placeholder}
              type={type}
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      );
    
    
    }}
    
    />

    
  );
}

export default CustomFormField