import React from "react";
import { showAverage } from "../../functions/rating";

const {Meta} = Card;

const ProductCard = ({product}) =>{
    const {images, title, description, slug} = product;
    return(
        <>
        {product && product.ratings && product.ratings.length > 0 ? (
          showAverage(product)
        ) : (
          <div className="text-center pt-1 pb-3">No rating yet</div>
        )}
        <Card
            cover={
                <img />
            }
            actions={[
            <Link>
                <EyeOutlined/>
            </Link>,
            <>
                <ShoppingCartOutlined/> 
            </>
            ]}
        >
            <Meta 
                title ={title}
                description = {`${description && description.substring(0, 40)}...`}
            />
        </Card>
        </>
    )
}

export default ProductCard;