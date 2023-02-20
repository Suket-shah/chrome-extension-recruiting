function removeParentheses(query) {
    return query.replace(/\([^)]*\)/g, '');
}

function removeQuotes(query) {
    return query.replace(/"/g, '');
}

function removePunctuation(query) {
    return query.replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, '');
}

function queryCleaner(query) {
    if (query === null) {
        return "";
    }
    query = removeParentheses(query);
    query = removeQuotes(query);
    query = removePunctuation(query);
    return query;
}

export default queryCleaner;