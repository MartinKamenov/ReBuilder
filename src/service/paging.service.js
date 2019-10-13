const elementsOnPage = 5;
const pagesMinimalCount = 5;

const pagingService = {
    getCollectionByPage: (collection, page) => {
        page = parseInt(page, 10);
        if(!page) {
            page = 1;
        }

        return collection.slice((page - 1) * elementsOnPage, page * elementsOnPage);
    },

    getPagesNumbers: (collection, page) => {
        const totalCountOfPages = Math.floor(collection / elementsOnPage);
        page = parseInt(page, 10);

        if(page < Math.floor(totalCountOfPages / 2) || totalCountOfPages <= pagesMinimalCount) {
            return new Array(totalCountOfPages);
        }

        let result = [];
        if(page >= totalCountOfPages - parseInt(totalCountOfPages / 2, 10)) {
            for(let i = totalCountOfPages - pagesMinimalCount; i <= totalCountOfPages; i++) {
                result.push(i);
            }

            return result;
        }

        result.push(page);
        for(let i = 1; i < Math.floor(pagesMinimalCount / 2); i++) {
            result.push(page + 1);
            result.push(page - 1);
        }

        return result.sort();
    },

    getTotalPagesCount: (collection) => {
        return Math.floor(collection / elementsOnPage);
    }
};

export default pagingService;