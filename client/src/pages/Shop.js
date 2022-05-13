import React, { useEffect, useState } from 'react'
import { getProductsByCount, fetchProductsByFilter } from '../functions/product'
import { useDispatch, useSelector } from 'react-redux'
import ProductCard from '../components/cards/ProductCard'
import { Menu, Slider, Checkbox, Radio } from 'antd'
import { getCategories } from '../functions/category'
import { getSubs } from '../functions/sub'
import { DollarOutlined, DownSquareOutlined, StarOutlined } from '@ant-design/icons'
import Star from '../components/forms/Star'


const { SubMenu, ItemGroup } = Menu;
const Shop = () => {
    const [products, setProducts] = useState([])
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

    const dispatch = useDispatch();
    const { search } = useSelector((state) => ({ ...state }))
    const { text } = search

    useEffect(() => {
        loadAllProducts();
        //fetch categories
        getCategories().then(res => setCategories(res.data));
        //fetch subCategories
        getSubs().then(res => setSubs(res.data));
    })

    //load products by default on page load
    const loadAllProducts = () => {
        getProductsByCount(12).then((p) => {
            if(p){
                setProducts(p.data);
                setLoading(false);
            }
        });
    };

    //load products on user search input
    useEffect(() => {
        const delayed = setTimeout(() => {
            fetchProducts({ query: text });
            if (text) {
                loadAllProducts();
            }
        }, 300)
        return () => clearTimeout(delayed)
    }, [text])

    const fetchProducts = (arg) => {
        fetchProductsByFilter(arg).then((res) => {
            setProducts(res.data);
        })
    }

    //load products based on price range
    useEffect(() => {
        fetchProducts({ price });
    }, [ok])

    const handleSlider = (value) => {
        dispatch({
            type: 'SEARCH_QUERY',
            payload: { text: "" }
        });

        //reset
        setCategoryIds([])
        setPrice(value);
        setStar("")
        setShipping('')
        setColor('')
        setBrand('')
        setSub("")
        setTimeout(() => {
            setOk(!ok);
        }, 300);
    }

    //load products based on category
    //show cateogories in a list of checkbox
    const showCategories = () => categories.map((c) => <div key={c._id}>
        <Checkbox onChange={handleCheck}
            className='pb-2 pl-4 pr-4'
            value={c._id}
            name="category"
            checked={categoryIds.includes(c._id)}>{c.name}</Checkbox>
    </div>)

    const handleCheck = (e) => {
        dispatch({
            type: 'SEARCH_QUERY',
            payload: { text: "" }
        });
        setStar("")
        setBrand('')
        setSub("")
        setShipping('')
        setColor('')
        setPrice([0, 0]);
        setTimeout(() => {
            setOk(!ok);
        }, 300);

        let inTheState = [...categoryIds]
        let justChecked = e.target.value
        let foundInTheState = inTheState.indexOf(justChecked);

        if (foundInTheState === -1) {
            inTheState.push(justChecked);
        } else {
            //if found pull out one item from index
            inTheState.splice(foundInTheState, 1)
        }

        setCategoryIds(inTheState);
        fetchProducts({ category: inTheState })
    }


    //load products by rating star
    const handleStarClick = num => {
        dispatch({
            type: 'SEARCH_QUERY',
            payload: { text: "" }
        });
        setPrice([0, 0]);
        setCategoryIds([]);
        setSub("")
        setColor('')
        setShipping('')
        setBrand('')
        setStar(num)
        fetchProducts({ stars: num });
    }
    const showStars = () => (
        <div className="px-4 pb-2">
            <Star starClick={handleStarClick} numberOfStars={5} />
            <Star starClick={handleStarClick} numberOfStars={4} />
            <Star starClick={handleStarClick} numberOfStars={3} />
            <Star starClick={handleStarClick} numberOfStars={2} />
            <Star starClick={handleStarClick} numberOfStars={1} />
        </div>
    )



    //show product by sub categories
    const showSubs = () => subs.map((s) => (
        <div key={s._id}
            onClick={() => handleSub(s)}
            className="m-1 p-1 badge badge-secondary"
            style={{ cursor: "pointer" }}
        >
            {s.name}
        </div>
    ))
    const handleSub = (sub) => {
        setSub(sub)
        dispatch({
            type: 'SEARCH_QUERY',
            payload: { text: "" }
        });
        setPrice([0, 0]);
        setCategoryIds([]);
        setStar('')
        setShipping('')
        setColor('')
        setBrand('')
        fetchProducts({ sub });
    }

    //show product base on brand name
    const showBrands = () =>
        brands.map((b) => (
            <Radio
                value={b}
                key={b}
                name={b}
                checked={b === brand}
                onChange={handleBrand}
                className="pb-1 px-4"
            >
                {b}
            </Radio>
        ))

    const handleBrand = (e) => {
        setSub('')
        dispatch({
            type: 'SEARCH_QUERY',
            payload: { text: "" }
        });
        setPrice([0, 0]);
        setCategoryIds([]);
        setStar('')
        setShipping('')
        setColor('')
        setBrand(e.target.value)
        fetchProducts({ brand: e.target.value });
    }

    //show product base on color
    const showColors = () => colors.map((c) => (
        <Radio
            value={c}
            key={c}
            name={c}
            checked={c === color}
            onChange={handleColor}
            className="pb-1 px-4"
        >
            {c}
        </Radio>
    ))

    const handleColor = (e) => {
        setSub('')
        dispatch({
            type: 'SEARCH_QUERY',
            payload: { text: "" }
        });
        setPrice([0, 0]);
        setCategoryIds([]);
        setStar('')
        setBrand('')
        setShipping('')
        setColor('e.target.value')
        fetchProducts({ color: e.target.value });
    }

    //show product base on shipping yes/no
    const showShipping = () => (
        <>
            <Checkbox className="pb-2 px-4"
                onChange={handleShippingchange}
                value="Yes"
                checked={shipping === "Yes"}
            >
                Yes
            </Checkbox>

            <Checkbox className="pb-2 px-4"
                onChange={handleShippingchange}
                value="No"
                checked={shipping === "No"}
            >
                No
            </Checkbox>
        </>
    )

    const handleShippingchange = (e) => {
        setSub('')
        dispatch({
            type: 'SEARCH_QUERY',
            payload: { text: "" }
        });
        setPrice([0, 0]);
        setCategoryIds([]);
        setStar('')
        setBrand('')
        setColor('')
        setShipping('e.target.value')
        fetchProducts({ shipping: e.target.value });
    }


    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-3 pt-2">
                    <h4>Search/Filter</h4>
                    <hr />
                    <Menu defaultOpenKeys={['1', '2', '3', '4', '5', '6', '7']} mode='inline'>
                        {/*price*/}
                        <SubMenu key={'1'} title={
                            <span className='h6'>
                                <DollarOutlined /> Price
                            </span>
                        }>
                            <div>
                                <Slider className='ml-4 mr-4' tipFormatter={(v) => `$${v}`}
                                    range value={price}
                                    onChange={handleSlider}
                                    max="10000"
                                />
                            </div>
                        </SubMenu>

                        {/*category*/}
                        <SubMenu key={'2'} title={
                            <span className='h6'>
                                <DownSquareOutlined /> Categories
                            </span>
                        }>
                            <div style={{ marginTop: "-10px" }}>
                                {showCategories()}
                            </div>
                        </SubMenu>

                        {/*star*/}
                        <SubMenu key={'3'} title={
                            <span className='h6'>
                                <StarOutlined /> Rating
                            </span>
                        }>
                            <div style={{ marginTop: "-10px" }}>
                                {showStars()}
                            </div>
                        </SubMenu>

                        {/*subCategory*/}
                        <SubMenu key={'4'} title={
                            <span className='h6'>
                                <DownSquareOutlined />Sub Categories
                            </span>
                        }>
                            <div style={{ marginTop: "-10px" }} className="px-4">
                                {showSubs()}
                            </div>
                        </SubMenu>

                        {/*Brand*/}
                        <SubMenu key={'5'} title={
                            <span className='h6'>
                                <DownSquareOutlined />Brands
                            </span>
                        }>
                            <div style={{ marginTop: "-10px" }} className="pr-5">
                                {showBrands()}
                            </div>
                        </SubMenu>

                        {/*Color*/}
                        <SubMenu key={'6'} title={
                            <span className='h6'>
                                <DownSquareOutlined />Colors
                            </span>
                        }>
                            <div style={{ marginTop: "-10px" }} className="pr-5">
                                {showColors()}
                            </div>
                        </SubMenu>

                        {/*Shipping*/}
                        <SubMenu key={'7'} title={
                            <span className='h6'>
                                <DownSquareOutlined />Shipping
                            </span>
                        }>
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
                        <h4 className="text-danger">Products</h4>
                    )}

                    {products.length < 1 && <p>No products found</p>}
                    <div className="row">
                        {products.map((p) => (
                            <div key={p._id} className="col-md-4">
                                <ProductCard product={p} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Shop;
