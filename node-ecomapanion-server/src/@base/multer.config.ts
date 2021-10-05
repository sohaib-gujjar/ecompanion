
import { extname, dirname } from 'path';
import { existsSync, mkdirSync } from 'fs';
import multer, { diskStorage } from 'multer';
import HttpException from './exception/HttpException';

const util = require("util");
const maxSize = 10 * 1024 * 1024;

const uploadPathAvatar = './uploads/avatars';
const uploadPathMessage = './uploads/files';


const storage = diskStorage({
    destination: function(req: any, file: any, cb: any) {
        let uploadPath = "src/upload";
        if(req.originalUrl.includes('/auth/')) {
            uploadPath = uploadPathAvatar;
        }
        else if(req.originalUrl.includes('/message/')) {
            uploadPath = uploadPathMessage;
        }
        // Create folder if doesn't exist
        mkdirRecursive(uploadPath);
        cb(null, uploadPath);
    },
    
    filename: function(req: any, file: any, cb: any) {
        console.log(file.fieldname, file.originalname);
        cb(null, file.fieldname + '-' + Date.now() + extname(file.originalname));
    }
});


const imageFilter = function(req: any, file: any, cb: any) {
    // Accept images only
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
        req.fileValidationError = 'Only image files are allowed!';
        return cb(new HttpException(403, 'Only image files are allowed!'), false);
    }
    // Allow storage of file
    else {
        cb(null, true);
    }
};

let uploadSingleImageMiddleware = multer({
    storage: storage,
    fileFilter: imageFilter,
    limits: { fileSize: maxSize }
  });


function mkdirRecursive(dir: string) {
    if (existsSync(dir)) {
      return true;
    }
    const dirRecursive = dirname(dir);
    mkdirRecursive(dirRecursive);
    mkdirSync(dir);
  }

export default uploadSingleImageMiddleware;