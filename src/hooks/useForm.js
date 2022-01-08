import { useState } from 'react';

export const useForm = (initialValues, initialErrorValues) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState(initialErrorValues);

  const validate = (schema) => {
    let newErrors = {};

    return schema
      .validate(values, { abortEarly: false })
      .then(() => true)
      .catch(err => {
        err.inner.forEach(e => {
          newErrors[e.path] = e.message;
        });
        setErrors(newErrors);

        return false;
      });
  };

  const handleChange = (text, target) => {
    setValues({
      ...values,
      [target]: text
    });
  };

  const handleDateChange = (event, date, target) => {
    event.persist();

    console.log('DATE', date)

    setValues({
      ...values,
      [target]: date
    });
  };

  return [values, errors, handleChange, validate, handleDateChange];
};
