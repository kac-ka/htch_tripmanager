//@@viewOn:imports
import { createComponent, useDataObject } from "uu5g04-hooks";
import Calls from "calls";
import Config from "./config/config";
import TripInstanceContext from "./trip-instance-context";
//@@viewOff:imports

const TripInstanceProvider = createComponent({
  //@@viewOn:statics
  displayName: Config.TAG + "TripInstanceProvider",
  //@@viewOff:statics

  render({ children }) {
    //@@viewOn:hooks
    const state = useDataObject({
      handlerMap: {
        load: handleLoad,
      },
    });
    //@@viewOff:hooks

    //@@viewOn:private
    async function handleLoad() {
      const dtoOut = await Calls.loadTripInstance();
      return { ...dtoOut.data, authorizedProfileList: dtoOut.sysData.profileData.uuIdentityProfileList };
    }
    //@@viewOff:private

    //@@viewOn:render
    return <TripInstanceContext.Provider value={state}>{children}</TripInstanceContext.Provider>;
    //@@viewOff:render
  },
});

export default TripInstanceProvider;
