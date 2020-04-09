import React from 'react';
import axios from 'axios';
import Modal from './components/Modal.jsx';
import Cross from './components/Cross.jsx';
import { getProp } from './util';

const REQUEST = 'request';
const DONE = 'done';
const regex = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;


export default class Body extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: '',
            tip: '',
            name: '',
            email: '',
            confirmEmail: '',
            errType: '',
            sending: false
        };
        this.openRequestModal = this.openRequestModal.bind(this);
        this.openDoneModal = this.openDoneModal.bind(this);
        this.close = this.close.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.onRequest = this.onRequest.bind(this);
    }

    openRequestModal() {
        this.setState({ modal: REQUEST });
    }

    openDoneModal() {
        this.setState({ modal: DONE });
    }

    close() {
        this.setState({ modal: '' });
    }

    handleChange(e) {
        const target = e.target;
        this.setState({
            [target.name]: target.value
        });
    }

    resetForm = () => {
        this.setState({ name: '', email: '', confirmEmail: '' });
    };

    validate = (name, email, confirmEmail) => {
        let tip = '';
        let errType = '';
        if (name.length < 3) {
            tip = 'name length at least 3';
            errType = 'name';
        } else if (!regex.test(email)) {
            tip = 'email format wrong';
            errType = 'email';
        } else if (email !== confirmEmail) {
            tip = ' confirm email not match with email ';
            errType = 'confirmEmail';
        }
        this.setState({ tip, errType });
        return tip ? false : true;
    };

    onRequest(e) {
        const { name, email, confirmEmail, sending } = this.state;
        e.preventDefault();

        if (sending) {
            return;
        }

        if (!this.validate(name, email, confirmEmail)) {
            return;
        }

        this.setState({ sending: true });
        axios.post('/prod/fake-auth', { name, email }).then(res => {
            if (res && res.status >= 200) {
                this.close();
                this.openDoneModal();
                this.resetForm();
                this.setState({ sending: false })
            }
        }).catch(ex => {
            let tip = getProp(ex, 'response.data.errorMessage', 'pls try it later');
            this.setState({ tip, sending: false });
        });
    }

    render() {
        const { modal, tip, name, email, confirmEmail, errType, sending } = this.state;
        return (
            <div className="body-container">
                <div className="content">
                    <h3>A better way </h3>
                    <h3>to enjoy every day.</h3>
                    <p>Be the first to know when we launch.</p>
                    <button onClick={this.openRequestModal}>Request an invite</button>
                </div>

                <Modal isOpen={modal === REQUEST} onClose={this.close} modal={false}>
                    <div className="custom-modal">
                        <header>Request on invite</header>
                        <Cross onClose={this.close} />
                        <div className="body">
                            <form>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Full name"
                                    value={name}
                                    onChange={this.handleChange}
                                    className={`${errType === 'name' ? 'err' : ''}`}
                                />
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    value={email}
                                    onChange={this.handleChange}
                                    className={`${errType === 'email' ? 'err' : ''}`}
                                />
                                <input
                                    type="email"
                                    name="confirmEmail"
                                    placeholder="Confirm email"
                                    value={confirmEmail}
                                    onChange={this.handleChange}
                                    className={`${errType === 'confirmEmail' ? 'err' : ''}`}
                                />
                                <p className="tip">{tip}</p>
                                <button
                                    disabled={!email || !name || !confirmEmail || sending}
                                    onClick={this.onRequest}
                                    id="requestBtn"
                                >
                                    {sending ? 'Sending, please wait...' : 'Send'}
                                </button>
                            </form>
                        </div>
                    </div>
                </Modal>

                <Modal isOpen={modal === DONE} onClose={this.close} modal={false}>
                    <div className="custom-modal">
                        <header>All done!</header>
                        <Cross onClose={this.close} />
                        <div className="body info">
                            <p>You will be one of the first to experience Broccoli &amp; Co when we launch</p>

                            <button onClick={this.close}>OK</button>
                        </div>
                    </div>
                </Modal>
            </div>
        )
    }
}