import {
    SIGN_IN,
    SIGN_OUT,
    CREATE_STREAM,
    DELETE_STREAM,
    EDIT_STREAM,
    FETCH_STREAM,
    FETCH_STREAMS
} from "./types";
import history from "../history";
import streams from "../apis/streams";
import RTMP from "../apis/RTMP";

export const signIn = (userId) => {
    return{
        type: SIGN_IN,
        payload: userId
    };
};

export const signOut = () => {
    return{
        type: SIGN_OUT
    };
};

export const createStream = formValues => async (dispatch, getState) => {
    const userId = getState().auth.userId;
    const response = await streams.post("/streams", { ...formValues, userId, isLive:false });
    dispatch({
        type: CREATE_STREAM,
        payload: response.data
    });
    history.push('/');
};

export const fetchStreams = () => async dispatch => {
  const response = await streams.get('/streams');
  const LiveStreams = await RTMP.get('/api/streams');
  const actualResponse = response.data.map((stream => {
      if(LiveStreams.data.live && LiveStreams.data.live.length>stream.id && LiveStreams.data.live[stream.id] && LiveStreams.data.live[stream.id].publisher)
          return {...stream, isLive: true};
      else
          return {...stream, isLive: false};

  }));

  dispatch({
      type: FETCH_STREAMS,
      payload: actualResponse
  });
};

export const fetchStream = (id) => async dispatch => {

  const response = await streams.get(`/streams/${id}`);
  dispatch({
      type: FETCH_STREAM,
      payload: response.data
  });
};

export const editStream = (id, formValues) => async dispatch => {

    const response = await streams.patch(`/streams/${id}`, formValues);
    dispatch({
        type: EDIT_STREAM,
        payload: response.data
    });
    history.push('/');
};

export const deleteStream = (id) => async dispatch => {
  await streams.delete(`/streams/${id}`);
  dispatch({
      type: DELETE_STREAM,
      payload: id
  });
  history.push('/');
};