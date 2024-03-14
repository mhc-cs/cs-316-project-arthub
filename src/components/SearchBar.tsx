import React from 'react';
import styles from '../styles/SearchBar.module.css';

import '@fortawesome/fontawesome-free/css/all.min.css';

const SearchBar = () => {
  return (
    <div className={styles.searchContainer}>
      <div className={styles.inputContainer}>
        <i className={`fas fa-search ${styles.icon}`}></i>
        <input type="text" className={styles.searchInput} placeholder="Search for artists..." />
    </div>
    </div>
  );
};

export default SearchBar;
