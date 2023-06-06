import Config from "./config/config";

const fontSize = (dynamicCss) => Config.Css.css`
  font-size: ${dynamicCss.fontSizeFilters};
`;

export default {
  fontSize,
};
