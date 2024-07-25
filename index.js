const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.json());

const dbConnection = mongoose.connect("mongodb://127.0.0.1:27017/sample")
.then((success)=>{
    console.log("Database Connected succcessfullyyy")
}).catch((err)=>{
    console.log("error",err);
});

const productSchema = new mongoose.Schema({
    name: String,
    age:Number,
    sub:String
});

const Product = mongoose.model('Product',productSchema);

app.get('/', (req,res)=>{
    res.status(200).json("Crud is working")
})
// create
app.post('/product/create/new',async(req,res)=>{

 try{
    const crtProduct = await Product.create(req.body);
    res.status(200).json({
       success:true,
       crtProduct
    })
    console.log("New data added in database",crtProduct)
    


 }
 catch (err){
    res.status(500,"Server error");
    console.log("error",err)
 }
})

//get
app.get('/product/getData',async(req,res)=>{
    const getProduct = await Product.find();
    res.status(200).json({
        success : true,
        getProduct
    })
    console.log(getProduct);
});

// update
app.put('/product/update/:id',async(req,res)=>{
    let updatedId = await Product.findById(req.params.id);
    updatedId = await Product.findByIdAndUpdate(req.params.id,req.body,{
     new:true,
     userFindAndModify : true,
     runValidators : true
    })
    res.status(200).json({
        success:true,
        updatedId
    });
})


// delete

app.delete('/product/delete/:id',async(req,res)=>{
    let dltproduct = await Product.findById(req.params.id);
    dltproduct = await Product.findByIdAndDelete(req.params.id,req.body,{
        new : true,
        userFindAndDelete:true,
        runValidators:true
    })
    res.status(200).json({
        success : true,
        dltproduct
    })
    console.log("Deleted Product ", dltproduct)
})
const port = 4200;
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
});