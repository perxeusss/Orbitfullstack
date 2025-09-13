import dataUriParser from "datauri/parser.js" ;
import path from "path" ;


// here file is being converted into uri

const getDataUri = (file) => {
    if(!file) return null ;
    
    const parser = new dataUriParser() ;
    const extName = path.extname(file.originalname).toString() ;
    return parser.format(extName, file.buffer) ;
}

export default getDataUri ;