import React, { useState } from "react";
import { Card, Descriptions, Tabs, Tooltip } from "antd";
import { Link } from "react-router-dom";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
// import Laptop from "../../images/laptop.png";
import ProductListItems from "./ProductListItems";

import _ from "lodash";
import { useSelector, useDispatch } from "react-redux";

const { TabPane } = Tabs;

const SingleProduct = ({ product }) => {
  const [tooltip, setTooltip] = useState("Click to add");
  //redux
  const { user, cart } = useSelector((state) => ({ ...state }))
  const dispatch = useDispatch();

  const { title, images, description } = product;

  const handleAddToCart = () => {
    //create cart array
    let cart = [];
    if (typeof window !== 'undefined') {
      //Nếu có cart ở localstorage thì GET
      if (localStorage.getItem('cart')) {
        cart = JSON.parse(localStorage.getItem('cart'))
      }
      //push new product to cart
      cart.push({
        ...product,
        count: 1
      })
      //remove duplicates
      let unique = _.uniqWith(cart, _.isEqual)
      //save to localstorage
      //console.log('unique', unique);
      localStorage.setItem("cart", JSON.stringify(unique));
      //show tooltip
      setTooltip("Added");

      //add to redux state
      dispatch({
        type: "ADD_TO_CART",
        payload: unique,
      })
    }
  }

  return (
    <>
      <div className="col-md-7">
        {/* {images && images.length ? (
          <Carousel showArrows={true} autoPlay infiniteLoop>
            {images && images.map((i) => <img src={i.url} key={i.public_id} />)}
          </Carousel>
        ) : (
          <Card cover={<img src={Laptop} className="mb-3 card-image" />} ></Card>
        )} */}

        <Tabs type="card">
          <TabPane tab="Description" key="1">
            {description && description}
          </TabPane>
          <TabPane tab="More" key="2">
            Call use on xxxx xxx xxx to learn more about this product
          </TabPane>
        </Tabs>
      </div>

      <div className="col-md-5">
        <h1 className="bg-info p-3">{title}</h1>
        <Card
          actions={[
            <Tooltip title={tooltip}> 
              <a onClick={handleAddToCart}>
                <ShoppingCartOutlined className="text-danger" /> <br /> Add to card{" "}
              </a>
            </Tooltip>,
            // <Link to="/">
            //   <HearOutlined className="text-info" /> <br /> Add to Wishlist
            // </Link>,
          ]}
        >
          <ProductListItems product={product} />
        </Card>
      </div>
    </>
  );
};
export default SingleProduct;
