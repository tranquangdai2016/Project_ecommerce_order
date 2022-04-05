import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { createProduct } from "../../../functions/product";
import ProductCreateForm from "../../../components/forms/ProductCreateForm";
import {getCategories , getCategorySubs} from "../../../functions/category";
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
const [subOptions, setSubOptions] = useState([]);
const [showSub, setShowSub] = useState(false);
//redux
const{ user } = useSelector((state) =>({...state}));
useEffect(() => {
    loadCategories();
  }, []);
  const loadCategories = () =>
  getCategories().then((c) => setvalues({...values, categories: c.data}));
//d

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
        // if (err.response.status === 400) toast.error(err.response.data);
        toast.error(err.response.data.err);


    })
};
const handleChange = (e) =>{
    setvalues({ ...values, [e.target.name]: e.target.value});
};
const handleCategoryChange = (e)=>{
    e.preventDefault()
    console.log('click category', e.target.value);
    setvalues({...values,category: e.target.value});
    getCategorySubs(e.target.value)
    .then(res=>{
      console.log('SUB OPTION CATEGORY CLICK',res);
      setSubOptions(res.data);
    });
};


 return (
     <div className="container-fluid">
         <div className="row">
             <div className="col-md-2">
                  <AdminNav/>
             </div>
             <div className="col-md-10">
                 <h4>ProductCreate</h4>
                 <hr/>
                 <ProductCreateForm 
                 handleSubmit={handleSubmit} 
                 handleChange={handleChange} 
                 values={values} 
                 handleCategoryChange={handleCategoryChange}
                 subOptions={subOptions}
                 showSub={showSub}
                 />
                 

                  </div>
         </div>

     </div>
 )
}
export default ProductCreate
