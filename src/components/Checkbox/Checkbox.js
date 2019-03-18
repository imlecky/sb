import React from 'react';
import PropTypes from 'prop-types';
import styles from './Checkbox.module.scss';

const Checkbox = (props) => {
    const {label, name, value, checkFn} = props;
    return(
        <label className={styles.checkbox}>
            <input type="checkbox" name={name} value={value} className={styles.checkbox__input} onChange={checkFn} />
            <span className={styles.checkbox__checkmark}></span>
            {label}
        </label>
    )
};

Checkbox.propTypes = {
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]).isRequired,
    checkFn: PropTypes.func,
};

export default Checkbox;