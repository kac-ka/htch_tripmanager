//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponentWithRef, useImperativeHandle, useRef } from "uu5g04-hooks";
import Config from "./config/config";
import Lsi from "../config/lsi";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "DeleteModal",
  nestingLevel: "bigBoxCollection",
  //@@viewOff:statics
};

export const DeleteModal = createVisualComponentWithRef({
  ...STATICS,

  //@@viewOn:propTypes
  propTypes: { onDelete: UU5.PropTypes.func },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: { onDelete: () => {} },
  //@@viewOff:defaultProps

  render(props, ref) {
    const modalRef = useRef();
    const tripRef = useRef();

    useImperativeHandle(ref, () => ({
      open: (tripData) => {
        tripRef.current = tripData;
        modalRef.current.open({
          header: renderHeader(),
          content: renderForm(tripData),
          footer: renderControls(),
        });
      },
    }));
    //@@viewOn:private
    function handleSave(opt) {
      modalRef.current.close(true, () => {
        props.onDelete(tripRef.current.id, tripRef.current.name);
      });
    }

    function handleCancel() {
      modalRef.current.close();
    }
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    function renderHeader() {
      return <UU5.Forms.ContextHeader content={<UU5.Bricks.Lsi lsi={Lsi.trip.deleteModal.header} />} />;
    }

    function renderControls() {
      return (
        <UU5.Forms.ContextControls
          buttonSubmitProps={{ content: <UU5.Bricks.Lsi lsi={Lsi.trip.deleteModal.submit} /> }}
          buttonCancelProps={{ content: <UU5.Bricks.Lsi lsi={Lsi.trip.deleteModal.cancel} /> }}
        />
      );
    }

    function renderForm() {
      return (
        <UU5.Forms.ContextForm onSave={handleSave} onCancel={handleCancel}>
          <UU5.Bricks.P>
            <UU5.Bricks.Lsi lsi={Lsi.trip.deleteModal.deleteMessage} />
          </UU5.Bricks.P>
        </UU5.Forms.ContextForm>
      );
    }
    return <UU5.Forms.ContextModal ref_={modalRef} overflow />;
    //@@viewOff:render
  },
});

export default DeleteModal;
