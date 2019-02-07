import React, { Fragment } from 'react';
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
              value={ props.selectedDateStart }
              onChange={ e => props.handleChangeDate(props.operations, e.target.value) }
            />   
            <p className={styles.dateIntervalText} >Au</p>
            <TextField 
              variant='outlined'
              type='date'
              value={ props.selectedDateEnd }
              onChange={ e => props.handleChangeDate(props.operations, e.target.value) }
            />  
          </div>
        </Fragment> :
        <p>Filtrer par date</p>
      }
    </div>
  )
}

export default FilterByDate;