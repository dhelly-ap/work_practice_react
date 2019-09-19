import React from 'react';
// import ReactDOM from 'react-dom';
import "./Topform.css"

export default class TopForm extends React.Component{

    onKeyDownChange(e){
        if (!((e.key >= '0' && e.key <= '9')
            || e.key === 'ArrowLeft'
            || e.key === 'ArrowRight'
            || e.key === 'ArrowUp'
            || e.key === 'ArrowDown'
            || e.key === 'Delete'
            || e.key === 'Tab'
            || e.key === 'Backspace'))
            e.preventDefault();
    };

    render() {
        const { checkboxes, input_money } = this.props;

        return(
            <div className={'wrap-head'}>
                <div className={'wrap-inputs'} >
                    <div className={'money'}>
                        <div className={'input'}>
                            <label>Хочу вложить</label>
                            <input className={"input-money"}
                                   onChange={this.props.onInputMoney}
                                   onKeyDown={this.onKeyDownChange}
                                   onBlur={this.props.onBlurChange}
                                   value={input_money}
                            />
                            <select className={'currency'}>
                                <option>₽</option>
                                <option>$</option>
                            </select>
                        </div>
                        <div className={'sign'}>
                            от 30 000 ₽ или от 1 000 $
                        </div>
                    </div>
                    <div className={'period'}>
                        <div className={'input'}>
                            <label>На срок</label>
                            <input/>
                        </div>
                        <div className={'wrap-sign'}>
                            <span className={'sign'}>3 мес</span>
                            <span className={'sign'}>3 года</span>
                        </div>
                    </div>
                </div>
                <div className={'checkboxes'}>
                    <div className={'conditions'}>Дополнительные условия</div>
                    {checkboxes.map((item, index) =>
                        <Checkboxes
                            key={index}
                            checkbox={item.text}
                            index={item.id}
                            onCheckChange={this.props.onCheckChange}/>)}
                </div>
            </div>);
}};

class Checkboxes extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        let check = e.target.checked;
        let check_id = e.target.id;
        this.props.onCheckChange(check, check_id);
    }

    render () {
        const { checkbox, index } = this.props;
    return (
            <div className={'wrap-box'}>
                <input
                    className={'check'}
                    type={'checkbox'}
                    id={index}
                    onChange={this.handleChange}
                />
                <label
                    className={'label'}
                    htmlFor={index}
                >
                    {checkbox}
                </label>
            </div>
    );
    }
}

