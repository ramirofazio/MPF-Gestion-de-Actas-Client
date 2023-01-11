import { css } from "styled-components";
import Variables from "./Variables";
const { principalColor, secondaryColor, greenColor, redColor, baseTransparentColor } = Variables;

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
    font-size: 45px;
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

  //* Forms
  formContainer: css`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    width: 100%;
    max-height: 70%;
    min-height: 70%;
    border-top: 2px solid ${principalColor};
    overflow-y: scroll;
    padding-block: 10px;
    padding-top: 5%;
  `,

  form: css`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    width: 40%;
    height: 70%;
  `,

  inputContainer: css`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 40%;
  `,

  inputLabel: css`
    align-self: flex-start;
    font-weight: 400;
    font-size: small;
    margin-bottom: 5px;
    color: ${secondaryColor};
  `,

  input: css`
    width: 100%;
    height: 60%;
    text-align: center;
    border-radius: 5px;
    border: 1px solid ${principalColor};
    font-size: medium;
    font-weight: 400;

    &::placeholder {
      color: black;
    }

    &:focus {
      border: 2px solid ${principalColor};
      outline: none;
    }

    &::-webkit-inner-spin-button {
      display: none;
    }
  `,

  select: css`
    width: 100%;
    height: 60%;
    text-align: center;
    border: 1px solid ${principalColor};
    border-radius: 5px;
    font-size: medium;
    font-weight: 400;

    &:focus {
      outline: 2px solid ${principalColor};
      border: none;
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
  actaCardContainer: css`
    text-decoration: none;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    width: 90%;
    min-height: 60px;
    margin-top: 5px;
    border-radius: 5px;
    transition: all 0.3s ease;
    border: ${(props) =>
      props.estado === "en proceso"
        ? `2px solid ${principalColor}`
        : props.estado === "completo"
        ? `2px solid ${greenColor}`
        : `2px solid ${redColor}`};
    transition: all 0.3s ease;

    &:hover {
      min-height: 15%;
      background-color: ${baseTransparentColor};
      background-color: ${(props) =>
        props.estado === "en proceso" ? "#00647335" : props.estado === "completo" ? "#6aa84f35" : "#a84f4f35"};
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

  //* Home
  button: css`
    padding: 10px;
    padding-inline: 40px;
    border-radius: 25px;
    border: 2px solid ${principalColor};
    color: ${secondaryColor};
    font-size: 15px;
    transition: all 0.3s ease-in;

    &:hover {
      cursor: pointer;
      background-color: ${principalColor};
      color: #fff;
      border: 2px solid transparent;
    }
  `,
  modal40x40: {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      transform: "translate(-50%, -50%)",
      backgroundColor: principalColor,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
      padding: 0,
      overflowX: "hidden",
      width: "40%",
      height: "40%",
    },
  },
};

export default GlobalStyles;
