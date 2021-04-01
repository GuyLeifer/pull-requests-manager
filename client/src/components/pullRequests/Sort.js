import './Sort.css';
import SortIcon from '@material-ui/icons/Sort';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import TitleIcon from '@material-ui/icons/Title';
import FormatListNumberedRtlIcon from '@material-ui/icons/FormatListNumberedRtl';
import ImportExportIcon from '@material-ui/icons/ImportExport';

function Sort({ sortByTitle, sortByPRNumber }) {
    return (
        <div className="sort-by">
            <Tooltip title="Sort By">
                <IconButton>
                    <SortIcon />
                </IconButton>
            </Tooltip>
            <div>
                <Tooltip title="Title">
                    <IconButton onClick={sortByTitle}>
                        <TitleIcon />
                    </IconButton>
                </Tooltip>
                <Tooltip title="PR Number">
                    <IconButton onClick={sortByPRNumber}>
                        <FormatListNumberedRtlIcon />
                    </IconButton>
                </Tooltip>
                <ImportExportIcon />
            </div>
        </div>
    )
}

export default Sort
