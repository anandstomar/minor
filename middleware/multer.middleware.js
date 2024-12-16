const multer = require('multer')
const path = require('path')

const storage = destination => multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null,`Images/${destination}`);
    },
    filename: function(req,file,cb){
        cb(null,(file.originalname));
    }
});

module.exports = {
    uploadCustomer: multer({storage: storage('CustomerImages')}).single('file'),
};