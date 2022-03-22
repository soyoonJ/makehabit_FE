import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid, Text, Button, ContainerGrid } from "../elements";

import styled from "styled-components";

import { actionCreators as userActions } from "../redux/modules/user";

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

  // let [confirmNickname, setConfirmNickname] = useState(true);

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

  React.useEffect(() => {
    if (isHidden === false) {
      setPwdMode("text");
    } else {
      setPwdMode("password");
    }
  }, [isHidden]);

  const changeBool = () => {
    setIsHidden(!isHidden);
  };

  return (
    <React.Fragment>
      <ContainerGrid>
        {/* <Container> */}
        <Grid textAlign="center" padding="2.48vh 0">
          <p style={{ fontSize: "2.6vh", fontWeight: "bold", margin: "0" }}>
            회원가입
          </p>
        </Grid>

        <Grid margin="4.02vh 0 0 0" fontSize="2.6vh" fontWeight="700">
          <span style={{ color: "#FF8B37" }}>함께 도전하며,</span>
          <br />
          <span style={{ color: "#FF8B37" }}> 새로운 습관</span>을 만나보세요.
        </Grid>

        <Grid margin="5% 0% 0% 0%">
          <Text bold size="18px">
            아이디(이메일)
          </Text>
          <InputBox
            placeholder="이메일 주소를 입력해주세요"
            onChange={changeEmail}
            onBlur={() => {
              // console.log("포커스 아웃 됨!");
              dispatch(userActions.emailCheckDB(user_email));
              // console.log(emailCheck);
            }}
          />
          {user_email ? (
            emailCheck ? (
              <Text margin="0" color="green">
                사용 가능한 이메일
              </Text>
            ) : (
              // <Text color="red">이미 사용 중인 이메일입니다</Text>
              <Text margin="0" color="red">
                사용 불가한 이메일입니다
              </Text>
            )
          ) : (
            <Text margin="0" color="white">
              기본값
            </Text>
          )}
        </Grid>

        <Text bold size="18px">
          비밀번호
        </Text>
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
              right: "20px",
              top: "331px",
              cursor: "pointer",
            }}
          />
        ) : (
          <AiFillEyeInvisible
            onClick={changeBool}
            style={{
              position: "absolute",
              right: "20px",
              top: "331px",
              cursor: "pointer",
            }}
          />
        )}
        <Text bold size="18px">
          비밀번호 확인
        </Text>
        <InputBox
          type={pwdMode}
          label="비밀번호 확인"
          placeholder="비밀번호를 다시 입력해주세요"
          onChange={changePwdcheck}
        />

        <Text bold size="18px">
          마지막으로 닉네임을 알려주세요!
        </Text>
        <InputBox
          placeholder="3~15자의 영어,한글,숫자만 사용가능합니다"
          onChange={changeNickname}
          onBlur={() => {
            // console.log("포커스 아웃 됨!");
            dispatch(userActions.nicknameCheckDB(user_nickname));
            // console.log(emailCheck);
          }}
        />
        {user_nickname ? (
          nicknameCheck ? (
            <Text margin="0" color="green">
              사용 가능한 닉네임입니다
            </Text>
          ) : (
            // <Text color="red">이미 사용중인 닉네임입ㄴ니다</Text>
            <Text margin="0" color="red">
              사용 불가한 닉네임입니다
            </Text>
          )
        ) : (
          <Text margin="0" color="white">
            기본값
          </Text>
        )}

        <Grid textAlign="center">
          <Text>
            계정이 있으신가요? &nbsp;
            <a href={"/login"}>로그인</a>
          </Text>
        </Grid>
        {/* </Container> */}
      </ContainerGrid>

      {/*회원가입 버튼 */}
      <Footer>
        <Grid>
          <Button bg="#FF8B37" width="100%" _onClick={signup}>
            시작하기
          </Button>
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

const InputBox = styled.input`
  border: none;
  border-bottom: 1px solid #9c9c9c;
  width: 100%;
  padding-bottom: 6px;
  color: #9c9c9c;
  size: 16px;
`;

const Footer = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  max-width: 420px;
  align-items: center;
`;

export default Signup;
