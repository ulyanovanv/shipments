function sortByKey(array, key) {
  return array.sort(function(a, b) {
    let x = a[key];
    let y = b[key];
    return ((x < y) ? -1 : ((x > y) ? 1 : 0));
  });
}

function calculateNewPageNumber(operator, currentPage, numberOfPages) {
  let nextPage;
  if (typeof operator === "number") {
    nextPage = operator;
  } else if (typeof operator === "string") {
    switch(operator) {
      case "+":
        nextPage = currentPage + 1;
        break;
      case "-":
        nextPage = currentPage - 1;
        break;
      default:
        nextPage = currentPage;
        break;
    }

    if (nextPage < 1 || nextPage > numberOfPages) {
      nextPage = currentPage;
    }
  }

  return nextPage;
}

function calculateNumberOfPages(shipments = [], shipmentsPerPage) {
  return Math.ceil(shipments.length / shipmentsPerPage);
}

export { sortByKey, calculateNewPageNumber, calculateNumberOfPages };