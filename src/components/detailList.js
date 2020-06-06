import React from 'react';
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';

const DetailList = (props) => {
    const { details, type, isContinentSelected } = props;
    return (
        <div>
            <Table responsive striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>{isContinentSelected ? 'Continent' : 'Country'}</th>
                        <th>Total Cases</th>
                        <th>New Cases</th>
                        <th>Total Death</th>
                        <th>New Death</th>
                        <th>Total Recovered</th>
                        <th>Active Cases</th>
                        <th>Serious/Critical</th>
                    </tr>
                </thead>
                <tbody>
                    {details.map((detail, index) => (
                        <tr key={index}>
                            <td>{index === 0 ? '' : index}</td>
                            <td>{index === 0 ? type :
                                <Link to={`/country/${detail.country}`}>{detail.country}</Link>}</td>
                            <td>{detail.cases}</td>
                            <td>+{detail.todayCases}</td>
                            <td>{detail.deaths}</td>
                            <td>+{detail.todayDeaths}</td>
                            <td>{detail.recovered}</td>
                            <td>{detail.active}</td>
                            <td>{detail.critical}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    )
}

export default DetailList;