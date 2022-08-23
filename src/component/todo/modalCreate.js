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
import { create_todo_service } from "../../service/todo.service";

const MySwal = withReactContent(Swal);


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

const ModalCreate = (props) => {

  const handleClose = () => {
    props.setOpen(false);
    setTitle("");
    setValue("title", "");
    setdescription("");
    setValue("description", "");
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

  const onSubmit = (data) => {
    reset();
    //console.log(data);
    //console.log(token.token);
    post_create(data);
    // Navigate("/todo")
  }
  const token = JSON.parse(localStorage.getItem("login"));
  const post_create = (_data) => {
    const body = { title: _data.title, description: _data.description };
    create_todo_service(token.token, body)
      .then(data => {
        //console.log(data);
        if (data.message !== "Unauthorized") {
          //console.log("success");
          handleClose();
          props.getTodos();
          MySwal.fire({
            position: 'center',
            icon: 'success',
            title: `<span class="text-color-1">Create successfully</span>`,
            showConfirmButton: false,
            timer: 1500
          })
        } else {
          //console.log("failed");
          MySwal.fire({
            position: 'center',
            icon: 'error',
            title: `<span class="text-color-3">Create failed</span>`,
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
          title: `<span class="text-color-3">Create failed</span>`,
          html: `<span class="text-color-2">please try again</span>`,
          showConfirmButton: false,
          timer: 1500
        })
      });
  }


  return (
    <>

      <BootstrapDialog
        maxWidth="xs"
        fullWidth={true}
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={props.open}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          <div className="text-1">Create To Do</div>
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
          <Button variant="outlined" onClick={handleSubmit(onSubmit)}>Add</Button>
        </DialogActions>
      </BootstrapDialog>
    </>
  );
};

export default ModalCreate;
