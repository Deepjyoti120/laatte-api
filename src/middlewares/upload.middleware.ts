import * as multer from 'multer';
import { Constants } from "../shared/constants";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/profile_photos/"); // Save to profile_photos folder
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

export const upload = multer({
    storage: storage,
    limits: { fileSize: Constants.MAX_FILE_SIZE }
});
