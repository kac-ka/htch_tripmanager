//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent, useState, useScreenSize } from "uu5g04-hooks";
import Uu5Tiles from "uu5tilesg02";
import Config from "./config/config";
import Tile from "./tile";
import Lsi from "../config/lsi";
import Css from "./content.css";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "Content",
  nestingLevel: "bigBoxCollection",
  //@@viewOff:statics
};

const ShowFilter = {
  FILTER: "FILTER",
  BUTTON: "BUTTON",
};

export const Content = createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  propTypes: {
    participantDataList: UU5.PropTypes.array,
    onEdit: UU5.PropTypes.func,
    onAdd: UU5.PropTypes.func,
    onRemove: UU5.PropTypes.func,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    onEdit: () => {},
    onAdd: () => {},
    onRemove: () => {},
  },
  //@@viewOff:defaultProps

  render(props) {
    const [mode, setMode] = useState(ShowFilter.BUTTON);
    const screenSize = useScreenSize();

    //@@viewOn:private
    function toggleState() {
      if (mode === ShowFilter.BUTTON) {
        setMode(ShowFilter.FILTER);
      }
      if (mode === ShowFilter.FILTER) {
        setMode(ShowFilter.BUTTON);
      }
    }

    const FILTERS = [
      {
        key: "Trip",
        label: <UU5.Bricks.Lsi lsi={Lsi.participant.gridFilters.filterTripOption} />,
        component: (
          <UU5.Forms.Select>
            <UU5.Forms.Select.Option
              value={<UU5.Bricks.Lsi lsi={Lsi.participant.gridFilters.filterTripValue} />}
              disabled
            />
          </UU5.Forms.Select>
        ),
        filterFn: (item, value) => {
          console.log("Ve výstavbě");
        },
      },

      {
        key: "state",
        label: <UU5.Bricks.Lsi lsi={Lsi.participant.gridFilters.filterPartStateOption} />,
        component: (
          <UU5.Forms.Select label="Issue category">
            <UU5.Forms.Select.Option value="Active" />
            <UU5.Forms.Select.Option value="Passive" />
          </UU5.Forms.Select>
        ),
        filterFn: (item, value) => {
          let fragments = value.split(/[\s,.-;:_]/);
          return fragments.some((frag) => {
            let itemValue =
              typeof item.state === "object" ? UU5.Common.Tools.getLsiItemByLanguage(item.state) : item.state;
            return itemValue.toLowerCase().indexOf(frag.toLowerCase()) !== -1;
          });
        },
      },
    ];

    const GET_ACTIONS = ({ screenSize }) => {
      return [
        {
          content: {
            en: "Add participant",
            cs: "Přidat účastníka",
          },
          onClick: (event) => {
            props.onAdd(event);
          },
          icon: "mdi-plus-circle",
          colorSchema: "primary",
          bgStyle: "filled",
          active: true,
        },
        {
          content:
            mode === ShowFilter.BUTTON
              ? {
                  en: "Show filters",
                  cs: "Zobrazit filtry",
                }
              : {
                  en: "Hide filters",
                  cs: "Skrýt filtry",
                },
          onClick: (event) => {
            toggleState();
          },
          icon: mode === ShowFilter.BUTTON ? "mdi-plus-circle" : "mdi-minus-circle",
          colorSchema: "primary",
          bgStyle: "filled",
          active: true,
        },
      ];
    };

    const SORTERS = [
      {
        key: "name",
        label: <UU5.Bricks.Lsi lsi={Lsi.participant.gridSort.nameSortValue} />,
        sorterFn: (a, b) => {
          return UU5.Common.Tools.getLsiItemByLanguage(a.name).localeCompare(
            UU5.Common.Tools.getLsiItemByLanguage(b.name)
          );
        },
      },
      {
        key: "dateOfBirth",
        label: <UU5.Bricks.Lsi lsi={Lsi.participant.gridSort.dateOfBirthSortValue} />,
        sorterFn: (a, b) => {
          return UU5.Common.Tools.getLsiItemByLanguage(a.dateOfBirth).localeCompare(
            UU5.Common.Tools.getLsiItemByLanguage(b.dateOfBirth)
          );
        },
      },
    ];

    const dynamicCss = {
      fontSizeFilters: screenSize === "xs" ? "14px" : "17px",
    };
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const currentNestingLevel = UU5.Utils.NestingLevel.getNestingLevel(props, STATICS);

    return currentNestingLevel ? (
      <>
        <Uu5Tiles.ControllerProvider data={props.participantDataList} sorters={SORTERS} filters={FILTERS}>
          {mode === ShowFilter.FILTER && <Uu5Tiles.FilterBar />}
          <Uu5Tiles.SorterBar initialDisplayed={true} className={Css.fontSize(dynamicCss)} />
          <Uu5Tiles.ActionBar searchable={false} actions={GET_ACTIONS} className={Css.fontSize(dynamicCss)} />
          <Uu5Tiles.Grid tileMinWidth={250} tileMaxWidth={350} tileHeight={"auto"} tileSpacing={5} rowSpacing={5}>
            <Tile onEdit={props.onEdit} onRemove={props.onRemove} />
          </Uu5Tiles.Grid>
        </Uu5Tiles.ControllerProvider>
      </>
    ) : null;
    //@@viewOff:render
  },
});

export default Content;
