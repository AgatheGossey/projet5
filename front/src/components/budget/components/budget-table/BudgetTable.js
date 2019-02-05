import React from 'react';
import MaterialTable from 'material-table';
import moment from 'moment';

// CONSTANTS
import { BUDGET_TABLE_COLUMNS } from 'constants.js';

const BudgetTable = (props) => {
  const prepareData = () => {
    return props.operations.map(operation => {
      const { id, date_budget, name, mode, name_category, reason, type, amount } = operation;
      return { 
        id,
        date_budget: moment(date_budget).format('DD/MM/YYYY'), 
        nom: name,
        mode,
        category: name_category || '',
        motif: reason,
        recette: type === "Recette" ? amount : "",
        depense: type === "Depense" ? amount : "", 
      };
    })
  }

  return (
    <MaterialTable
      columns={ BUDGET_TABLE_COLUMNS }
      data={ prepareData() }
      title={ `Solde disponible : ${props.balance}€` }
      actions={[
        {
          icon: 'delete',
          tooltip: 'Supprimer',
          onClick: (event, rows) => {
            console.log(rows);
            props.deleteOperations(rows);
          },
        },
      ]}
      options={ { selection: true } }
    />
  )
}

export default BudgetTable;