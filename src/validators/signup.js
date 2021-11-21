import * as yup from 'yup';

const schema = yup.object().shape({
  email: yup
    .string()
    .email('Email must be a valid email')
    .required('Email is mandatory.'),
  password: yup
    .string()
    .required()
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,64}$/,
      'Password should contain at least 8 characters (1 lowercase, 1 uppercase and 1 number).'
    ),
  firstName: yup
    .string()
    .required('First name is mandatory.'),
  lastName: yup
    .string()
    .required('Last name is mandatory.'),
});

export default schema;
