import * as Yup from 'yup';
import { useState } from 'react';
import { Icon } from '@iconify/react';
import { useFormik, Form, FormikProvider } from 'formik';
import eyeFill from '@iconify/icons-eva/eye-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
import { useNavigate } from 'react-router-dom';
// material
import {
  Stack,
  TextField,
  IconButton,
  InputAdornment,
  Alert,
  Typography,
  Button
} from '@mui/material';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import axios from 'axios';
// prettier-ignore
// ----------------------------------------------------------------------

export default function RegisterForm() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [fail, setFail] = useState();

  const RegisterSchema = Yup.object().shape({
    fName: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('First name required'),
    lName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Last name required'),
    emailId: Yup.string().email('Email must be a valid email address').required('Email is required'),
    mobileNo: Yup.number().required('Phone number is required'),
    password: Yup.string().required('Password is required')
  });

  const formik = useFormik({
    initialValues: {
      fName: '',
      lName: '',
      emailId: '',
      mobileNo: '',
      password: '',
      privilage: ''
    },
    validationSchema: RegisterSchema,
    onSubmit: () => {
       postData();
    }
  });

  const postData =async()=>{
    console.log(formik.values)
    let data;
    await axios.post(`${process.env.REACT_APP_API_END_POINT}/dicom/register`,formik.values)
        .then((res)=>data=res.data);
    console.log(data.status);
    if(data.status === 200 ){
      navigate('/dashboard', { replace: true });
    }else{
      setFail(data.err_msg);
    }
  }

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
              fullWidth
              label="First name"
              {...getFieldProps('fName')}
              error={Boolean(touched.fName && errors.fName)}
              helperText={touched.fName && errors.fName}
            />

            <TextField
              fullWidth
              label="Last name"
              {...getFieldProps('lName')}
              error={Boolean(touched.lName && errors.lName)}
              helperText={touched.lName && errors.lName}
            />
          </Stack>

          <TextField
            fullWidth
            autoComplete="username"
            type="email"
            label="Email address"
            {...getFieldProps('emailId')}
            error={Boolean(touched.emailId && errors.emailId)}
            helperText={touched.emailId && errors.emailId}
          />

          <TextField
            fullWidth
            type="phone"
            label="Phone Number"
            {...getFieldProps('mobileNo')}
            error={Boolean(touched.mobileNo && errors.mobileNo)}
            helperText={touched.mobileNo && errors.mobileNo}
          />
          <FormControl>
            <InputLabel>Privillage</InputLabel>
            <Select
              fullWidth
              id="demo-simple-select"
              {...getFieldProps('privilage')}
              label="Privillage"
            >
              <MenuItem value="">None</MenuItem>
              <MenuItem value="participant">Participant</MenuItem>
              <MenuItem value="sub_host">Sub Host</MenuItem>
              <MenuItem value="host">Host</MenuItem>
              <MenuItem value="admin">Admin</MenuItem>
            </Select>
          </FormControl>
          <TextField
            fullWidth
            autoComplete="current-password"
            type={showPassword ? 'text' : 'password'}
            label="Password"
            {...getFieldProps('password')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton edge="end" onClick={() => setShowPassword((prev) => !prev)}>
                    <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                  </IconButton>
                </InputAdornment>
              )
            }}
            error={Boolean(touched.password && errors.password)}
            helperText={touched.password && errors.password}
          />

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
            Register
          </Button>
        </Stack>
      </Form>
    </FormikProvider>
  );
}
