import Config from "./config/config";

const tileDiv = () => Config.Css.css`
  display: flex;
  justify-content: space-between;
  border-radius: 4px;
  border: 1px solid black;
  margin: 8px;
  padding: 7px;
  box-shadow: 5px 3px 10px gray;
`;
const nameDiv = () => Config.Css.css`
  font-weight: bold;
  font-size: 18px;
`;

export default {
  tileDiv,
  nameDiv,
};
