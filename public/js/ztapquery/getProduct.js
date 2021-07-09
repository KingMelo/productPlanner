async function getProduct(productNumber){
    
  
    let queryString = options.hostname + '/api/1.5/subscriptions/' + productNumber + '/'
    const promise = axios.get(queryString, {
        headers: {
            'authorization': apiAuth.key,
            'x-organization': apiAuth.xOrg
        }
    })

    const dataPromise = promise.then((response) => response.data)

    return dataPromise

}exports.getProduct = getProduct;