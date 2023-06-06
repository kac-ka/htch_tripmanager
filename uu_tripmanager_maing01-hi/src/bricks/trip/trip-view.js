//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent, useRef } from "uu5g04-hooks";
import Config from "./config/config";
import TripContent from "./trip-content";
import NewTripModal from "./new-trip-modal";
import DeleteModal from "./delete-modal";
import Lsi from "../config/lsi";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "TripView",
  nestingLevel: "bigBoxCollection",
  //@@viewOff:statics
};

const ERROR_PREFIX_TRIP = "uu-tripmanager-main/trip/";

export const TripView = createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  propTypes: {
    tripData: UU5.PropTypes.shape({
      id: UU5.PropTypes.string.isRequired,
      name: UU5.PropTypes.string.isRequired,
      description: UU5.PropTypes.string,
      capacity: UU5.PropTypes.number.isRequired,
      departureDate: UU5.PropTypes.string.isRequired,
      arrivalDate: UU5.PropTypes.string.isRequired,
    }),
    location: UU5.PropTypes.shape({
      name: UU5.PropTypes.string.isRequired,
      description: UU5.PropTypes.string,
      country: UU5.PropTypes.string,
      address: UU5.PropTypes.string,
      state: UU5.PropTypes.string,
    }),
    locationDataList: UU5.PropTypes.array,
    tripsData: UU5.PropTypes.array,
    tripCreateRef: UU5.PropTypes.object,
    tripDeleteRef: UU5.PropTypes.object,
    tripLoadRef: UU5.PropTypes.object,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    trip: null,
    location: null,
    locationDataList: [],
  },
  //@@viewOff:defaultProps

  render(props) {
    const newTripModalRef = useRef();
    const DeleteModalRef = useRef();

    //@@viewOn:private
    function showAlert(lsi, params, colorSchema = "red") {
      UU5.Environment.getPage()
        .getAlertBus()
        .addAlert({
          content: <UU5.Bricks.Lsi lsi={lsi} params={params} />,
          colorSchema: colorSchema,
        });
    }

    function getDeleteErrorByCode(errorCode, params) {
      switch (errorCode) {
        case `${ERROR_PREFIX_TRIP}tripDelete/tripDoesNotExist`:
          showAlert(Lsi.trip.alertBus.tripDoesNotExist, [params]);
          break;
        case `${ERROR_PREFIX_TRIP}tripDelete/invalidTripState`:
          showAlert(Lsi.trip.alertBus.invalidTripState, [params]);
          break;
        case `${ERROR_PREFIX_TRIP}tripDelete/participantListNotEmpty`:
          showAlert(Lsi.trip.alertBus.participantListNotEmpty, [params]);
          break;
        default:
          showAlert(Lsi.trip.alertBus.tripDeleteError, [params]);
      }
    }

    function getCreateErrorByCode(errorCode, params) {
      switch (errorCode) {
        case `${ERROR_PREFIX_TRIP}tripCreate/locationNotInOperation`:
          showAlert(Lsi.trip.alertBus.locationNotInOperation, [params]);
          break;
        default:
          showAlert(Lsi.trip.alertBus.tripCreateError, [params]);
      }
    }

    async function handleCreateTrip(modalData) {
      console.log(modalData);
      let tripObject = {
        name: modalData.name,
        locationId: modalData.locationId,
        departureDate: modalData.departureDate,
        arrivalDate: modalData.arrivalDate,
        coverImage: modalData.image,
        capacity: modalData.capacity,
      };
      if (modalData.description) {
        tripObject.description = modalData.description;
      }
      try {
        await props.tripCreateRef.current(tripObject);
        showAlert(Lsi.trip.alertBus.successCreate, [modalData.name], "green");
      } catch (e) {
        console.log(e);
        getCreateErrorByCode(e.code, modalData.name);
      } finally {
        await props.tripLoadRef.current();
      }
    }

    async function handleTripDelete(id, name) {
      try {
        await props.tripDeleteRef.current({ id: id });
        showAlert(Lsi.trip.alertBus.successDelete, [name], "green");
      } catch (e) {
        getDeleteErrorByCode(e.code, name);
      } finally {
        await props.tripLoadRef.current();
      }
    }

    function openCreateModal(trip) {
      newTripModalRef.current.open(trip);
    }

    function openDeleteModal(trip) {
      DeleteModalRef.current.open(trip);
    }

    function openUpdateModal() {
      showAlert(Lsi.trip.updateModal.message, [], "info");
    }
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const currentNestingLevel = UU5.Utils.NestingLevel.getNestingLevel(props, STATICS);

    return currentNestingLevel ? (
      <>
        <TripContent
          tripData={props.tripData}
          tripsData={props.tripsData}
          locationName={props.location.name}
          onCreate={openCreateModal}
          onDelete={openDeleteModal}
          onUpdate={openUpdateModal}
        ></TripContent>

        <NewTripModal ref={newTripModalRef} locationDataList={props.locationDataList} onSave={handleCreateTrip} />
        <DeleteModal ref={DeleteModalRef} onDelete={handleTripDelete} />
      </>
    ) : null;
    //@@viewOff:render
  },
});

export default TripView;
