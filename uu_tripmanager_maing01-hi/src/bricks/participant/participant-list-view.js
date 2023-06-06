//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent, useRef } from "uu5g04-hooks";
import Config from "./config/config";
import Content from "./content";
import AddParticipantModal from "./add-participant-modal";
import EditModal from "./edit-modal";
import Lsi from "../config/lsi";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "ParticipantListView",
  nestingLevel: "bigBoxCollection",
  //@@viewOff:statics
};

const ERROR_PREFIX_TRIP = "uu-tripmanager-main/trip/";
const ERROR_PREFIX_PARTICIPANT = "uu-tripmanager-main/participant/";

export const ParticipantListView = createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  propTypes: {
    tripData: UU5.PropTypes.shape({
      id: UU5.PropTypes.string.isRequired,
      name: UU5.PropTypes.string.isRequired,
      description: UU5.PropTypes.string,
      capacity: UU5.PropTypes.number.isRequired,
      departureDate: UU5.PropTypes.string.isRequired,
      participantIdList: UU5.PropTypes.array,
      arrivalDate: UU5.PropTypes.string.isRequired,
    }),
    participantDataList: UU5.PropTypes.array,
    addParticipantRef: UU5.PropTypes.object,
    participantListRef: UU5.PropTypes.object,
    updateParticipantRef: UU5.PropTypes.object,
    tripLoadRef: UU5.PropTypes.object,
    tripsData: UU5.PropTypes.array,
    onRender: UU5.PropTypes.func,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    tripData: null,
    onRender: () => {},
  },
  //@@viewOff:defaultProps

  render(props) {
    const addParticipantModalRef = useRef();
    const EditModalRef = useRef();
    //@@viewOn:private
    function isParticipantViewAuthorized() {
      return props.tripsData.some(
        (profile) => profile === Config.Profiles.AUTHORITIES || profile === Config.Profiles.EMPLOYEES
      );
    }

    function showAlert(lsi, params, colorSchema = "red") {
      UU5.Environment.getPage()
        .getAlertBus()
        .addAlert({
          content: <UU5.Bricks.Lsi lsi={lsi} params={params} />,
          colorSchema: colorSchema,
        });
    }
    function getErrorByCode(errorCode, params) {
      switch (errorCode) {
        case `${ERROR_PREFIX_TRIP}tripAddParticipant/invalidParticipantState`:
          showAlert(Lsi.trip.alertBus.invalidParticipantState, [params]);
          break;
        case `${ERROR_PREFIX_TRIP}tripAddParticipant/invalidTripState`:
          showAlert(Lsi.trip.alertBus.invalidTripStateAdd, [params]);
          break;
        case `${ERROR_PREFIX_TRIP}tripAddParticipant/tripCapacityFull`:
          showAlert(Lsi.trip.alertBus.tripCapacityFull, [params]);
          break;
        default:
          showAlert(Lsi.trip.alertBus.tripAddParticipantError, [params]);
      }
    }

    function getUpdateErrorByCode(errorCode, params) {
      switch (errorCode) {
        case `${ERROR_PREFIX_PARTICIPANT}participantUpdate/invalidParticipant`:
          showAlert(Lsi.participant.alertBus.invalidParticipant, [params]);
          break;
        default:
          showAlert(Lsi.participant.alertBus.updateError, [params]);
      }
    }

    function openAddParticipantModal(trip) {
      addParticipantModalRef.current.open(trip);
    }

    async function hanldeAddParticipant(modalData) {
      try {
        let updateTrip = await props.addParticipantRef.current({
          id: props.tripData.id,
          participantId: modalData.participantId,
        });

        showAlert(Lsi.participant.alertBus.successAddParticipant, null, "green");
      } catch (e) {
        getErrorByCode(e.code);
      } finally {
        props.onRender();
        await props.tripLoadRef.current();
      }
    }

    function openUpdateModal(participant) {
      EditModalRef.current.open(participant);
    }

    function showUnderConstruction(participant) {
      showAlert(Lsi.participant.alertBus.deleteUnderConstruction, null, "info");
    }

    async function handleEdit(participantOld, modalData) {
      try {
        let updatedParticipant = await props.updateParticipantRef.current({ id: participantOld.id, ...modalData });
        showAlert(
          Lsi.participant.alertBus.successUpdateParticipant,
          [participantOld.firstName, participantOld.lastName],
          "green"
        );
      } catch (e) {
        getUpdateErrorByCode(e.code);
        props.onRender();
      } finally {
        await props.tripLoadRef.current();
      }
    }
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const currentNestingLevel = UU5.Utils.NestingLevel.getNestingLevel(props, STATICS);

    return currentNestingLevel ? (
      <>
        {isParticipantViewAuthorized() && (
          <>
            <Content
              participantDataList={props.participantDataList
                .map((d) => d.data)
                .filter((p) => props.tripData.participantIdList.includes(p.id))}
              onEdit={openUpdateModal}
              onAdd={openAddParticipantModal}
              onRemove={showUnderConstruction}
            ></Content>
            <AddParticipantModal
              ref={addParticipantModalRef}
              participantDataList={props.participantDataList.map((d) => d.data).filter((p) => p.state !== "active")}
              tripData={props.tripData}
              onSubmit={hanldeAddParticipant}
            />
            <EditModal ref={EditModalRef} onSubmit={handleEdit} />
          </>
        )}
      </>
    ) : null;
    //@@viewOff:render
  },
});

export default ParticipantListView;
