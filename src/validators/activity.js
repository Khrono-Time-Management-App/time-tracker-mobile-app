import * as yup from "yup";

const schema = yup.object().shape({
  name: yup.string().required("Name is mandatory."),
  description: yup.string().required("Description name is mandatory."),
  category: yup.string().required("Category is mandatory."),
});

export default schema;
