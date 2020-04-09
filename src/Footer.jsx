import React from 'react';

export default class Footer extends React.Component {
    render() {
        return (
            <div className="footer-container">
                <p>Made with <span style={{color: 'red', fontSize: 18}}>&#9829;</span> in Melbourne</p>
                <p>&copy;2020 Broccoli &amp; Co. All rights reserved</p>
            </div>
        )
    }
}