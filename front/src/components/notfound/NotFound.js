import React from 'react';

// STYLE
import styles from './not-found.module.css';

const NotFound = () => {
  return (
    <h2 
      align="center"
      className={ styles.notFound }

    >
      L'URL demandé n'a pas été trouvé !
    </h2>
  )
}

export default NotFound;