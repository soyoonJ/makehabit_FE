import React from "react";
import styled from "styled-components";
import PwaPrompt from "./PwaPrompt";
const OnBoardModal = (props) => {
	const { onClose } = props;
	//배너
	const [bannerIndex, setBannerIndex] = React.useState<number>(0);

	const imgURL = [
		"/onBoard/onBoarding_01.png",
		"/onBoard/onBoarding_02.png",
		"/onBoard/onBoarding_03.png",
	];

	// 다음 버튼 클릭시 배너의 인덱스를 +1, 인덱스가 마지막이면 처음인 0으로 돌아가기.
	const clickNext = () => {
		if (bannerIndex >= imgURL.length - 1) {
			setBannerIndex(0);
			return;
		}
		setBannerIndex(bannerIndex + 1);
	};

	return (
		<Container>
			<section>
				<ModalContent>
					<Carousel bannerIndex={bannerIndex}>
						{imgURL.map((e, i) => (
							<ContentBox style={{ display: "flex" }} index={i} key={i}>
								<Content style={{ display: "flex" }}>
									<Img imgURL={imgURL[i]} index={i}></Img>
								</Content>
							</ContentBox>
						))}
					</Carousel>
				</ModalContent>
				{bannerIndex === imgURL.length - 1 ? (
					<PwaPrompt _onClick={onClose} />
				) : (
					<ButtonBox>
						<Button
							onClick={() => {
								clickNext();
							}}
						>
							다음 보기
						</Button>
					</ButtonBox>
				)}
			</section>
		</Container>
	);
};

const Container = styled.div`
	height: 100%;
	width: 100%;
	max-width: 420px;

	background: rgba(0, 0, 0, 0.6);
	z-index: 101;
	display: flex;

	section {
		width: 100%;
		height: 100%;
		align-self: end;
		background-color: transparent !important;
	}
`;

const ModalContent = styled.div`
	height: 100%;
	width: 420px;
	background-color: #fff;
	position: fixed;
	top: 0;
	overflow: hidden;
	z-index: 200;
`;

const Carousel = styled.div<{ bannerIndex: number }>`
	display: flex;

	@media only screen and (min-width: 420px) {
		transform: translate(
			${(props) => {
				return -(props.bannerIndex * 420) + "px";
			}}
		);
	}

	@media (max-width: 420px) {
		transform: translate(
			${(props) => {
				return -(props.bannerIndex * 100) + "vw";
			}}
		);
	}

	transition: all 0.2s;
`;

const ContentBox = styled.div<{ index: number }>`
	font-size: 22px;
	height: 100vh;
	width: 80%;
	font-weight: 700;
	line-height: 60px;
	@media (min-width: 420px) {
		width: 420px;
	}

	@media (max-width: 420px) {
		width: 100vw;
	}
`;

const Content = styled.div`
	position: relative;
	width: 100%;
	padding: 0px;
`;

const Img = styled.div<{ imgURL: string; index: number }>`
	background-image: url(${(props) => props.imgURL});

	@media (min-width: 420px) {
		width: 420px;
		margin: 0 2.5rem;
	}

	@media (max-width: 420px) {
		width: 100vw;
		margin: 0 10vw;
	}
	background-size: 100% auto;
	background-position: center;
	background-repeat: no-repeat;
`;

const ButtonBox = styled.div`
	position: fixed;
	bottom: 0;
	width: 420px;
	height: 75px;
	color: #fff;
	background-color: #ff8b37;
	font-size: 1.5rem;
	font-weight: 600;
	cursor: default;
	border-top-left-radius: 30px;
	border-top-right-radius: 30px;

	border: none;
	display: flex;
	align-items: center;
	justify-content: center;
	@media (max-width: 420px) {
		width: 100vw;
	}
	z-index: 201;
`;

const Button = styled.button`
	width: 100%;
	background-color: #ff8b37;
	font-size: 1.5rem;
	font-weight: 600;
	cursor: default;
	border-top-left-radius: 30px;
	border-top-right-radius: 30px;
	color: #fff;
	border: none;
`;

export default OnBoardModal;
