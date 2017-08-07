import React, {PropTypes} from 'react';
import CSSModules from 'react-css-modules';
import styles from './TalentSearch.css';
import CannedSearchResults from './CannedSearchResults';

class SearchResultsContainer extends React.Component {


    render() {

        return (
            <div>

                <h1>Search Results</h1>
                <CannedSearchResults />

            </div>);
    }
}

export default CSSModules(SearchResultsContainer, styles);
