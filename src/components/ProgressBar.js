import styled from "styled-components";
// import { useSelector } from "react-redux";

function Progressbar() {
  //   const quizList = useSelector((state) => state.quiz.quizList);
  //   const answer = useSelector((state) => state.quiz.answer);

  return (
    <Container>
      <Progress width={(5 / 10) * 100 + "%"} />
      <Dot />
    </Container>
  );
}

export default Progressbar;

const Container = styled.div`
  margin: 50px auto;
  background-color: #eee;
  width: 500px;
  height: 20px;
  display: flex;
  align-items: center;
  border-radius: 20px;
`;
const Progress = styled.div`
  background-color: #000;
  width: ${(props) => props.width};
  height: 100%;
  transition: width 1s;
  border-radius: 20px;
`;

//프로그레스 바에 원 달아서 프로그레스 바가 차오를 때 같이 차오름
const Dot = styled.div`
  width: 40px;
  height: 40px;
  box-sizing: border-box;
  border: 5px solid #000;
  border-radius: 20px;
  background: #fff;
  margin-left: -10px;
`;
