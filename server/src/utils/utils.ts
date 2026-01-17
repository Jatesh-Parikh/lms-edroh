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

// Preserved HLS/DASH logic for future use
export const handleAdvancedVideoupload = () => {};

export const mergeSections = (
    existingSections: any[],
    newSections: any[]
): any[] => {
    const existingSectionsMap = new Map<string, any>();
    for(const existingSection of existingSections) {
        existingSectionsMap.set(existingSection.sectionId, existingSection);
    }

    for (const newSection of newSections) {
        const section = existingSectionsMap.get(newSection.sectionId);
        if(!section) {
            // Add a section
            existingSectionsMap.set(newSection.sectionId, newSection);
        } else {
            // Merge chapters within the existing section
            section.chapters = mergeChapters(section.chapters, newSection.chapters);
            existingSectionsMap.set(newSection.sectionId, section);
        }
    }

    return Array.from(existingSectionsMap.values());
};

export const mergeChapters = (
    existingChapters: any[],
    newChapters: any[]
): any[] => {
    const existingChaptersMap = new Map<string, any>();
    for (const existingChapter of existingChapters) {
        existingChaptersMap.set(existingChapter.chapterId, existingChapter);
    }

    for (const newChapter of newChapters) {
        existingChaptersMap.set(newChapter.chapterId, {
            ...(existingChaptersMap.get(newChapter.chapterId) || {}),
            ...newChapter,
        });
    }
    
    return Array.from(existingChaptersMap.values());
};

export const calculateOverallProgress = (sections: any[]): number => {
    const totalChapters = sections.reduce((acc: number, section: any) => {
        return acc + section.chapters.length;
    }, 0);

    const completedChapters = sections.reduce((acc: number, section: any, ) => {
        return acc + section.chapters.filter((chapter: any) => chapter.completed).length;
    }, 0);

    return totalChapters > 0 ? (completedChapters / totalChapters) * 100 : 0;
};