import { GET_RESERVATION, GET_RESERVATIONS, POST_RESERVATION } from "../modules/reservationModule";

/* 회의실 예약 전체 조회(관리자) */
export const callReservationRoomListAPI = ({reservationNo}) => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/api/room/rvlist/${reservationNo}`;

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
            dispatch({ type: GET_RESERVATIONS, payload: result.data });
        }
    }
}

/* 회의실 예약 상세(회원) */
export const callReservationDetailAPI = ({reservationNo}) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/api/room/rvlists/${reservationNo}`;

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
            console.log('[ReservationAPICalls] callReservationDetailAPI result : ', result);
            dispatch({ type: GET_RESERVATION, payload: result.data });
        }
    }

}

/* 회의실 예약 리스트 조회(회원) */
export const callReservationListAPI = ({roomNo}) => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/api/room/rvlist/${roomNo}`;

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
            dispatch({ type: GET_RESERVATIONS, payload: result.data });
        }
    }
}

/* 회의실 예약 등록(회원) */
export const callReservationRegistAPI = ({form}) => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/api/room/rvlists`;

    return async (dispatch, getState) => {

        console.log('callReservationRegistAPI 동작 확인');

        const result = await fetch(requestURL, {
            method : "POST",
            headers : {
                "Content-Type" : "application/json",
                "Accept": "*/*",
                "Authorization" : "Bearer " + window.localStorage.getItem("accessToken")
            }
        })
        .then(response => response.json());

        if(result.status === 200) {
            console.log('[ReservationRegistAPICalls] callReservationRegistAPI result : ', result);
            dispatch({ type: POST_RESERVATION, payload: result.data });
        }
    }
}

/* 회의실 예약 수정(회원) */
// export const callReservationUpdateAPI = ({form}) => {

//     const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/api/room/rvlists`

//     return async (dispatch, getState) => {

//         const result = await fetch(requestURL, {

//         })
//     }
// }