import React, { useState } from "react";
import styled from "styled-components";
import { Button, Input, Text } from "../elements";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";

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
    dispatch(userActions.loginDB(user_email, user_pwd));
  };
  return (
    <React.Fragment>
      <Text size="24px" bold alignCenter margin="30% 0% 10%">
        로그인
      </Text>
      <div>
        <Text size="20px" bold margin="6% 10% 2%">
          이메일
        </Text>
        <InputBox>
          <Input
            width="80%"
            bg="white"
            placeholder="이메일 입력해주세요"
            _onChange={changeEmail}
          ></Input>
        </InputBox>
        <Text size="20px" bold margin="6% 10% 2%">
          비밀번호
        </Text>
        <InputBox>
          <Input
            type="password"
            width="80%"
            bg="white"
            placeholder="비밀번호를 입력해주세요"
            _onChange={changePwd}
          ></Input>
        </InputBox>
      </div>
      <Button width="50%" margin="5% 25%" _onClick={login}>
        로그인
      </Button>
      <Text alignCenter>
        계정이 없으신가요?&nbsp;<a href={"/signup"}>회원가입</a>
      </Text>
      <Text size="20px" bold margin="6% 10% 2%">
        소셜로그인
      </Text>
    </React.Fragment>
  );
};

const InputBox = styled.div`
  text-align: center;
`;

export default Login;
