import { useEffect, useState } from 'react';
import './insights.css';
import { fetchData } from '../../services/fetch';
import { Link } from 'react-router-dom';
import AverageScoreChart from '../../components/charts/Distribution';
import PieChart from '../../components/charts/PieChart';

const Insights = () => {
    const token = localStorage.getItem('token');
    const [carbonEmissionData, setCarbonEmissionData] = useState();
    const setLatestCarbonEmission = async () => {
        const data = await fetchData(
            'api/ceo2/getCarbonEmission',
            'GET',
            null,
            token
        );

        const parsedCarbonEmissionData = {
            calculatedEmission: data.calculatedEmission,
            createdAt: data.createdAt,
            updatedAt: data.updatedAt,
            userId: data.userId,
            _id: data._id,
            emissionData: JSON.parse(data.emissionData),
            humanizedEmissionData: JSON.parse(data.humanizedEmissionData),
            recommendations: JSON.parse(data.recommendations).response, 
            sectionRates: JSON.parse(data.sectionRates), 
        };

        setCarbonEmissionData(parsedCarbonEmissionData)

    }
    useEffect(() => {
        setLatestCarbonEmission();
    }, [])

    const ranges = [
        [0, 100],
        [101, 200],
        [201, 300],
        [301, 400],
        [401, 500],
    ];

    const userScore = 70;
   
    return (
        <div className='insights_page'>
            <div className="container">
                {
                    carbonEmissionData ?
                        <>
                            {/* <AverageScoreChart ranges={ranges} userScore={userScore} /> */}
                            <div className='charts'>
                                <PieChart labels={Object.keys(carbonEmissionData?.sectionRates) || []} data={Object.values(carbonEmissionData?.sectionRates) || []} />
                            </div>

                            <div className="recommendations">
                                <h2>Recommendations</h2>
                                {
                                    carbonEmissionData?.recommendations.map((rec, idx) => (
                                        <div key={idx} className="recommendation">{rec}</div>
                                    ))
                                }
                            </div>
                        </>
                        :
                        <>
                            <div className="goto_calculate">
                                <h1>You have not calculated your carbon emission yet.</h1>
                                <Link to={'/calculate'}>Try it now!</Link>
                            </div>
                        </>
                }
            </div>
        </div>
    )
}

export default Insights