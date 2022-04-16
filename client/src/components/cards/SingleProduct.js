import React from "react";
import { Card, Tabs } from "antd";
import { Link } from "react-router-dom";
import { HeartOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import StarRating from "react-star-ratings";
import RatingModal from "../modal/RatingModal";
import { showAverage } from "../../functions/rating";
import {addToWishlist} from "../../functions/user";
import {toast} from "react-toastify";
import {useHistory} from "react-router-dom";


const { TabPane } = Tabs;

const SingleProduct = ({ product, onStarClick, star }) => {

  //router
  let history = useHistory();

  const { title, images, description, _id } = product;

  const handleAddToWishlist = e => {
    e.preventDefault();
    addToWishlist(product._id, user.token).then(res => {
      toast.success('Added to wishlist')
      history.push('/user/wishlist')
    })
  }

  return (
    <>
      <div className="col-md-5">
        <h1 className="bg-info p-3">{title}</h1>

        {product && product.ratings && product.ratings.length > 0 ? (
          showAverage(product)
        ) : (
          <div className="text-center pt-1 pb-3">No rating yet</div>
        )}

        <Card
          action={[
            <>
              <ShoppingCartOutlined className="text-success" /> <br />
              Add to cart
            </>,
            <a onClick={handleAddToWishlist}>
              <HeartOutlined className="text-info" /> <br /> Add to Wishlist
            </a>,
            <RatingModal>
              <StarRating
                name={_id}
                numberOfStars={5}
                rating={star}
                changeRating={onStarClick}
                isSelectable={true}
                starRatedColor="red"
              />
            </RatingModal>,
          ]}
        >
          <ProductListItems product={product} />
        </Card>
      </div>
    </>
  );
};
export default SingleProduct;
