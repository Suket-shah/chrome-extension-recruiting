function searchQueryCleaner(query) {
  query = removeEverythingWithinParenthesis(query);
  query = removeAllYears(query);
  query = removeMonths(query);
  query = removeSeasons(query);
  query = removeInternship(query);
  query = removeIntern(query);
  query = removeCoop(query);
  query = removePunctuation(query);
  return query;
}

function removeEverythingWithinParenthesis(query) {
  return query.replace(/\([^()]*\)/g, '');
}

function removeAllYears(query) {
  return query.replace(/\d{4}/g, "");
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

function removePunctuation(query) {
  return query.replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, '');
}

export default searchQueryCleaner;
