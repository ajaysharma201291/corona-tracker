import React from 'react';
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';
import { StateCodeToNameMapping } from '../utils/constants';
import * as _ from 'lodash';

const StateList = (props) => {
    const { indiaData } = props;

    const renderStateList = (indiaData) => {
        let stateArray = [];

        Object.entries(indiaData).map((val) => {
            const stateCode = val[0];
            const stateData = val[1];

            stateData['stateCode'] = stateCode;
            stateArray.push(stateData);
        })

        stateArray = _.filter(stateArray, val => !_.isNil(val.total));

        stateArray = _.orderBy(stateArray, ['total.confirmed'], ['desc']);

        return (
            stateArray.map((detail, index) => (
                <tr key={index}>
                    <td>{index + 1}</td>
                    <td>
                        {!_.isNil(detail.districts) ?
                            <Link to={`/state/${detail['stateCode']}`}>
                                {StateCodeToNameMapping[detail['stateCode']]}</Link> :
                            StateCodeToNameMapping[detail['stateCode']]}
                    </td>
                    <td>
                        <span>{!_.isNil(detail.delta) && !_.isNil(detail.delta.confirmed) ?
                            <span>+ {detail.delta.confirmed}</span> : ''}</span>
                        <br />
                        {!_.isNil(detail.total.confirmed) ? detail.total.confirmed : 0}
                    </td>
                    <td>{!_.isNil(detail.total.confirmed) ? (detail.total.confirmed -
                        (!_.isNil(detail.total.recovered) ? detail.total.recovered : 0) -
                        (!_.isNil(detail.total.deceased) ? detail.total.deceased : 0)) : 0}
                    </td>
                    <td>
                        <span>{!_.isNil(detail.delta) && !_.isNil(detail.delta.recovered) ?
                            <span>+ {detail.delta.recovered}</span> : ''}</span>
                        <br />
                        {!_.isNil(detail.total.recovered) ? detail.total.recovered : 0}
                    </td>
                    <td>
                        <span>{!_.isNil(detail.delta) && !_.isNil(detail.delta.deceased) ?
                            <span>+ {detail.delta.deceased}</span> : ''}</span>
                        <br />
                        {!_.isNil(detail.total.deceased) ? detail.total.deceased : 0}
                    </td>
                    <td>{!_.isNil(detail.total.tested) ? detail.total.tested : 0}</td>
                    <td>{!_.isNil(detail.total.migrated) ? detail.total.migrated : 0}</td>
                    <td>Last Update about {!_.isNil(detail.meta) &&
                        !_.isNil(detail.meta.last_updated) ? Math.floor(Math.abs(new Date() -
                            new Date(detail.meta.last_updated)) / 36e5) === 0 ? 1 :
                            Math.floor(Math.abs(new Date() -
                                new Date(detail.meta.last_updated)) / 36e5) : 0} hours ago
                    </td>
                </tr>
            ))
        )
    }

    return (
        <div className="container">
            <Table responsive striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>State/UT</th>
                        <th>Confirmed</th>
                        <th>Active</th>
                        <th>Recovered</th>
                        <th>Death</th>
                        <th>Tested</th>
                        <th>Migrated(from other states)</th>
                        <th>Last Updated</th>
                    </tr>
                </thead>
                <tbody>
                    {renderStateList(indiaData)}
                </tbody>
            </Table>
        </div>
    )
}

export default StateList;