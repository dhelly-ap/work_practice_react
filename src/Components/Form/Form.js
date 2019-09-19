import React from 'react';
// import ReactDOM from 'react-dom';
import Deposit from '../Deposit/Deposit.js';
import TopForm from '../Topform/Topform';
import './Form.css';

export default class Form extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.onBlurChange = this.onBlurChange.bind(this);
        this.state = {
            adding: false,
            removing: false,
            online: false,
            check_id: '',
            input_money: 100000
        };
    }
    handleChange (check, check_id){
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
    handleInputChange (e){
        let value = e.target.value;
        value = Number(value);
        if (value > 99999999)
           value = 99999999;
        this.setState({input_money: value});

        // let price = value;
        // price = price.toString().replace(/(\d)(?=(\d{3})+$)/g, '$1 ');

    }
    onBlurChange(e){
        let value = e.target.value;
        value = Number(value);
        if (value < 1000)
            value = 1000;
        this.setState({input_money: value});
    }

    render() {
        const {
            title,
            deposit_info,
            checkboxes } = this.props;
        const { input_money } = this.state;
        return(
            <div className={'form-wrap-all'}>
                <div className={'wrap-with-border'}>
                    <div className={'form-wrap-head'}>
                        <h1 className={'form-title'}>{title}</h1>
                        <TopForm
                            checkboxes={checkboxes}
                            input_money={input_money}
                            onCheckChange={this.handleChange}
                            onInputMoney={this.handleInputChange}
                            onBlurChange={this.onBlurChange}
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