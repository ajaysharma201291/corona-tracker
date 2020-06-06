import React, { Component } from 'react';
import * as _ from 'lodash';
import Service from '../services/base.service';
import { GET_COUNTRY_DATA, GET_INDIA_DATA, GET_LATEST_LOGS } from '../utils/urls';
import Summary from './summary';
import StateList from './stateList';
import Spinner from 'react-bootstrap/Spinner';
import LogsComponent from './logsComponent';
import Button from 'react-bootstrap/Button'

class CountryComponent extends Component {

    state = {
        countryData: null,
        isIndia: false,
        indiaData: [],
        isLogVisble: false,
        logsData: []
    }

    componentDidMount = async () => {
        try {
            const countryName = this.props.match && this.props.match.params && this.props.match.params.name;

            if (_.isEmpty(countryName) || _.isNil(countryName)) {
                this.props.history.push('/');
            } else {

                let indiaRes;
                let logsData;

                const countryRes = await Service.getInstance.get(GET_COUNTRY_DATA(countryName));

                if (_.isEqual(countryName, 'India')) {
                    indiaRes = await Service.getInstance.get(GET_INDIA_DATA);
                    logsData = await Service.getInstance.get(GET_LATEST_LOGS);

                    logsData = _.orderBy(logsData.data, ['timestamp'], ["desc"])
                }

                this.setState({
                    countryData: countryRes.data,
                    isIndia: _.isEqual(countryName, 'India'),
                    indiaData: _.isEqual(countryName, 'India') ? indiaRes.data : [],
                    logsData: logsData.slice(0, 5)
                })
            }

        } catch (error) {
            console.log(error.message);
        }
    }

    render() {

        const { countryData, isIndia, indiaData, isLogVisble, logsData } = this.state;

        if (_.isNil(countryData)) {
            return <Spinner animation="grow" />
        }

        return (
            <div className="container">
                <Summary summaryData={countryData} isCountryData={true} />
                {isIndia ? <Button variant="primary"
                    onClick={() => { this.setState({ isLogVisble: !isLogVisble }) }}>
                    {isLogVisble ? 'Hide' : 'Show'} Latest Logs </Button> : ''}
                {isIndia && isLogVisble ? <LogsComponent logs={logsData} /> : ''}
                {isIndia ? <StateList indiaData={indiaData} /> : ''}
            </div>
        )
    }
}

export default CountryComponent;