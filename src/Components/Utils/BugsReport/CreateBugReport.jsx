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
const { button, input, modal40x40 } = GlobalStyles;
const { secondaryColor, redColor, greenColor, principalColor } = Variables;

const modal40 = {
  content: {
    ...modal40x40.content,
    width: "40%",
    height: "max-content",
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
      <Modal isOpen={bugReportModal} style={modal40} ariaHideApp={false}>
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
  flex: 1;
  min-height: 100%;
  max-height: 100%;

  text-align: center;

  &:focus {
    all: none;
  }
`;

const Title = styled.h4`
  border-bottom: 2px solid white;
  width: 120%;
  text-align: center;
  margin-bottom: 2%;
  padding-bottom: 10px;
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

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 100px;
  border-bottom: 1px solid ${secondaryColor};
  padding-bottom: 10px;
  margin-block: 5px;
`;

const Button = styled.input`
  ${button}
  padding: 5px;
  padding-inline: 15px;
  text-decoration: none;
  background: white;
  border: 2px solid ${redColor};
  pointer-events: none;
  margin-bottom: -2.5%;
  margin-top: 1%;

  &:hover {
    cursor: pointer;
    background-color: white;
    color: ${principalColor};
    border: 2px solid transparent;
  }

  ${(props) =>
    props.complete === "true" &&
    css`
      pointer-events: all;
      border: 2px solid ${greenColor};
    `}
`;
