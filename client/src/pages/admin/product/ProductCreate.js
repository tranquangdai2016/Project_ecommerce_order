import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { createProduct } from "../../../functions/product";
import ProductCreateForm from "../../../components/forms/ProductCreateForm";
import { getCategories , getCategorySubs } from "../../../functions/category";
import FileUpload from "../../../components/forms/FileUpload";


const initialState =   {
    title : "" ,
    descriptioin : "",
    price : "",
    categories : [],
    category : "",
    subs : "",
    shipping : "Yes",
    quantity : "",
    images : [],
    colors : ["Black" , "Brown" , "Silver" , "White" , "Blue"] ,
    brands : ["Apple" , "Samsung" , "Microsoft" , "Lenovo" , "Asus"],
    color : "",
    brand : ""
};
const ProductCreate = () => {
const [values,setvalues] = useState(initialState);
const [subOptions, setSubOptions] = useState([]);
const [showSub, setShowSub] = useState(false);
const [loading , setLoading] = useState(false);
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
    // if (localStorage.token) {
    //     setAuthToken(localStorage.token);
    //   }
    console.log("")
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
    setvalues({...values, subs:[] ,category: e.target.value});
    getCategorySubs(e.target.value)
    .then(res=>{
      console.log('SUB OPTION CATEGORY CLICK',res);
      setSubOptions(res.data);
    });
    setShowSub(true);
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
                 {/* {JSON.stringify(values.images)} */}
                 <div className="p-3">
                     <FileUpload values={values}  setvalues={setvalues} setLoading={setLoading} />

                 </div>
                 <ProductCreateForm 
                 handleSubmit={handleSubmit} 
                 handleChange={handleChange} 
                 setvalues={setvalues}
                 values={values} 
                 handleCategoryChange={handleCategoryChange}
                 subOptions={subOptions}
                 showSub={showSub}
                 />
                 

                </div>
         </div>
     </div>
 );
};
export default ProductCreate
