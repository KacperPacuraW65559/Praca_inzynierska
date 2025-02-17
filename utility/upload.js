
import multer from "multer";
import path from "path";

// zapis na dysk
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/resources/images");
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif/;
    const extName = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimeType = allowedTypes.test(file.mimetype);

    if (extName && mimeType) {
        cb(null, true);
    } else {
        cb(new Error("Możesz dodać tylko pliki graficzne!"));
    }
};

const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, //max 5mb
    fileFilter: fileFilter
});

export default upload;
