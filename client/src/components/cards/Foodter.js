import React from 'react'
import { EnvironmentOutlined, MailOutlined, PhoneOutlined } from '@ant-design/icons'
import { Input, Button } from 'antd'

const Footer = () => {
  return (
    <div style={{ background: '#f1f5f9', 'border-radius': '5px' }}>
      <div>
        <img
          src="https://png2.cleanpng.com/sh/ec0003e23b86d9fb8ffc28a1c1728d0c/L0KzQYm3VMIzN6Z3iZH0aYP2gLBuTfRmdJp7feRELXb1dbruiQQufKNmhuV5b4L3PbT2jgB2fJZ3Rdtsb372PcPskPxmdpp4gN9uboSwRbLrgBI3a2M4etcBMUKxRoW5UsU4Pmc2TaQ9NEG3QYW9UsQ2PF91htk=/kisspng-delivery-freight-transport-computer-icons-replenishment-5adcb6c23be612.6422576615244141462454.png"
          alt="logo"
          style={{ width: '150px', height: '100px' }}
        />
      </div>
      <div
        style={{
          display: 'flex',
          'justify-content': 'space-around',
          gap: '5px',
          margin: '45px 0 0 0',
        }}
      >
        <p style={{ fontSize: '20px' }}>
          <b>Giới thiệu</b>
        </p>

        <p style={{ fontSize: '17px' }}>
          <b>Chính sách</b>
        </p>

        <p style={{ fontSize: '17px' }}>
          <b>Hướng dẫn mua hàng</b>
        </p>
      </div>
      <div
        style={{
          display: 'grid',
          'grid-template-columns': 'auto auto auto',
          gap: '20px',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'flex-start', 'flex-direction': 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <EnvironmentOutlined
              style={{ fontSize: '16px', display: 'flex', 'justify-content': 'flex-start' }}
            />
            <p
              style={{
                fontSize: '15px',
                display: 'flex',
                'justify-content': 'flex-start',
                margin: '-3px 6px',
              }}
            >
              <b>CÔNG TY TNHH 6 THÀNH VIÊN ORDER.COM</b>
            </p>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <PhoneOutlined
              style={{ fontSize: '16px', display: 'flex', 'justify-content': 'flex-start' }}
            />
            <p
              style={{
                fontSize: '17px',
                display: 'flex',
                'justify-content': 'flex-start',
                margin: '-3px 6px',
              }}
            >
              0865854463
            </p>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <MailOutlined
              style={{ fontSize: '16px', display: 'flex', 'justify-content': 'flex-start' }}
            />
            <p
              style={{
                fontSize: '17px',
                display: 'flex',
                'justify-content': 'flex-start',
                margin: '-3px 6px',
              }}
            >
              order@gmail.com
            </p>
          </div>
        </div>
        <div>
          <p style={{ fontSize: '17px' }}>
            <b>CHÍNH SÁCH THÀNH VIÊN</b>
          </p>
          <p style={{ fontSize: '17px' }}>
            <b>CHÍNH SÁCH ĐỔI TRẢ</b>
          </p>
          <p style={{ fontSize: '17px' }}>
            <b>CHÍNH SÁCH VẬN CHUYỂN</b>
          </p>
        </div>
        <div>
          <p style={{ fontSize: '17px' }}>
            <b>ĐĂNG KÍ NHẬN THÔNG TIN</b>
          </p>
          <div style={{ margin: '-20px 0 0 0' }}>
            <Input size="middle" placeholder="Email" style={{ width: '300px' }} />
            <Button>Đăng kí</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Footer
