import React from "react";
import { Link, useNavigate } from "react-router-dom";
//* Redux
import { useDispatch } from "react-redux";
import { createBugReport } from "../../redux/actions";
//* Styles
import styled, { css } from "styled-components";
import Variables from "../../Styles/Variables";
import GlobalStyles from "../../Styles/GlobalStyles";
import logo from "../../Assets/logo.png";
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

function NavBar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [adminPassModal, setAdminPassModal] = React.useState(false);
  const [adminPass, setAdminPass] = React.useState("");
  const [bugReportModal, setBugReportModal] = React.useState(false);
  const [bugReport, setBugReport] = React.useState({
    pathname: "",
    description: "",
  });

  React.useEffect(() => {
    setBugReport({ ...bugReport, pathname: window.location.pathname });
  });

  const handleBugReport = (e) => {
    e.preventDefault();
    dispatch(createBugReport(bugReport));
    setBugReportModal(false);
    setBugReport({ pathname: "", description: "" });
  };

  const handleAdm = (e) => {
    e.preventDefault();
    if (adminPass === "CIJGIDSI") {
      localStorage.setItem("admin", true);
      setAdminPassModal(false);
      navigate("/admin");
    }
  };

  return (
    <NavBarContainer>
      <Container>
        <HiddenButton onDoubleClick={() => setAdminPassModal(!adminPassModal)} />
        <Logo src={logo} alt="logo" />
        <HomeLinks to="/">Crear Acta</HomeLinks>
        <HomeLinks to="/consultas">Consultas</HomeLinks>
        {localStorage.getItem("admin") === "true" && (
          <HomeLinks to="/" onClick={() => localStorage.removeItem("admin")}>
            Cerrar
          </HomeLinks>
        )}
        <ChatPollIcon onClick={() => setBugReportModal(!bugReportModal)} />
      </Container>
      <Modal isOpen={bugReportModal} style={ModalStyles}>
        <CloseIcon onClick={() => setBugReportModal(!bugReportModal)} />
        <Form onSubmit={handleBugReport}>
          <Title>Reportar un Bug</Title>
          <InputContainer>
            <TextArea
              type="text"
              name="Descripción"
              value={bugReport.description}
              placeholder="Descripción del Bug"
              maxLength="200"
              onChange={(e) => setBugReport({ ...bugReport, description: e.target.value })}
            />
          </InputContainer>
          <Button type="submit" value="Reportar Bug" complete={bugReport.description !== "" ? "true" : "false"} />
        </Form>
      </Modal>
      <Modal isOpen={adminPassModal} style={ModalStyles}>
        <Form onSubmit={handleAdm}>
          <Title>Contraseña Administrador</Title>
          <InputContainer>
            <Input
              type="password"
              name="adminPass"
              value={adminPass}
              placeholder="Contraseña"
              onChange={(e) => setAdminPass(e.target.value)}
            />
          </InputContainer>
        </Form>
      </Modal>
    </NavBarContainer>
  );
}

export default NavBar;

const NavBarContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20%;
  height: 100%;
  position: fixed;
  background: ${principalColor};
  transition: all 0.5s ease;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  height: 100%;
  width: 100%;
  padding-top: 20%;
  padding-inline: 5px;
  transition: all 0.5s ease;
`;

const HomeLinks = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 8%;
  font-size: larger;
  padding: 20px;
  margin-bottom: 15%;
  border-radius: 10px;
  text-decoration: none;
  background: #ffffff;
  color: ${Variables.principalColor};
  border: 2px solid #ffffff;

  transition: all 0.3s ease-in;

  &:hover {
    background: ${principalColor};
    border: 2px solid #ffffff;
    color: #ffffff;
  }
`;

const Logo = styled.img`
  width: 50%;
  margin-bottom: 30%;
  transition: all 0.5s ease;
`;

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

const TextArea = styled.textarea`
  ${input}
  font-size: medium;
  text-align: center;
  max-height: 70%;
  max-width: 100%;
  min-height: 70%;
  min-width: 100%;
`;

const Input = styled.input`
  ${input}
  font-size: medium;
  text-align: center;
  max-height: 30%;
  max-width: 60%;
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

const HiddenButton = styled.button`
  position: absolute;
  top: 0;
  left: 0;
  width: 5px;
  height: 5px;
  background: transparent;
  background-color: transparent;
  border: transparent;

  &:hover {
    cursor: help;
  }
`;
