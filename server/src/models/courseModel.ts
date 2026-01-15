import { Schema, model } from "dynamoose";

const commentSchema = new Schema({
    commentId: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    timestamp: {
        type: String,
        required: true
    }
});

const chapterSchema = new Schema({
    chapterId: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ["Text", "Quiz", "Video"],
        required: true
    },
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    comments: {
        type: Array,
        schema: [commentSchema]
    },
    video: {
        type: String
    }
});

const sectionSchema = new Schema({
    sectionId: {
        type: String,
        required: true
    },
    sectionTitle: {
        type: String,
        required: true
    },
    sectionDescription: {
        type: String,
    },
    chapters: {
        type: Array,
        schema: [chapterSchema]
    },
});