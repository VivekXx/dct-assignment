import express from 'express'
import multer from 'multer'

const upload = multer({ dest:'/uploads'})
const router = express.Router()

router.post('/', async (req,res,next) => {
    try {
        console.log(res)

    } catch(err){
        res.status(400).json({
            error:'aahhh'
        })
    }
})