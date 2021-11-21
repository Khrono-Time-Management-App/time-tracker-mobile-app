import * as yup from "yup";

export default yup.object().shape({
  email: yup
    .string()
    .email('Email must be a valid email')
    .required('Email is mandatory.')
});
