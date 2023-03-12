const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app=express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",(req,res)=>{
    res.sendFile(__dirname + "/signup.html");
});


app.post("/",(req,res)=>{
    const name = req.body.fname;
    const email = req.body.email;
    
    const data={
        members: [
            {
            email_address: email,
            status: "subscribed",
            merge_fields:{
                FNAME: name
            }
        }
    ]    
    };

    const jsonData = JSON.stringify(data);

    const url="https://us13.api.mailchimp.com/3.0/lists/8a23dc8211";

    const options = {
        method: "POST",
        auth: "malar:98dc85ba45796693f3acf7ec5aa91079-us13"
    }

    const request = https.request(url,options,(response)=>{

        if(response.statusCode === 200){
            res.sendFile(__dirname + "/success.html");
        }else{
            res.sendFile(__dirname + "/failure.html");
        }

        response.on("data",(data)=>{
            console.log(JSON.parse(data));
        })
    })

    request.write(jsonData);
    request.end();
})


app.post("/failure",(req,res)=>{
    res.redirect("/");
})

app.listen(process.env.PORT || 3000,()=>{
    console.log("Server is running!!!...");
});



//api key
//98dc85ba45796693f3acf7ec5aa91079-us13

//unique id
// 8a23dc8211
