import { useState, useEffect } from 'react';
import PullRequest from './PullRequest';
import './PullRequests.css';
import Loader from '../general/loader/Loader';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import axios from 'axios';
import Sort from './Sort';

function PullRequsests() {

    const [pullRequests, setPullRequests] = useState([]);
    const [sortPullRequests, setSortPullRequests] = useState([]);
    const [selectedLabels, setSelectedLabels] = useState([]);
    const [selectedStatuses, setSelectedStatuses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [labelsNames, setLabelsNames] = useState([]);
    const [order, setOrder] = useState('asc');
    const [error, setError] = useState();

    useEffect(() =>
        (async () => {
            try {
                const { data } = await axios.get('/api/vcs/prs');
                setPullRequests(data);
                setSortPullRequests(data)
                let labelsNamesSort = [];
                data.forEach(pullRequest => {
                    pullRequest.labels.forEach(label => {
                        if (!labelsNamesSort.includes(label.name)) {
                            labelsNamesSort.push(label.name)
                        }
                    })
                })
                setLabelsNames(labelsNamesSort.map(label => { return { value: label, label } }))
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        })(), [])

    const animatedComponents = makeAnimated();

    const handleChange = (e, type) => {
        if (type === 'labels') {
            setSelectedLabels(e.map(obj => obj.value))
            const labels = e.map(obj => obj.value)

            if (labels.length === 0 && selectedStatuses.length === 0) {
                setSortPullRequests(pullRequests)
            } else {
                const selected = pullRequests.filter(pullRequest =>
                    (pullRequest.labels.findIndex(label => labels.includes(label.name))) !== -1 ||
                    (selectedStatuses.includes(pullRequest.state)) ||
                    (selectedStatuses.includes('draft') && pullRequest.draft === true)
                )
                setSortPullRequests(selected);
            }
        } else if (type === 'statuses') {
            setSelectedStatuses(e.map(obj => obj.value))
            const statuses = e.map(obj => obj.value)

            if (selectedLabels.length === 0 && statuses.length === 0) {
                setSortPullRequests(pullRequests)
            } else {
                const selected = pullRequests.filter(pullRequest =>
                    (pullRequest.labels.findIndex(label => selectedLabels.includes(label.name))) !== -1 ||
                    (statuses.includes(pullRequest.state)) ||
                    (statuses.includes('draft') && pullRequest.draft === true)
                )
                setSortPullRequests(selected);
            }
        }
    }

    const statusOptions = [
        { value: 'open', label: 'open' },
        { value: 'closed', label: 'closed' },
        { value: 'draft', label: 'draft' },
    ]

    const sortByTitle = () => {
        setLoading(true);
        const sorted = sortPullRequests.sort(compareTitles);
        setSortPullRequests(sorted);
        setLoading(false);
    }
    const sortByPRNumber = () => {
        setLoading(true);
        const sorted = sortPullRequests.sort(comparePRNumbers);
        setSortPullRequests(sorted);
        setLoading(false);
    }

    function compareTitles(a, b) {
        if (order === 'asc') {
            setOrder('desc')
            if (a.title.toLowerCase() < b.title.toLowerCase()) return -1;
            if (a.title.toLowerCase() > b.title.toLowerCase()) return 1;
        } else {
            setOrder('asc')
            if (a.title.toLowerCase() < b.title.toLowerCase()) return 1;
            if (a.title.toLowerCase() > b.title.toLowerCase()) return -1;
        }
        return 0;
    }

    function comparePRNumbers(a, b) {
        if (order === 'asc') {
            setOrder('desc')
            if (a.number < b.number) return -1;
            if (a.number > b.number) return 1;
        } else {
            setOrder('asc')
            if (a.number < b.number) return 1;
            if (a.number > b.number) return -1;
        }
        return 0;
    }

    return (
        <>
            {loading ?
                <Loader />
                : error ? <div>ERROR: {error}</div>
                    :
                    <>
                        <div>
                            <div>Filter By:</div>
                            <div className="filter-menu">
                                <div>
                                    <div>Labels</div>
                                </div>
                                <div>
                                    <div>PR Status</div>
                                </div>
                            </div>
                            <div className="selectors">
                                <Select
                                    className="select"
                                    options={labelsNames}
                                    isMulti
                                    placeholder="Select Labels..."
                                    closeMenuOnSelect={false}
                                    components={animatedComponents}
                                    onChange={(e) => handleChange(e, 'labels')}
                                    theme={theme => ({
                                        ...theme,
                                        borderRadius: 0,
                                        colors: {
                                            ...theme.colors,
                                            primary25: '#1e90ff',
                                        },
                                    })}
                                />
                                <Select
                                    className="select"
                                    options={statusOptions}
                                    isMulti
                                    placeholder="Select PR Status..."
                                    closeMenuOnSelect={false}
                                    components={animatedComponents}
                                    onChange={(e) => handleChange(e, 'statuses')}
                                    theme={theme => ({
                                        ...theme,
                                        borderRadius: 0,
                                        colors: {
                                            ...theme.colors,
                                            primary25: '#1e90ff',
                                        },
                                    })}
                                />
                            </div>
                        </div>
                        <Sort
                            sortByTitle={sortByTitle} sortByPRNumber={sortByPRNumber}
                        />
                        <div className="pull-requests">
                            {sortPullRequests.map(pullRequest => <PullRequest key={pullRequest.id} pullRequest={pullRequest} />)}
                        </div>
                    </>
            }
        </>
    )
}

export default PullRequsests
