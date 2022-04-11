import React, { useState } from "react";
import { Card, Tooltip } from "antd";
import { EyeOutlined, ShoppingCartOutlined } from "@ant-design/icons";
// import laptop from "../../images/laptop.png";
import { Link } from "react-router-dom";
import _ from "lodash";

const { Meta } = Card;

const ProductCard = ({ product }) => {
  const [tooltip, setTooltip] = useState("Click to add");

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
    }
  }

  //destructure
  const { images, title, description, slug, price } = product;
  return (
    <Card
      // cover={
      //   <img
      //     src={images && images.length ? images[0].url : laptop}
      //     style={{ height: "150px", objectFit: "cover" }}
      //     className="p-1"
      //   />
      // }
      actions={[
        <Link to={`/product/${slug}`}>
          <EyeOutlined className="text-warning" />
          <br /> View Product
        </Link>,
        <Tooltip title={tooltip}>
          <a onClick={handleAddToCart}>
            <ShoppingCartOutlined className="text-danger" /> <br /> Add to card{" "}
          </a>
        </Tooltip>,
      ]}
    >
      <Meta
        title={`${title} + VNĐ ${price}`}
        description={`${description && description.substring(0, 40)}...`}
      />
    </Card>
  );
};

export default ProductCard;
