import React from 'react';
import {productStar} from '../functions/product'
import {useSelector} from 'react-redux'

const Product = ({match}) =>{
    const [star, setStar] = useState(0);
    const {user} = useSelector((state) => ({ ...state}))

    useEffect(() => {
        if (product.ratings && user){
            let existingRatingObject = product.ratings.find((ele) => ele.postedBy.toString() === user._id.toString());
            existingRatingObject && setStar(existingRatingObject.star); // current user's star
        }
    })

    const onStarClick = (newRating, name) =>{
        setStar(newRating);
        productStar(name, newRating, user.token)
        .then(res =>{
            console.log('rating clicked', res.data);
            loadSingleProduct();
        })
    }
    return(
        <div className="container-fluid">
            <div className="row pt-4">
                <SingleProduct 
                product = {product} 
                onStarClick={onStarClick}
                star = {star}
                />
            </div>
            <div className="row">
                <div className="col text-center pt-5 pb-5">
                    <hr />
                    <h4>Related Products</h4>
                    <hr />
                </div>
            </div>
        </div>
    );
};
export default Product;