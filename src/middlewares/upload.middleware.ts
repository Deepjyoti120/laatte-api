// import * as multer from 'multer';
// import { Constants } from "../shared/constants";

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, "uploads/profile_photos/"); // Save to profile_photos folder
//     },
//     filename: (req, file, cb) => {
//         cb(null, `${Date.now()}-${file.originalname}`);
//     }
// });

// export const upload = multer({
//     storage: storage,
//     limits: { fileSize: Constants.MAX_FILE_SIZE }
// });

import { Request, Response, NextFunction } from "express";
import * as multer from 'multer';
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from "uuid";
import { getEnvironmentVariable } from "../environments/env";
// import * as dotenv from "dotenv";

// dotenv.config();

// Multer setup to store file in memory
const storage = multer.memoryStorage();
const upload = multer({ storage });

export const uploadMiddleware = upload.single("file");
export const uploadMultipleMiddleware = upload.array("files", 10);

export const uploadToS3Middleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded!" });
    }

    const fileKey = `${uuidv4()}-${req.file.originalname}`;
    const uploadParams = {
      Bucket: process.env.AWS_BUCKET_NAME!,
      Key: fileKey,
      Body: req.file.buffer,
      ContentType: req.file.mimetype,
    };

    await getEnvironmentVariable().s3.send(new PutObjectCommand(uploadParams));

    req.body.fileUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileKey}`;
    req.body.fileKey = fileKey;
    
    next();
  } catch (error) {
    console.error("S3 Upload Error:", error);
    res.status(500).json({ message: "File upload failed!", error });
  }
};
export const uploadMultipleToS3Middleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.files || !Array.isArray(req.files)) {
      return res.status(400).json({ message: "No files uploaded!" });
    }

    const uploadedFiles = await Promise.all(
      req.files.map(async (file: Express.Multer.File) => {
        const fileKey = `${uuidv4()}-${file.originalname}`;
        const uploadParams = {
          Bucket: process.env.AWS_BUCKET_NAME!,
          Key: fileKey,
          Body: file.buffer,
          ContentType: file.mimetype,
        };

        await getEnvironmentVariable().s3.send(new PutObjectCommand(uploadParams));

        return {
          fileUrl: `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileKey}`,
          fileKey,
        };
      })
    );

    req.body.files = uploadedFiles; // Store the uploaded file URLs in req.body

    next();
  } catch (error) {
    console.error("S3 Upload Error:", error);
    res.status(500).json({ message: "File upload failed!", error });
  }
};

