import express from 'express'
import express-fileupload from 'express-fileupload'
import cors from 'cors'


const upload = multer( {dest:'uploads/'})

const app = express()
app.use(cors())
app.use(express.json())
app.get('/uploads',async (req,res)=>{

})
let file
app.post("/uploads", upload.single("files"), uploadFiles);

function uploadFiles(req, res) {
    // console.log(req);
    file = req.file.path
    console.log(req.file);
    res.json({ message: "Successfully uploaded files",req:req.file, fileUrl:res.json({ fileUrl: 'http://localhost:5000/uploads/' + req.file.filename }) })
    
}
app.get("/uploads/:id",(req,res)=>{
    console.log('filename',file)
    res.sendFile('http://localhost:5000/'+file)
})
app.listen(5000,()=>console.log('app running on 5000'))