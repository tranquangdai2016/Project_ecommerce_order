import React from 'react'

const Footer = () => {
  return (
    <div style={{background: '#1e293b'}}>
      <div>
        <img
          src="https://png2.cleanpng.com/sh/ec0003e23b86d9fb8ffc28a1c1728d0c/L0KzQYm3VMIzN6Z3iZH0aYP2gLBuTfRmdJp7feRELXb1dbruiQQufKNmhuV5b4L3PbT2jgB2fJZ3Rdtsb372PcPskPxmdpp4gN9uboSwRbLrgBI3a2M4etcBMUKxRoW5UsU4Pmc2TaQ9NEG3QYW9UsQ2PF91htk=/kisspng-delivery-freight-transport-computer-icons-replenishment-5adcb6c23be612.6422576615244141462454.png"
          alt="logo"
          style={{ width: '150px', height: '100px' }}
        />
      </div>
      <div
        style={{ display: 'flex', 'justify-content': 'center', gap: '15px', margin: '10px 0 0 0' }}
      >
        <p style={{ fontSize: '17px' }}>Giới thiệu</p>
        <p style={{ fontSize: '17px' }}>Chính sách</p>
        <p style={{ fontSize: '17px' }}>Quy định</p>
        <p style={{ fontSize: '17px' }}>Biểu phí</p>
        <p style={{ fontSize: '17px' }}>Hướng dẫn mua hàng</p>
      </div>
    </div>
  )
}
export default Footer
