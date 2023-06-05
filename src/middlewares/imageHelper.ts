import multer, { StorageEngine } from "multer";
import { Request } from "express";

const storageProfile: StorageEngine = multer.diskStorage({
  destination: function (req: Request, file, cb) {
    cb(null, "../public/profileImg");
  },
  filename: function (req: Request, file, cb) {
    const fileName = file.fieldname + "-" + Date.now();
    req.body.profileImage = fileName; // Guarda la ruta en req.body.profileImage
    cb(null, fileName);
  },
});

const uploadProfile = multer({ storage: storageProfile });
const uploadedProfile = uploadProfile.single("imgFile");

const storageCollection: StorageEngine = multer.diskStorage({
  destination: function (req: Request, file, cb) {
    cb(null, "../public/galleryImg");
  },
  filename: function (req: Request, file, cb) {
    const fileName = file.fieldname + "-" + Date.now();
    req.body.galleryImage = fileName; // Guarda la ruta en req.body.galleryImage
    cb(null, fileName);
  },
});

const uploadCollection = multer({ storage: storageCollection });
const uploadedCollection = uploadCollection.single("imgCollection");

export default { uploadedProfile, uploadedCollection };
