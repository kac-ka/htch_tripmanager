//@@viewOn:imports
import { createComponent, useDataObject } from "uu5g04-hooks";
import Config from "./config/config";
import Calls from "../calls";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "TripProvider",
  //@@viewOff:statics
};

export const TripProvider = createComponent({
  ...STATICS,

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render({ children, tripId }) {
    let tripResult = useDataObject({
      handlerMap: {
        load: () => Calls.tripGet({ id: tripId }),
        tripGet: (dtoIn) => Calls.tripGet(dtoIn),
        tripCreate: (dtoIn) => Calls.tripCreate(dtoIn),
        tripDelete: (dtoIn) => Calls.tripDelete(dtoIn),
        tripImage: (dtoIn) => Calls.tripImage(dtoIn),
        tripAddParticipant: (dtoIn) => Calls.tripAddParticipant(dtoIn),
      },
    });
    //@@viewOn:private
    let { state, data, newData, errorData, pendingData, handlerMap } = tripResult;
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    return children({
      state,
      data,
      newData,
      errorData,
      pendingData,
      handlerMap,
    });
    //@@viewOff:render
  },
});

export default TripProvider;
