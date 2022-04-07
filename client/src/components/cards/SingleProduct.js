import React from 'react';
import {Card, Tabs} from 'antd';
import {Link} from 'react-router-dom';
import {HeartOutlined, ShoppingCartOutlined} from '@ant-design/icons';
import StarRating from 'react-star-ratings';

const {TabPane} = Tabs;

const SingleProduct = ({product}) => {
    const {title, images, description, _id} = product;
    return (
        <>
        <div className="col-md-5">
            <h1 className="bg-info p-3">{title}</h1>
            <StarRating
                name={_id}
                numberOfStars={5}
                rating={2}
                changeRating={(newRating, name) => console.log('newRating', newRating, 'name', name)}
                isSelectable={true}
                starRatedColor = "red"
            />
            <Card action={[
                <>
                <ShoppingCartOutlined className='text-success'/> <br />
                Add to cart
                </>,
                <Link to="/">
                    <HeartOutlined className='text-info' /> <br /> Add to Wishlist
                </Link>,
            ]}>
                <ProductListItems product={product} />
            </Card>
        </div>
        </>
    )
}