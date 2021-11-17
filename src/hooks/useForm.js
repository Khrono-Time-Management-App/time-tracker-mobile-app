import { useState } from 'react';

export const useForm = (initialValues) => {
  const [values, setValues] = useState(initialValues);

  return [values, (text, target) => {
    setValues({
      ...values,
      [target]: text
    });
  }];
};
