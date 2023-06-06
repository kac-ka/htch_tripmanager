//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent, useState } from "uu5g04-hooks";
import TripInfo from "../bricks/trip/trip-info";
import Config from "./config/config";
import ParticipantList from "../bricks/participant/participant-list";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "Tripmanager",
  nestingLevel: "bigBoxCollection",
  //@@viewOff:statics
};

export const Trip = createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    const [renderToggle, setRenderToggle] = useState(false);
    //@@viewOn:private
    const url = UU5.Common.Url.parse(window.top.location.href);
    let id = url.parameters && url.parameters.id;

    function handleRenderToggle() {
      setRenderToggle(!renderToggle);
    }
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render

    return (
      <>
        <TripInfo tripId={id} onRender={handleRenderToggle}></TripInfo>
        <ParticipantList tripId={id} onRender={handleRenderToggle}></ParticipantList>
        {renderToggle}
      </>
    );
    //@@viewOff:render
  },
});

export default Trip;
