import React from 'react';
import {fetchStreams} from "../../actions";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import history from "../../history";

class StreamList extends React.Component{

    componentDidMount() {
        this.props.fetchStreams();
    }

    renderAdminButtons = (stream) => {
        if(this.props.currentUserId && stream.userId === this.props.currentUserId){
            return (
                <div className="right floated content">
                    <Link to={`/streams/edit/${stream.id}`} className="ui button primary">Edit</Link>
                    <Link to={`/streams/delete/${stream.id}`} className="ui button negative">Delete</Link>
                </div>
            );
        }
    };

    renderLiveIcon = (stream) =>{
           if(stream.isLive)
                return <button className="ui tiny red basic button" style={{position:"relative", left:"20px"}}>Live Stream</button>
    };

    renderList = () => {
        return this.props.streams.map(stream => {
            return(
                <div className="item"
                    key={stream.id}
                    onClick={()=>{history.push(`/streams/${stream.id}`)}}
                    style={{padding:"14px"}}
                >

                            {this.renderAdminButtons(stream)}
                            <i className="large middle aligned icon camera" style={{float:"left"}}/>
                            <div className="content" style={{width:"auto",float:"left"}}>

                                <Link to={`/streams/${stream.id}`}>{stream.title}</Link>
                                <div className="description">{stream.description}</div>
                            </div>
                            <div>
                                {this.renderLiveIcon(stream)}
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
                <h1 className="ui center aligned violet header">Streams</h1>
                <div className="ui celled list" style={{border:"3px dashed #6441A4"}}>{this.renderList()}</div>
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