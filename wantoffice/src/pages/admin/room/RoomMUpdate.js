import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { callRoomDetailAPI, callRoomMUpdateAPI } from '../../../apis/RoomAPICalls';
import RoomMUpdateCSS from '../room/RoomMUpdate.module.css';

function RoomMUpdate(){

    const params = useParams();
    const roomDetail = useSelector(state => state.roomReducer);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const imageInput = useRef();
    const [image, setImage] = useState(null);
    const [fileUrl, setFileUrl] = useState(null);
    const [form, setForm] = useState({});

    const [modifyMode, setModifyMode] = useState(false);

    useEffect(() => {
        dispatch(callRoomDetailAPI({
            roomNo : params.roomNo
        }));
    }
    ,[]);

    useEffect(() => {
        if(image) {
            const fileReader = new FileReader();
            fileReader.onload = (e) => {
                const { result } = e.target;
                if(result) {
                    setFileUrl(result);
                }
            }
            fileReader.readAsDataURL(image);
        }
    },
    [image]);

    /* 입력 양식의 값 변경 이벤트 */
    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name] : e.target.value
        });
    }

    /* 이미지 첨부 클릭 이벤트 */
    const onClickImageUpload = (e) => {
        imageInput.current.click();
    }

    /* 파일 첨부 이벤트 */
    const onChangeImageUpload = (e) => {

        const image = e.target.files[0];

        setImage(image);
    }

    /* 수정모드 시 이벤트 */
     const onClickModifyModeHandler = () => {
        setModifyMode(true);
        setForm({
            roomNo : roomDetail.roomNo,
            roomName : roomDetail.roomName,
            roomLocation : roomDetail.roomLocation,
            roomCapacity : roomDetail.roomCapacity
        });
    }

    /* 수정 저장버튼 이벤트 */
    const onClickRoomMUpdateHandler = () => {

        const formData = new FormData();

        formData.append("roomNo", form.roomNo);
        formData.append("roomName", form.roomName);
        formData.append("roomLocation", form.roomLocation);
        formData.append("roomCapacity", form.roomCapacity);

        if(image) {
            formData.append("roomImage", image);
        }

        dispatch(callRoomMUpdateAPI({
            form : formData
        }));

        navigate('/room', { replace : true });
        window.location.reload();
    }


    return(
       <>
        <div>
           {!modifyMode &&
            <button
                className={ RoomMUpdateCSS.roomBtnDiv }
                onClick={ onClickModifyModeHandler }
                >수정 모드</button>
           }
           {modifyMode &&
            <button
                className={ RoomMUpdateCSS.roomBtnDiv }
                onClick={ onClickRoomMUpdateHandler }
                >수정하기</button>
           }
        </div>
        <div className={ RoomMUpdateCSS.roomSection }>
           <div className={ RoomMUpdateCSS.roomInfoDiv }>
              <div className={ RoomMUpdateCSS.roomImgDiv }>
                    { roomDetail && <img
                        className={ RoomMUpdateCSS.roomImage }
                        src={ (fileUrl == null) ? roomDetail.roomFileUrl : fileUrl }
                        alt="preview"
                    />}
                    <input 
                        type="file"
                        name='roomImage'
                        accept='image/jpg,image/png,image/jpeg,image/gif'
                        onChange={ onChangeImageUpload }
                        ref={ imageInput }
                    />
                    <button
                        className={ RoomMUpdateCSS.roomImageBtn }
                        onClick={ onClickImageUpload }
                        style={ !modifyMode ? {backgroundColor : 'gray'} : null}
                        disabled={ !modifyMode }>
                            이미지 업로드
                    </button>
              </div>
           </div>
           <div className={ RoomMUpdateCSS.roomInfoDiv }>
                <table>
                    <tbody>
                        <tr>
                            <td><label>회의실 명칭</label></td>
                            <td>
                                <input
                                    name='roomName'
                                    placeholder='회의실 명칭'
                                    type='text'
                                    className={ RoomMUpdateCSS.roomInfoInput }
                                    onClick={ onChangeHandler }
                                    value={ (!modifyMode ? roomDetail.roomName : form.roomName) || 0 }
                                    readOnly={ modifyMode ? false : true }
                                    style={ !modifyMode ? { backgroundColor : 'gray'} : null }
                                    />
                            </td>
                        </tr>
                        <tr>
                            <td><label>회의실 위치</label></td>
                            <td>
                                <label>
                                    <input
                                        name='roomLocation'
                                        type='radio'
                                        onClick={ onChangeHandler }
                                        value="3층"
                                        readOnly={ modifyMode ? false : true }
                                        checked={ (!modifyMode ? roomDetail.roomLocation : form.roomLocation) == '3층' ? true : false }
                                    />
                                    3층
                                </label> &nbsp;
                                <label>
                                <input
                                        name='roomLocation'
                                        type='radio'
                                        onClick={ onChangeHandler }
                                        value="4층"
                                        readOnly={ modifyMode ? false : true }
                                        checked={ (!modifyMode ? roomDetail.roomLocation : form.roomLocation) == '4층' ? true : false }
                                    />
                                    4층
                                </label> &nbsp;
                                <label>
                                <input
                                        name='roomLocation'
                                        type='radio'
                                        onClick={ onChangeHandler }
                                        value="5층"
                                        readOnly={ modifyMode ? false : true }
                                        checked={ (!modifyMode ? roomDetail.roomLocation : form.roomLocation) == '5층' ? true : false }
                                    />
                                    5층
                                </label> 
                            </td>
                            </tr>
                            <tr>
                                <td><label>회의실 입실가능 인원</label></td>
                                <td>
                                    <input
                                        name='roomCapacity'
                                        type='number'
                                        placeholder='회의실 수용 인원'
                                        className={ RoomMUpdateCSS.roomInfoInput }
                                        onClick={ onChangeHandler }
                                        value={ (!modifyMode ? roomDetail.roomCapacity : form.roomCapacity) || 0}
                                        readOnly={ modifyMode ? false : true }
                                        style={ !modifyMode ? { backgroundColor : 'gray'} : null }
                                        />
                                </td>
                            </tr>
                      </tbody>
                </table>
           </div>
        </div>
       </>
    );

}

export default RoomMUpdate;