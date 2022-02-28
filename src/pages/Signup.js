import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Grid, Text, Input, Button } from "../elements";

import styled from "styled-components";

import { actionCreators as userActions } from "../redux/modules/user";

const Signup = () => {
  const dispatch = useDispatch();
  //email
  const [user_email, setEmail] = useState("");
  const changeEmail = (e) => {
    setEmail(e.target.value);
  };

  //nickname
  const [user_nickname, setNickname] = useState("");
  const changeNickname = (e) => {
    setNickname(e.target.value);
  };
  let [confirmNickname, setConfirmNickname] = useState(true);

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
    // dispatch(
    //   userActions.signupDB(user_email, user_nickname, user_pwd, user_pwdcheck)
    // );
  };

  return (
    <React.Fragment>
      <Container>
        <Grid textAlign="center">
          <Text size="32px" bold>
            회원가입
          </Text>
        </Grid>
        <Grid padding="2%">
          <Input
            label="이메일"
            placeholder="이메일을 입력해주세요"
            _onChange={changeEmail}
          />
        </Grid>
        <Grid padding="2%">
          <Input
            label="닉네임"
            placeholder="닉네임을 입력해주세요"
            _onChange={changeNickname}
          />
        </Grid>
        <Grid padding="2%">
          <Input
            type="password"
            label="비밀번호"
            placeholder="비밀번호를 입력해주세요"
            _onChange={changePwd}
          />
        </Grid>
        <Grid padding="2%">
          <Input
            type="password"
            label="비밀번호 확인"
            placeholder="비밀번호를 다시 입력해주세요"
            _onChange={changePwdcheck}
          />
        </Grid>
        <Grid padding="2%">
          <Button _onClick={signup}>회원가입</Button>
        </Grid>
        <Grid padding="2%" textAlign="center">
          <Text>
            계정이 있으신가요? &nbsp;
            <a href={"/login"}>로그인</a>
          </Text>
        </Grid>
      </Container>
    </React.Fragment>
  );
};

const Container = styled.div`
  width: 100%;
  justify-content: center;
  align-items: center;
  margin: 0;
`;
export default Signup;
