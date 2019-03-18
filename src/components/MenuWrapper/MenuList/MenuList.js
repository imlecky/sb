import React from 'react';
import PropTypes from 'prop-types';
import MenuItem from './MenuItem/MenuItem';
import styles from './MenuList.module.scss';

class MenuList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeCategoryId: null,
        }
    }

    openCategory = id => {
        this.setState(prevState => ({
            activeCategoryId: prevState.activeCategoryId === id ? null : id,
        }));
    }

    render() {
        const items = [...this.props.items];
        return(
            <ul className={styles.list__wrapper}>
                {items
                    .sort((a,b) => a.sortOrder - b.sortOrder)
                    .map((item) => (
                        <MenuItem 
                            key={item.categoryId}
                            isOpen={this.state.activeCategoryId === item.categoryId}
                            openCategoryFn={this.openCategory}
                            {...item}
                        />
                    ))
                }
            </ul>
        )
    }
}

MenuList.propTypes = {
    items: PropTypes.array.isRequired,
};

export default MenuList;