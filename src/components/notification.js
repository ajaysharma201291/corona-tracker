import React, { Component } from 'react';
import Toast from 'react-bootstrap/Toast';

class Notification extends Component {

    state = {
        data: [
            { value: "Historical Data coming soon", isVisible: true },
            { value: "Mobile App coming soon", isVisible: true }
        ]
    }

    hideToaster = (index) => {
        const { data } = this.state;
        for (var i = 0; i < data.length; i++) {
            data[index].isVisible = false;
        }

        this.setState({
            data
        })
    }

    render() {
        const { data } = this.state;

        return (
            <div className="container" >
                <div aria-live="polite" aria-atomic="true"
                    style={{ position: 'relative', minHeight: '200px' }}>
                    <div style={{ position: 'absolute', top: 0, right: 0 }}>
                        {
                            data.map((d, index) => (
                                <Toast key={index} onClose={() => this.hideToaster(index)}
                                    show={d.isVisible}>
                                    <Toast.Header>
                                        <strong className="mr-auto">{d.value}</strong>
                                    </Toast.Header>
                                </Toast>
                            ))
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default Notification;