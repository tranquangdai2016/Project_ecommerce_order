export const productStar = async (productId, star, authtoken) =>
    await axios.put(`${process.env.REACT_APP_API}/product/star/${productId}`, {star}, {
        headers: {
            authtoken,
        }
    })