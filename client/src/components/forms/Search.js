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

    const outlinedStyle = {
        cursor: "pointer",
        outline: "none",
        border: "none",
    }

    return (
        <form className='form-inline my-2 my-lg-0' onSubmit={handleSubmit} action="">
            <div style={{display: "flex",}}>
                <input
                    type="search"
                    value={text}
                    className='form-control mr-sm-2'
                    placeholder='Search'
                    onChange={ handleChange }

                />
                <div>
                    <SearchOutlined
                        onClick={handleSubmit}
                        style={{ outlinedStyle }}
                    />
                </div>
            </div>
        </form>
    )
}

export default Search;
