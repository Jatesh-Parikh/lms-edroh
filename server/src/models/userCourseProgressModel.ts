import { Schema, model } from "dynamoose";

const chapterProgressSchema = new Schema({
    chapterId: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        required: true
    }
});

const sectionProgressSchema = new Schema({
    sectionId: {
        type: String,
        required: true
    },
    chapters: {
        type: Array,
        schema: [chapterProgressSchema]
    }
});