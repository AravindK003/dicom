import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useFormik, Form, FormikProvider } from 'formik';
// material
import { Stack, TextField, Button, Alert, Typography } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';
// prettier-ignore
// ----------------------------------------------------------------------
export default function ForgotPasswordForm() {
  const navigate = useNavigate();
  const [fail, setFail] = useState();

  const LoginSchema = Yup.object().shape({
    emailId: Yup.string().required('Email or Phone is required'),
  });

  const formik = useFormik({
    initialValues: {
      emailId: '',
    },
    validationSchema: LoginSchema,
    onSubmit: () => {
      postData();
    }
  });

  const postData =async()=>{
    console.log(formik.values)
    let data;
    await axios.post(`${process.env.REACT_APP_API_END_POINT}/dicom/userValidation`,formik.values)
        .then((res)=>data=res.data);
    console.log("data",data.status);
    localStorage.setItem("forgot email",formik.values.emailId);
    if(data.status === 200 ){
      navigate('/confirm-password', { replace: true });
    }else{
      setFail(data.err_msg);
    }
  }


  const { errors, touched, isSubmitting,handleSubmit, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <TextField
            fullWidth
            autoComplete="username"
            type="email"
            label="Email Address"
            {...getFieldProps('emailId')}
            error={Boolean(touched.emailId && errors.emailId)}
            helperText={touched.emailId && errors.emailId}
          />
        </Stack>
        <br />

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
          Reset
        </Button>
      </Form>
    </FormikProvider>
  );
}
