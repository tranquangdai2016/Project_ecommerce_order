import React, { useEffect, useState } from 'react'
import { getProductsByCount, fetchProductsByFilter } from '../functions/product'
import { getCategories } from '../functions/category'
import { getSubs } from '../functions/sub'
import { useSelector, useDispatch } from 'react-redux'
import ProductCard from '../components/cards/ProductCard'
import { Menu, Slider, Checkbox, Radio } from 'antd'
import { DollarOutlined, DownSquareOutlined, StarOutlined } from '@ant-design/icons'
import Star from '../components/forms/Star'

const { SubMenu, ItemGroup } = Menu;

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [price, setPrice] = useState([0, 0]);
    const [ok, setOk] = useState(false);
    const [categories, setCategories] = useState([]);
    const [categoryIds, setCategoryIds] = useState([]);
    const [star, setStar] = useState('');
    const [subs, setSubs] = useState([]);
    const [sub, setSub] = useState('');
    const [brands, setBrands] = useState(["Apple", "Samsung", "Microsoft", "Lenovo", "Asus"]);
    const [brand, setBrand] = useState('');
    const [colors, setColors] = useState(["Black", "Brown", "Silver", "White", "Blue"]);
    const [color, setColor] = useState('');
    const [shipping, setShipping] = useState('');


    let dispatch = useDispatch();
    let { search } = useSelector((state) => ({ ...state }));
    const { text } = search;

    useEffect(() => {
        loadAllProducts();

        //fecth categories
        getCategories().then((res) => setCategories(res.data));

        //fecth subcategories
        getSubs.then(res => setSubs(res.data));
    }, []);

    const fetchProducts = (arg) => {
        fetchProductsByFilter(arg).then((res) => {
            setProducts(res.data);
        });
    };

    //load prodcuts by default on page load
    const loadAllProducts = () => {
        getProductsByCount(12).then(p => {
            setProducts(p.data);
            setLoading(false);
        });
    };

    //load prodcuts on user search input
    useEffect(() => {
        const delayed = setTimeout(() => {
            fetchProducts({ query: text })
        }, 300);
        return () => clearTimeout(delayed);
    }, [text]);

    //load products base on price range
    useEffect(() => {
        fetchProducts({ price });
    }, [ok]);

    const handleSlider = (value) => {
        dispatch({
            type: "SEARCH_QUERY",
            payload: { text: "" },
        });

        //reset
        setCategoryIds([]);
        setPrice(value);
        setStar("");
        setSub('');
        setBrand('');
        setColor('');
        setShipping('');

        setTimeout(() => {
            setOk(!ok);
        }, 300);
    };

    //load products base on category
    //show category in a list of checkbox
    const showCategories = () => categories.map((e) => <div key={c._id}>
        <Checkbox
            onChange={handleCheck}
            className='pb-2 pl-2 pr-2'
            value={c._id}
            name='category'
            checked={categoryIds.includes(c._id)}
        >
            {c.name}
        </Checkbox>
    </div>)

    //handleCheck for categories
    const handleCheck = (e) => {
        //reset
        dispatch({
            type: "SEARCH_QUERY",
            payload: { text: "" },
        });
        setPrice([0, 0]);
        setStar("");
        setSub('');
        setColor('');
        setBrand('');
        setShipping('');

        let inTheState = [...categoryIds];
        let justChecked = e.target.value;
        let foundInTheState = inTheState.indexOf(justChecked) // return : index ? -1

        if (foundInTheState == -1) {
            inTheState.push(justChecked);
        } else {
            //if found pull out one item from index
            inTheState.splice(foundInTheState, 1)
        }

        setCategoryIds(inTheState);
        fetchProducts({ category: inTheState });
    }

    //Show products by star rating
    const handleStarClick = (num) => {
        dispatch({
            type: "SEARCH_QUERY",
            payload: { text: "" },
        });
        setPrice([0, 0]);
        setCategoryIds([]);
        setStar(num);
        setSub('');
        setColor('');
        setBrand('');
        setShipping('');
        fetchProducts({ star: num });
    }
    const showStars = () => {
        <div className="pr-4 pl-4 pb-2">
            <Star starClick={handleStarClick} numberOfStars={5} />
            <Star starClick={handleStarClick} numberOfStars={4} />
            <Star starClick={handleStarClick} numberOfStars={3} />
            <Star starClick={handleStarClick} numberOfStars={2} />
            <Star starClick={handleStarClick} numberOfStars={1} />
        </div>
    }

    //show products by subcategories
    const showSubs = () =>
        subs.map((s) =>
            <div
                key={s._id}
                onClick={() => handleSub(S)}
                className='p-1 m-1 badge badge-secondary'
                style={{ cursor: "pointer" }}>
                (s.name)
            </div>
        )

    const handleSub = (sub) => {
        setSub(sub)
        dispatch({
            type: "SEARCH_QUERY",
            payload: { text: "" },
        });
        setPrice([0, 0]);
        setCategoryIds([]);
        setStar('');
        setColor('');
        setBrand('');
        setShipping('');
        fetchProducts({ sub });
    }

    //show products base on brands
    const showBrands = () => brands.map((b) =>
        <Radio value={b} name={b} checked={b === brand} onChange={handleBrand} className="pb-1 pl-4 pr-4">
            {b}
        </Radio>
    )

    const handleBrand = (e) => {
        setSub('')
        dispatch({
            type: "SEARCH_QUERY",
            payload: { text: "" },
        });
        setPrice([0, 0]);
        setCategoryIds([]);
        setStar('');
        setColor('');
        setShipping('');
        setBrand(e.target.value)
        fetchProducts({ brand: e.target.value });
    }

    //show products base on colors
    const showColors = () => colors.map((c) =>
        <Radio value={c} name={c} checked={c === color} onChange={handleColor} className="pb-1 pl-4 pr-4">
            {c}
        </Radio>
    )

    const handleColor = (e) => {
        setSub('')
        dispatch({
            type: "SEARCH_QUERY",
            payload: { text: "" },
        });
        setPrice([0, 0]);
        setCategoryIds([]);
        setStar('');
        setBrand('');
        setShipping('');
        setColor('e.target.value')
        fetchProducts({ color: e.target.value });
    }

    //show products base on shipping yes or no
    const showShipping = () => (
        <>
            <Checkbox onChange={handleShippingChange} className="pb-1 pl-4 pr-4" value={'Yes'} checked={shipping == 'Yes'}>
                Yes
            </Checkbox>
            <Checkbox onChange={handleShippingChange} className="pb-1 pl-4 pr-4" value={'No'} checked={shipping == 'No'}>
                No
            </Checkbox>
        </>
    )

    const handleShippingChange = (e) => {
        setSub('')
        dispatch({
            type: "SEARCH_QUERY",
            payload: { text: "" },
        });
        setPrice([0, 0]);
        setCategoryIds([]);
        setStar('');
        setBrand('');
        setColor('');
        setShipping('e.target.value')
        fetchProducts({ shipping: e.target.value });
    }

    return (
        <div className='container-fluid'>
            <div className='row'>
                <div className="col-md-3 pt-2">
                    <h4>Search/filter</h4>
                    <hr />
                    <Menu defaultOpenKeys={["1", "2", "3", "4", "5", "6", "7"]} mode='inline'>
                        {/**price */}
                        <SubMenu key={"1"} title={<span className='h6'> <DollarOutlined />Price </span>}>
                            <div>
                                <Slider
                                    className='ml-4 mr-4'
                                    tipFormatter={(v) => `VNĐ ${v}`}
                                    range value={price}
                                    onChange={handleSlider}
                                    max='1000000000'
                                />
                            </div>
                        </SubMenu>

                        {/**categories */}
                        <SubMenu key={"2"} title={<span className='h6'> <DownSquareOutlined />Categories </span>}>
                            <div style={{ marginTop: "-10px" }}>
                                {showCategories()}
                            </div>
                        </SubMenu>

                        {/** star rating */}
                        <SubMenu key={"3"} title={<span className='h6'> <StarOutlined />Rating </span>}>
                            <div style={{ marginTop: "-10px" }}>
                                {showStars()}
                            </div>
                        </SubMenu>

                        {/** sub categories */}
                        <SubMenu key={"4"} title={<span className='h6'> <DownSquareOutlined />Sub Categories </span>}>
                            <div style={{ marginTop: "-10px" }} className="pr-4 pl-4">
                                {showSubs()}
                            </div>
                        </SubMenu>

                        {/** sub brands */}
                        <SubMenu key={"5"} title={<span className='h6'> <DownSquareOutlined />Sub Brands </span>}>
                            <div style={{ marginTop: "-10px" }} className="pr-5">
                                {showBrands()}
                            </div>
                        </SubMenu>

                        {/** sub Colors */}
                        <SubMenu key={"6"} title={<span className='h6'> <DownSquareOutlined />Sub Colors </span>}>
                            <div style={{ marginTop: "-10px" }} className="pr-5">
                                {showColors()}
                            </div>
                        </SubMenu>

                        {/** sub Shippings */}
                        <SubMenu key={"7"} title={<span className='h6'> <DownSquareOutlined />Sub Shippings </span>}>
                            <div style={{ marginTop: "-10px" }} className="pr-5">
                                {showShipping()}
                            </div>
                        </SubMenu>

                    </Menu>
                </div>
                <div className="col-md-9 pt-2">
                    {loading ? (
                        <h4 className="text-danger">Loading...</h4>
                    ) : (
                        <h4 className="text-danger">Producs</h4>
                    )}

                    {products.length < 1 && <p>No products found</p>}

                    <div className="row pb-5">
                        {products.map((p) => (
                            <div key={p._id} className="col-md-4 mt-3">
                                <ProductCard product={p} />
                            </div>
                        ))};
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Shop;