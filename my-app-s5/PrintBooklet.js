/**
 * Sample Outputs of function - `getEightPages()`
 * getEightPages(1) returns [1,3,5,7,4,2,8,6]
 * getEightPages(9) returns [9, 11, 13, 15, 12, 10, 16, 14]
 */
function getEightPages(initialPage) {
    const pages = [];
    pages.push(initialPage);
    pages.push(initialPage + 2);
    pages.push(initialPage + 4);
    pages.push(initialPage + 6);
    pages.push(initialPage + 3);
    pages.push(initialPage + 1);
    pages.push(initialPage + 7);
    pages.push(initialPage + 5);
    return pages;
}

function getAllPages(startPage, endPage) {
    const allPages = [];
    for (let start = startPage; start < endPage; start += 8) {
        allPages.push(...getEightPages(start));
    }
    return allPages;
}

// console.log(getAllPages(1, 16));
console.log(getAllPages(9, 32)); // book - "kaamsat**" (32 pages = 3 full a4 sheets => 12 sheets mini-25%-a4 sheets)