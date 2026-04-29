/**
 * Utility Functions
 */

export const formatTime = (seconds) => {
    if (!seconds || isNaN(seconds)) return "0:00";
    
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    
    if (hours > 0) {
        return `${hours}:${minutes.toString().padStart(2, "0")}:${secs
            .toString()
            .padStart(2, "0")}`;
    }
    return `${minutes}:${secs.toString().padStart(2, "0")}`;
};

export const calculateProgress = (current, total) => {
    if (total === 0) return 0;
    return (current / total) * 100;
};

export const calculateTime = (percentage, total) => {
    return (percentage / 100) * total;
};

export const getInitials = (name) => {
    return name
        .split(" ")
        .map((word) => word[0])
        .join("")
        .toUpperCase();
};
