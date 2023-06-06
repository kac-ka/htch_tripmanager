//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent, useRef, useContext } from "uu5g04-hooks";
import TripProvider from "../../context/trip-provider";
import LocationProvider from "../../context/location-provider";
import LocationlistProvider from "../../context/locationlist-provider";
import TripView from "./trip-view";
import Config from "./config/config";
import Lsi from "../config/lsi";
import TripInstanceContext from "../../context/trip-instance-context";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "TripInfo",
  nestingLevel: "bigBoxCollection",
  //@@viewOff:statics
};

export const TripInfo = createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  propTypes: { tripId: UU5.PropTypes.string },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: { tripId: "" },
  //@@viewOff:defaultProps

  render(props) {
    const tripGetRef = useRef();
    const tripCreateRef = useRef();
    const tripDeleteRef = useRef();
    const tripAddParticipantRef = useRef();
    const tripLoadRef = useRef();

    const locationGetRef = useRef();
    //@@viewOn:private
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const {
      data: { authorizedProfileList },
    } = useContext(TripInstanceContext);

    function renderReadyTripLocationList(location, tripData) {
      return (
        <LocationlistProvider>
          {({ state, data, newData, errorData, pendingData, handlerMap }) => {
            switch (state) {
              case "pending":
              case "pendingNoData":
                return renderLoad();
              case "error":
              case "errorNoData":
                return renderErrorAllProviders(errorData);
              case "itemPending":
              case "ready":
              case "readyNoData":
              default:
                return renderAllProviders(location, tripData, data);
            }
          }}
        </LocationlistProvider>
      );
    }

    function renderAllProviders(location, tripData, locationDataList) {
      return (
        <TripView
          location={location}
          locationDataList={locationDataList}
          tripData={tripData}
          tripsData={authorizedProfileList}
          tripCreateRef={tripCreateRef}
          tripDeleteRef={tripDeleteRef}
          tripLoadRef={tripLoadRef}
        ></TripView>
      );
    }

    function renderLoad() {
      return <UU5.Bricks.Loading />;
    }

    function renderErrorAllProviders(errorData) {
      switch (errorData.operation) {
        case "load":
        case "loadNext":
        default:
          return (
            <UU5.Bricks.Error
              content={<UU5.Bricks.Lsi lsi={Lsi.trip.tripInfo.errorHappendAllProviders} />}
              error={errorData.error}
              errorData={errorData.data}
            />
          );
      }
    }

    function renderErrorTripLocationList(errorData) {
      switch (errorData.operation) {
        case "load":
        case "loadNext":
        default:
          return (
            <UU5.Bricks.Error
              content={<UU5.Bricks.Lsi lsi={Lsi.trip.tripInfo.errorHappendTripLocationList} />}
              error={errorData.error}
              errorData={errorData.data}
            />
          );
      }
    }

    function renderErrorTripLocation(errorData) {
      switch (errorData.operation) {
        case "load":
        case "loadNext":
        default:
          return (
            <UU5.Bricks.Error
              content={<UU5.Bricks.Lsi lsi={Lsi.trip.tripInfo.errorHappendTripLocation} />}
              error={errorData.error}
              errorData={errorData.data}
            />
          );
      }
    }

    function renderReadyTripLocation(tripData) {
      return (
        <>
          <LocationProvider locationId={tripData.locationId}>
            {({ state, data, newData, errorData, pendingData, handlerMap }) => {
              locationGetRef.current = handlerMap.locationGet;

              switch (state) {
                case "pending":
                case "pendingNoData":
                  return renderLoad();
                case "error":
                case "errorNoData":
                  return renderErrorTripLocationList(errorData);
                case "itemPending":
                case "ready":
                case "readyNoData":
                default:
                  return renderReadyTripLocationList(data, tripData);
              }
            }}
          </LocationProvider>
        </>
      );
    }

    return (
      <>
        <TripProvider tripId={props.tripId}>
          {({ state, data, newData, errorData, pendingData, handlerMap }) => {
            tripGetRef.current = handlerMap.tripGet;
            tripCreateRef.current = handlerMap.tripCreate;
            tripDeleteRef.current = handlerMap.tripDelete;
            tripLoadRef.current = handlerMap.load;
            tripAddParticipantRef.current = handlerMap.tripAddParticipant;

            switch (state) {
              case "pending":
              case "pendingNoData":
                return renderLoad();
              case "error":
              case "errorNoData":
                return renderErrorTripLocation(errorData);
              case "itemPending":
              case "ready":
              case "readyNoData":
              default:
                return renderReadyTripLocation(data);
            }
          }}
        </TripProvider>
      </>
    );
    //@@viewOff:render
  },
});

export default TripInfo;
