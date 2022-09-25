import React from "react";
import styled from "styled-components";
import { Text, ContainerGrid, Button } from "../elements";
import { history } from "../redux/configureStore";
import ButtonNavigation from "../components/ButtonNavigation";
import CategoryPost from "../components/CategoryPost";
import MetaTag from "../shared/MetaTag";

import { useDispatch, useSelector } from "react-redux";
import { actionCreators as mainActions } from "../redux/modules/main";
import { actionCreators as postActions } from "../redux/modules/post";
import { useLocation } from "react-router-dom";
import QueryString from "qs";

const Search = (props) => {
	const dispatch = useDispatch();
	const location = useLocation();
	const queryData = QueryString.parse(location.search, {
		ignoreQueryPrefix: true,
	});

	const search = React.useRef<HTMLInputElement>();
	const searchWord_list = useSelector(
		(state) => (state as any).main.searchWord_list
	);

	const likeList = useSelector((state) => (state as any).post.isLike);

	React.useEffect(() => {
		dispatch(mainActions.getSearchDB(search.current?.value));
	}, [likeList]);

	const handlePress = (e) => {
		if (e.key === "Enter") {
			searchBtn();
		}
	};

	const searchBtn = () => {
		history.push(`/search?q=${search.current?.value}`);
		dispatch(mainActions.getSearchDB(search.current?.value));
	};

	return (
		<React.Fragment>
			{search.current?.value === "undefined" ? (
				<MetaTag title="습관삼끼 | 검색결과" />
			) : (
				<MetaTag title={"습관삼끼 | " + search.current?.value + " 검색결과"} />
			)}

			<Container>
				<Header>
					<ContainerGrid>
						<Logo
							src="/logo/logo_text.svg"
							alt="로고"
							onClick={() => {
								history.push(`/`);
							}}
						/>

						<ContainerInput>
							<InputBox
								ref={search}
								defaultValue={queryData.q}
								onKeyPress={handlePress}
								placeholder="도전하고 싶은 습관을 검색해보세요!"
							></InputBox>

							<SearchIcon
								style={{ width: "20px" }}
								src="images/icon_search.svg"
								alt=""
								onClick={searchBtn}
							></SearchIcon>
						</ContainerInput>
					</ContainerGrid>
				</Header>

				<ContainerGrid margin="9.47vh 0 0">
					{searchWord_list?.length === 0 ? (
						<NoChallenge>
							<div>
								<img
									src={
										process.env.PUBLIC_URL +
										"/images/illust_question_samkki.png"
									}
									alt="상단 캐릭터 일러스트"
									style={{ height: "26.77vh" }}
								/>
							</div>
							<Text size="24px" bold margin="0px 0px 5px 0px">
								찾으시는 챌린지가 없어요!
							</Text>
							<Text size="20px" margin="0px 0px 5px 0px">
								새로운 챌린지를 개설하셔서
							</Text>
							<Text size="20px" margin="0px 0px 5px 0px">
								습관을 만들어 볼까요?
							</Text>
							<br />
							<Button
								bg="#FF8B37"
								margin="44px 0px 0px 0px"
								height="67px"
								_onClick={() => {
									history.push("/postwrite");
								}}
								fontSize="22px"
							>
								습관만들러 가기
							</Button>
						</NoChallenge>
					) : (
						<CardWrap>
							{searchWord_list?.map((p, idx) => {
								return <CategoryPost key={p._id} {...p} />;
							})}
						</CardWrap>
					)}
				</ContainerGrid>

				<ButtonNavigation></ButtonNavigation>
			</Container>
		</React.Fragment>
	);
};
const Logo = styled.img`
	width: 84px;
	margin-right: 5px;
	margin: 0px 10px 4px 0px;
	align-content: center;
`;
const NoChallenge = styled.div`
	text-align: center;
	font-size: 1.5rem;
	font-weight: bold;
	margin-top: 96px;
`;

const Container = styled.div`
	margin: 0%;
	padding-bottom: 50px;
	margin-bottom: 100px;
`;
const Header = styled.div`
	position: fixed;
	top: 0px;
	margin: auto;
	z-index: 99;

	width: 100%;
	max-width: 420px;
	background-color: #fff;
	display: flex;
	justify-content: center;
	align-items: center;
	height: 5rem;

	& > div {
		display: flex;
		width: 100%;
	}
`;

const CardWrap = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
	justify-items: center;
	align-items: center;
	gap: 0 4.1%;
	margin-bottom: 6.51vh;
`;
const ContainerInput = styled.div`
	width: 100%;
	height: 32px;
	border-radius: 5px;
	background-color: #f7f7f7;
	align-items: center;
	display: flex;
`;

const InputBox = styled.input`
	font-size: 13px;
	width: 100%;
	height: 29px;
	border: none;
	border-radius: 5px;
	background-color: #f7f7f7;
	outline: none;
	padding-left: 0.813rem;
	size: 5px;
	::placeholder {
		font-size: 13px;
		margin-left: 10px;
	}
`;
const SearchIcon = styled.img`
	height: 20px;
	width: 10%;
	margin-left: 8%;
	margin-right: 4%;
`;
export default Search;
