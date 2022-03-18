import React, { useState } from "react";
import styled from "styled-components";
import { Button, Input, Text } from "../elements";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";
import { history } from "../redux/configureStore";
import { KAKAO_AUTH_URL } from "../shared/Auth";

const Login = () => {
  const dispatch = useDispatch();

  //email
  const [user_email, setEmail] = useState("");
  const changeEmail = (e) => {
    setEmail(e.target.value);
  };

  //password
  const [user_pwd, setPwd] = useState("");
  const changePwd = (e) => {
    setPwd(e.target.value);
  };

  const login = () => {
    if (user_email === "" || user_pwd === "") {
      window.alert("아이디 혹은 비밀번호를 입력해주세요");
      return;
    }
    // console.log("userEmail, pwd", user_email, user_pwd);
    dispatch(userActions.loginDB(user_email, user_pwd));
  };
  return (
    <React.Fragment>
      <Text color="#FF8B37" size="24px" bold alignCenter margin="30% 0% 10%">
        브랜드로고
      </Text>
      <div>
        {/* <Text size="20px" bold margin="6% 10% 2%">
          이메일
        </Text> */}
        <InputBox>
          <Input
            borderRadius="5px"
            width="80%"
            bg="white"
            placeholder="이메일"
            _onChange={changeEmail}
          ></Input>
        </InputBox>
        {/* <Text size="20px" bold margin="6% 10% 2%">
          비밀번호
        </Text> */}
        <InputBox>
          <Input
            margin="5% 0%"
            borderRadius="5px"
            type="password"
            width="80%"
            bg="white"
            placeholder="패스워드"
            _onChange={changePwd}
          ></Input>
        </InputBox>
      </div>
      <ButtonBox>
        <Button bg="#FF8B37" width="80%" margin="3% 0%" _onClick={login}>
          로그인
        </Button>
        <Button
          bg="white"
          color="#9C9C9C"
          width="80%"
          _onClick={() => {
            // history.push(`/`);
            window.location.replace("/");
          }}
        >
          로그인 없이 둘러보기
        </Button>
        <Text color="gray" alignCenter>
          <Button
            border="1.5px solid #ff8b37"
            color="#9C9C9C"
            bg="white"
            width="80%"
            margin="3% 0%"
            _onClick={() => {
              history.push(`/signup`);
            }}
          >
            <span style={{ color: "#FF8B37" }}>브랜드 로고 회원가입</span>
          </Button>
        </Text>

        <Button
          href={KAKAO_AUTH_URL}
          bg="#FAE100"
          color="black"
          width="80%"
          // s
          _onClick={() => {
            console.log("KAKAO_AUTH_URL", KAKAO_AUTH_URL);
            window.location.href = KAKAO_AUTH_URL;
          }}
        >
          카카오톡 계정으로 시작
        </Button>
      </ButtonBox>
    </React.Fragment>
  );
};

const InputBox = styled.div`
  text-align: center;
`;

const ButtonBox = styled.div`
  display: block;
  align-items: center;
  text-align: center;
  margin: 5% 0%;
`;

export default Login;
