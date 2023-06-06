//@@viewOn:imports
import { createComponent, useDataObject } from "uu5g04-hooks";
import Config from "./config/config";
import Calls from "../calls";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "LocationProvider",
  //@@viewOff:statics
};

export const LocationProvider = createComponent({
  ...STATICS,

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render({ children, locationId }) {
    let locationResult = useDataObject({
      handlerMap: {
        load: () => Calls.locationGet({ id: locationId }),
      },
    });
    //@@viewOn:private
    let { state, data, newData, errorData, pendingData, handlerMap } = locationResult;
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

export default LocationProvider;
