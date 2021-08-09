const router = require('express').Router();
const File = require('../models/file');

//http://localhost:3000/files/03f5912b-7e58-4727-ac3b-d47cd963be48 ---- a link like this will hit, then the floowing get method will called
router.get('/:uuid', async(req, res)=>{
    try{

        const file = await File.findOne( {uuid: req.params.uuid});
        if (!file){
            return res.render('downloadPage', {error: "The link you are looking for is expired"});
        }

        return res.render('downloadPage',{
            uuid: file.uuid,
            fileName: file.filename,
            fileSize: file.size,
            download: `${process.env.APP_BASE_URL}/files/download/${file.uuid}`
        });

    }catch{
        return res.render('downloadPage', {error: "Something went wrong while downloading"});
    }
});
module.exports = router;