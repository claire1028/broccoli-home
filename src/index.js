import React from 'react';
import ReactDOM from 'react-dom';

import Header from './Header.jsx';
import Footer from './Footer.jsx';
import Body from './Body.jsx';

import './index.styl';

const isH5 = /Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent);

class App extends React.Component {
    render() {
        return (
            <div className={`main-container ${isH5 ? 'h5' : ''}`}>
                <Header />
                <Body />
                <Footer />
            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('root'));