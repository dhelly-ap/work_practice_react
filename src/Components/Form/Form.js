import React from 'react';

import Deposit from '../Deposit/Deposit.js';
import TopForm from '../Topform/Topform';
import './Form.css';

export default class Form extends React.Component {
    constructor(props) {
        super(props);
        Form.onKeyDownChange = Form.onKeyDownChange.bind(this);
        this.onKeyDownHandle = this.onKeyDownHandle.bind(this);
        this.handleCheckChange = this.handleCheckChange.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleBlurChange = this.handleBlurChange.bind(this);
        this.state = {
            adding: false,
            removing: false,
            online: false,
            check_id: '',
            input_money: 100000
        };
    }
    static onKeyDownChange(e){
        if (!((e.key >= '0' && e.key <= '9')
            || e.key === 'ArrowLeft'
            || e.key === 'ArrowRight'
            || e.key === 'ArrowUp'
            || e.key === 'ArrowDown'
            || e.key === 'Delete'
            || e.key === 'Tab'
            || e.key === 'Backspace'
            || e.key === 'Enter'
        ))
            e.preventDefault();
    };

    onKeyDownHandle(e){
        Form.onKeyDownChange(e);
        if (e.key === 'Enter')
            this.handleBlurChange(e);
    }

    handleInputChange (e){
        let value = (e.target.value);
        value = parseInt(value.replace(/\s+/g, ''));
        if (!value)
            value = 0;

        if (value > 99999999)
           value = 99999999;
        if (typeof value === "number")
            this.setState({input_money: value});

    }

    handleBlurChange(e){
        let value = e.target.value;
        value = parseInt(value.replace(/\s+/g, ''));
        if (!value)
            value = 0;
        if (value < this.props.sum_min)
            value = this.props.sum_min;
        this.setState({input_money: value});
    }

    handleCheckChange (check, check_id){
        this.setState({check_id: check_id});

        switch (check_id) {
            case 'adding' :
                this.setState({adding: check});
                break;
            case 'removing' :
                this.setState({removing: check});
                break;
            case 'online' :
                this.setState({online: check});
                break;
        }
    };

    fun_filter(arr, value){
        let new_arr = arr;

        if (!(value.adding || value.removing || value.online))
            return arr;

        for (let key in value){
            if(value[key] === true) {
                new_arr = new_arr.filter(item => item[key]);
            }
        }
        return new_arr;
    };

    render() {
        const { title,
            deposit_info,
            checkboxes,
            sum_min,
            period_from,
            period_to } = this.props;
        const { input_money } = this.state;
        return(
            <div className={'form-wrap-all'}>
                <div className={'wrap-with-border'}>
                    <div className={'form-wrap-head'}>
                        <h1 className={'form-title'}>{title}</h1>
                        <TopForm
                            checkboxes={checkboxes}
                            input_money={input_money}
                            sum_min={sum_min}
                            period_from={period_from}
                            period_to={period_to}
                            onCheckChange={this.handleCheckChange}
                            onInputMoney={this.handleInputChange}
                            onBlurChange={this.handleBlurChange}
                            onKeyDownChange={this.onKeyDownHandle}
                        />
                    </div>
                </div>
                {this.fun_filter(deposit_info, this.state).map(item =>
                    <Deposit key={item.id}
                             title={item.title}
                             description={item.description}
                             img={item.img}
                             rate={item.rate}
                             removing={item.removing}
                             adding={item.adding}
                             default_sum={input_money}
                    />)
                        }
            </div>
        )
    }
}