import { useState, useCallback } from 'react';
import { BlocFormData, INITIAL_FORM_DATA } from '@/constants/blocForm';

export function useFormState() {
  const [formData, setFormData] = useState<BlocFormData>(INITIAL_FORM_DATA);

  const updateField = useCallback((field: keyof BlocFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  }, []);



  const isFormValid = useCallback(() => {
    return formData.name.trim() !== '' && 
           formData.area !== '' && 
           formData.style !== '' &&
           formData.description.trim() !== '' &&
           formData.lat !== '' && 
           formData.lng !== '';
  }, [formData]);

  const resetForm = useCallback(() => {
    setFormData(INITIAL_FORM_DATA);
  }, []);

  return {
    formData,
    updateField,
    isFormValid,
    resetForm
  };
}
