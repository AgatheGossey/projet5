import React from 'react';
import { TextField, MenuItem } from '@material-ui/core';

// STYLE
import styles from './filter.module.css';

const FilterByCategory = (props) => {
  return (
    <div>
      { props.isFilterByCategory ?
        <TextField 
          className={ styles.textFieldCategory }
          select variant="outlined"
          label="Catégorie :"
          value={ props.selectedCategory }
          onChange={ e => props.handleSelectedCategoryChange(props.operations, e.target.value) }>
          {props.categories.map(category => <MenuItem key={ category.id } value={ category }>{ category.name_category }</MenuItem>)}              
        </TextField> :
        <p>Filtrer par catégorie</p>
      }
    </div>
  )
}

export default FilterByCategory;