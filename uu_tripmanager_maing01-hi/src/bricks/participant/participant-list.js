//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent, useRef, useContext } from "uu5g04-hooks";
import Config from "./config/config";
import TripProvider from "../../context/trip-provider";
import ParticipantListProvider from "../../context/participant-list-provider";
import ParticipantListView from "./participant-list-view";
import Lsi from "../config/lsi";
import TripInstanceContext from "../../context/trip-instance-context";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "ParticipantList",
  nestingLevel: "bigBoxCollection",
  //@@viewOff:statics
};

export const ParticipantList = createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  propTypes: {
    tripId: UU5.PropTypes.string,
    onRender: UU5.PropTypes.func,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    tripId: "",
    onRender: () => {},
  },
  //@@viewOff:defaultProps

  render(props) {
    const tripAddParticipantRef = useRef();
    const participantListRef = useRef();
    const updateParticipantRef = useRef();
    const participantListByTripId = useRef();
    const tripLoadRef = useRef();
    //@@viewOn:private

    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const {
      data: { authorizedProfileList },
    } = useContext(TripInstanceContext);

    function renderLoad() {
      return <UU5.Bricks.Loading />;
    }

    function renderErrorListParticipant(errorData) {
      switch (errorData.operation) {
        case "load":
        case "loadNext":
        default:
          return (
            <UU5.Bricks.Error
              content={<UU5.Bricks.Lsi lsi={Lsi.participant.participantList.errorHappendListParticipant} />}
              error={errorData.error}
              errorData={errorData.data}
            />
          );
      }
    }

    function renderErrorTrip(errorData) {
      switch (errorData.operation) {
        case "load":
        case "loadNext":
        default:
          return (
            <UU5.Bricks.Error
              content={<UU5.Bricks.Lsi lsi={Lsi.participant.participantList.errorHappendTrip} />}
              error={errorData.error}
              errorData={errorData.data}
            />
          );
      }
    }

    function renderReadyTrip(tripData) {
      return (
        <>
          <ParticipantListProvider tripId={props.tripId}>
            {({ state, data, newData, errorData, pendingData, handlerMap }) => {
              participantListByTripId.current = handlerMap.load;
              participantListRef.current = handlerMap.participantList;
              updateParticipantRef.current = handlerMap.updateParticipant;

              switch (state) {
                case "pending":
                case "pendingNoData":
                  return renderLoad();
                case "error":
                case "errorNoData":
                  return renderErrorListParticipant(errorData);
                case "itemPending":
                case "ready":
                case "readyNoData":
                default:
                  return renderReadyListParticipant(tripData, data);
              }
            }}
          </ParticipantListProvider>
        </>
      );
    }

    function renderReadyListParticipant(tripData, participantList) {
      return (
        <ParticipantListView
          tripData={tripData}
          tripsData={authorizedProfileList}
          onRender={props.onRender}
          participantDataList={participantList}
          tripLoadRef={tripLoadRef}
          addParticipantRef={tripAddParticipantRef}
          participantListRef={participantListRef}
          updateParticipantRef={updateParticipantRef}
        ></ParticipantListView>
      );
    }

    return (
      <>
        <TripProvider tripId={props.tripId}>
          {({ state, data, newData, errorData, pendingData, handlerMap }) => {
            tripAddParticipantRef.current = handlerMap.tripAddParticipant;
            tripLoadRef.current = handlerMap.load;

            switch (state) {
              case "pending":
              case "pendingNoData":
                return renderLoad();
              case "error":
              case "errorNoData":
                return renderErrorTrip(errorData);
              case "itemPending":
              case "ready":
              case "readyNoData":
              default:
                return renderReadyTrip(data);
            }
          }}
        </TripProvider>
      </>
    );
    //@@viewOff:render
  },
});

export default ParticipantList;
