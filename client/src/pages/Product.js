import React, { useEffect, useState } from 'react'
import { getProduct, getProductsByCount } from '../functions/product'
import SingleProduct from '../components/cards/SingleProduct'
import { productStar } from '../functions/product'
import { useSelector } from 'react-redux'
import { getRelated } from '../functions/product'
import ProductCard from '../components/cards/ProductCard'

const Product = ({ match }) => {
  const [product, setProduct] = useState({})
  const [related, setRelated] = useState([])
  const [star, setStar] = useState(0)
  //redux
  const { user } = useSelector((state) => ({ ...state }))

  const { slug } = match.params

  useEffect(() => {
    loadSingleProduct()
  }, [slug])

  useEffect(() => {
    // console.log(product)
    // console.log(user)
    if (Object.keys(product).length > 0 && user) {
      let existingRatingObject = product.ratings.find(
        (ele) => ele.postedBy.toString() === user.user._id.toString(),
      )
      existingRatingObject && setStar(existingRatingObject.star) // current user's star
    }
  })

  const loadSingleProduct = () => {
    getProduct(slug).then((res) => {
      setProduct(res.data)
      //load related
      getRelated(res.data._id).then((res) => setRelated(res.data))
    })
  }

  const onStarClick = (newRating, name) => {
    setStar(newRating)
    productStar(name, newRating, user.token).then((res) => {
      console.log('rating clicked', res.data)
      loadSingleProduct()
    })
  }

  return (
    <div className="container-fluid">
      <div className="row pt-4">
        <SingleProduct product={product} onStarClick={onStarClick} star={star} />
      </div>
      <div className="row">
        <div className="col text-center pt-5 pb-5">
          <hr />
          <h4> Related Products</h4>
          <hr />
        </div>
      </div>
      <div class="row pb-5">
        {related.length ? (
          related.map((r) => (
            <div key={r._id} className="col-md-4">
              <ProductCard product={r} />
            </div>
          ))
        ) : (
          <div className="text-center">Không tìm thấy sản phẩm nào</div>
        )}
      </div>
    </div>
  )
}

export default Product
