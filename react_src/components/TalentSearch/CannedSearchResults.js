import React from 'react';
import {Table, Image, Button} from 'react-bootstrap';
import CSSModules from 'react-css-modules';
import styles from './TalentSearch.css';


const CannedSearchResults = () => {

    return (
        <div styleName="cannedSearchResultsContainer">

            <div className="hidden" id="popoverDescription">
                <div className="popover-heading">
                    Description
                </div>

                <div className="popover-body">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                    enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                    consequat. Duis aute irure dolor in
                    reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident,
                    sunt in culpa qui officia deserunt mollit anim id est laborum.
                </div>
            </div>

            <div id="divBrowseResults" styleName="browseResultsContainer">
                <Table striped hover>
                    <thead>
                    <tr>

                        <th style={{width:'8%'}}>Rating</th>
                        <th style={{width:'10%'}}></th>
                        <th style={{width:'20%'}}></th>
                        <th style={{width:'40px'}}>Tagline</th>
                        <th style={{width:'115px'}}>Description</th>
                        <th style={{width:'10%', textAlign:'center'}}>Invite to Bid</th>

                    </tr>
                    </thead>

                    <tbody>
                    <tr>

                        <td>84</td>
                        <td styleName="talentImage"><Image src="images/anna_chiara_bellini_small_2.jpg" circle /><br/>Anna
                            Chiara</td>
                        <td styleName="browse-result-cell">
                            <ul styleName="resource-details">
                                <li><span styleName="resource-item-header">Requested Rate:</span> $90</li>
                                <li><span styleName="resource-item-header">Level:</span>7</li>
                                <li><span styleName="resource-item-header">Location:</span> Phoenix AZ</li>
                            </ul>
                        </td>
                        <td styleName="browse-result-cell">[tagline]</td>
                        <td styleName="browse-result-cell">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                            ut... &nbsp;

                            <Button type="button" data-toggle="popover" data-trigger="focus"
                                    data-popover-content="#popoverDescription"
                                    className="btn btn-info btn-xs show-description"><span
                                className="glyphicon glyphicon-chevron-right"></span></Button>

                        </td>
                        <td styleName="invite"><a href="#" className="btn btn-success btn-md btnInvite"><Image
                            src="images/envelopew.png"/></a></td>

                    </tr>
                    <tr>

                        <td>90</td>
                        <td styleName="talentImage"><Image src="images/danielle_reid_small.jpg" circle
                                                           alt="Danielle Reid" width="95" height="95" /><br/>Danielle Reid
                        </td>
                        <td styleName="browse-result-cell">
                            <ul styleName="resource-details">
                                <li><span styleName="resource-item-header">Requested Rate:</span> $85</li>
                                circle
                                <li><span styleName="resource-item-header">Level:</span> 8</li>
                                <li><span styleName="resource-item-header">Location:</span> Boston MA</li>
                            </ul>
                        </td>
                        <td styleName="browse-result-cell">[tagline]</td>
                        <td styleName="browse-result-cell">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                            ut... &nbsp;

                            <Button type="button" data-toggle="popover" data-trigger="focus"
                                    data-popover-content="#popoverDescription" className="btn btn-info btn-xs"><span
                                className="glyphicon glyphicon-chevron-right"></span></Button>

                        </td>
                        <td styleName="invite"><a href="#" className="btn btn-success btn-md btnInvite"><Image
                            src="images/envelopew.png"/></a></td>

                    </tr>
                    <tr>

                        <td>92</td>
                        <td styleName="talentImage"><Image src="images/ken_whaley_small.jpg" circle alt="Ken Whaley"
                                                           width="95" height="95" /><br/>Ken Whaley</td>
                        <td styleName="browse-result-cell">
                            <ul styleName="resource-details">
                                <li><span styleName="resource-item-header">Requested Rate:</span> $75</li>
                                <li><span styleName="resource-item-header">Level:</span>10</li>
                                <li><span styleName="resource-item-header">Location:</span> Austin TX</li>
                            </ul>
                        </td>
                        <td styleName="browse-result-cell">[tagline]</td>
                        <td styleName="browse-result-cell">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                            ut... &nbsp;

                            <Button type="button" data-toggle="popover" data-trigger="focus"
                                    data-popover-content="#popoverDescription" className="btn btn-info btn-xs"><span
                                className="glyphicon glyphicon-chevron-right"></span></Button>

                        </td>
                        <td styleName="invite"><a href="#" className="btn btn-success btn-md btnInvite"><Image
                            src="images/envelopew.png"/></a></td>

                    </tr>

                    <tr>

                        <td>85</td>
                        <td styleName="talentImage"><Image src="images/richard_rozsa_smal.jpg" circle
                                                           alt="Richard Rozsa" width="95" height="95" /><br/>Richard Rozsa
                        </td>
                        <td styleName="browse-result-cell">
                            <ul styleName="resource-details">
                                <li><span styleName="resource-item-header">Requested Rate:</span> $95</li>
                                <li><span styleName="resource-item-header">Level:</span>8</li>
                                <li><span styleName="resource-item-header">Location:</span> New York, NY</li>
                            </ul>
                        </td>
                        <td styleName="browse-result-cell">[tagline]</td>
                        <td styleName="browse-result-cell">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                            ut... &nbsp;

                            <Button type="button" data-toggle="popover" data-trigger="focus"
                                    data-popover-content="#popoverDescription" className="btn btn-info btn-xs"><span
                                className="glyphicon glyphicon-chevron-right"></span></Button>

                        </td>
                        <td styleName="invite"><a href="#" className="btn btn-success btn-md btnInvite"><Image
                            src="images/envelopew.png"/></a></td>

                    </tr>
                    </tbody>
                </Table>
            </div>


        </div>);
};


export default CSSModules(CannedSearchResults, styles);
