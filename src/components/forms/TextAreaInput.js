import React from 'react'
import { Field } from 'formik'
import {Box, TextField} from '@material-ui/core';
import PropTypes from "prop-types";


const TextAreaInput = ({name, label, placeHolder, disabled}) =>{
    return (
        <React.Fragment>

           <Box p={2}>

                    <Field name={name}>
 
                    {({field,meta,form})=>(
                        <div>
                        <TextField {...field} name={name} variant="outlined"   multiline label={label}
                        value={field.value||''}
                        disabled={disabled?disabled:false}
                        error={meta.error && meta.touched?true:false}
                        style={form.dirty && meta.touched?{backgroundColor:'#FDFBC5'}:null}
                        placeholder={placeHolder}  rows={6} fullWidth={true} size='small'/>     
                        </div> 
                     
                    )}
                    
                    </Field>      

               
           </Box>
           </React.Fragment>
    )
}

TextAreaInput.propTypes = {
    name: PropTypes.string,
    label:PropTypes.string,
    placeHolder: PropTypes.string,
    disabled:PropTypes.string
  };
export default TextAreaInput