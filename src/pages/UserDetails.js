import * as Yup from 'yup';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik, Form, FormikProvider } from 'formik';
// material
import { Stack, TextField, Alert, Button, Typography, Grid } from '@mui/material';
import axios from 'axios';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
// prettier-ignore
// ----------------------------------------------------------------------

export default function UserDetails() {
  const navigate = useNavigate();
  const [fail, setFail] = useState();

  const LoginSchema = Yup.object().shape({
    fname: Yup.string().required(),
    newPassword: Yup.string().required('Password is required'),
    confirmPassword : Yup.string().required('Password is required').oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
  });

  const formik = useFormik({
    initialValues: {
        fname: '',
        lname: '',
        email: '',
        phone: '',
        gender: '',
        dob: '',
    },
    // validationSchema: LoginSchema,
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

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
        <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={6}>
        <TextField
            fullWidth
            autoComplete="name"
            type="name"
            label="First Name"
            {...getFieldProps('fname')}
            error={Boolean(touched.fname && errors.fname)}
            helperText={touched.fname && errors.fname}
          />
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
          <TextField
            fullWidth
            autoComplete="name"
            type="name"
            label="Last Name"
            {...getFieldProps('lname')}
            error={Boolean(touched.lname && errors.lname)}
            helperText={touched.lname && errors.lname}
          />
          </Grid>
          </Grid>
          <TextField
            fullWidth
            autoComplete="username"
            type="email"
            label="Email Address"
            {...getFieldProps('email')}
            error={Boolean(touched.email && errors.email)}
            helperText={touched.email && errors.email}
          />
          <TextField
            fullWidth
            type="phone"
            label="Phone Number"
            {...getFieldProps('phone')}
            error={Boolean(touched.phone && errors.phone)}
            helperText={touched.phone && errors.phone}
          />
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DesktopDatePicker
            autoOk
            label="Date of Birth"
            inputFormat="dd/MM/yyyy"
            name ="dob"
            value="dob"
            {...getFieldProps('dob')}
            onChange={(value) => console.log(value) }
            renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
          
          <FormControl component="fieldset">
            <FormLabel component="legend">Gender</FormLabel>
            <RadioGroup row aria-label="gender" name="gender" {...getFieldProps('gender')}>
                <FormControlLabel value="female" control={<Radio />} label="Female" />
                <FormControlLabel value="male" control={<Radio />} label="Male" />
                <FormControlLabel value="other" control={<Radio />} label="Other" />
            </RadioGroup>
          </FormControl>
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
          Update
        </Button>
      </Form>
    </FormikProvider>
  );
}
