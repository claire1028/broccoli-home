import React from 'react';
import home from './images/home.png'

export default class Header extends React.Component {
    render() {
        return (
            <div className="header-container">
                <img src={home} />
                BROCCOLI & CO
            </div>
        )
    }
}