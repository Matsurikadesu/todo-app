import { Component } from "react";
import './app-button.scss';

class Button extends Component{
    render(){
        return (
            <button className="btn">
                <span className="btn-text">+ Add New Task</span>
            </button>
        )
    }
}

export default Button;