import React from 'react';
import ReactDOM from 'react-dom';
import "./Topform.css"

export default class TopForm extends React.Component{
    render() {
        return(
            <div className={'wrap-head'}>
                <div className={'wrap-inputs'} >
                    <div className={'money'}>
                        <div className={'input'}>
                            <label>Хочу вложить</label>
                            <input/>
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
                    <div className={'wrap-box'}>
                        <input className={'check'} type={'checkbox'} id={'add'}/>
                        <label className={'label'} for={'add'}>Хочу пополнять</label>
                    </div>
                    <div className={'wrap-box'}>
                        <input className={'check'} type={'checkbox'} id={'removing'}/>
                        <label className={'label'} for={'removing'}>Хочу снимать</label>
                    </div>
                </div>
            </div>);
}}