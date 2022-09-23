import React from "react";
import { Text, ContainerGrid } from "../elements";

import styled from "styled-components";
import CategoryPost from "../components/CategoryPost";
import ButtonNavigation from "../components/ButtonNavigation";
import { actionCreators as mainActions } from "../redux/modules/main";
import MetaTag from "../shared/MetaTag";

import { useDispatch, useSelector } from "react-redux";
import { history } from "../redux/configureStore";

import { ReactComponent as LeftButton } from "../img/icon_left.svg";

const Recommend = (props) => {
	const recommend_list = useSelector(
		(state) => (state as any).main.recommend_list
	);
	const categoryId = props.match.params.id;
	const dispatch = useDispatch();

	let title = "";
	let BannerImg = "";

	React.useEffect(() => {
		if (categoryId === "new") {
			dispatch(mainActions.RecommendDB(10, categoryId));
		} else if (categoryId === "exercise") {
			dispatch(mainActions.RecommendDB(10, categoryId));
		} else {
			dispatch(mainActions.RecommendDB(10));
		}
	}, []);

	if (categoryId === "new") {
		title = "따끈따끈 새챌린지";
		BannerImg = "/banner/themebanner_01.webp";
	} else if (categoryId === "exercise") {
		title = "운동 가보자고";
		BannerImg = "/banner/themebanner_02.webp";
	} else {
		title = "추천 작심삼일";
		BannerImg = "/banner/themebanner_01.webp";
	}

	return (
		<React.Fragment>
			<ContainerGrid>
				<MetaTag title={"습관삼끼 | " + title} />

				<Header>
					<LeftButton
						style={{
							margin: "auto",
							fill: "#707070",
						}}
						onClick={() => {
							history.goBack();
						}}
					/>
					<Text alignCenter size="22px" bold>
						{title}
					</Text>
				</Header>

				<Container>
					<Banner src={BannerImg} />
					<div style={{ paddingBottom: "18vh" }}>
						<CardWrap>
							{recommend_list?.map((p, idx) => {
								return <CategoryPost key={p._id} {...p} />;
							})}
						</CardWrap>
					</div>
				</Container>
			</ContainerGrid>
			<ButtonNavigation />
		</React.Fragment>
	);
};

const Container = styled.div``;

const Header = styled.div`
	display: flex;
	justify-content: space-around;
	text-align: center;
`;

const Banner = styled.img`
	margin: 3% auto 7% auto;
	width: 100%;
`;

const CardWrap = styled.div`
	max-width: 380px;
	width: 100%;
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 4%;
	justify-items: center;
	align-items: baseline;
	margin-bottom: 14.6vh;
`;

export default Recommend;
