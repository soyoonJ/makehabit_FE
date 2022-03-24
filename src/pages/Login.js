import React, { useState } from "react";
import styled from "styled-components";
import { ContainerGrid, Button, Input, Text } from "../elements";
import MetaTag from "../shared/MetaTag";

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

  const handlePress = (e) => {
    if (e.key === "Enter") {
      console.log("enter");
      login();
    }
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
      <MetaTag title="습관삼끼 | 로그인" />

      <ContainerGrid>
        <Text
          color="#FF8B37"
          size="4.26vh"
          bold
          alignCenter
          margin="12.2vh 0 9.36vh"
        >
          습관삼끼
        </Text>
        <div>
          {/* <Text size="20px" bold margin="6% 10% 2%">
          이메일
        </Text> */}
          <InputBox>
            <Input
              borderRadius="5px"
              height="7vh"
              bg="white"
              padding="2.13vh"
              placeholder="이메일"
              _onChange={changeEmail}
              _onKeyPress={handlePress}
            ></Input>
          </InputBox>
          {/* <Text size="20px" bold margin="6% 10% 2%">
          비밀번호
        </Text> */}
          <InputBox>
            <Input
              margin="5% 0 4.26vh"
              height="7vh"
              padding="2.13vh"
              borderRadius="5px"
              type="password"
              bg="white"
              placeholder="패스워드"
              _onChange={changePwd}
              _onKeyPress={handlePress}
            ></Input>
          </InputBox>
        </div>

        <Button
          bg="#FF8B37"
          height="7.7vh"
          fontSize="2.6vh"
          fontWeight="700"
          margin="3% 0%"
          _onClick={login}
        >
          로그인
        </Button>
        <Button
          bg="white"
          height="7.7vh"
          fontSize="2.13vh"
          fontWeight="600"
          margin="0 0 4.38vh"
          color="#9C9C9C"
          _onClick={() => {
            history.push(`/`);
          }}
        >
          로그인 없이 둘러보기
        </Button>
      </ContainerGrid>

      <SignupDiv>
        <hr />
        <p>가입하고 습관 만들어보기</p>
      </SignupDiv>

      <ContainerGrid>
        <Text color="gray" alignCenter>
          <Button
            centerFlex
            fontSize="2.13vh"
            fontWeight="600"
            lineHeight="2.79vh"
            border="1.5px solid #ff8b37"
            color="#FF8B37"
            bg="white"
            height="6.16vh"
            margin="0 0 1.77vh 0"
            _onClick={() => {
              history.push(`/signup`);
            }}
          >
            브랜드 로고 회원가입
          </Button>
        </Text>

        <KakaoImg
          href={KAKAO_AUTH_URL}
          src={process.env.PUBLIC_URL + "/images/kakao_login.png"}
          alt="카카오 로그인"
          onClick={() => {
            console.log("KAKAO_AUTH_URL", KAKAO_AUTH_URL);
            window.location.href = KAKAO_AUTH_URL;
          }}
        ></KakaoImg>
      </ContainerGrid>
    </React.Fragment>
  );
};

const InputBox = styled.div`
  text-align: center;
`;

const SignupDiv = styled.div`
  width: 100%;
  height: 4.5vh;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 3.67vh;

  hr {
    position: absolute;
    left: 0;
    width: 100%;
    height: 0px;
    border: 1.5px solid #e0e0e0;
    background: #e0e0e0;
    z-index: 0;
  }

  p {
    width: 45%;
    margin: 0 auto;
    padding: 0.94vh;
    color: #9c9c9c;
    height: 4.5vh;
    line-height: 2.65vh;
    background: #fff;
    font-size: 1.89vh;
    text-align: center;
    z-index: 10;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const KakaoImg = styled.img`
  width: 100%;
`;

export default Login;
