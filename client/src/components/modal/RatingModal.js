import React, {useState} from 'react';
import {Modal, Button} from 'antd';
import {Toast} from 'react-toastify';
import {useSelector} from 'react-redux';
import {StarOutlined} from '@ant-design/icons'

const RatingModal = ({children}) =>{
    const{user} = useSelector((state) => ({ ...state }));
    const [modalVisible, setModalVisible] = useState(false);

    return(
        <>
        <div onClick={()=>setModalVisible(true)}>
            <StarOutlined classname ="text-danger"/> <br/> {""}
            {user ? "Leave rating": "Login to leave rating"}
        </div>
        <Modal
            title="Leave your rating"
            centered
            visible={modalVisible}
            onOk={()=>{
                setModalVisible(false)
                Toast.success('Thanks for your review')
            }}
            onCancel={()=>setModalVisible(false)}
        >{children}</Modal>
        </>
    )
};

export default RatingModal;
