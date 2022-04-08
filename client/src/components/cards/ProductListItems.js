import React from 'react'
import  {Link} from 'react-router-dom';

const ProductListItems = ({product}) => {
    const {price,category, subs,shiping, color, brand, quanitty,sold,} = product;
    return (
        <ul className="list-group">
            <li className="list-group-item">
                Price  {""}
                <span className="lable label-default label-pill pull-xs-right">
                    ${price}
                </span>
            </li>

           { category &&(  <li className="list-group-item">
                Category  {""}
                <Link to={`/category/${category.slug}`} 
                className="lable label-default label-pill pull-xs-right">
                    {category.name}
                </Link>
            </li>
           )}

           {subs && (
                   <li className="list-group-item">
                       Sub categories
                       {subs.map((s) =>   ( 
                 <Link
                    key={s._id}
                    to={`/sub/${s.slug}`} 
                    className="lable label-default label-pill pull-xs-right">
                    ${s.name}
                </Link>
                       ))}
                   </li>
           )}
          
             
            <li className="list-group-item">
                shiping  {""}
                <span className="lable label-default label-pill pull-xs-right">
                    {shiping}
                </span>
            </li>
            
            <li className="list-group-item">
                Color  {""}
                <span className="lable label-default label-pill pull-xs-right">
                    {color}
                </span>
            </li>
            <li className="list-group-item">
                Brand  {""}
                <span className="lable label-default label-pill pull-xs-right">
                    {brand}
                </span>
            </li>
            <li className="list-group-item">
                Availbable  {""}
                <span className="lable label-default label-pill pull-xs-right">
                    {quanitty}
                </span>
            </li>
            <li className="list-group-item">
                Sold  {""}
                <span className="lable label-default label-pill pull-xs-right">
                    {sold}
                </span>
            </li>

        </ul>
    );
};
export default ProductListItems;