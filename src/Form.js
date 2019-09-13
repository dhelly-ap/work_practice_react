import React from 'react';
import ReactDOM from 'react-dom';
import Deposit from './Deposit.js';
import TopForm from './Topform';
import './Form.css';

export default class Form extends React.Component {
    render() {
        const { title, deposit_info } = this.props;
        let check = false;
        let check1 = true;

        return(
            <div className={'form-wrap-all'}>
                <div className={'wrap-with-border'}>
                    <div className={'form-wrap-head'}>
                        <h1 className={'form-title'}>{title}</h1>
                        <TopForm/>
                    </div>
                </div>
                {
                    deposit_info.map(item =>
                        <Deposit key={item.id}
                        title={item.title}
                        description={item.description}
                        img={item.img}
                        rate={item.rate}
                        removing={item.removing}
                        adding={item.adding}
                    />)
                }
            </div>
        )
    }
}