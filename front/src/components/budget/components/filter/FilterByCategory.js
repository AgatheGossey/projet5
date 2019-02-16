import React, { Fragment } from 'react';
import { Typography, MenuItem, FormControl, InputLabel, Select, OutlinedInput } from '@material-ui/core';

// STYLE
import styles from './filter.module.css';

const FilterByCategory = (props) => {
  return (
    <Fragment>
    {/* if the "isFilterByCategory" button is equal to "true", the option to select a category is displayed */}
      { props.isFilterByCategory ?
        <FormControl variant="outlined">
          <InputLabel htmlFor="category"> Categorie : </InputLabel>
            <Select
              className={ styles.textFieldCategory }
              input={
                <OutlinedInput
                  name="category"
                  id="category"
                  labelWidth={0}
                />
              }
              value={ props.selectedCategory }
              onChange={ e => props.handleSelectedCategoryChange(props.operations, e.target.value) }>
            >
              { props.categories.map(category => <MenuItem key={ category.id } value={ category }>{ category.name_category }</MenuItem>) }
            </Select>
          </FormControl> :
          <Typography>Filtrer par catégorie</Typography>
      }
    </Fragment>
  )
}

export default FilterByCategory;