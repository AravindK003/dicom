import React from 'react';
import {Select, Box, MenuItem, InputLabel, FormControl} from '@material-ui/core';
import {Field} from 'formik';
import PropTypes from "prop-types";

const SelectInput = ({name, label, options, optionValue, optionText,disabled, handleChange}) => {
    // const labelRef= useRef()
    // const labelWidth = labelRef.current ? labelRef.current.clientWidth : 0
    return (  
  
        <Box p={2}>
          <Field name= {name} >     
                    {({
                          field, 
                          form,
                          meta  
                        }) => (
                         <React.Fragment>
                         <FormControl variant="outlined" fullWidth size="small"> 
                         <InputLabel shrink={field.value?true:false}>{label}</InputLabel>
                         {handleChange ? (
                            <Select 
                            key={label}     
                            name= {field.name}     
                            label={label}    
                            disabled={disabled?disabled:false}
                            value={field.value||''}   
                            onChange={(e) => handleChange(e, form.setFieldValue)}  
                            variant="outlined"                            
                            style={form.dirty && meta.touched?{backgroundColor:'#FDFBC5'}:undefined}
                            type='text'  
                            error={meta.error && meta.touched?true:false} 
                            >    
                                <MenuItem value="">None</MenuItem>                           
                                {
                                    options.map((option) =>(
                                                        <MenuItem key={option[optionValue]} 
                                                                    value={option[optionValue]} >
                                                                        {option[optionText]}
                                                        </MenuItem>
                                ))}
                            </Select>):(
                            <Select 
                            key={label}     
                            name= {field.name}     
                            label={label}    
                            disabled={disabled?disabled:false}
                            value={field.value||''} 
                            onChange={field.onChange}    
                            variant="outlined"  
                            style={form.dirty && meta.touched?{backgroundColor:'#FDFBC5'}:undefined}
                            type='text'  
                            error={meta.error && meta.touched?true:false} 
                            >    
                                <MenuItem value="">None</MenuItem>                           
                                {
                                    options.map((option) =>(
                                                        <MenuItem key={option[optionValue]} 
                                                                    value={option[optionValue]} >
                                                                        {option[optionText]}
                                                        </MenuItem>
                                ))}
                            </Select>
                            )
                        }
                        </FormControl>
                        </React.Fragment>
                    )}
            </Field>
            </Box>
    )
}
 
SelectInput.propTypes = {
    name: PropTypes.string,
    label:PropTypes.string,
    options: PropTypes.string,
    optionText:PropTypes.string,
    value:PropTypes.string,
    optionValue:PropTypes.string,
    disabled:PropTypes.string,
    handleChange:PropTypes.function,
    labelWidth:PropTypes.string
  };

export default SelectInput;