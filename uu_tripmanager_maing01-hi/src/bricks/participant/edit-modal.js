//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponentWithRef, useRef, useImperativeHandle } from "uu5g04-hooks";
import Config from "./config/config";
import Lsi from "../config/lsi";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "EditModal",
  nestingLevel: "bigBoxCollection",
  //@@viewOff:statics
};

export const EditModal = createVisualComponentWithRef({
  ...STATICS,

  //@@viewOn:propTypes
  propTypes: { onSubmit: UU5.PropTypes.func },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: { onSubmit: () => {} },
  //@@viewOff:defaultProps

  render(props, ref) {
    const modalRef = useRef();
    const participantRef = useRef();

    useImperativeHandle(ref, () => ({
      open: (participantDataObject) => {
        participantRef.current = participantDataObject;
        modalRef.current.open({
          header: renderHeader(),
          content: renderForm(participantDataObject),
          footer: renderControls(),
        });
      },
    }));
    //@@viewOn:private
    function handleSave(opt) {
      modalRef.current.close(true, () => {
        props.onSubmit(participantRef.current, opt.values);
      });
    }

    function handleCancel() {
      modalRef.current.close();
    }
    //@@viewOff:private

    //@@viewOn:interface
    function phoneNumberMinLength(opt) {
      let result;
      if (opt.value && opt.value.length < 5) {
        result = {
          feedback: "error",
          message: <UU5.Bricks.Lsi lsi={Lsi.participant.updateModal.validation.phoneNumberLenght} />,
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

    function idCardMinLength(opt) {
      let result;
      if (opt.value && opt.value.length < 3) {
        result = {
          feedback: "error",
          message: <UU5.Bricks.Lsi lsi={Lsi.participant.updateModal.validation.idCardLenght} />,
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
    //@@viewOff:interface

    //@@viewOn:render
    function renderHeader() {
      return <UU5.Forms.ContextHeader content={<UU5.Bricks.Lsi lsi={Lsi.participant.updateModal.header} />} />;
    }

    function renderControls() {
      return (
        <UU5.Forms.ContextControls
          buttonSubmitProps={{ content: <UU5.Bricks.Lsi lsi={Lsi.participant.updateModal.submit} /> }}
          buttonCancelProps={{ content: <UU5.Bricks.Lsi lsi={Lsi.participant.updateModal.cancel} /> }}
        />
      );
    }

    function renderForm(participant) {
      return (
        <UU5.Forms.ContextForm onSave={handleSave} onCancel={handleCancel}>
          <UU5.Bricks.Row>
            <UU5.Bricks.Column colWidth="m-6">
              <UU5.Forms.Text
                label={<UU5.Bricks.Lsi lsi={Lsi.participant.updateModal.firstName} />}
                name="firstName"
                value={participant.firstName}
                inputAttrs={{ maxLength: 15 }}
                controlled={false}
              />
            </UU5.Bricks.Column>
            <UU5.Bricks.Column colWidth="m-6">
              <UU5.Forms.Text
                label={<UU5.Bricks.Lsi lsi={Lsi.participant.updateModal.lastName} />}
                name="lastName"
                value={participant.lastName}
                inputAttrs={{ maxLength: 15 }}
                controlled={false}
              />
            </UU5.Bricks.Column>
          </UU5.Bricks.Row>

          <UU5.Bricks.Row>
            <UU5.Bricks.Column colWidth="m-6">
              <UU5.Forms.Text
                label={<UU5.Bricks.Lsi lsi={Lsi.participant.updateModal.phoneNumber} />}
                name="phoneNumber"
                value={participant.phoneNumber}
                inputAttrs={{ maxLength: 17 }}
                onValidate={phoneNumberMinLength}
                controlled={false}
              />
            </UU5.Bricks.Column>
            <UU5.Bricks.Column colWidth="m-6">
              <UU5.Forms.Text
                label={<UU5.Bricks.Lsi lsi={Lsi.participant.updateModal.idCardNumber} />}
                name="idCardNumber"
                value={participant.idCardNumber}
                inputAttrs={{ maxLength: 7 }}
                onValidate={idCardMinLength}
                controlled={false}
              />
            </UU5.Bricks.Column>
            <UU5.Bricks.Column colWidth="m-6">
              <UU5.Forms.Select
                label={<UU5.Bricks.Lsi lsi={Lsi.participant.updateModal.state} />}
                name="state"
                value={participant.state}
              >
                <UU5.Forms.Select.Option value="Active" />
                <UU5.Forms.Select.Option value="Passive" />
              </UU5.Forms.Select>
            </UU5.Bricks.Column>
          </UU5.Bricks.Row>
        </UU5.Forms.ContextForm>
      );
    }
    return <UU5.Forms.ContextModal ref_={modalRef} overflow />;
    //@@viewOff:render
  },
});

export default EditModal;
