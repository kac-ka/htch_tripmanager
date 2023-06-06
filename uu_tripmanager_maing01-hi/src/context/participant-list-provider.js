//@@viewOn:imports
import { createComponent, useDataList } from "uu5g04-hooks";
import Config from "./config/config";
import Calls from "../calls";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "ParticipantListProvider",
  //@@viewOff:statics
};

export const ParticipantListProvider = createComponent({
  ...STATICS,

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render({ children, tripId }) {
    let participantListResult = useDataList({
      handlerMap: {
        load: (dtoIn) => Calls.participantList(dtoIn),
        participantList: (dtoIn) => Calls.participantList(dtoIn),
        updateParticipant: (dtoIn) => Calls.participantUpdate(dtoIn),
      },
    });
    //@@viewOn:private
    let { state, data, newData, errorData, pendingData, handlerMap } = participantListResult;
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

export default ParticipantListProvider;
