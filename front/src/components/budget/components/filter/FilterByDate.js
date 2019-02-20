import React, { Fragment } from 'react';
import moment from 'moment';
import { TextField, Typography } from '@material-ui/core';

// STYLE
import styles from './filter.module.css';

const FilterByDate = (props) => {
  return (
    <div> 
      {/* if the "isFilterByDate" button is equal to "true", we display two calendar fields */}
      { props.isFilterByDate ?
        <Fragment>    
          <div className={ styles.filterByDate }>          
            <Typography className={ styles.dateIntervalText }>Du</Typography>
            <TextField  
              variant='outlined'
              type='date' 
              value={ props.selectedDateStart.format('YYYY-MM-DD') }
              onChange={ e =>  props.handleChangeDate(props.operations, moment(e.target.value).add(moment().utcOffset(), 'm').startOf('day'), props.selectedDateEnd) }
            />   
            <Typography className={styles.dateIntervalText} >Au</Typography>
            <TextField 
              variant='outlined'
              type='date'
              value={ props.selectedDateEnd.format('YYYY-MM-DD') }
              onChange={ e => props.handleChangeDate(props.operations, props.selectedDateStart , moment(e.target.value).add(moment().utcOffset(), 'm').endOf('day')) }
            />  
          </div>
        </Fragment> :
        <Typography>Filtrer par date</Typography>
      }
    </div>
  )
}

export default FilterByDate;

// 