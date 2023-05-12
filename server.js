const express = require("express")
require("./src/db/conn")
const router = require("./src/routes/productRouter");

const app= express()
const port = process.env.PORT || 4000;
app.use(express.json())  // to use json format data in express

app.use(router)

app.listen(port,()=>{
    console.log(`Server is started on port ${port}`)
})