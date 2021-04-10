import React, { useState, useEffect } from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Box from '@material-ui/core/Box';

const dropDown = ["tubingPressure", "injValveOpen", "waterTemp", "flareTemp", "casingPressure", "oilTemp"];



const DropDown = () => {
    const [dropDownValue, setDropDownValue] = useState([]);

    useEffect(() => console.log(dropDownValue), [dropDownValue]);

    const onDropDownSelect = (e) => {
        let checkedValue = e.target.value;
        if (dropDownValue.indexOf(checkedValue) >= 0){
            const updatedDropDownValue = dropDownValue.filter((item) => {
                return item !== checkedValue
            });
            setDropDownValue(updatedDropDownValue);
        } else {
            setDropDownValue([...dropDownValue, checkedValue]);
        }
    } 

    return (
    <Box paddingTop={2} >
    <FormControl component="fieldset">
      <FormLabel  component="legend">Select Metrics</FormLabel>
      <FormGroup  aria-label="position" row>
          {
              dropDown.map((item) => {
                return (
                    <div key = {item}>
                    <FormControlLabel
                        value={item}
                        control={<Checkbox color="primary" />}
                        label={item}
                        labelPlacement="start"
                        onChange = { (e) => {onDropDownSelect(e)}}
                    />
                    </div>
                )
              })
          }
        </FormGroup>
    </FormControl>
    </Box>
    );
};

export default DropDown;