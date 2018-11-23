module.exports = function (options) {
    //Import the mock data json file
    const mockData = require('./MOCK_DATA.json');

    //To DO: Add the patterns and their corresponding functions
    this.add('role:product,cmd:getProductPrice', productPrice);

   
    //To DO: add the pattern functions and describe the logic inside the function
    function productPrice(msg, respond) {
        if(msg.productId){
            var product = mockData.find(product => product.product_id == msg.productId)
            respond(null, { result: product.product_price })
        }else{
            respond(null, { result: ''});
        }
    }
}