//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponentWithRef, useImperativeHandle, useRef } from "uu5g04-hooks";
import "uu5g04-forms";
import Lsi from "../config/lsi";
import Config from "./config/config";
Lsi;
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "NewTripModal",
  nestingLevel: "bigBoxCollection",
  //@@viewOff:statics
};

export const NewTripModal = createVisualComponentWithRef({
  ...STATICS,

  //@@viewOn:propTypes
  propTypes: {
    onSave: UU5.PropTypes.func,
    locationDataList: UU5.PropTypes.array,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    locationDataList: [],
    onSave: () => {},
  },
  //@@viewOff:defaultProps

  render(props, ref) {
    const modalRef = useRef();
    const imageRef = useRef();
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
        props.onSave(opt.values);
      });
    }

    function handleCancel() {
      modalRef.current.close();
    }
    //@@viewOff:private

    //@@viewOn:interface
    function validateDepartureDate(opt) {
      let result;
      if (opt.value && new Date(opt.value) < new Date()) {
        result = {
          feedback: "error",
          message: <UU5.Bricks.Lsi lsi={Lsi.trip.createModal.validation.invalidDepartureDate} />,
          value: opt.value,
        };
      } else if (opt.value) {
        result = {
          feedback: "success",
          value: opt.value,
        };
      } else {
        result = {
          feedback: "initial",
          value: opt.value,
        };
      }
      opt.component.setFeedback(result.feedback, result.message);
      return result;
    }

    function invalidArrivalDate(opt, departureDate) {
      let result;
      if (opt.value && new Date(opt.value) < new Date(departureDate)) {
        result = {
          feedback: "error",
          message: <UU5.Bricks.Lsi lsi={Lsi.trip.createModal.validation.invalidArrivalDate} />,
          value: opt.value,
        };
      } else if (opt.value) {
        result = {
          feedback: "success",
          value: opt.value,
        };
      } else {
        result = {
          feedback: "initial",
          value: opt.value,
        };
      }
      opt.component.setFeedback(result.feedback, result.message);
      return result;
    }

    function invalidTripName(opt) {
      let result;
      if (opt.value && opt.value.length < 10) {
        result = {
          feedback: "error",
          message: <UU5.Bricks.Lsi lsi={Lsi.trip.createModal.validation.invalidTripName} />,
          value: opt.value,
        };
      } else if (opt.value) {
        result = {
          feedback: "success",
          value: opt.value,
        };
      } else {
        result = {
          feedback: "initial",
          value: opt.value,
        };
      }
      opt.component.setFeedback(result.feedback, result.message);
      return result;
    }

    function handleChange(e) {
      departureDate = e.value;
    }
    //@@viewOff:interface

    //@@viewOn:render
    function renderHeader() {
      return <UU5.Forms.ContextHeader content={<UU5.Bricks.Lsi lsi={Lsi.trip.createModal.header} />} />;
    }

    function renderControls() {
      return (
        <UU5.Forms.ContextControls
          buttonSubmitProps={{ content: <UU5.Bricks.Lsi lsi={Lsi.trip.createModal.submit} /> }}
          buttonCancelProps={{ content: <UU5.Bricks.Lsi lsi={Lsi.trip.createModal.cancel} /> }}
        />
      );
    }

    function renderForm(trip) {
      return (
        <UU5.Forms.ContextForm onSave={handleSave} onCancel={handleCancel}>
          <UU5.Forms.Text
            label={<UU5.Bricks.Lsi lsi={Lsi.trip.createModal.name} />}
            name="name"
            value={trip.name}
            inputAttrs={{ maxLength: 30 }}
            onValidate={invalidTripName}
            controlled={false}
            required
          />

          <UU5.Forms.TextArea
            label={<UU5.Bricks.Lsi lsi={Lsi.trip.createModal.description} />}
            name="description"
            value={trip.description}
            inputAttrs={{ maxLength: 300 }}
            controlled={false}
            autoResize
          />

          <UU5.Bricks.Row>
            <UU5.Bricks.Column colWidth="m-6">
              <UU5.Forms.DatePicker
                label={<UU5.Bricks.Lsi lsi={Lsi.trip.createModal.dapartureDate} />}
                name="departureDate"
                valueType="string"
                value={trip.departureDate}
                dateFrom={new Date()}
                lowerMessage={<UU5.Bricks.Lsi lsi={Lsi.trip.createModal.validation.invalidDepartureDate} />}
                format="Y-m-d"
                controlled={false}
                required
              />
            </UU5.Bricks.Column>
            <UU5.Bricks.Column colWidth="m-6">
              <UU5.Forms.DatePicker
                label={<UU5.Bricks.Lsi lsi={Lsi.trip.createModal.arrivalDate} />}
                name="arrivalDate"
                valueType="string"
                dateFrom={new Date()}
                lowerMessage={<UU5.Bricks.Lsi lsi={Lsi.trip.createModal.validation.invalidArrivalDate} />}
                format="Y-m-d"
                onValidate={(opt) => {
                  invalidArrivalDate(opt, trip.departureDate);
                }}
                controlled={false}
                required
              />
            </UU5.Bricks.Column>
          </UU5.Bricks.Row>

          <UU5.Bricks.Row>
            <UU5.Bricks.Column colWidth="m-6">
              <UU5.Forms.Select
                label={<UU5.Bricks.Lsi lsi={Lsi.trip.createModal.locationSelect} />}
                name="locationId"
                controlled={false}
                required
              >
                {renderLocations(props.locationDataList)}
              </UU5.Forms.Select>
            </UU5.Bricks.Column>

            <UU5.Bricks.Column colWidth="m-6">
              <UU5.Forms.Number
                label={<UU5.Bricks.Lsi lsi={Lsi.trip.createModal.capacity} />}
                name="capacity"
                controlled={false}
                nanMessage={<UU5.Bricks.Lsi lsi={Lsi.trip.createModal.validation.capacityInvalidInput} />}
                min={1}
                lowerMessage={<UU5.Bricks.Lsi lsi={Lsi.trip.createModal.validation.capacityIsInvalid} />}
                valueType="number"
                buttonHidden
                required
              />
            </UU5.Bricks.Column>
          </UU5.Bricks.Row>

          <UU5.Forms.File
            ref_={imageRef}
            label={<UU5.Bricks.Lsi lsi={Lsi.trip.createModal.imageFile} />}
            name="image"
            placeholder="jpg / jpeg / png"
            inputAttrs={{ accept: "image/*" }}
            controlled={false}
            required
          />
        </UU5.Forms.ContextForm>
      );
    }

    function renderLocations(locationDataList) {
      return locationDataList.map((location) => (
        <UU5.Forms.Select.Option value={location.data.id} key={location.data.id}>
          {location.data.name}
        </UU5.Forms.Select.Option>
      ));
    }

    return <UU5.Forms.ContextModal ref_={modalRef} overflow />;
    //@@viewOff:render
  },
});

export default NewTripModal;
