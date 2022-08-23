import React, { useState, useRef } from "react";
import PropTypes from "prop-types";
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { formTodo } from "../../validate/formTodo";
import { useForm } from "react-hook-form"
import FormHelperText from '@mui/material/FormHelperText';
import { yupResolver } from "@hookform/resolvers/yup"
import { Button } from "@mui/material";
import { get_todo_service, update_todo_service } from "../../service/todo.service";
import { AiTwotoneEdit } from 'react-icons/ai'
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';

const MySwal = withReactContent(Swal);


const CustomTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
      color: "#FF7900",
  },
  [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: "#FF7900",
  },
}));

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  zIndex: "0",
  "& .MuiDialog-paper": {
    backgroundColor: "#F5F4F8",
    borderRadius: "8px",
  },
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
    borderTop: "0px !important",
    borderBottom: "0px !important",
    marginLeft: "1rem",
    marginRight: "1rem",
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(2),
    marginLeft: "1rem",
    marginRight: "1rem",
    marginBottom: "1rem",
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};


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

const ModalEdit = (props) => {

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    getTodo();
    setOpen(true);
};
  const handleClose = () => {
    setOpen(false);
  };

  const { register, handleSubmit, formState: { errors }, reset, setValue, trigger } = useForm({
    mode: "all",
    resolver: yupResolver(formTodo()),
    shouldUnregister: false,
    shouldFocusError: true
  });
  const [title, setTitle] = useState("");
  const [description, setdescription] = useState("");
  const form = useRef();
  const handleChangeTitle = (event) => {
    setTitle(event.target.value);
    setValue("title", event.target.value);
    trigger('title')
  };

  const handleChangeDescription = (event) => {
    setdescription(event.target.value);
    setValue("description", event.target.value);
    trigger('description')
  };

  // const [datalist, setDataList] = useState();

    async function getTodo() {
        let todolist;
        await get_todo_service(token.token,props.id).then((data) => {
            //console.log(data);
            todolist = data;
        })
        // setDataList(todolist)
        setTitle(todolist.title)
        setdescription(todolist.description)
    }

  const onSubmit = (data) => {
    reset();
    //console.log(data);
    //console.log(token.token);
    put_update(data);
    // Navigate("/todo")
  }
  const token = JSON.parse(localStorage.getItem("login"));
  const put_update = (_data) => {
    const body = { title: _data.title, description: _data.description };
    update_todo_service(token.token, body,props.id)
      .then(data => {
        //console.log(data);
        if (data.message !== "Unauthorized") {
          //console.log("success");
          handleClose();
          props.getTodos();
          MySwal.fire({
            position: 'center',
            icon: 'success',
            title: `<span class="text-color-1">Update successfully</span>`,
            showConfirmButton: false,
            timer: 1500
          })
        } else {
          //console.log("failed");
          MySwal.fire({
            position: 'center',
            icon: 'error',
            title: `<span class="text-color-3">Update failed</span>`,
            html: `<span class="text-color-2">please try again</span>`,
            showConfirmButton: false,
            timer: 1500
          })
        }

      }).catch(err => {
        //console.log(err)
        MySwal.fire({
          position: 'center',
          icon: 'error',
          title: `<span class="text-color-3">Update failed</span>`,
          html: `<span class="text-color-2">please try again</span>`,
          showConfirmButton: false,
          timer: 1500
        })
      });
  }


  return (
    <>
 <CustomTooltip title="Edit" arrow placement="bottom">
      <Button variant="outlined" color="warning" onClick={()=>handleClickOpen()}><AiTwotoneEdit fontSize={"24px"}/></Button>
      </CustomTooltip>

      <BootstrapDialog
        maxWidth="xs"
        fullWidth={true}
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          <div className="text-1">Edit To Do </div>
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <form ref={form} onSubmit={handleSubmit(onSubmit)} onDragEnter={handleSubmit(onSubmit)}>
            <CssTextField
              id="title"
              name='title'
              {...(register ?? "")('title' ?? "", { required: true })}
              label={"Title"}
              value={title}
              onChange={handleChangeTitle}
              fullWidth
              variant="standard"
            />
            {errors.title &&
              <HelperText id="title">{errors.title.message ?? ""}</HelperText>
            }

            <CssTextField
              id="description"
              name='description'
              {...(register ?? "")('description' ?? "", { required: true })}
              label={"Description"}
              value={description}
              onChange={handleChangeDescription}
              fullWidth
              variant="standard"
            />
            {errors.description &&
              <HelperText id="description">{errors.description.message ?? ""}</HelperText>
            }
          </form>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleSubmit(onSubmit)}>Edit</Button>
        </DialogActions>
      </BootstrapDialog>
    </>
  );
};

export default ModalEdit;
