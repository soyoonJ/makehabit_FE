import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid, Text, Button, ContainerGrid } from "../elements";
import MetaTag from "../shared/MetaTag";

import styled from "styled-components";

import { actionCreators as userActions } from "../redux/modules/user";

import { ReactComponent as CheckImg } from "../img/icon_check.svg";
import { ReactComponent as CloseImg } from "../img/icon_close.svg";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

const Signup = () => {
  const dispatch = useDispatch();
  //email
  const [user_email, setEmail] = useState("");
  const changeEmail = (e) => {
    setEmail(e.target.value);
  };
  //emailCheck
  const emailCheck = useSelector((state) => state.user.emailCheck);

  //nickname
  const [user_nickname, setNickname] = useState("");
  const changeNickname = (e) => {
    setNickname(e.target.value);
  };
  //nicknameChcek
  const nicknameCheck = useSelector((state) => state.user.nicknameCheck);

  //password
  const [user_pwd, setPwd] = useState("");
  const changePwd = (e) => {
    setPwd(e.target.value);
  };
  //password Check
  const [user_pwdcheck, setPwdcheck] = useState("");
  const changePwdcheck = (e) => {
    setPwdcheck(e.target.value);
  };

  //회원가입 보안
  const signup = () => {
    if (user_email === "") {
      window.alert("이메일을 입력해주세요!");
      return;
    }

    if (user_nickname === "") {
      window.alert("아이디를 입력해주세요!");
      return;
    }

    if (user_pwd !== user_pwdcheck || user_pwd === "" || user_pwdcheck === "") {
      window.alert("비밀번호와 비밀번호 재입력의 값이 다릅니다!");
      return;
    }
    dispatch(
      userActions.signupDB(user_email, user_nickname, user_pwd, user_pwdcheck)
    );
  };
  //input box 비밀번호 보기 / 끄기
  //이모티콘 스위칭
  let [isHidden, setIsHidden] = React.useState(true);
  //type형태
  let [pwdMode, setPwdMode] = React.useState("text");
  let [correct, setCorrect] = React.useState(false);

  const [isActive, setActive] = React.useState(false);

  React.useEffect(() => {
    if (isHidden === false) {
      setPwdMode("text");
    } else {
      setPwdMode("password");
    }

    if (user_pwd === user_pwdcheck) {
      setCorrect(true);
    } else {
      setCorrect(false);
    }

    if (
      user_email !== "" &&
      user_pwd !== "" &&
      user_pwdcheck !== "" &&
      user_nickname !== ""
    ) {
      setActive(true);
    } else {
      setActive(false);
    }
  }, [isHidden, user_pwdcheck, user_pwd, user_email, user_nickname]);

  const changeBool = () => {
    setIsHidden(!isHidden);
  };
  //이메일 체크
  React.useEffect(() => {
    console.log("changeEmail", user_email);
    dispatch(userActions.emailCheckDB(user_email));
  }, [user_email]);

  //닉네임 체크
  React.useEffect(() => {
    console.log("changeNick", user_nickname);
    dispatch(userActions.nicknameCheckDB(user_nickname));
  }, [user_nickname]);
  return (
    <React.Fragment>
      <MetaTag title="습관삼끼 | 회원가입" />

      <ContainerGrid>
        {/* <Container> */}
        <Grid textAlign="center" padding="2.48vh 0">
          <p style={{ fontSize: "2.6vh", fontWeight: "bold", margin: "0" }}>
            회원가입
          </p>
        </Grid>

        <Grid
          margin="4.02vh 0 5.45vh 0"
          fontSize="2.6vh"
          fontWeight="700"
          lineHeight="4.02vh"
        >
          <span style={{ color: "#FF8B37" }}>함께 도전하며,</span>
          <br />
          <span style={{ color: "#FF8B37" }}> 새로운 습관</span>을 만나보세요.
        </Grid>

        <Grid>
          <Title>아이디(이메일)</Title>
          <Grid position="relative">
            <InputBox
              placeholder="이메일 주소를 입력해주세요"
              onChange={changeEmail}
            />
            {user_email ? (
              emailCheck === 1 ? (
                <CheckResult style={{ color: "#245EF5" }}>
                  <CheckImg
                    width="1.89vh"
                    height="1.89vh"
                    style={{ fill: "#245EF5" }}
                  />
                  <p>사용 가능한 이메일</p>
                </CheckResult>
              ) : emailCheck === 0 ? (
                // <Text color="red">이미 사용 중인 이메일입니다</Text>
                <CheckResult style={{ color: "#E42E2E" }}>
                  <CloseImg
                    width="1.89vh"
                    height="1.89vh"
                    style={{ fill: "#E42E2E" }}
                  />
                  <p>이메일 형식을 확인해주세요</p>
                </CheckResult>
              ) : (
                <CheckResult style={{ color: "#E42E2E" }}>
                  <CloseImg
                    width="1.89vh"
                    height="1.89vh"
                    style={{ fill: "#E42E2E" }}
                  />
                  <p>이미 사용중인 이메일 입니다</p>
                </CheckResult>
              )
            ) : (
              <></>
            )}
          </Grid>
        </Grid>

        <Title
          style={{
            marginTop: "7.22vh",
          }}
        >
          비밀번호
        </Title>

        <Grid position="relative">
          <InputBox
            type={pwdMode}
            placeholder="8~16자, 문자/숫자/특수문자를 모두 포함하여 사용해주세요."
            onChange={changePwd}
          />

          {isHidden ? (
            <AiFillEye
              onClick={changeBool}
              style={{
                position: "absolute",
                top: "0.947vh",
                right: "20px",
                cursor: "pointer",
              }}
            />
          ) : (
            <AiFillEyeInvisible
              onClick={changeBool}
              style={{
                position: "absolute",
                top: "0.947vh",
                right: "20px",
                cursor: "pointer",
              }}
            />
          )}
        </Grid>

        <Title
          style={{
            marginTop: "4.26vh",
          }}
        >
          비밀번호 확인
        </Title>
        <Grid position="relative">
          <InputBox
            type={pwdMode}
            label="비밀번호 확인"
            placeholder="비밀번호를 다시 입력해주세요"
            onChange={changePwdcheck}
          />
          {isHidden ? (
            <AiFillEye
              onClick={changeBool}
              style={{
                position: "absolute",
                top: "0.947vh",
                right: "20px",
                cursor: "pointer",
              }}
            />
          ) : (
            <AiFillEyeInvisible
              onClick={changeBool}
              style={{
                position: "absolute",
                top: "0.947vh",
                right: "20px",
                cursor: "pointer",
              }}
            />
          )}

          {user_pwdcheck ? (
            correct ? (
              <CheckResult style={{ color: "#245EF5" }}>
                <CheckImg
                  width="1.89vh"
                  height="1.89vh"
                  style={{ fill: "#245EF5" }}
                />
                <p>비밀번호가 일치합니다</p>
              </CheckResult>
            ) : (
              // <Text color="red">이미 사용 중인 이메일입니다</Text>
              <CheckResult style={{ color: "#E42E2E" }}>
                <CloseImg
                  width="1.89vh"
                  height="1.89vh"
                  style={{ fill: "#E42E2E" }}
                />
                <p>비밀번호가 일치하지 않습니다</p>
              </CheckResult>
            )
          ) : (
            <></>
          )}
        </Grid>

        <Title
          style={{
            marginTop: "7.22vh",
          }}
        >
          마지막으로 닉네임을 알려주세요!
        </Title>
        <Grid position="relative">
          <InputBox
            placeholder="3~15자의 영어,한글,숫자만 사용가능합니다"
            onChange={changeNickname}
          />
          {user_nickname ? (
            nicknameCheck === 1 ? (
              <CheckResult style={{ color: "#245EF5" }}>
                <CheckImg
                  width="1.89vh"
                  height="1.89vh"
                  style={{ fill: "#245EF5" }}
                />
                <p>사용 가능한 닉네임입니다</p>
              </CheckResult>
            ) : nicknameCheck === 0 ? (
              // <Text color="red">이미 사용중인 닉네임입ㄴ니다</Text>
              <CheckResult style={{ color: "#E42E2E" }}>
                <CloseImg
                  width="1.89vh"
                  height="1.89vh"
                  style={{ fill: "#E42E2E" }}
                />
                <p>닉네임 형식을 확인해주세요</p>
              </CheckResult>
            ) : (
              // <Text color="red">이미 사용중인 닉네임입ㄴ니다</Text>
              <CheckResult style={{ color: "#E42E2E" }}>
                <CloseImg
                  width="1.89vh"
                  height="1.89vh"
                  style={{ fill: "#E42E2E" }}
                />
                <p>이미 사용중인 닉네임 입니다</p>
              </CheckResult>
            )
          ) : (
            <></>
          )}
        </Grid>

        <Grid textAlign="center" margin="7.22vh 0 0">
          <Text size="1.89vh">
            계정이 있으신가요? &nbsp;
            <a href={"/login"}>로그인</a>
          </Text>
        </Grid>
        {/* </Container> */}
      </ContainerGrid>

      {/*회원가입 버튼 */}
      <Footer>
        <Grid>
          {isActive ? (
            <JoinButton onClick={signup}>시작하기</JoinButton>
          ) : (
            <NotButton disabled>시작하기</NotButton>
          )}
        </Grid>
      </Footer>
    </React.Fragment>
  );
};

const Container = styled.div`
  width: 100%;
  justify-content: center;
  align-items: center;
  margin: 0;
`;

const Title = styled.div`
  font-weight: bold;
  font-size: 2.13vh;
  line-height: 2.79vh;
  margin-bottom: 0.71vh;
`;

const InputBox = styled.input`
  border: none;
  border-bottom: 1px solid #9c9c9c;
  width: 100%;
  padding: 0.59vh 0;
  color: #000;
  font-size: 1.89vh;
  line-height: 2.65vh;

  ::placeholder {
    color: #9c9c9c;
  }
`;

const CheckResult = styled.div`
  position: absolute;
  left: 0;
  margin: 0;
  display: flex;
  align-items: center;

  p {
    font-size: 1.54vh;
    margin: 0.94vh 0 0.94vh 0.82vh;
  }
`;

const JoinButton = styled.button`
  background: #ff8b37;
  width: 100%;
  height: 8.88vh;
  border: none;
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
  color: #fff;
  font-size: 2.6vh;
  font-weight: 700;
`;
const NotButton = styled.button`
  background: #f7f7f7;
  width: 100%;
  height: 8.88vh;
  border: none;
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
  color: #9c9c9c;
  font-size: 2.6vh;
  font-weight: 700;
`;

const Footer = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  max-width: 420px;
  align-items: center;
`;

export default Signup;
