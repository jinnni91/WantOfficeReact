import { GET_ROOM, GET_ROOMS } from "../modules/roomModule";

export const callRoomListAPI = ({currentPage = 1}) => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/api/room/rooms?page=${currentPage}`;

    return async (dispatch, getState) => {

        console.log('callRoomListAPI 동작 확인');

        const result = await fetch(requestURL, {
            method : "GET",
            headers : {
                "Content-Type" : "application/json",
                "Accept": "*/*",
                "Authorization" : "Bearer " + window.localStorage.getItem("accessToken")
            }
        })
        .then(response => response.json());

        if(result.status === 200) {
            console.log('[RoomAPICalls] callRoomListAPI result : ', result);
            dispatch({ type: GET_ROOMS, payload: result.data });
        }
    }
}

export const callRoomDetailAPI = ({roomNo}) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/api/room/rooms/${roomNo}`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method : "GET",
            headers : {
                "Content-Type" : "application/json",
                "Accept": "*/*",
                "Authorization" : "Bearer " + window.localStorage.getItem("accessToken")
            
            }
        })
        .then(response => response.json());

        if(result.status === 200) {
            console.log('[RoomAPICalls] callRoomDetailAPI result : ', result);
            dispatch({ type: GET_ROOM, payload: result.data });
        }
    }

}

/* 회의실 예약 전체 조회 */
export const callReservationListAPI = ({currentPage = 1}) => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/api/room/rvlists?page=${currentPage}`;

    return async (dispatch, getState) => {

        console.log('callReservationListAPI 동작 확인');

        const result = await fetch(requestURL, {
            method : "GET",
            headers : {
                "Content-Type" : "application/json",
                "Accept": "*/*",
                "Authorization" : "Bearer " + window.localStorage.getItem("accessToken")
            }
        })
        .then(response => response.json());

        if(result.status === 200) {
            console.log('[ReservationAPICalls] callReservationListAPI result : ', result);
            dispatch({ type: GET_ROOMS, payload: result.data });
        }
    }
}