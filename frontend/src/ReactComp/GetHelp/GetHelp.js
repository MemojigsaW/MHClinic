import React from 'react';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import { Link } from 'react-router-dom';


import TopBar from '../Shared/Topbar/topbar'


import './GetHelp.css'


const _images = {
    mapSearch:process.env.PUBLIC_URL + '/image/GetHelp/map_search.jpg'
}


class GetHelpPage extends React.Component {
    state = {
        searchtext: ""
    }

    handlesearchcontext(e){
        const value = e.target.value
        this.setState({
            searchtext: value
        })
    }

    handlesearchsubmit(e){
        // SaveLocalStorage({'searchloc':this.state.searchtext})
    }

    render() {
        return (
            <>
                <TopBar />

                <div className = "section">
                    <div className={'GH_boxH'}>
                        <div className="secTitle"> Find Mental Health Services</div>
                        <div className="searchBar">
                            <form
                                className="SearchForm"
                                noValidate autoComplete="off">
                                <TextField
                                    id="outlined-basic2"
                                    label="Enter a Location"
                                    variant="outlined"
                                    size="small"
                                    onChange={this.handlesearchcontext.bind(this)}
                                />
                                <Link
                                    //     to={{
                                    //     pathname: '/ClinicList',
                                    //     searchtext: this.state.searchtext}}
                                >
                                    <IconButton
                                        onClick={this.handlesearchsubmit.bind(this)}
                                        id="SearchIcon2"
                                        type="submit"
                                        aria-label="search">
                                        <SearchIcon/>
                                    </IconButton>
                                </Link>
                            </form>
                        </div>
                    </div>
                    <div className={'GH_boxH'}>
                        <img id="searchImage" src={_images.mapSearch}/>
                    </div>
                </div>

                <div className="sourceSection">

                    <div className="secTitle"> Online Resources</div>
                    <div className="sourceDetail">
                        <div className="sourceType">24/7 Emergency counseling services </div>
                        <ul>
                            <li> <a className="webLink" href='https://studentlife.utoronto.ca/service/myssp/'>
                                U of T My Student Support Program (My SSP)
                            </a>
                                | <b> 1-844-451-9700 </b>. Outside of North America, call 001-416-380-6578. <br />
                                Culturally-competent mental health and counseling services in 146 languages for university students.</li>

                            <li> <a className="webLink" href='https://good2talk.ca/'>
                                Good2Talk Student Helpline
                            </a>
                                | <b> 1-866-925-5454 </b> <br />
                                Professional counseling, information and referrals helpline for mental health, addictions and students well-being.</li>
                        </ul>

                        <div className="sourceType">Community contacts </div>
                        <ul>
                            <li> <a className="webLink" href='https://www.dcogt.com/'>
                                Distress Centres
                            </a>
                                | <b> 416-408-4357 </b> <br />
                                Provides crisis and emotional support and suicide prevention, intervention and
                                postvention services to individuals in our community.</li>

                            <li> <a className="webLink" href='https://www.connexontario.ca/'>
                                ConnexOntario Helpline
                            </a>
                                | <b> 1-866-531-2600 </b> <br />
                                Support and treatment services for people experiencing problems with gambling, drugs,
                                alcohol and/or mental health. </li>

                            <li> <a className="webLink" href='https://gersteincentre.org/'>
                                Gerstein Centre Crisis Line
                            </a>
                                | <b> 416-929-5200 </b> <br />
                                Provides mental health crisis support, strategies for
                                addressing immediate problems and connections to services offering ongoing support. </li>
                        </ul>

                        <div className="sourceType">Apps and online programs </div>
                        <ul>
                            <li> <a className="webLink" href='https://www.bigwhitewall.com/'>
                                Big White Wall <br/>
                            </a>
                                An online chat-based mental health and well-being service offering self-help programs, creative outlets and a community that cares.</li>

                            <li> <a className="webLink" href='https://bouncebackontario.ca/'>
                                BounceBack Ontario
                            </a>
                                | <b> 1-866-345-0224 </b> <br />
                                A free skills-building program designed to help adults and youth 15+ manage symptoms of depression and anxiety. </li>
                        </ul>
                        <a className="webLink" href='https://studentlife.utoronto.ca/wp-content/uploads/Feeling-distressed.pdf'>
                            More
                        </a>
                    </div>
                </div>
            </>
        );
    }
}

export default GetHelpPage;
