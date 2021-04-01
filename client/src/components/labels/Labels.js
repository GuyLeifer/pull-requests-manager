import { useState, useEffect } from 'react';
import './Labels.css';
import PullRequest from '../pullRequests/PullRequest';
import Loader from '../general/loader/Loader';
import Carousel from 'styled-components-carousel';
import axios from 'axios';
import { breakpoints } from '../../helpers';

function Labels() {

    const [labels, setLabels] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() =>
        (async () => {
            try {
                const { data } = await axios.get('/api/vcs/prs');

                let labelsSort = {};
                let labelsNamesSort = [];
                data.forEach(pullRequest => {
                    pullRequest.labels.forEach(label => {
                        if (labelsSort.hasOwnProperty(label.name)) {
                            labelsSort[label.name].push(pullRequest)
                        } else {
                            labelsSort[label.name] = [pullRequest];
                        }
                        if (!labelsNamesSort.includes(label.name)) {
                            labelsNamesSort.push(label.name)
                        }
                    })
                })
                setLabels(labelsSort);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        })(), [])

    return (
        <>
            {loading ?
                <Loader />
                : error ? <div>ERROR: {error}</div>
                    :
                    <div className="labels">
                        {Object.entries(labels).map(([label, pullRequests]) =>
                            <div key={label} className='label'>
                                <h2 className='label-title'>{label}</h2>
                                <Carousel
                                    center
                                    infinite={pullRequests.length < 2 ? false : true}
                                    showArrows
                                    showIndicator
                                    slidesToShow={pullRequests.length < 2 ? 1 : 3}
                                    breakpoints={pullRequests.length < 2 ? null : breakpoints}
                                >
                                    {pullRequests.map((pullRequest =>
                                        <PullRequest pullRequest={pullRequest} />
                                    ))}
                                </Carousel>
                            </div>
                        )}
                    </div>
            }
        </>
    )
}

export default Labels
