import React, { Component } from 'react'
import Service from '../services/base.service';
import { GET_WORLD_DATA, GET_ALL_COUNTRIES_DATA, GET_ALL_CONTINENT_DATA } from '../utils/urls';
import * as _ from 'lodash';
import Spinner from 'react-bootstrap/Spinner';
import Summary from './summary';
import ContinentTabs from './continentTabs';
import DetailList from './detailList';

class WorldComponent extends Component {
    state = {
        worldData: {},
        countriesData: [],
        continentData: [],
        isContinentSelected: false,
        continentSelected: 'ALL'
    }

    componentDidMount = async () => {
        try {
            const worldRes = await Service.getInstance.get(GET_WORLD_DATA);
            const countryRes = await Service.getInstance.get(GET_ALL_COUNTRIES_DATA);
            const continentRes = await Service.getInstance.get(GET_ALL_CONTINENT_DATA);

            this.setState({
                countriesData: countryRes.data,
                worldData: worldRes.data,
                continentData: continentRes.data
            })

        } catch (error) {
            console.log(error.message);
        }
    }

    onContinentSelect = (e) => {
        this.setState({
            isContinentSelected: e !== 'ALL',
            continentSelected: e
        }, () => {
            this.renderDetails()
        })
    }

    renderDetails = () => {
        const { countriesData, worldData, continentData, isContinentSelected, continentSelected } = this.state;

        if (countriesData.length === 0) {
            return <Spinner animation="grow" />
        }

        if (_.findIndex(countriesData, (val) => _.isNil(val.continent)) === -1) {
            countriesData.unshift(worldData);
        }

        let updatedSummaryData = _.orderBy(countriesData, ['cases'], ['desc']);

        let continentsArray = _.map(continentData, (val) => val.continent);

        if (continentsArray.findIndex(v => v === 'ALL') === -1) {
            continentsArray.unshift('ALL');
        }

        let continentSummaryData;

        if (isContinentSelected) {
            const selectedContinent = _.filter(continentData, (val) => val.continent === continentSelected);

            continentSummaryData = _.filter(countriesData, (val) => val.continent === continentSelected);
            continentSummaryData = _.orderBy(continentSummaryData, ['cases'], ['desc']);

            if (_.findIndex(continentSummaryData, (val) => val.continent === selectedContinent && _.isNil(val.countries)) === -1) {
                continentSummaryData.unshift(selectedContinent[0]);
            }
        }

        return (
            <div className="container">
                <Summary summaryData={updatedSummaryData[0]} isCountryData={false} />
                <ContinentTabs continentsArray={continentsArray}
                    onContinentSelect={this.onContinentSelect} />
                <DetailList
                    details={isContinentSelected ? continentSummaryData : updatedSummaryData}
                    type={isContinentSelected ? `${continentSelected}` : "World"}
                    isContinentSelected={isContinentSelected} />
            </div >
        )
    }

    render() {
        return (
            this.renderDetails()
        )
    }
}
export default WorldComponent;