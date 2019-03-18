import React from 'react';
import MenuList from './MenuList/MenuList';
import { getNestedChildren, groupByTreatAsSport } from '../../helpers/helpers';
import styles from './MenuWrapper.module.scss';

class MenuWrapper extends React.Component {
    state = {
        items: [],
    }

    componentDidMount() {
        fetch('http://demo.sb-betting.com/rest/market/categories')
            .then(response => {
                if(!response.ok)
                    throw Error(response.statusText)
                return response.json();
            })
            .then(json => json.data)
            .then(json => groupByTreatAsSport(-100, 'ESport', 99999, json))
            .then(json => getNestedChildren(json, 0))
            .then(json => {
                this.setState({
                        items: [...json],
                });
            })
            .catch(reason => console.log(reason));
    }

    render() {
        return(
            <div className={styles.menu__wrapper}>
                <MenuList items={this.state.items}/>
            </div>
        )
    }
}

export default MenuWrapper;