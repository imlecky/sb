import React from 'react';
import AnimateHeight from 'react-animate-height';
import PropTypes from 'prop-types';
import MenuList from '../MenuList';
import Checkbox from '../../../Checkbox/Checkbox';
import styles from './MenuItem.module.scss';

class MenuItem extends React.Component {
    constructor(props) {
        super(props);
        this.animationDuration = 500; // Duration of slideDown/slideUp animation
        this.state = {
            isNodesLoaded: false,
        }
    }

    handleListItemClick = (e) => {
        e.stopPropagation();
        if(!this.state.isNodesLoaded) {
            this.setState({
                isNodesLoaded: true,
            });
        }
        this.props.openCategoryFn(this.props.categoryId);
    }

    handleCheckboxItemClick = (e) => e.stopPropagation();

    handleCheckboxChange = (e) => console.log('isChecked ' + e.target.checked + ', sport id: ' + e.target.value);

    render() {
        const {categoryId, categoryName, eventsCount, level, nodes, isOpen} = this.props;
        return (
            <>
                {nodes ? (
                    <li onClick={this.handleListItemClick} className={`${styles.item__wrapper} ${styles['level_' + level]} ${isOpen ? styles.item__active : ''}`}>
                        <div className={styles.item__name_wrapper}>
                            <span className={styles.item__name}>
                                <i className={`${styles.item__icon} icon-${categoryName.toLowerCase()}`} /> 
                                {categoryName}
                            </span>
                            <span className={styles.item__event_count}>
                                {eventsCount}
                            </span>
                        </div>
                        <AnimateHeight duration={this.animationDuration} height={isOpen ? 'auto' : 0}>
                            {nodes && this.state.isNodesLoaded &&
                                <MenuList items={nodes}/>
                            }
                        </AnimateHeight>
                    </li>
                ) : (
                    <li onClick={this.handleCheckboxItemClick} className={styles.item__checkbox}>
                        <Checkbox label={categoryName} name="sport" value={categoryId} checkFn={this.handleCheckboxChange} />
                    </li>
                )}
            </>
        )
    }
};

MenuItem.propTypes = {
    openCategoryFn: PropTypes.func,
    isOpen: PropTypes.bool,
    categoryId: PropTypes.number.isRequired,
    categoryName: PropTypes.string.isRequired,
    eventsCount: PropTypes.number,
    level: PropTypes.number,
    nodes: PropTypes.array,
};

export default MenuItem;