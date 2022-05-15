import React from 'react'
import Jumbotron from '../components/cards/Jumbotron'
import NewArrivals from '../components/home/NewArrivals'
import BestSellers from '../components/home/BestSellers'
import CategoryList from '../components/category/CategoryList'
import SubList from '../components/sub/SubList'
import BannerPage from '../components/cards/BannerPage'
import Footer from '../components/cards/Foodter'

const Home = () => {
  return (
    <div className="container">
      <div className="jumbotron text-danger h1 font-weight-bold text-center">
        <div>
          <img
            src="https://png2.cleanpng.com/sh/ec0003e23b86d9fb8ffc28a1c1728d0c/L0KzQYm3VMIzN6Z3iZH0aYP2gLBuTfRmdJp7feRELXb1dbruiQQufKNmhuV5b4L3PbT2jgB2fJZ3Rdtsb372PcPskPxmdpp4gN9uboSwRbLrgBI3a2M4etcBMUKxRoW5UsU4Pmc2TaQ9NEG3QYW9UsQ2PF91htk=/kisspng-delivery-freight-transport-computer-icons-replenishment-5adcb6c23be612.6422576615244141462454.png"
            alt="logo"
            style={{ width: '150px', height: '100px' }}
          />
          <p style={{ fontSize: '20px', color: 'black' }}>Order.com</p>
          {/* <p style={{ fontSize: '20px', color: 'black' }}>Order hàng Quảng Châu</p> */}
        </div>
        <Jumbotron text={['Order hàng Quảng Châu']} style={{ marginTop: '15px' }} />
      </div>

      <div className="text-center p-3 mt-5 mb-5 display-3 jumbotron">
        <BannerPage />
      </div>

      <div className="text-center p-3 mt-5 mb-5 display-3 jumbotron">
        <p
          style={{
            background: 'black',
            color: 'white',
            width: '400px',
            fontSize: '30px',
            marginLeft: 'auto',
            marginRight: 'auto',
            'border-radius': '5px',
          }}
        >
          XEM TẤT CẢ . NEW ARRIVALS
        </p>
      </div>
      <NewArrivals />

      {/* <h4 className="text-center p-3 mt-5 mb-5 display-3 jumbotron"> BestSellers</h4>
      <BestSellers /> */}
      <div className="text-center p-3 mt-5 mb-5 display-4 jumbotron">
        <p
          style={{
            background: 'black',
            color: 'white',
            width: '350px',
            fontSize: '30px',
            marginLeft: 'auto',
            marginRight: 'auto',
            'border-radius': '5px',
          }}
        >
          XEM TẤT CẢ . CATEGORIES
        </p>
      </div>
      <CategoryList />

      <div className="text-center p-3 mt-5 mb-5 display-4 jumbotron">
        <p
          style={{
            background: 'black',
            color: 'white',
            width: '450px',
            fontSize: '30px',
            marginLeft: 'auto',
            marginRight: 'auto',
            'border-radius': '5px',
          }}
        >
          XEM TẤT CẢ . SUB CATEGORIES
        </p>
      </div>
      <SubList />
      <div className="text-center p-3 mt-5 mb-5 display-3 jumbotron">
        <Footer />
      </div>
    </div>
  )
}
export default Home
