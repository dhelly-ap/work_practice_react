import React from 'react';
import ReactDOM from 'react-dom';
import ProductList from './ProductList.js'
import './Form.css';

export default class Form extends React.Component {
    render() {
        const { title, deposit_info } = this.props;

        return(
            <div className={'wrap-all'}>
                {deposit_info.map(item =>
                <ProductList key={item.id}
                    title={item.title}
                    description={item.description}
                    img={item.img}
                    rate={item.rate}
                    removing={item.removing}
                    adding={item.adding}
                />)}
            </div>
        )
    }
}