import { Component } from "react";
import Logo from "./logo.js";
import ProfilePic from "./profile_pic.js";
import Uploader from "./uploader.js";
import Profile from "./profile.js";
import { BrowserRouter, Route } from "react-router-dom";
import OtherProfile from "./otherProfile.js";
import axios from "./axios";
import { Link } from "react-router-dom";
import FindPeople from "./findPeople.js";

export default class App extends Component {
    constructor(props) {
        super(props);
        this.toggleUploader = this.toggleUploader.bind(this);
        this.setProfilePicUrl = this.setProfilePicUrl.bind(this);
        this.setBio = this.setBio.bind(this);
        // Initialize App's state
        this.state = {
            uploaderVisible: false,
        };

        // TODO: Bind methods if needed
    }

    componentDidMount() {
        axios
            .get("/user")
            .then((res) => {
                this.setState(res.data, () => {});
                // console.log("this.state: ", this.state);
            })

            .catch((err) => {
                console.log("error in /user axios.get request: ", err);
            });
    }

    toggleUploader() {
        if (this.state.uploaderVisible) {
            this.setState({ uploaderVisible: false });
        } else {
            this.setState({ uploaderVisible: true });
        }
    }
    setProfilePicUrl(profilePicUrl) {
        console.log("setProfilePicUrl fired");
        this.setState({ profilePicUrl: profilePicUrl });
        this.setState({ uploaderVisible: false });
    }

    setBio(newBio) {
        console.log("setBio fired");
        console.log("bio: ", newBio);
        this.setState({ bio: newBio });
    }

    render() {
        // if user is not logged in or database requests haven't been received
        // if (!this.state.id) {
        //     // return null;
        //     return (
        //         <div className="spinner_container">
        //             <img className="spinner" src="netzungSpinner.jpg"></img>
        //         </div>
        //     );
        // }
        return (
            <BrowserRouter>
                <div className={"app"}>
                    <div className="header">
                        <Logo />
                        <Link to="/users" className="findPeopleLink">
                            Find People
                        </Link>
                        <ProfilePic
                            // Passing down props:
                            first={this.state.first}
                            last={this.state.last}
                            profilePicUrl={this.state.profilepicurl}
                            // Passing down methods as standard functions (binding needed):
                            toggleUploader={this.toggleUploader}
                            size="small"
                        />
                    </div>
                    {this.state.uploaderVisible && (
                        <Uploader
                            userId={this.state.id}
                            setProfilePicUrl={this.setProfilePicUrl}
                        />
                    )}
                    <Route
                        exact
                        path="/"
                        render={() => (
                            <Profile
                                // Passing down props:
                                first={this.state.first}
                                last={this.state.last}
                                profilePicUrl={this.state.profilepicurl}
                                size="medium"
                                bio={this.state.bio}
                                // Passing down methods as standard functions (binding needed):
                                toggleUploader={this.toggleUploader}
                                setBio={this.setBio}
                            />
                        )}
                    />

                    <Route
                        path="/user/:id"
                        render={(props) => (
                            <OtherProfile
                                key={props.match.url}
                                match={props.match}
                                history={props.history}
                            />
                        )}
                    />

                    <Route
                        exact
                        path="/users"
                        render={() => (
                            <FindPeople
                                // Passing down props:
                                first={this.state.first}
                                last={this.state.last}
                                id={this.state.id}
                                // Passing down methods as standard functions (binding needed):
                            />
                        )}
                    />
                </div>
            </BrowserRouter>
        );
    }
}
