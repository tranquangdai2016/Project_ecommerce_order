import React, { useState, useEffect } from "react";
import { getSub } from "../../functions/sub";
import ProductCard from "../../components/cards/ProductCard";


const SubHome = ({ match }) => {
  const [sub, setSub] = useState({});
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const { slug } = match.params;

  useEffect(() => {
    setLoading(true);
    getSub(slug).then((res) => {
      console.log(JSON.stringify(res.data, null, 4));
      setSub(res.data.sub);
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
              {products.legth}Product in "{sub.name}" sub category
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

export default SubHome;
