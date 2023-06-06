//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent } from "uu5g04-hooks";

import Config from "./config/config.js";
import TripInstanceProvider from "../context/trip-instance-provider";
import TripInstanceContext from "../context/trip-instance-context";
import SpaReady from "./spa-ready.js";
//@@viewOff:imports

const SpaAuthenticated = createVisualComponent({
  //@@viewOn:statics
  displayName: Config.TAG + "SpaAuthenticated",
  //@@viewOff:statics

  render() {
    //@@viewOn:render
    return (
      <TripInstanceProvider>
        <TripInstanceContext.Consumer>
          {({ state, errorData }) => {
            switch (state) {
              case "pending":
              case "pendingNoData":
                return <UU5.Bricks.Loading />;
              case "error":
              case "errorNoData":
                return <UU5.Bricks.Error error={errorData.error} />;
              case "ready":
              case "readyNoData":
              default:
                return <SpaReady />;
            }
          }}
        </TripInstanceContext.Consumer>
      </TripInstanceProvider>
    );
    //@@viewOff:render
  },
});

export default SpaAuthenticated;
