import React, { useState, useRef } from "react";
import './css/login.css'
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import { useForm } from "react-hook-form"
import FormHelperText from '@mui/material/FormHelperText';
import { yupResolver } from "@hookform/resolvers/yup"
import { useNavigate } from "react-router-dom";
import { formLogin } from "../../validate/formLogin";
import { login_service } from "../../service/auth.service";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import {setLogin } from "./isLogin";

const MySwal = withReactContent(Swal)


const CssTextField = styled(TextField)({
    width: "100%",
    '& label.Mui-focused': {
        color: '#718EBC',
    },
    '& .MuiInputLabel-root ': {
        color: '#718EBC',
        fontFamily: "Noto Sans,Noto Sans Thai",
    },
    '& .MuiInput-underline': {
        borderColor: '#718EBC',
    },
    '& .MuiInput-underline:before': {
        borderBottomColor: '#718EBC',
    },
    '& .MuiInput-underline:after': {
        borderBottomColor: '#718EBC',
    },
    '& .MuiInput-root': {
        color: '#13438F',
        fontFamily: "Noto Sans,Noto Sans Thai",
        borderBottomColor: '#718EBC',
    }
});

const HelperText = styled(FormHelperText)({
    color: '#FF7900',
    fontFamily: "Noto Sans,Noto Sans Thai",
    '& .MuiFormHelperText-root': {
        color: '#FF7900',
    }

});

export const Login = (props) => {
    const { register, handleSubmit, formState: { errors }, reset, setValue, trigger } = useForm({
        mode: "all",
        resolver: yupResolver(formLogin()),
        shouldUnregister: false,
        shouldFocusError: true
    });
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");

    const handleChangeUser = (event) => {
        setUser(event.target.value);
        setValue("user", event.target.value);
        trigger('user')
    };
    const handleChangePassword = (event) => {
        setPassword(event.target.value);
        setValue("password", event.target.value);
        trigger('password')
    };
    const form = useRef();
    const Navigate = useNavigate();
    const onSubmit = (data) => {
        reset();
        console.log(data);
        post_login(data);
        // Navigate("/todo")
    }

    const post_login = (login) => {
        const body = { username: login.user, password: login.password };
        login_service(body)
            .then(data => {
                console.log(data);
                if (data.message !== "Invalid username or password") {
                    console.log("success");
                    setLogin(data)
                    Navigate("/todo")
                    MySwal.fire({
                        position: 'center',
                        icon: 'success',
                        title: `<span class="text-color-1">Login successfully</span>`,
                        showConfirmButton: false,
                        timer: 1500
                      })
                } else {
                    console.log("failed");
                    MySwal.fire({
                        position: 'center',
                        icon: 'error',
                        title: `<span class="text-color-3">Login failed</span>`,
                        html: `<span class="text-color-2">Invalid username or password</span><br/><span class="text-color-2">please try again</span>`,
                        showConfirmButton: false,
                        timer: 1500
                      })
                }

            }).catch(err => {
                console.log(err)
                MySwal.fire({
                    position: 'center',
                    icon: 'error',
                    title: `<span class="text-color-3">Login failed</span>`,
                    html: `<span class="text-color-2">Invalid username or password</span><br/><span class="text-color-2">please try again</span>`,
                    showConfirmButton: false,
                    timer: 1500
                  })
            });
    }

    return (
        <>
            <div className="bg-signin">
            </div>
            <div className="main_container ">
                <div className="card-contrainer-signin ">
                    <div className="card-signin mt-5">
                        <div className="text-signin-1 center">Log in</div>
                        <form ref={form} onSubmit={handleSubmit(onSubmit)} onDragEnter={handleSubmit(onSubmit)}>
                            <div className="mt-2">
                                <CssTextField
                                    id="user"
                                    name='user'
                                    {...(register ?? "")('user' ?? "", { required: true })}
                                    label={"Username"}
                                    value={user}
                                    onChange={handleChangeUser}
                                    fullWidth
                                    variant="standard"
                                />
                                {errors.user &&
                                    <HelperText id="user">{errors.user.message ?? ""}</HelperText>
                                }
                            </div>
                            <div className="mt-2">
                                <CssTextField
                                    id="password"
                                    name='password'
                                    type={"password"}
                                    {...(register ?? "")('password' ?? "", { required: true })}
                                    label={"Password"}
                                    value={password}
                                    onChange={handleChangePassword}
                                    fullWidth
                                    variant="standard"
                                />
                                {errors.password &&
                                    <HelperText id="password">{errors.password.message ?? ""}</HelperText>
                                }
                            </div>



                            <div className=" center mt-3">
                                <button type="submit" className="singin-button text-signin-5">Log in</button>
                            </div>
                        </form>

                    </div>
                </div>

            </div>

        </>
    );
}

export default Login;
