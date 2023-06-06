//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent, useRef, useScreenSize } from "uu5g04-hooks";
import "uu5g04-forms";
import Config from "./config/config";
import Lsi from "../config/lsi";
import Css from "./trip-content.css";
import Calls from "../../calls";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "TripContent",
  nestingLevel: "bigBoxCollection",
  //@@viewOff:statics
};

export const TripContent = createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  propTypes: {
    tripData: UU5.PropTypes.shape({
      id: UU5.PropTypes.string.isRequired,
      name: UU5.PropTypes.string.isRequired,
      description: UU5.PropTypes.string,
      coverImage: UU5.PropTypes.string,
      capacity: UU5.PropTypes.number.isRequired,
      departureDate: UU5.PropTypes.string.isRequired,
      arrivalDate: UU5.PropTypes.string.isRequired,
      state: UU5.PropTypes.string.isRequired,
    }),
    locationName: UU5.PropTypes.string,
    onCreate: UU5.PropTypes.func.isRequired,
    onDelete: UU5.PropTypes.func.isRequired,
    onUpdate: UU5.PropTypes.func,
    tripsData: UU5.PropTypes.array,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    trip: null,
    onCreate: () => {},
    onDelete: () => {},
    onUpdate: () => {},
  },
  //@@viewOff:defaultProps

  render(props) {
    const screenSize = useScreenSize();

    //@@viewOn:private

    function isStateAuthorized() {
      return props.tripsData.some(
        (profile) => profile === Config.Profiles.AUTHORITIES || profile === Config.Profiles.EMPLOYEES
      );
    }
    function isDeleteAuthorized() {
      return props.tripsData.some((profile) => profile === Config.Profiles.AUTHORITIES);
    }

    const dynamicCss = {
      fontSizeName: screenSize === "xs" ? "20px" : screenSize === "s" ? "23px" : screenSize === "m" ? "28px" : "35px",
      padding: screenSize === "xs" ? "17px 10px" : "20px 10px",
      fontSizeLocation: screenSize === "xs" ? "18px" : screenSize === "s" ? "20px" : "25px",
      fontSizeInfo: screenSize === "xs" ? "15px" : "18px",
    };
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const currentNestingLevel = UU5.Utils.NestingLevel.getNestingLevel(props, STATICS);

    return currentNestingLevel ? (
      <>
        <UU5.Bricks.Row className={Css.imageWrapper()}>
          <UU5.Bricks.Image
            className={Css.coverImage()}
            src={Calls.getCommandUri(`tripImage?image=${props.tripData.coverImage}`)}
            authenticate
          />
        </UU5.Bricks.Row>
        <UU5.Bricks.Row>
          <UU5.Bricks.Column className={Css.tripInfoWrapper()} colWidth={{ xs: 8, m: 10, l: 10, xl: 11 }}>
            <div className={Css.tripInfoName(dynamicCss)}>
              <span>{props.tripData.name}</span>
            </div>
            <div className={Css.tripInfoLocation(dynamicCss)}>
              <UU5.Bricks.Lsi lsi={Lsi.trip.tripContent.location} />
              <span>{props.locationName}</span>
            </div>
            {props.tripData.description && (
              <div className={Css.tripInfo(dynamicCss)}>
                <UU5.Bricks.Lsi lsi={Lsi.trip.tripContent.description} />
                <span>{props.tripData.description}</span>
              </div>
            )}
            {isStateAuthorized() && (
              <div className={Css.tripInfo(dynamicCss)}>
                <UU5.Bricks.Lsi lsi={Lsi.trip.tripContent.state} />
                <span>{props.tripData.state}</span>
              </div>
            )}
          </UU5.Bricks.Column>
          <UU5.Bricks.Column className={Css.tripActions()} colWidth={{ xs: 4, m: 2, l: 2, xl: 1 }}>
            <UU5.Bricks.Button className={Css.tripActionButton()} onClick={props.onCreate} colorSchema="primary">
              <UU5.Bricks.Lsi lsi={Lsi.trip.tripContent.createButton} />
            </UU5.Bricks.Button>
            <UU5.Bricks.Button className={Css.tripActionButton()} onClick={props.onUpdate} colorSchema="primary">
              <UU5.Bricks.Lsi lsi={Lsi.trip.tripContent.updateButton} />
            </UU5.Bricks.Button>
            {isDeleteAuthorized() && (
              <>
                <UU5.Bricks.Button
                  className={Css.tripActionButton()}
                  onClick={() => {
                    props.onDelete(props.tripData);
                  }}
                >
                  <UU5.Bricks.Lsi lsi={Lsi.trip.tripContent.deleteButton} />
                </UU5.Bricks.Button>
              </>
            )}
          </UU5.Bricks.Column>
        </UU5.Bricks.Row>
      </>
    ) : null;
    //@@viewOff:render
  },
});

export default TripContent;
