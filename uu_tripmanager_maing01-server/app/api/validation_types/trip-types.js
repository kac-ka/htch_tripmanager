/* eslint-disable */
const tripCreateDtoInType = shape({
  name: string(10, 30).isRequired(),
  description: string(null,300),
  coverImage: binary().isRequired(),
  capacity: number(1, null).isRequired(),
  departureDate: date().isRequired(),
  arrivalDate: date().isRequired(),
  locationId: id().isRequired()
});

const tripImageDtoInType = shape({
  image: code().isRequired(),
  contentDisposition: oneOf(["inline", "attachment"])
});

const tripGetDtoInType = shape({
  id: id().isRequired(),
});

const tripDeleteDtoInType = shape({
  id: id().isRequired(),
});

const tripAddParticipantDtoInType = shape({
  id: id().isRequired(),
  participantId: id().isRequired()
});