import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import {
    updateSub,
    getSub,
} from "../../../functions/sub";
import { getCategories } from "../../../functions/category";
import CategoryForm from "../../../components/forms/CategoryForm";


const SubUpdate = ({match, history}) => {
  const { user } = useSelector((state) => ({ ...state }));
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [parent, setParent] = useState([]);

  useEffect(() => {
    loadCategories();
    loadSub();
  }, []);

  const loadCategories = () =>
    getCategories().then((c) => setCategories(c.data));

    const loadSub = () => getSub(match.params.slug).then((s) => {
        setName(s.data.name);
        setParent(s.data.parent)
    });

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    updateSub(match.params.slug,{ name, parent }, user.token)
      .then((res) => {
        setLoading(false);
        setName("");
        toast.success(`"${res.data.name}" is update`);
        history.push("/admin/sub")
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
        if (err.response.status === 400) toast.error(err.response.data);
      });
  };

  
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col">
          {loading ? (
            <h4 className="text-danger">Loading...</h4>
          ) : (
            <h4> Update Sub Category </h4>
          )}

          <div className="form-group">
              <label>Parent Category</label>
              <select 
              name="category" 
              className="form-control" 
              onChange={(e) => setParent(e.target.value)}>

                  <option>Please select</option>
                { categories.length > 0 && categories.map((c) => (
                <option key={c._id} value={c._id} selected={c._id === parent}>
                    {c.name}
                </option>
                ))}
              </select>
          </div>

          {/* {JSON.stringify(category)} */}

          <CategoryForm 
          handleSubmit={handleSubmit} 
          name={name} 
          setName={setName}
          />
        </div>
      </div>
    </div>
  );
};

export default SubUpdate;
