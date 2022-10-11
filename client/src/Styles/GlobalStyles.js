import { css } from "styled-components";
import Variables from "./Variables";
//* Initializations
const { principalColor, secondaryColor, baseTransparentColor } = Variables;

const GlobalStyles = {
  container: css`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
    padding-left: 20%;
  `,
  enProcesoContainer: css`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
    padding-left: 20%;
    flex-direction: column;
    justify-content: space-between;
  `,
  header: css`
    padding-top: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    width: 100%;
    flex: 0.2;
  `,
  headerTitle: css`
    color: ${principalColor};
    font-size: 50px;
    text-decoration: underline;
    text-decoration-thickness: 2px;
  `,
  headerDescription: css`
    color: ${secondaryColor};
    text-align: center;
    font-size: 16px;
  `,
  filtersContainer: css`
    width: 95%;
    margin-bottom: -30px;
  `,
  filtersInputContainer: css`
    display: flex;
    width: 10%;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-right: 10px;
  `,
  label: css`
    font-size: 13px;
    margin-bottom: 2px;
    color: ${secondaryColor};
  `,
  filtersInput: css`
    width: 100%;
    height: 100%;
    text-align: center;
    border: 1px solid ${principalColor};
    border-radius: 5px;

    &:focus {
      outline: none;
    }
  `,
  submitBtn: css`
    position: absolute;
    width: 2%;
    opacity: 0;

    &:hover {
      cursor: pointer;
    }
  `,
  //* Cards
  cardsContainer: css`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    max-height: 70%;
    min-height: 70%;
    border-top: 2px solid ${principalColor};
    overflow-y: scroll;
    padding-block: 10px;
  `,
  cardContainer: css`
    text-decoration: none;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    width: 90%;
    min-height: 60px;
    margin-top: 5px;
    border: 2px solid ${principalColor};
    border-radius: 5px;
    transition: all 0.3s ease;

    &:hover {
      min-height: 14%;
      background-color: ${baseTransparentColor};
    }
  `,
  cardInfo: css`
    flex: 1;
    color: ${secondaryColor};
    text-align: center;
    text-transform: capitalize;
    font-size: 15px;
  `,
  cardTitle: css`
    color: #000;
    font-weight: 500;
    text-decoration: underline;
  `,
  button: css`
    padding: 10px;
    padding-inline: 20px;
    border-radius: 10px;
    border: 2px solid ${principalColor};
    color: ${secondaryColor};
    font-size: 15px;
    transition: all 0.3s ease-in;

    &:hover {
      cursor: pointer;
      background-color: ${principalColor};
      color: #fff;
    }
  `,
  homeCard: css`
    text-decoration: none;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 60%;
    flex: 1;
    padding-left: 20px;
    min-height: 10%;
    max-height: 15%;
    margin-top: 5px;
    border: 2px solid ${principalColor};
    border-radius: 5px;
    transition: all 0.3s ease;

    &:hover {
      max-height: 16%;
      width: 65%;
      background-color: ${baseTransparentColor};
    }
  `,
};

export default GlobalStyles;
