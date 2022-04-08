import React from 'react'
import CategoryList from '../components/category/CategoryList'

const Home = () => {
    return (
        <>
            <div>
                <p> React Home</p>
            </div>
            <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">
                Categories
            </h4>
            <CategoryList />
            <br />
            <br />
        </>
    );
};
export default Home;