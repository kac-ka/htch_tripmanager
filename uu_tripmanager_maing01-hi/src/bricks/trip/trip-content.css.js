import Config from "./config/config";

const imageWrapper = () => Config.Css.css`
 display: flex;
 justify-content: center;
`;

const coverImage = () => Config.Css.css`
  border-radius: 8px;
  overflow: visible;
  z-index: -1;
`;

const tripInfoWrapper = () => Config.Css.css`
  padding: 0;
  
`;

const tripInfoName = (dynamicCss) => Config.Css.css`
  font-size: ${dynamicCss.fontSizeName};
  padding: ${dynamicCss.padding};
  margin-top: 5px;
  font-weight: bold;
  background-color: rgba(187, 193, 195 , 0.2);
  border-radius: 8px;
`;

const tripInfoLocation = (dynamicCss) => Config.Css.css`
  padding: 5px;
  margin-top: 5px;
  font-size: ${dynamicCss.fontSizeLocation};
`;

const tripInfo = (dynamicCss) => Config.Css.css`
  font-size: ${dynamicCss.fontSizeInfo};
  padding: 5px;
  margin-top: 5px;
`;

const tripActions = () => Config.Css.css`
  display: flex;
  flex-direction: column;
  margin-top: 0;
`;

const tripActionButton = () => Config.Css.css`
  margin: 3px;
`;

export default {
  coverImage,
  tripInfo,
  tripInfoLocation,
  tripActions,
  tripActionButton,
  imageWrapper,
  tripInfoName,
  tripInfoWrapper,
};
