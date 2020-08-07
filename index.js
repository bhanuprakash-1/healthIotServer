const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
const papaParser = require('papaparse');
const fs = require('fs');
const csv = require('csv-parser');

const app = express();
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



app.get("/hello", (req, res) => {

    i=0;
    output= [];
    fs.createReadStream('./IOT-temp.csv')
      .pipe(csv())
      .on('data', function(data){
          try {
            //   console.log(data);
              output.push(data);
            }
            catch(err) {
                //error handler
            }
        })
      .on('end',function(){
    //some final operation
        // console.log(output);
        res.send(output);
       });  
  });

app.get('/login/:username/:password',(req, res) => {
    console.log(req.params);
    var user_name=req.params.username;
    var password=req.params.password;
    console.log("User name = "+user_name+", password is "+password);
    res.end("yes");
});



app.listen(1234, () => {
  console.log("Server is listening on port: 1234 ","http://localhost:1234/hello");

});