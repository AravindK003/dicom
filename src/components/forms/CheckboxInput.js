import React from "react";
import { Field } from "formik";
import { Checkbox, Box } from "@material-ui/core";
import PropTypes from "prop-types";

const CheckboxInput = (props) => {
  return (
    <React.Fragment>
      <Box p={2}>
        <Field name={props.name}>
          {({
            field, 
            form, 
          }) => {
            let value = !!(field.value || props.value);

            return (
              <React.Fragment>
                <Checkbox
                  name={props.name}
                  {...field}
                  checked={value}
                  disabled={props.disabled?props.disabled:false}
                  onChange={(event) => {
                    if (props.valueType === "boolean") {
                      let fieldValue = event.target.checked ? true : false;
                      form.setFieldValue(props.name, fieldValue);
                    } else {
                      let fieldValue = event.target.checked ? 1 : 0;
                      form.setFieldValue(props.name, fieldValue);
                    }
                  }}  
                /> 
                <label>{props.label}</label>
              </React.Fragment>
            );
          }}
        </Field>
      </Box>
    </React.Fragment>
  );
};

CheckboxInput.propTypes = {
    name: PropTypes.string,
    label:PropTypes.string,
    disabled:PropTypes.string,
    value:PropTypes.string,
    valueType:PropTypes.string
  };

export default CheckboxInput;
