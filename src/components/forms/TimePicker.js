import React from 'react';
import { DateTimePicker , MuiPickersUtilsProvider } from "@material-ui/pickers";
import {Field } from 'formik';
import { Box } from '@material-ui/core';
import PropTypes from "prop-types";
import DateFnsUtils from '@date-io/date-fns';
// import MomentUtils from '@date-io/moment';


const TimePickerInput = (props) => {
    return (
        <React.Fragment>
            <Box p={2}>
          
            <Field name= {props.name} >
            {({
                          field,
                          form,
                          meta
                      }) => (
                         <React.Fragment>
                          <MuiPickersUtilsProvider utils={DateFnsUtils}>
                         <DateTimePicker
                            inputVariant="outlined"
                            clearable
                            autoOk
                            ampm={false}
                            disabled={props.disabled?props.disabled:false}
                            label={props.label}
                            value={field.value||null}
                            error={meta.error?true:false}
                            format="yyyy-MM-dd HH:mm:ss"
                            onChange={(date)=>form.setFieldValue(props.name,date)} fullWidth={true} size="small"
                        />   </MuiPickersUtilsProvider>
                         </React.Fragment>
                    )}
            </Field>                       

            </Box>
        </React.Fragment>
    )
}

TimePickerInput.propTypes = {
    name: PropTypes.string,
    label:PropTypes.string,
    disabled: PropTypes.string,
  };
  

export default TimePickerInput;