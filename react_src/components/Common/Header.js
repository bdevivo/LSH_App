import React, {PropTypes} from 'react';
import { Link } from 'react-router';
import CSSModules from 'react-css-modules';
import styles, { active } from './Header.css';
// import LoadingDots from './LoadingDots';

class Header extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            profile: props.auth.getProfile()
        };

        this.onLogin = this.onLogin.bind(this);
        this.onLogout = this.onLogout.bind(this);

    }

    componentWillMount()
    {
        this.props.auth.on('profile_updated', (newProfile) => {
            this.onProfileUpdated(newProfile);
        });

        this.props.auth.on('user_logout', () => {
            this.onUserLogout();
        });
    }


    componentWillUnmount()
    {
        this.props.auth.removeListener('profile_updated', this.onProfileUpdated);
        this.props.auth.removeListener('user_logout', this.onUserLogout);
    }

    onProfileUpdated(newProfile)
    {
        this.setState({profile: newProfile});
    }

    onUserLogout()
    {
        console.log("render Header on logout");
        this.setState({profile: {}});
    }

    onLogin()
    {
        this.props.auth.login();
    }

    onLogout()
    {
        this.props.auth.logout();
    }

    isLoggedIn()
    {
        return this.props.auth.loggedIn();
    }

    hasRole(roleName)
    {
        let { profile } = this.state;
        let { app_metadata } = profile || {};
        let { roles } = app_metadata || {};
        if (!roles)
            return false;

        return (roles.indexOf(roleName) != -1);
    }

    render() {

        // listen to profile_updated events to update internal state
        // this.props.auth.on('profile_updated', (newProfile) => {
        //     this.setState({profile: newProfile});
        // });

        this.props.auth.on('user_logout', () => {
            console.log("render Header on logout")
            this.setState({profile: {}});
        });


        let userDiv;
        if (this.isLoggedIn())
        {
            let { profile } = this.state;
            let { user_metadata } = profile || {};
            let userName = profile.name;    // default
            //debugger;
            if (user_metadata && user_metadata.firstName)
            {
                userName = `${user_metadata.firstName} ${user_metadata.lastName}`;
            }

            userDiv = (<div className="hidden-sm hidden-xs" styleName="navRight">
                <Link to="/profile">{userName}</Link>
            </div>);
        }

        let loginDiv;
        let headerNav;
        let rootNav;
        if (this.isLoggedIn())
        {
            loginDiv = (<div className="hidden-sm hidden-xs" styleName="navRight">
                <a styleName="link" onClick={this.onLogout}>Logout</a>
            </div>);

            let isAdmin = this.hasRole("admin");
            let adminNav;
            if (isAdmin) {
                adminNav = (
                    <span>
                        <Link to="/admin" activeClassName={styles.active}>Admin</Link>
                        {" | "}
                    </span>
                );

                rootNav = (
                    <span>
                        <Link to="/questionwizard" activeClassName={styles.active}>Post a Job</Link>
                        {" | "}
                        <Link to="/questionwizard" activeClassName={styles.active}>Browse Jobs</Link>
                        {" | "}
                        <Link to="/questionwizard" activeClassName={styles.active}>Browse Talent</Link>
                    </span>

                );
            }
            else {
                if (this.hasRole("buyer"))
                {
                    rootNav = (
                        <span>
                            <Link to="/questionwizard" activeClassName={styles.active}>Post a Job</Link>
                                {" | "}
                                <Link to="/questionwizard" activeClassName={styles.active}>Browse Talent</Link>
                        </span>
                    );
                }
                else if (this.hasRole("talent"))
                {
                    rootNav = (
                        <Link to="/questionwizard" activeClassName={styles.active}>Browse Jobs</Link>
                    );
                }
            }

            headerNav = (

                    <nav>
                        {adminNav}
                        {rootNav}

                        {userDiv}
                        {loginDiv}

                    </nav>

            );

        }
        else
        {
            loginDiv = (<div className="hidden-sm hidden-xs" styleName="navRight">
                <a styleName="link" onClick={this.onLogin}>Sign In/Sign Up</a>
            </div>);

            headerNav = (

                    <nav>
                        <Link to="/admin" activeClassName={styles.active}>Browse Talent (not logged in)</Link>
                        {" | "}
                        <Link to="/questionwizard" activeClassName={styles.active}>Learn More</Link>

                        {userDiv}
                        {loginDiv}

                    </nav>


            );
        }

       return (
           <header styleName="nav">

                   {headerNav}

           </header>
       );
    }
}

Header.propTypes = {
    auth: PropTypes.object.isRequired
};


export default CSSModules(Header, styles);
