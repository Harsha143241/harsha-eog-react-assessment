import React, { useState, useEffect } from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Box from '@material-ui/core/Box';
import { useQuery, gql} from '@apollo/client';
import { GET_METRICS } from '../../components/GraphQL/Queries';

const DropDown = () => {
    const { error, loading, data } = useQuery(GET_METRICS)

    const [metrics, SetMetrics] = useState([])
    const [selectedMetric, setSelectedMetric] = useState([]);

    useEffect(() => console.log(selectedMetric), [selectedMetric]);
    useEffect(() => { 
        if (data){
            SetMetrics(data.getMetrics);
        }
    }, [data]);

    const onDropDownSelect = (e) => {
        let checkedValue = e.target.value;
        if (selectedMetric.indexOf(checkedValue) >= 0){
            const updatedSelectedMetric = selectedMetric.filter((item) => {
                return item !== checkedValue
            });
            setSelectedMetric(updatedSelectedMetric);
        } else {
            setSelectedMetric([...selectedMetric, checkedValue]);
        }
    } 

    return (
    <Box paddingTop={2} >
    <FormControl component="fieldset">
      <FormLabel  component="legend">Select Metrics</FormLabel>
      <FormGroup  aria-label="position" row>
          {
                !loading && metrics.map((item) => {
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