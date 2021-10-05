import * as Yup from 'yup';
import { useEffect, useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useFormik, Form, FormikProvider } from 'formik';
import { Icon } from '@iconify/react';
import eyeFill from '@iconify/icons-eva/eye-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
// material
import {
  Link,
  Stack,
  Checkbox,
  TextField,
  IconButton,
  InputAdornment,
  FormControlLabel,
  Alert,
  Button,
  Typography
} from '@mui/material';
import axios from 'axios';

// prettier-ignore
// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [token, setToken] = useState();
  const [fail, setFail] = useState();

  const LoginSchema = Yup.object().shape({
    emailIdOrMobileNo: Yup.string().required('Email or Phone is required'),
    password: Yup.string().required('Password is required')
  });

  const formik = useFormik({
    initialValues: {
      emailIdOrMobileNo: '',
      password: '',
    },
    validationSchema: LoginSchema,
    onSubmit: () => {
       postData();
    }
  });

  const postData =async()=>{
    console.log(formik.values)
    let data;
    await axios.post(`${process.env.REACT_APP_API_END_POINT}/dicom/login`,formik.values)
        .then((res)=>data=res.data);
    console.log(data);
    if(data.response){
    window.localStorage.setItem("token",data.response.jwtToken);
    window.localStorage.setItem("fname",data.response.fName)
    window.localStorage.setItem("lname",data.response.lName)
    window.localStorage.setItem("emailId",data.response.emailId)
    }
    if(data.status === 200 ){
      navigate('/dashboard1', { replace: true });
    }else{
      setFail(data.err_msg);
    }
  }

  const { errors, touched, values, isSubmitting,handleSubmit, getFieldProps } = formik;
  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <TextField
            fullWidth
            autoComplete="username"
            type="email"
            label="Email or Phone"
            {...getFieldProps('emailIdOrMobileNo')}
            error={Boolean(touched.emailIdOrMobileNo && errors.emailIdOrMobileNo)}
            helperText={touched.emailIdOrMobileNo && errors.emailIdOrMobileNo}
          />

          <TextField
            fullWidth
            autoComplete="current-password"
            type={showPassword ? 'text' : 'password'}
            label="Password"
            {...getFieldProps('password')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleShowPassword} edge="end">
                    <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                  </IconButton>
                </InputAdornment>
              )
            }}
            error={Boolean(touched.password && errors.password)}
            helperText={touched.password && errors.password}
          />
        </Stack>
            <br />
           {fail && <Alert icon={false} severity="error">
              <Typography variant="caption"> {fail}</Typography>
            </Alert>}

        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
          <FormControlLabel
            control={<Checkbox checked={values.remember} />}
            label="Remember me"
          />

          <Link component={RouterLink} variant="subtitle2" to="/forgot-password">
            Forgot password?
          </Link>
        </Stack>

        <Button
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting}
        >
          Login
        </Button>
      </Form>
    </FormikProvider>
  );
}
