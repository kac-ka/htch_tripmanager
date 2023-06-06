//@@viewOn:imports
import { createComponent, useDataList } from "uu5g04-hooks";
import Calls from "../calls";
import Config from "./config/config";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "LocationlistProvider",
  //@@viewOff:statics
};

export const LocationlistProvider = createComponent({
  ...STATICS,

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render({ children }) {
    let locationListResult = useDataList({
      pageSize: 100,
      handlerMap: {
        load: (dtoIn) => Calls.locationList(dtoIn),
      },
    });
    //@@viewOn:private
    let { state, data, newData, errorData, pendingData, handlerMap } = locationListResult;
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

export default LocationlistProvider;
