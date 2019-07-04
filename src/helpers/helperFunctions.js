function sortByKey(array, key) {
  return array.sort((a, b) => {
    const x = a[key];
    const y = b[key];
    const secondOutput = (x > y) ? 1 : 0;
    return (x < y) ? -1 : secondOutput;
  });
}

function calculateNewPageNumber(operator, currentPage, numberOfPages) {
  let nextPage;
  if (typeof operator === 'number') {
    nextPage = operator;
  } else if (typeof operator === 'string') {
    switch (operator) {
      case '+':
        nextPage = currentPage + 1;
        break;
      case '-':
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

function supportEvent(event, func, page, id) {
  if (event.keyCode === 13) {
    func(page, id);
  }
}

export {
  sortByKey, calculateNewPageNumber, calculateNumberOfPages, supportEvent,
};
