import * as Yup from 'yup';
import React, { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useFormik, Form, FormikProvider } from 'formik';
import { Icon } from '@iconify/react';
import eyeFill from '@iconify/icons-eva/eye-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
// material
import {
  Stack,
  TextField,
  IconButton,
  InputAdornment,
  Alert,
  Button,
  Typography
} from '@mui/material';
import axios from 'axios';
// prettier-ignore
// ----------------------------------------------------------------------

export default function PasswordForm() {
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState(false);
  const [fail, setFail] = useState();

  const LoginSchema = Yup.object().shape({
    newPassword: Yup.string().required('Password is required'),
    confirmPassword : Yup.string().required('Password is required').oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
  });

  const formik = useFormik({
    initialValues: {
      newPassword: '',
      confirmPassword: ''
    },
    validationSchema: LoginSchema,
    onSubmit: () => {
      postData();
    }
  });

  const postData =async()=>{
    console.log(formik.values)
    let data;
    let password;
    if(formik.values){
      password = formik.values.confirmPassword
    }
    await axios.post(`${process.env.REACT_APP_API_END_POINT}/dicom/changePassword`,{'emailId':localStorage.getItem("forgot email"),'password':password})
        .then((res)=>data=res.data);
    console.log(data.status);
    if(data.status === 200 ){
      navigate('/dashboard', { replace: true });
    }else{
      setFail(data.err_msg);
    }
  }

  const { errors, touched, values, isSubmitting,handleSubmit, getFieldProps } = formik;
  const handleNewPassword = () => {
    setNewPassword((show) => !show);
  };
  const handleConfirmPassword = () => {
    setConfirmPassword((show) => !show);
  };

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <TextField
            fullWidth
            autoComplete="current-password"
            type={newPassword ? 'text' : 'password'}
            label="New Password"
            {...getFieldProps('newPassword')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleNewPassword} edge="end">
                    <Icon icon={newPassword ? eyeFill : eyeOffFill} />
                  </IconButton>
                </InputAdornment>
              )
            }}
            error={Boolean(touched.newPassword && errors.newPassword)}
            helperText={touched.newPassword && errors.newPassword}
          />

          <TextField
            fullWidth
            autoComplete="new-password"
            type={confirmPassword ? 'text' : 'password'}
            label="Confirm Password"
            {...getFieldProps('confirmPassword')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleConfirmPassword} edge="end">
                    <Icon icon={confirmPassword ? eyeFill : eyeOffFill} />
                  </IconButton>
                </InputAdornment>
              )
            }}
            error={Boolean(touched.confirmPassword && errors.confirmPassword)}
            helperText={touched.confirmPassword && errors.confirmPassword}
          />
        </Stack><br />

        {fail && <Alert icon={false} severity="error">
              <Typography variant="caption"> {fail}</Typography>
            </Alert>}

        <Button
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting}
        >
          Change Password
        </Button>
      </Form>
    </FormikProvider>
  );
}
