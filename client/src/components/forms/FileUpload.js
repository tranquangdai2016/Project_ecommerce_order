import React from "react";
import Resizer from 'react-image-file-resizer';
import axios from "axios";
import { useSelector } from "react-redux";
import { Avatar } from "antd";
const FileUpload = ({values,setValues , setLoading}) =>{
    const  { user } = useSelector((state)=>({...state}));
    const fileUploadAndResize = (e) =>{
        // console.log(e.target.files);

        let files = e.target.files;
        let allUploadedFiles = values.images;

        if(files){
            setLoading(true)
           for(let i=0; i<files.length;i++){
               Resizer.imageFileResizer(files[i],720,720,'JPEG',100,(uri)=>{
                //    console.log(uri);
                axios.post(`${process.env.REACT_APP_API}/uploadimages`,{image:uri},{
                    Headers: {
                        authtoken : user ? user.token : "",
                    },
                }
               )
               .then(res=>{
                   console.log('IMAGE UPLOAD RES DATA' ,res)
                   setLoading(false);
                   allUploadedFiles.push(res.data);
                   setValues({...values, images:allUploadedFiles})
               })
               .catch(err=>{
                   setLoading(false)
                   console.log('CLOUDINARY UPLOAD ERR',err);
               })
               },
               "base64"
               )
           };
        }
         
    };
    return(
    <>
    <div className="row">
        {values.imageS && values.images.map((image)=>( 
          <Avatar key={image.public_id} src={image.url} size={60} className="m-3"/>
        ))}
    </div>
     <div className="row">
       <label className="btn btn-primary btn-raised">Choose File</label>
       <input type="file"  multiple accept="image/=" onChange={fileUploadAndResize}></input>
    </div>
    </>
    );
}
export default FileUpload;