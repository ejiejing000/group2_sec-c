const express = require ('express');
const router = expressRouter();

let products = [
    {id: 1, name: "Smartphone", category: "Electronics", price: 5000},
    {id: 1, name: "Gaming Chair", category: "Furniture", price: 3000}
]

const sendResponse = (res,status,data) => {
    res.status(status).json ({
        success : true,
        data : data,
        meta : {timestamp : new Date().toISOString(), count: Array.isArray(data) ? data.length : 1}
    
    });
}

router.get('/', (req, res) => {
    let result = products;
    if (req.query.category) {
        result = result.filter(p=> p.category === req.query.category);
    }
    sendResponse(res,200,result);
});

module.exports = router;