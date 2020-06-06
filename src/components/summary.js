import React from 'react';
import Card from 'react-bootstrap/Card';
import CardDeck from 'react-bootstrap/CardDeck';

const Summary = (props) => {
    const { summaryData, isCountryData } = props;

    return (
        <div className="container">
            <CardDeck>
                {isCountryData ?
                    <Card>
                        <Card.Body>
                            <Card.Img variant="top" src={summaryData.countryInfo.flag} />
                            <Card.Title>{summaryData.country} ({summaryData.continent})</Card.Title>
                        </Card.Body>
                    </Card>
                    : ""}
                <Card>
                    <Card.Body>
                        <Card.Title>Total Cases:</Card.Title>
                        <Card.Text>
                            {summaryData.cases}
                        </Card.Text>
                    </Card.Body>
                </Card>
                <Card>
                    <Card.Body>
                        <Card.Title>Total Deaths:</Card.Title>
                        <Card.Text>
                            {summaryData.deaths}
                        </Card.Text>
                    </Card.Body>
                </Card>
            </CardDeck>
            <CardDeck>
                <Card>
                    <Card.Body>
                        <Card.Title>Total Recovered:</Card.Title>
                        <Card.Text>
                            {summaryData.recovered}
                        </Card.Text>
                    </Card.Body>
                </Card>
                <Card>
                    <Card.Body>
                        <Card.Title>Active Cases:</Card.Title>
                        <Card.Text>
                            {summaryData.active}
                        </Card.Text>
                    </Card.Body>
                </Card>
                <Card>
                    <Card.Body>
                        <Card.Title>Closed Cases:</Card.Title>
                        <Card.Text>
                            {summaryData.recovered + summaryData.deaths}
                        </Card.Text>
                    </Card.Body>
                </Card>
            </CardDeck>
        </div>
    )
}

export default Summary;
