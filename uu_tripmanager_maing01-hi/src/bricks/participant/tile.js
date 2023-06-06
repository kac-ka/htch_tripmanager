//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent } from "uu5g04-hooks";
import Lsi from "../config/lsi";
import Config from "./config/config";
import Css from "./tile.css";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "Tile",
  nestingLevel: "bigBoxCollection",
  //@@viewOff:statics
};

export const Tile = createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  propTypes: {
    participant: UU5.PropTypes.shape({
      id: UU5.PropTypes.string,
      firstName: UU5.PropTypes.string,
      lastName: UU5.PropTypes.string,
      state: UU5.PropTypes.string,
      idCardNumber: UU5.PropTypes.string,
      phoneNumber: UU5.PropTypes.string,
    }),
    onEdit: UU5.PropTypes.func,
    onRemove: UU5.PropTypes.func,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    participant: null,
    onEdit: () => {},
    onRemove: () => {},
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    function handleUpdate() {
      props.onEdit(props.data);
    }

    function handleDelete() {
      props.onRemove(props.data);
    }
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render

    return (
      <>
        <div className={Css.tileDiv()}>
          <div>
            <div className={Css.nameDiv()}>
              {props.data.firstName} {props.data.lastName}
            </div>
            <div>
              <UU5.Bricks.Lsi lsi={Lsi.participant.tile.dateOfBirth} />
              {props.data.dateOfBirth}
            </div>
            <div>
              <UU5.Bricks.Lsi lsi={Lsi.participant.tile.phoneNumber} />
              {props.data.phoneNumber}
            </div>
            <div>
              <UU5.Bricks.Lsi lsi={Lsi.participant.tile.idCardNumber} />
              {props.data.idCardNumber}
            </div>
          </div>
          <div>
            <UU5.Bricks.Button onClick={handleUpdate} bgStyle="transparent" colorSchema="gray">
              <UU5.Bricks.Icon icon="plus4u5-pencil" />
            </UU5.Bricks.Button>
            <UU5.Bricks.Button onClick={handleDelete} bgStyle="transparent" colorSchema="gray">
              <UU5.Bricks.Icon icon="uu5-cross" />
            </UU5.Bricks.Button>
          </div>
        </div>
      </>
    );
    //@@viewOff:render
  },
});

export default Tile;
