import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import {
    createSub,
    getSub,
    removeSub,
    getSubs,
} from "../../../functions/sub";
import { getCategories } from "../../../functions/category";
import { Link } from "react-router-dom";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import CategoryForm from "../../../components/forms/CategoryForm";
import LocalSearch from "../../../components/forms/LocalSearch";

const SubCreate = () => {
  const { user } = useSelector((state) => ({ ...state }));

  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [subs, setSubs] = useState([]);
  const [category, setCategory] = useState("");

  //set 1
  const [keyword, setKeyword] = useState("");


  useEffect(() => {
    loadCategories();
    loadSubs();
  }, []);

  const loadCategories = () =>
    getCategories().then((c) => setCategories(c.data));

    const loadSubs = () => getSubs().then((s) => setSubs(s.data));

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    createSub({ name, parent: category }, user.token)
      .then((res) => {
        setLoading(false);
        setName("");
        toast.success(`"${res.data.name}" is created`);
        loadSubs();
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
        if (err.response.status === 400) toast.error(err.response.data);
      });
  };

  const handleRemove = async (slug) => {
    if (window.confirm("Delete?")) {
      setLoading(true);
      removeSub(slug, user.token)
        .then((res) => {
          setLoading(false);
          toast.error(`${res.data.name} deleted`);
          loadSubs();
        })
        .catch((err) => {
          if (err.response.status === 400) {
            setLoading(false);
            toast.error(err.response.data);
          }
        });
    }
  };

  //step 3
 

  //step 4
  const searched = (keyword) => (c) => c.name.toLowerCase().includes(keyword)

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
            <h4> Create Sub Category </h4>
          )}

          <div className="form-group">
              <label>Parent Category</label>
              <select 
              name="category" 
              className="form-control" 
              onChange={(e) => setCategory(e.target.value)}>

                  <option>Please select</option>
                { categories.length > 0 && categories.map((c) => (
                <option key={c._id} value={c._id}>
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
          {/* step 2 and step 3 */}
          <hr />
          <LocalSearch 
          keyword={keyword} 
          setKeyword={setKeyword} 
          />

          {/* step 5 */}
          {subs.filter(searched(keyword)).map((s) => (
            <div className="alert alert-primary" key={s._id}>
              {s.name}
              <span
                onClick={() => handleRemove(s.slug)}
                className="btn btn-sm float-right"
              >
                <DeleteOutlined className="text-danger" />
              </span>
              <Link to={`/admin/sub/${s.slug}`}>
                <span className="btn btn-sm float-right">
                  <EditOutlined className="text-warning" />
                </span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SubCreate;
