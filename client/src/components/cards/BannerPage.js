import React from 'react'
import {
  FieldTimeOutlined,
  CustomerServiceOutlined,
  HistoryOutlined,
  ClockCircleOutlined,
} from '@ant-design/icons'

const BannerPage = () => {
  return (
    <div className="banner">
      <div>
        <h2>
          <strong>HỖ TRỢ ĐẶT HÀNG TRUNG QUỐC</strong>
        </h2>
        <span style={{ fontSize: '15px' }}>
          Tư vấn, tìm kiếm nguồn hàng và nhập hàng trực tuyến từ các website hàng đầu Trung Quốc
        </span>
      </div>
      <div>
        <img src="http://baogam.com/wp-content/themes/baogam/assets/images/pc.png" alt="banner" />
      </div>
      <h3 style={{ margin: '15px 0 0 0', background: '#f8fafc' }}>
        <strong>ĐẶC ĐIỂM CỦA DỊCH VỤ</strong>
      </h3>
      <div
        style={{
          display: 'grid',
          'justify-content': 'space-evenly',
          'grid-template-columns': '500px 500px',
          gap: '5px',
          padding: '10px',
          background: '#f8fafc',
        }}
      >
        <div>
          <FieldTimeOutlined />
          <div>
            <h3>KHÔNG CÓ THỜI GIAN TRỄ</h3>
            <p style={{ fontSize: '15px' }}>
              Quý khách chủ động với toàn bộ quy trình nạp tiền, thanh toán và đặt hàng tự động
            </p>
          </div>
        </div>

        <div>
          <HistoryOutlined />
          <h3>CAM KẾT MUA HÀNG TRONG 24H</h3>
          <p style={{ fontSize: '15px' }}>
            Miễn phí mua hàng nếu mua quá thời gian chúng tôi cam kết
          </p>
        </div>

        <div>
          <CustomerServiceOutlined />
          <h3>HỖ TRỢ TRỤC TUYẾN 24/7</h3>
          <p style={{ fontSize: '15px' }}>
            Luôn sẵn sàng giải quyết thắc mắc Quý khách kể cả ngoài khung giờ làm việc
          </p>
        </div>

        <div>
          <ClockCircleOutlined />
          <h3>TIẾT KIỆM THỜI GIAN QUẢN LÝ</h3>
          <p style={{ fontSize: '15px' }}>
            Hệ thống quản lý thông minh, giúp Quý khách chủ động theo dõi thông tin đơn hàng mọi lúc
            mọi nơi
          </p>
        </div>
      </div>
    </div>
  )
}

export default BannerPage
