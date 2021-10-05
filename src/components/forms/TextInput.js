// import React from "react";
import React from 'react';
import PropTypes from 'prop-types';
import { TextField, Box } from '@material-ui/core';
import { Field } from 'formik';

// prettier-ignore
export default function TextInput(props){
    return(
        <div>
            <Box p={2}>  
            <Field name={props.name}>
            {({
                          field,form,meta
                      }) => (
                          <div>
                           {props.type ? <TextField  name={props.name} {...field} type={props.type} style={form.dirty && meta.touched?{backgroundColor:'#FDFBC5'}:null}
                            label={props.label} variant="outlined" value={field.value||''} fullWidth size="small" />:
                            <TextField  name={props.name} {...field}
                            label={props.label} variant="outlined" value={field.value||''} style={form.dirty && meta.touched?{backgroundColor:'#FDFBC5'}:null}
                            fullWidth size="small" />}
                        </div>
                      )}
            </Field></Box>
        </div>
    )
  }

TextInput.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  type: PropTypes.string
};
