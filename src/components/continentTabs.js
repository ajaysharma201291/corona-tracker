import React from 'react';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';

const ContinentTabs = (props) => {
    const { continentsArray, onContinentSelect } = props;
    return (
        <div className="container">
            <Tabs defaultActiveKey={continentsArray[0]} transition={false}
                id="noanim-tab-example" onSelect={(e) => onContinentSelect(e)}>
                {continentsArray.map((continent, index) => (
                    <Tab eventKey={continent} title={continent} key={index}>
                    </Tab>
                ))}
            </Tabs>
        </div>
    )
}
export default ContinentTabs;