export const getPageCount = (totalCount, limit) => {
    if (limit <= 0) return 0; // Проверка на случай, если limit равен 0 или отрицательный
    return Math.ceil(totalCount / limit);
}

export const getPagesArray = (totalPages) => {
    if (totalPages <= 0) return []; // Проверка на случай, если totalPages равен 0 или отрицательный
    let result = [];
    for (let index = 0; index < totalPages; index++) {
        result.push(index + 1);
    }
    return result;
}