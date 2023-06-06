/* eslint-disable */
const locationGetDtoInType = shape({
    id: id().isRequired()
  });
  
const locationListDtoInType = shape({
  sortBy: oneOf(["name", "rating"]),
  order: oneOf(["asc", "desc"]),
  pageInfo: shape({
    pageIndex: integer(),
    pageSize: integer()
  })
});