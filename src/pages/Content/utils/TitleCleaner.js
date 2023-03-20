function removeParentheses(query) {
    return query.replace(/\([^)]*\)/g, '');
}

function removeDoubleSpaces(query) {
    return query.replace(/\s{2,}/g, ' ');
}

function titleCleaner(title) {
    title = removeParentheses(title);
    title = removeDoubleSpaces(title);
    return title;
}

export default titleCleaner;
