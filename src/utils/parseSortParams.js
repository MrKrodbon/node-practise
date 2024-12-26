import { SORT_ORDER } from '../constants/sortOrder';

const parseOrder = (sortOrder) => {
  const isKnownOrder = [SORT_ORDER.ASC, SORT_ORDER.DESC];

  return isKnownOrder ? sortOrder : SORT_ORDER.ASC;
};

const parseSortBy = (sortBy) => {
  const keysOfStudent = [
    '_id',
    'name',
    'age',
    'gender',
    'avgMark',
    'onDuty',
    'createdAt',
    'updatedAt',
  ];

  return keysOfStudent.includes(sortBy) ? sortBy : '_id';
};

export const parseSortParams = (query) => {
  const { sortBy, sortOrder } = query;

  const parsedSortBy = parseSortBy(sortBy);

  const parsedSortOrder = parseOrder(sortOrder);

  return {
    orderBy: parsedSortBy,
    sortOrder: parsedSortOrder,
  };
};
