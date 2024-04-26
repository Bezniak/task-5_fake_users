export const addRandomChar = (str) => {
    const randomIndex = Math.floor(Math.random() * (str.length - 1));
    const randomChar = str[randomIndex];
    return str.slice(0, randomIndex) + randomChar + str.slice(randomIndex);
};

export const deleteRandomChar = (str) => {
    const randomIndex = Math.floor(Math.random() * (str.length - 1));
    return str.slice(0, randomIndex) + str.slice(randomIndex + 1);
};

export const swapAdjacentChars = (str) => {
    const randomIndex = Math.floor(Math.random() * (str.length - 1));
    return str.slice(0, randomIndex) + str[randomIndex + 1] + str[randomIndex] + str.slice(randomIndex + 2);
};
