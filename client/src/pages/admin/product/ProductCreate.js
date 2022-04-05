import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { createProduct } from "../../../functions/product";
const initialState =   {
    title : "Macbook Pro" ,
    descriptioin : "This is product",
    price : "10000",
    categories : [],
    category : "",
    subs : "",
    shipping : "Yes",
    quantity : "4",
    images : [],
    colors : ["Black" , "Brown" , "Silver" , "White" , "Blue"] ,
    brands : ["Apple" , "Samsung" , "Microsoft" , "Lenovo" , "Asus"],
    color : "White",
    brand : "Apple"
};
const ProductCreate = () => {
const [values,setvalues] = useState(initialState);
//redux
const{ user } = useSelector((state) =>({...state}));
//d
const{title,descriptioin,price,categories,category,subs,shipping,quantity,images, colors,brands,color,brand,} = values; 
const handleSubmit = (e) =>{
    e.preventDefault();
    createProduct(values, user.token )
    .then((res)=>{
        console.log(res);
        window.alert(`"${res.data.title}" is created `);
        window.location.reload();
    })
    .catch((err)=>{
        console.log(err)
        if (err.response.status === 400) toast.error(err.response.data);


    })
};
const handleChange = (e) =>{
    setvalues({ ...values, [e.target.name]: e.target.value});
}
 return (
     <div className="container-fluid">
         <div className="row">
             <div className="col-md-2">
                  <AdminNav/>
             </div>
             <div className="col-md-10">
                 <h4>ProductCreate</h4>
                 <hr/>
                 <form onSubmit={handleSubmit}>
                     <div className="form-group">
                         <label>Title</label>
                         <input type="text" name="title" className="form-control" value={values.title} onChange={handleChange}/>
                     </div>
                     <div className="form-group">
                         <label>Descriptioin</label>
                         <input type="text" name="descriptioin" className="form-control" value={descriptioin} onChange={handleChange}/>
                     </div>
                     <div className="form-group">
                         <label>Price</label>
                         <input type="number" name="price" className="form-control" value={price} onChange={handleChange}/>
                     </div>
                     <div className="form-group">
                         <label>Shipping</label>
                         <option >Please select </option>

                          <select  name ="shipping" className="form-control" onChange={handleChange} >
                          <option value="No">No</option>
                          <option value="Yes">Yes</option>
                             
                          </select>
                     </div>
                     <div className="form-group">
                         <label>Quantity</label>
                         <input type="number" name="quantity" className="form-control" value={quantity} onChange={handleChange}/>
                     </div>
                     <div className="form-group">
                         <label>Color</label>
                         <select  name ="color" className="form-control" onChange={handleChange} >
                          <option >Please select </option>
                          {colors.map(c => <option key={c} value={c}>{c}</option>)}
                             
                          </select>
                     </div>
                     <div className="form-group">
                         <label>Brand</label>
                         <select  name ="brand" className="form-control" onChange={handleChange} >
                          <option >Please select </option>
                          {brands.map(b => <option key={b} value={b}>{b}</option>)}
                             
                          </select>
                     </div>
                     <button  className="btn btn-outline-info">Save</button>

                 </form>

                  </div>
         </div>

     </div>
 )
}
export default ProductCreate 