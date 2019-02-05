import React from 'react';

// COMPONENTS
import UsersWaiting from './components/UsersWaiting';
import Users from './components/Users';

// STYLE 
import styles from './admin.module.css';

const Admin = (props) => {
  return (
    <div className={styles.container}>
      Inscriptions en attente : 
      <UsersWaiting usersWaiting={props.usersWaiting} checkUser={props.checkUser} deleteUser={props.deleteUser}/>
      Utilisateurs : 
      <Users users={props.users} />
    </div>       
  )
}

export default Admin;