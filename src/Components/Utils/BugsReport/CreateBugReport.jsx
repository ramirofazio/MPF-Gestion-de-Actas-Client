import React from "react";
import { useDispatch } from "react-redux";
import { createBugReport } from "../../../redux/actions";
//* Styles
import styled, { css } from "styled-components";
import Variables from "../../../Styles/Variables";
import GlobalStyles from "../../../Styles/GlobalStyles";
import { ChatPoll } from "@styled-icons/remix-line/ChatPoll";
import { Close } from "@styled-icons/ionicons-outline/Close";
//* Modal
import Modal from "react-modal";
//* Initializations
const { button, input } = GlobalStyles;
const { principalColor, secondaryColor, redColor, greenColor } = Variables;

const ModalStyles = {
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
};

function CreateBugReport() {
  const dispatch = useDispatch();

  const [bugReportModal, setBugReportModal] = React.useState(false);
  const [bugReport, setBugReport] = React.useState({
    pathname: "",
    description: "",
  });

  React.useEffect(() => {
    setBugReport({ ...bugReport, pathname: window.location.pathname });
  }, [bugReportModal]);

  const handleBugReport = (e) => {
    e.preventDefault();
    dispatch(createBugReport(bugReport));
    setBugReportModal(false);
    setBugReport({ pathname: "", description: "" });
  };
  return (
    <>
      <ChatPollIcon onClick={() => setBugReportModal(!bugReportModal)} />
      <Modal isOpen={bugReportModal} style={ModalStyles} ariaHideApp={false}>
        <CloseIcon onClick={() => setBugReportModal(!bugReportModal)} />
        <Form onSubmit={handleBugReport}>
          <Title>Reportar un Bug</Title>
          <InputContainer>
            <TextArea
              type="text"
              name="Descripción"
              value={bugReport.description}
              placeholder="Descripción detallada del Bug"
              maxLength="200"
              onChange={(e) => setBugReport({ ...bugReport, description: e.target.value })}
            />
          </InputContainer>
          <Button type="submit" value="Reportar Bug" complete={bugReport.description !== "" ? "true" : "false"} />
        </Form>
      </Modal>
    </>
  );
}

export default CreateBugReport;

const ChatPollIcon = styled(ChatPoll)`
  position: absolute;
  bottom: 0;
  left: 0;
  margin-bottom: 10px;
  margin-left: 5px;
  color: white;
  width: 10%;
  transition: all 0.5s ease;

  &:hover {
    color: ${secondaryColor};
    cursor: pointer;
  }
`;

const CloseIcon = styled(Close)`
  position: absolute;
  right: 0;
  top: 0;
  width: 8%;
  margin-top: 1%;
  color: white;
  transition: all 0.5s ease;

  &:hover {
    color: ${secondaryColor};
    cursor: pointer;
  }
`;

const TextArea = styled.textarea`
  ${input}
  font-size: medium;
  text-align: center;
  max-height: 70%;
  max-width: 100%;
  min-height: 70%;
  min-width: 100%;
`;

const Button = styled.input`
  ${button}
  padding: 10px;
  padding-inline: 25px;
  text-decoration: none;
  background: white;
  border: 2px solid ${redColor};
  pointer-events: none;
  margin-top: 10px;

  ${(props) =>
    props.complete === "true" &&
    css`
      pointer-events: all;
      border: 2px solid ${greenColor};
    `}
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 5%;
  color: white;
`;

const Title = styled.h4`
  border-bottom: 2px solid white;
  width: 120%;
  text-align: center;
  margin-bottom: 2%;
  padding-bottom: 10px;
`;

const InputContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  border-bottom: 1px solid ${secondaryColor};
`;
