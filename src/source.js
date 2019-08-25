const axios = require("axios");
let re = "1";

axios.get("//mini.eastday.com/apidata/top20guoneijsonp.json")
.then(function(response){
    console.log(response);
}).catch(function(err){
    console.log(err);
});
exports.re = re;