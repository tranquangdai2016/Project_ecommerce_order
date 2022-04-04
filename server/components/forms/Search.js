import React from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { SeachOutlined } from '@ant-design/icons'

const Search = () => {
    const dispatch = useDispatch();
    const { search } = useSelector((state) => ({ ...state }));
    const { text } = search;

    const history = useHistory();

    const handleChange = (0) = {
        //
    }

    const handleSubmit = (0) = {
        //
    }

    return (
        <form className='form-inline my-2 my-lg-0' onSubmit={handleSubmit}>
            <input type="search" value={text} className='form-control mr-sm-2' placeholder='Seach' />
            <SearchOulined onClick={handleSubmit} style={{ cursor: "pointer" }} />
        </form>
    )
};

export default Search;