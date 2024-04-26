import {addRandomChar, deleteRandomChar, swapAdjacentChars} from "./stringUtils";

export const handleError = (errorType, randomField, value, maxFieldLength) => {
    switch (errorType) {
        case 0:
            if (randomField === 0 && value.length > 1) return deleteRandomChar(value);
            break;
        case 1:
            if (randomField === 0 && value.length < maxFieldLength) return addRandomChar(value);
            break;
        case 2:
            if (randomField === 0 && value.length > 1) return swapAdjacentChars(value);
            break;
        default:
            console.warn('Unknown error type:', errorType);
            break;
    }
    return value;
};