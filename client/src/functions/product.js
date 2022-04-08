export const productStar = async (productId, star, authtoken) =>
    await axios.put(`${process.env.REACT_APP_API}/product/star/${productId}`, {star}, {
        headers: {
            authtoken,
        }
    })

export const getRelated = async(productId) =>
    await axios.get(`${process.env.REACT_APP_API}/product/related/${productId}`);