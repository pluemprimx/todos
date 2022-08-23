import * as yup from 'yup'

export const formTodo = () => yup.object({
    title: yup
        .string()
        .required('field required'),
    description: yup
        .string()
        .required('field required'),
});