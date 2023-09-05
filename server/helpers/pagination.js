const getPagination = (data) => {
    const totalPage = Math.ceil(data.count / data.perPage);
    const totalPerPage = data.perPage;
    const currentPage = data.page;
    const previousPage = currentPage == 1 ? null : currentPage - 1;
    const nextPage = currentPage == totalPage ? null : currentPage + 1;
    const result = {
        data: data.data,
        pagination: {
            totalRecords: data.count,
            totalPerPage: totalPerPage,
            totalPage,
            currentPage,
            nextPage,
            previousPage,
        },
    };
    return result;
}

module.exports = { getPagination }