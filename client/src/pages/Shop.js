import React, { useEffect, useState } from 'react'
import { getProductsByCount, fetchProductsByFilter } from '../functions/product'
import { useDispatch, useSelector } from 'react-redux'
import ProductCard from '../components/cards/ProductCard'
import { Menu, Slider } from 'antd'
import { DollarOulined } from '@ant-design/icons'


const { SubMenu, ItemGroup } = Menu;
const Shop = () => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false);
    const [price, setPrice] = useState([0, 0]);

    const { search } = useSelector((state) => ({ ...state }))
    const { text } = search

    useEffect(() => {
        loadAllProducts();
    })

    //load products by default on page load
    const loadAllProducts = () => {
        getProductsByCount(12).then((p) => {
            setProducts(p.data);
            setLoading(false);
        });
    };

    //load products on user search input
    useEffect(() => {
        const delayed = setTimeout(() => {
            fetchProducts({ query: text });
        }, 300)
        return () => clearTimeout(delayed)
    }, [text])

    const fetchProducts = (arg) => {
        fetchProductsByFilter(arg).then((res) => {
            setProducts(res.data);
        })
    }


    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-3 pt-2">
                    <h4>Search/Filter</h4>
                    <hr />
                    <Menu defaultOpenKeys={['1']} mode='inline'>
                        <SubMenu key={'1'} title={
                            <span className='h6'>
                                <DollarOutlined /> Price
                            </span>
                        }>
                            <div>
                                <Slideer className='ml-4 mr-4' tipFormatter={(v) => `$${v}`}
                                    range value={price}
                                    onChange={(value) => setPrice(value)}
                                    max="10000"
                                />
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