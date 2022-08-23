import * as yup from 'yup'

export const formLogin = () => yup.object({
    user: yup
        .string()
        .required('field required'),
    password: yup
        .string()
        .required('field required')
        .min(8,"Password length must more than 8 characters"),
});