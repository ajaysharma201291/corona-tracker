import React from 'react';
import Card from 'react-bootstrap/Card'

const LogsComponent = (props) => {

    const { logs } = props;

    return (
        <div className="container">
            <span>{new Date(logs[0].timestamp * 1000).toDateString()}</span>
            {logs.map((log, index) => (
                <Card key={index}>
                    <Card.Title>about {Math.floor(Math.abs(new Date() -
                        new Date(log.timestamp * 1000)) / 36e5) === 0 ? 1 : Math.floor(Math.abs(new Date() -
                            new Date(log.timestamp * 1000)) / 36e5)} hours ago</Card.Title>
                    <Card.Body>{log.update}</Card.Body>
                </Card>
            ))}

        </div>
    )
}

export default LogsComponent;