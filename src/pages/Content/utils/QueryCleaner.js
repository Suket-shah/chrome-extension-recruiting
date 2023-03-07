function removeParentheses(query) {
    return query.replace(/\([^)]*\)/g, '');
}

function removeQuotes(query) {
    return query.replace(/"/g, '');
}

function removePunctuation(query) {
    return query.replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, '');
}

function removeYears(query) {
    return query.replace(/20\d\d/g, '');
}

function removeMonths(query) {
    return query.replace(/(January|February|March|April|May|June|July|August|September|October|November|December)/gi, '');
}

function removeSeasons(query) {
    return query.replace(/(Spring|Summer|Fall|Winter)/gi, '');
}

function removeInternship(query) {
    return query.replace(/internship/gi, '');
}

function removeIntern(query) {
    return query.replace(/intern/gi, '');
}

function removeCoop(query) {
    return query.replace(/co-op/gi, '');
}

function queryCleaner(query) {
    if (query === null) {
        return "";
    }
    query = removeParentheses(query);
    query = removeQuotes(query);
    query = removePunctuation(query);
    query = removeYears(query);
    query = removeMonths(query);
    query = removeSeasons(query);
    query = removeInternship(query);
    query = removeIntern(query);
    query = removeCoop(query);
    return query;
}

export {removeQuotes};
export default queryCleaner;