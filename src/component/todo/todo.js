import { Button, IconButton, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import './css/todo.css'
import { styled } from '@mui/material/styles';
import { IoMdAddCircle } from 'react-icons/io'
import { BsTrashFill } from 'react-icons/bs'
import ModalCreate from "./modalCreate";
import ModalEdit from "./modalEdit";
import { delete_todo_service, get_all_todos_service } from "../../service/todo.service";
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

const CustomTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
    [`& .${tooltipClasses.arrow}`]: {
        color: "#008e3a",
    },
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: "#008e3a",
    },
}));

const CustomTooltip2 = styled(({ className, ...props }) => (
    <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
    [`& .${tooltipClasses.arrow}`]: {
        color: "#e70101",
    },
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: "#e70101",
    },
}));

export const Todo = (props) => {
    const [open, setOpen] = useState(false);
    const [list, setList] = useState();

    const handleClickOpen = () => {
        setOpen(true);
    };


    const token = JSON.parse(localStorage.getItem("login"));

    useEffect(() => {
        getTodos();
        //  eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    async function getTodos() {
        let todolist;
        await get_all_todos_service(token.token).then((data) => {
            //console.log(data);
            todolist = data;
        })

        setList(todolist)
    }

    const handleConfirmDelete = (data) => {
        MySwal.fire({
            position: "center",
            icon: "warning",
            title: `<span class="text-color-1">Do you want to delete the "${data.title}" ?</span>`,
            html: '<span class="text-color-2"></span>',
            showConfirmButton: true,
            confirmButtonText: "Confirm",
            confirmButtonColor: "#e21616",
            showCancelButton: true,
        }).then((result) => {
            if (result.isConfirmed) {
                postDelete(data._id)
            }
        });
    };

    const postDelete = (_id) => {
        delete_todo_service(token.token, _id)
            .then((data) => {
                //console.log(data);
                if (data.message !== "Unauthorized") {
                    //console.log("success");
                    getTodos();
                    MySwal.fire({
                        position: "center",
                        icon: "success",
                        title: '<span class="text-color-1">Delete successfully</span>',
                        html: '<span class="text-color-2"></span>',
                        showConfirmButton: false,
                        timer: 1500,
                    });
                } else {
                    MySwal.fire({
                        position: "center",
                        icon: "error",
                        title: '<span class="text-color-3">Delete failed</span>',
                        html: '<span class="text-color-2">Delete failed</span><br/><span class="text-color-2">please try again</span>',
                        showConfirmButton: false,
                        timer: 1500,
                    });
                }
            })
            .catch((err) => {
                //console.log(err);
                MySwal.fire({
                    position: "center",
                    icon: "error",
                    title: '<span class="text-color-3">Delete failed</span>',
                    html: '<span class="text-color-2">Delete failed</span><br/><span class="text-color-2">please try again</span>',
                    showConfirmButton: false,
                    timer: 1500,
                });
            });
    };


    const [array1, setArray1] = useState([1, 2, 4, 5, 20, 27, 99, 100])
    const [array2] = useState([1, 4, 100, 99, 101])

    const calculation = () => {
        let newArray = [];
        array2.map((data2, index) => {
             if(array1.filter(data => data === data2 )[0] !== undefined){
                newArray[index] = array1.filter(data => data === data2)
             } 
             return newArray
        })
        //console.log(newArray);
        setArray1(newArray);
    }

    return (
        <>
            {/* <div className="bg-signin">
            </div> */}
            <div className="main_container ">
                <div className="main_card mt-5">
                    {/* <div className="center mt-3 text-1 mb-4">To Do List</div> */}
                    <CustomTooltip title="Create" arrow placement="top">
                        <div className="center mb-3"><IconButton size="small" onClick={handleClickOpen}><IoMdAddCircle color="#008e3a" fontSize="50px" /></IconButton></div>
                    </CustomTooltip>
                    {list && list.sort((a, b) => (a.updatedAt < b.updatedAt ? 1 : -1)).map((data, index) =>
                        <div className="card_container mb-3" key={index}>
                            <div className="card_body">
                                <div className="text-2">{data.title}</div>
                                <div className="text-3 mb-2">{data.description}</div>
                                <div>
                                    {/* <span>action</span> */}
                                    <Stack direction={"row"} spacing={3}>
                                        {/* <Button variant="outlined">Done</Button> */}
                                        <ModalEdit id={data._id} getTodos={getTodos} />
                                        <CustomTooltip2 title="Delete" arrow placement="bottom">
                                            <Button variant="outlined" color="error" onClick={() => handleConfirmDelete(data)}><BsTrashFill fontSize={"24px"} /></Button>
                                        </CustomTooltip2>
                                    </Stack>

                                </div>

                            </div>
                        </div>
                    )}
                </div>
            </div>

            <ModalCreate open={open} setOpen={setOpen} getTodos={getTodos} />

            <div className="text-1 center mb-2">Bonus</div>
            <div className="center">
                <div>
                    Array1 : {array1.map((data,index) => (<span key={"1"+index}>{data},</span>))}
                </div>
                <div className="mb-2">
                    Array2 : {array2.map((data,index) => (<span key={"2"+index}>{data},</span>))}
                </div>

                <Button variant="outlined" onClick={() => calculation()}>Culculate</Button>
            </div>
        </>
    );
}

export default Todo;
