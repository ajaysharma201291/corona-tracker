import React, { Component } from 'react'
import * as _ from 'lodash';
import Service from '../services/base.service';
import { GET_INDIA_DATA } from '../utils/urls';
import Spinner from 'react-bootstrap/Spinner';
import Table from 'react-bootstrap/Table';

class DistrictComponent extends Component {

    state = {
        stateData: null
    }

    componentDidMount = async () => {
        try {
            const stateCode = this.props.match && this.props.match.params && this.props.match.params.name;

            if (_.isEmpty(stateCode) || _.isNil(stateCode)) {
                this.props.history.push('/country/India');
            } else {
                const indiaRes = await Service.getInstance.get(GET_INDIA_DATA);

                this.setState({
                    stateData: indiaRes.data[stateCode]
                })
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    renderDistrictList = (stateData) => {
        let districtArray = [];

        Object.entries(stateData.districts).map((val) => {
            const districtName = val[0];
            const districtData = val[1];

            districtData['districtName'] = districtName;
            districtArray.push(districtData);
        })

        districtArray = _.orderBy(districtArray, ['total.confirmed'], ['desc']);

        return (
            districtArray.map((district, index) => (
                <tr key={index}>
                    <td>{index + 1}</td>
                    <td>
                        {district['districtName']}
                    </td>
                    <td>
                        <span>{!_.isNil(district.delta) && !_.isNil(district.delta.confirmed) ?
                            <span>+ {district.delta.confirmed}</span> : ''}</span>
                        <br />
                        {!_.isNil(district.total.confirmed) ? district.total.confirmed : 0}
                    </td>
                    <td>{!_.isNil(district.total.confirmed) ? (district.total.confirmed -
                        (!_.isNil(district.total.recovered) ? district.total.recovered : 0) -
                        (!_.isNil(district.total.deceased) ? district.total.deceased : 0)) : 0}
                    </td>
                    <td>
                        <span>{!_.isNil(district.delta) && !_.isNil(district.delta.recovered) ?
                            <span>+ {district.delta.recovered}</span> : ''}</span>
                        <br />
                        {!_.isNil(district.total.recovered) ? district.total.recovered : 0}
                    </td>
                    <td>
                        <span>{!_.isNil(district.delta) && !_.isNil(district.delta.deceased) ?
                            <span>+ {district.delta.deceased}</span> : ''}</span>
                        <br />
                        {!_.isNil(district.total.deceased) ? district.total.deceased : 0}
                    </td>
                    <td>{!_.isNil(district.total.tested) ? district.total.tested : 0}</td>
                    <td>{!_.isNil(district.total.migrated) ? district.total.migrated : 0}</td>
                    <td>Last Update about {!_.isNil(stateData.meta) &&
                        !_.isNil(stateData.meta.last_updated) ? Math.floor(Math.abs(new Date() -
                            new Date(stateData.meta.last_updated)) / 36e5) === 0 ? 1 :
                            Math.floor(Math.abs(new Date() -
                                new Date(stateData.meta.last_updated)) / 36e5) : 0} hours ago
                    </td>
                </tr>
            ))
        )
    }


    render() {

        const { stateData } = this.state;

        if (_.isNil(stateData)) {
            return <Spinner animation="grow" />
        }

        return (
            <div className="container" >
                <Table responsive striped bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>District</th>
                            <th>Confirmed</th>
                            <th>Active</th>
                            <th>Recovered</th>
                            <th>Death</th>
                            <th>Tested</th>
                            <th>Migrated(from other district)</th>
                            <th>Last Updated</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderDistrictList(stateData)}
                    </tbody>
                </Table>
            </div>
        )
    }
}
export default DistrictComponent;