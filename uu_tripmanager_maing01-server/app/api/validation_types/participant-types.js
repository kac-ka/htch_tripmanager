/* eslint-disable */
const participantListDtoInType = shape({
  sortBy: oneOf(["name", "rating"]),
  order: oneOf(["asc", "desc"]),
  tripId: id(),
  state: oneOf("Active", "Passive"),
  pageInfo: shape({
    pageIndex: integer(),
    pageSize: integer()
  })
});

const participantGetDtoInType = shape({
    id: id().isRequired()
});
  
const participantUpdate = shape({
  id: id().isRequired(),
  firstName: string(1, 15),
  lastName: string(1, 15),
  phoneNumber: string(5, 17),
  idCardNumber: string(3, 7),
  state: oneOf("Active", "Passive"),
});