import { useState, useEffect } from 'react';
import PullRequest from '../pullRequests/PullRequest';
import Loader from '../general/loader/Loader';
import Carousel from 'styled-components-carousel';
import axios from 'axios';
import { breakpoints } from '../../helpers';

function Users() {

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() =>
        (async () => {
            try {
                const { data } = await axios.get('/api/vcs/prs');
                let usersSort = {};
                data.forEach(pullRequest => {
                    if (usersSort.hasOwnProperty(pullRequest.user.id)) {
                        usersSort[pullRequest.user.id].push(pullRequest)
                    } else {
                        usersSort[pullRequest.user.id] = [pullRequest];
                    }
                })
                setUsers(usersSort);

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
                    <div className="users">
                        {Object.entries(users).map(([user, pullRequests]) =>
                            <div key={user} className='user'>
                                <h2 className='user-title'>{`${pullRequests[0].user.login} (${pullRequests.length})`}</h2>
                                <Carousel
                                    center
                                    infinite={pullRequests.length < 2 ? false : true}
                                    showArrows
                                    showIndicator
                                    slidesToShow={pullRequests.length < 2 ? 1 : 3}
                                    breakpoints={pullRequests.length < 2 ? null : breakpoints}
                                >
                                    {pullRequests.map((pullRequest =>
                                        <PullRequest key={pullRequest.id} pullRequest={pullRequest} />
                                    ))}
                                </Carousel>
                            </div>
                        )}
                    </div>
            }
        </>
    )
}

export default Users
