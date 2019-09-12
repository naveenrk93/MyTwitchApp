import React from 'react';
import {fetchStreams} from "../../actions";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class StreamList extends React.Component{

    componentDidMount() {
        this.props.fetchStreams();
    }

    renderAdminButtons = (stream) => {
        console.log(this.props.currentUserId);
        if(this.props.currentUserId && stream.userId === this.props.currentUserId){
            return (
                <div className="right floated content">
                    <Link to={`/streams/edit/${stream.id}`} className="ui button primary">Edit</Link>
                    <Link to={`/streams/delete/${stream.id}`} className="ui button negative">Delete</Link>
                </div>
            );
        }
    };

    renderList = () => {
        return this.props.streams.map(stream => {
            return(
                <div className="item" key={stream.id}>
                    {this.renderAdminButtons(stream)}
                    <i className="large middle aligned icon camera"/>
                    <div className="content">
                        <Link to={`/streams/${stream.id}`}>{stream.title}</Link>
                        <div className="description">{stream.description}</div>
                    </div>
                </div>
            );
        });
    };

    renderCreate = () => {
        if(this.props.isSignedIn)
            return (
                <div className="ui right floated button teal" style={{textAlign: "right"}}>
                    <Link style={{color: "white"}} to={'/streams/new'}>Create Stream</Link>
                </div>);

    };

    render = () => {
        return (
            <div>
                <h2>Streams</h2>
                <div className="ui celled list">{this.renderList()}</div>
                {this.renderCreate()}
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        streams: Object.values(state.streams),
        currentUserId: state.auth.userId,
        isSignedIn: state.auth.isSignedIn
    };

};

export default connect(mapStateToProps, {fetchStreams})(StreamList);