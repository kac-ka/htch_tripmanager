//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponentWithRef, useImperativeHandle, useRef } from "uu5g04-hooks";
import Config from "./config/config";
import Lsi from "../config/lsi";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "AddParticipantModal",
  nestingLevel: "bigBoxCollection",
  //@@viewOff:statics
};

export const AddParticipantModal = createVisualComponentWithRef({
  ...STATICS,

  //@@viewOn:propTypes
  propTypes: {
    onSubmit: UU5.PropTypes.func,
    tripData: UU5.PropTypes.shape({
      id: UU5.PropTypes.string.isRequired,
      name: UU5.PropTypes.string.isRequired,
      description: UU5.PropTypes.string,
      capacity: UU5.PropTypes.number.isRequired,
      departureDate: UU5.PropTypes.string.isRequired,
      arrivalDate: UU5.PropTypes.string.isRequired,
    }),
    participantDataList: UU5.PropTypes.array,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    onSubmit: () => {},
    tripData: null,
    participantDataList: [],
  },
  //@@viewOff:defaultProps

  render(props, ref) {
    const modalRef = useRef();
    const tripRef = useRef();

    useImperativeHandle(ref, () => ({
      open: (trip) => {
        tripRef.current = trip;
        modalRef.current.open({
          header: renderHeader(),
          content: renderForm(trip),
          footer: renderControls(),
        });
      },
    }));
    //@@viewOn:private
    function handleSave(opt) {
      modalRef.current.close(true, () => {
        props.onSubmit(opt.values);
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
      return <UU5.Forms.ContextHeader content={<UU5.Bricks.Lsi lsi={Lsi.participant.addParticipantModal.header} />} />;
    }

    function renderControls() {
      return (
        <UU5.Forms.ContextControls
          buttonSubmitProps={{ content: <UU5.Bricks.Lsi lsi={Lsi.participant.addParticipantModal.submit} /> }}
          buttonCancelProps={{ content: <UU5.Bricks.Lsi lsi={Lsi.participant.addParticipantModal.cancel} /> }}
        />
      );
    }

    function renderForm(trip) {
      return (
        <UU5.Forms.ContextForm onSave={handleSave} onCancel={handleCancel}>
          <UU5.Bricks.Row>
            <UU5.Bricks.Column colWidth="m-6">
              <UU5.Forms.Select
                label={<UU5.Bricks.Lsi lsi={Lsi.participant.addParticipantModal.participantSelect} />}
                name="participantId"
                required
                controlled={false}
              >
                {renderParticipants(props.participantDataList)}
              </UU5.Forms.Select>
            </UU5.Bricks.Column>
            <UU5.Bricks.Column colWidth="m-6">
              <UU5.Forms.Select
                label={<UU5.Bricks.Lsi lsi={Lsi.participant.addParticipantModal.tripSelect} />}
                name="tripId"
                value={props.tripData.name}
                readOnly
                controlled={false}
              >
                <UU5.Forms.Select.Option key={props.tripData.id} value={props.tripData.name}></UU5.Forms.Select.Option>
              </UU5.Forms.Select>
            </UU5.Bricks.Column>
          </UU5.Bricks.Row>
        </UU5.Forms.ContextForm>
      );
    }

    function renderParticipants(participantList) {
      return participantList
        .filter((p) => p.state != "active")
        .map((participant) => (
          <UU5.Forms.Select.Option value={participant.id} key={participant.id}>
            {participant.firstName} {participant.lastName} {participant.phoneNumber} {participant.idCardNumber}
          </UU5.Forms.Select.Option>
        ));
    }

    return <UU5.Forms.ContextModal ref_={modalRef} overflow />;
    //@@viewOff:render
  },
});

export default AddParticipantModal;
