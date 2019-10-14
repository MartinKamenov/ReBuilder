const elementsOnPage = 6;
const pagesMinimalCount = 5;

const pagingService = {
    getCollectionByPage: (collection, page) => {
        page = parseInt(page, 10);
        if(!page) {
            page = 1;
        }

        return collection.slice((page - 1) * elementsOnPage, page * elementsOnPage);
    },

    getPagesNumbers: function(collection, page) {
        const totalCountOfPages = Math.ceil(collection.length / elementsOnPage);
        page = parseInt(page, 10);
        let result = [];

        if(page <= Math.ceil(pagesMinimalCount / 2) || totalCountOfPages <= pagesMinimalCount) {
            const lastPage = Math.min(pagesMinimalCount, totalCountOfPages);
            result = this.fillInArray(1, lastPage);
            return result;
        }

        if(page >= (totalCountOfPages - parseInt(pagesMinimalCount / 2, 10))) {
            result = this.fillInArray(totalCountOfPages + 1 - pagesMinimalCount, totalCountOfPages);

            return result;
        }

        return this.fillInArray(page - parseInt(pagesMinimalCount / 2, 10), page + parseInt(pagesMinimalCount / 2, 10));
    },

    getTotalPagesCount: (collection) => {
        return Math.ceil(collection.length / elementsOnPage);
    },

    fillInArray: function(start, end) {
        const result = [];
        for(let i = start; i <= end; i++) {
            result.push(i);
        }

        return result;
    }
};

export default pagingService;