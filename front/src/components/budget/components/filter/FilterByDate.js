import React, { Fragment } from 'react';
import moment from 'moment';
import TextField from '@material-ui/core/TextField';

// STYLE
import styles from './filter.module.css';

const FilterByDate = (props) => {
  return (
    <div className={ styles.filterContainer }> 
      { props.isFilterByDate ?
        <Fragment>    
          <p>Voir tout le tableau</p>
          <div className={ styles.filterByDate }>          
            <p className={ styles.dateIntervalText }>Du</p>
            <TextField  
              variant='outlined'
              type='date' 
              value={ props.selectedDateStart.format('YYYY-MM-DD') }
              onChange={ e => props.handleChangeDate(props.operations, moment(e.target.value).utc(), props.selectedDateEnd) }
            />   
            <p className={styles.dateIntervalText} >Au</p>
            <TextField 
              variant='outlined'
              type='date'
              value={ props.selectedDateEnd.format('YYYY-MM-DD') }
              onChange={ e => props.handleChangeDate(props.operations, props.selectedDateStart , moment(e.target.value).utc()) }
            />  
          </div>
        </Fragment> :
        <p>Filtrer par date</p>
      }
    </div>
  )
}

export default FilterByDate;