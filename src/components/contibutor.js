import React from 'react'

const Contibutor = () => {

    const data = [{
        name: 'Novel COVID API',
        url: 'https://corona.lmao.ninja/'
    },
    {
        name: 'COVID19-India API',
        url: 'https://api.covid19india.org/'
    }]

    return (
        <div className="container">
            <h2>Powered by following API Sources: </h2>
            <ul>
                {data.map((d, index) => (
                    <li key={index}>Powered By 
                        <a href={d.url} target="_blank" rel="noopener noreferrer">{d.name}</a>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Contibutor;
