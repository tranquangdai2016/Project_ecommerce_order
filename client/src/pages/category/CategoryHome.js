import React, { useState, useEffect } from "react";
import { getCategory } from "../../functions/category";
import ProductCard from "../../components/cards/ProductCard";


const CategoryHome = ({ match }) => {
  const [category, setCategory] = useState({});
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const { slug } = match.params;

  useEffect(() => {
    setLoading(true);
    getCategory(slug).then((res) => {
      console.log(JSON.stringify(res.data, null, 4));
      setCategory(res.data.category);
      setProducts(res.data.products);
      setLoading(true);
    });
  }, []);

  return (
    <div className="container-fluid">
      <div class="row">
        <div class="col">
          {loading ? (
            <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">
              Loading...
            </h4>
          ) : (
            <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">
              {products.legth}Product in "{category.name}" category
            </h4>
          )}
        </div>
      </div>
      <div class="row">
          {products.map((p)=> <div className="col" key={p._id}>
              <ProductCard product={p} />
          </div>)}
      </div>
    </div>
  );
};

export default CategoryHome;
