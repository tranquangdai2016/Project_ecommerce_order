import React from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { SearchOutlined } from '@ant-design/icons'

const Search = () => {
    const dispatch = useDispatch();
    const { search } = useSelector((state) => ({ ...state }));
    const { text } = search;

    const history = useHistory()

    const handleChange = (e) => {
        dispatch({
            type: 'SEARCH_QUERY',
            payload: { text: e.target.value }
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        history.push(`/shop?${text}`)
    }

    const stylesSearch = {
        margin: "0 0 0 -30px"
    }

    return (
        <form className='form-inline my-2 my-lg-0' onSubmit={handleSubmit} action="">
                <input
                    type="search"
                    value={text}
                    className='form-control mr-sm-2'
                    placeholder='Tìm kiếm'
                    onChange={ handleChange }
                />
                <SearchOutlined
                    onClick={handleSubmit}
                    style={stylesSearch}
                />
        </form>
    )
}

export default Search;
