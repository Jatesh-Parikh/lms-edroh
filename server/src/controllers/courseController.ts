import { Request, Response } from "express";
import Course from "../models/courseModel";
import AWS from "aws-sdk";
import { v4 as uuidv4 } from "uuid";
import { getAuth } from "@clerk/express";

const s3 = new AWS.S3();

export const listCourses = async (req: Request, res: Response): Promise<void> => {
    const { category } = req.query;
    try {
        const courses = category && category !== "all" ? 
            await Course.scan("category").eq(category).exec() : 
            await Course.scan().exec();

        res.json({ message: "Courses retrieved successfully", data: courses });
    } catch (error) {
        res.status(500).json({ message: "Error retrieving courses", error });
    }
};