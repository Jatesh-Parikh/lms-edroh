import path from "path";

export const updateCourseVideoInfo = (
    course: any,
    sectionId: string,
    chapterId: string,
    videoUrl: string
) => {
    const section = course.sections?.find((s: any) => s.sectionId === sectionId);
    if(!section) {
        throw new Error(`Section not found: ${sectionId}`);
    }

    const chapter = section.chapters?.find((c: any) => c.chapterId === chapterId);
    if(!chapter) {
        throw new Error(`Chapter not found: ${chapterId}`);
    } 

    chapter.video = videoUrl;
    chapter.type = "Video";
};

export const validateUploadedFiles = (files: any) => {
    const allowedExtensions = [".mp4", ".m3u8", ".mpd", ".ts", ".m4s"];
    for (const file of files) {
        const ext = path.extname(file.originalname).toLowerCase();
        if(!allowedExtensions.includes(ext)) {
            throw new Error(`Unsupported file type: ${ext}`);
        }
    }
};

export const getContentType = (filename: string) => {
    const ext = path.extname(filename).toLowerCase();
    switch(ext) {
        case ".mp4":
            return "video/mp4";
        case ".m3u8":
            return "application/vnd.apple.mpegurl";
        case ".mpd":
            return "application/dash+xml";
        case ".ts":
            return "video/MP2T";
        case ".m4s":
            return "video/iso.segment";
        default:
            return "application/octet-stream";
    }
};