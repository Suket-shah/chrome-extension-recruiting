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

function removeDoubleSpaces(query) {
    return query.replace(/\s{2,}/g, ' ');
}
function queryCleaner(query) {
    if (query === null) {
        return "";
    }
    query = removeQuotes(query);
    query = removePunctuation(query);
    query = removeYears(query);
    query = removeMonths(query);
    query = removeSeasons(query);
    query = removeInternship(query);
    query = removeIntern(query);
    query = removeCoop(query);
    query = removeDoubleSpaces(query);
    return query;
}

export {removeQuotes, removeDoubleSpaces};
export default queryCleaner;