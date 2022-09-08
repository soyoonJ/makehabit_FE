import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { actionCreators as postActions } from '../redux/modules/post';
import { Grid } from '../elements';
import CategoryModal from '../components/CategoryModal';
import PageBack from '../components/PageBack';
import MetaTag from '../shared/MetaTag';
import Spinner from '../shared/Spinner';
import { history } from '../redux/configureStore';
import { debounce, throttle } from 'lodash';
import styled from 'styled-components';
import LoginModal from '../components/LoginModal';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import moment from 'moment';
import ButtonNavigation from '../components/ButtonNavigation';
interface modalProps {
	openModal: () => void;
	closeModal: () => void;
	account: () => void;
	purchase: () => void;
	reset: () => void;
}
const PostWrite = (props) => {
	const dispatch = useDispatch();
	const editcategory = useSelector(
		(state) => (state as any).post.post.category
	);
	let stateCategoryValue = '';
	if (editcategory === 'study') {
		stateCategoryValue = '공부';
	} else if (editcategory === 'exercise') {
		stateCategoryValue = '운동/건강';
	} else if (editcategory === 'self-development') {
		stateCategoryValue = '자기개발/취미';
	} else if (editcategory === 'living-habit') {
		stateCategoryValue = '생활습관';
	} else if (editcategory === 'eco') {
		stateCategoryValue = '에코';
	}

	const [categoryValue, setCategoryValue] = useState(stateCategoryValue);
	const [sendCategory, setSendCategory] = useState(editcategory);

	const modalList = [
		['study', '공부'],
		['exercise', '운동/건강'],
		['self-development', '자기개발/취미'],
		['living-habit', '생활습관'],
		['eco', '에코'],
	];
	const getData = (idx) => {
		setCategoryValue(modalList[idx][1]);
		setSendCategory(modalList[idx][0]);
	};

	const EditpostId = props.match.params.id;

	const editthumbnail = useSelector(
		(state) => (state as any).post.post?.thumbnail
	);
	let image = editthumbnail;

	const edittitle = useSelector((state) => (state as any).post.post?.title);
	const editdesc = useSelector((state) => (state as any).post.post?.content);
	const editmethod = useSelector(
		(state) => (state as any).post.post?.howtoContent
	);
	const editdate = useSelector((state) => (state as any).post.post?.startAt);
	const editDay = moment(editdate);

	const editDayforamt = editDay.format('YYYY-MM-DD');
	const edtiEnd = moment(editdate).add(29, 'days').format('YYYY년 MM월 DD일');

	React.useEffect(() => {
		dispatch(postActions.getDetailPostDB(EditpostId));
	}, []);

	const offset = new Date().getTimezoneOffset() * 60000;
	let todayDate = new Date(Date.now() - offset).toISOString().split('T')[0];

	const [date, setDate] = useState(editDayforamt);
	const onChange = (e) => {
		setDate(e.target.value);
	};

	const now = new Date(date);
	let todayPlus30 = new Date(now.setDate(now.getDate() + 30));
	// @ts-ignore
	todayPlus30 = todayPlus30.toISOString().split('T')[0];
	console.log(
		'equal?',
		todayPlus30,
		typeof todayPlus30,
		todayDate,
		typeof todayDate
	);
	//content내용 받아오기
	const [title, setTitle] = React.useState(edittitle);
	const [titleLength, setTitleLength] = React.useState(0);
	const [desc, setDesc] = React.useState(editdesc);
	const [descLength, setDescLength] = React.useState(0);
	const [method, setMethod] = React.useState(editmethod);
	const [methodLength, setMethodLength] = React.useState(0);

	const debounceTitle = debounce((e) => {
		setTitle(e.target.value);
	}, 300);
	const throttleTitle = throttle((e) => {
		setTitleLength(e.target.value.length);
	}, 200);
	const debounceDesc = debounce((e) => {
		setDesc(e.target.value);
	}, 300);
	const throttleDesc = throttle((e) => {
		setDescLength(e.target.value.length);
	}, 200);
	const debounceMethod = debounce((e) => {
		setMethod(e.target.value);
	}, 300);

	const throttleMethod = throttle((e) => {
		setMethodLength(e.target.value.length);
	}, 200);

	const TitleKeyPress = React.useCallback(debounceTitle, []);
	const TitleLengthKeyPress = React.useCallback(throttleTitle, []);
	const DescKeyPress = React.useCallback(debounceDesc, []);
	const DescLengthKeyPress = React.useCallback(throttleDesc, []);
	const MethodKeyPress = React.useCallback(debounceMethod, []);
	const MethodLengthKeyPress = React.useCallback(throttleMethod, []);

	const onChangeTitle = (e) => {
		TitleKeyPress(e);
		TitleLengthKeyPress(e);
	};
	const onChangeDesc = (e) => {
		DescKeyPress(e);
		DescLengthKeyPress(e);
	};
	const onChangeMethod = (e) => {
		MethodKeyPress(e);
		MethodLengthKeyPress(e);
	};

	const [isLoading, setLoading] = React.useState(false);
	const isUploaded = useSelector((state) => (state as any).challenge?.isUpload);

	const confirm = () => {
		image = editthumbnail;

		if (title === '') {
			alert('챌린지 제목이 없습니다!');
			return;
		}

		if (sendCategory === null) {
			alert('카테고리를 설정하지 않았습니다!');
			return;
		}

		if (date === null) {
			alert('시작일이 입력되지 않았습니다.');
			return;
		}
		if (desc === '') {
			alert('챌린지 설명을 쓰지 않았습니다.');
			return;
		}
		if (method === '') {
			alert('챌린지 인증 방법을 쓰지 않았습니다');
			return;
		}

		dispatch(
			postActions.editPostDB(
				EditpostId,
				title,
				sendCategory,
				image,
				date,
				desc,
				method
			)
		);
		history.push(`/challenges/${EditpostId}`);
	};

	const childRef = useRef<modalProps>();
	const startDay = moment(date);
	const transformDay = startDay.format('YYYY년 MM월 DD일');

	//현재 시간 받아오기
	let currentTime = new Date();
	let hour = currentTime.getHours();
	let min = currentTime.getMinutes();
	const dayArray = ['일', '월', '화', '수', '목', '금', '토'];

	const loginModal = React.useRef<modalProps>();
	const is_token = localStorage.getItem('token') ? true : false;

	React.useEffect(() => {
		if (!is_token) {
			loginModal.current.openModal();
		}
	}, []);

	return (
		<Container>
			<MetaTag title="습관삼끼 | 신규 챌린지 작성" />
			{isLoading === true && isUploaded === false ? <Spinner /> : ''}

			<Grid>
				{/* 타이틀 */}
				<TitleContainer>
					<PageBack color="#707070" left padding="0 0 0 1.063rem" />
					<TitleText>챌린지 수정하기</TitleText>
				</TitleContainer>

				{/* 이미지 업로드 */}
				<Grid padding="0 1.250rem">
					<Imagethumbmail src={editthumbnail}></Imagethumbmail>
					<Caption>*이미지 수정은 불가합니다*</Caption>
				</Grid>

				{/* 제목 */}
				<Grid padding="1.250rem">
					<HeadLine>챌린지 제목</HeadLine>
					<TitleInput
						placeholder="제목을 입력해주세요."
						onChange={onChangeTitle}
						defaultValue={edittitle}
						maxLength={20}
					/>

					<LengthText textAlign="right">{titleLength}/20자</LengthText>
				</Grid>

				{/* 카테고리 선택 */}
				<CategoryButton
					onClick={() => {
						childRef.current.openModal();
					}}
				>
					{categoryValue ? (
						<CategoryContainer>
							<ToLeft>
								<HeadLine>{categoryValue}</HeadLine>
							</ToLeft>
							<ToRight>
								<MdOutlineKeyboardArrowDown />
							</ToRight>
						</CategoryContainer>
					) : (
						<CategoryContainer>
							<ToLeft>
								<HeadLine>카테고리 선택</HeadLine>
							</ToLeft>
							<ToRight>
								<MdOutlineKeyboardArrowDown />
							</ToRight>
						</CategoryContainer>
					)}
				</CategoryButton>

				<CategoryModal ref={childRef} getData={getData}></CategoryModal>

				{/* 이미지 첨부 */}
				<ChallengeStartContainer>
					<ToLeft>
						<ChallengeText>챌린지 시작일</ChallengeText>
					</ToLeft>
					<ToRight>
						<StartDate>{date ? transformDay : '2022년10월10일'}</StartDate>
						<DateInput
							id="inputCalendar"
							type="date"
							min={
								hour < 23
									? todayDate
									: min <= 50
									? todayDate
									: moment(todayDate, 'YYYY-MM-DD')
											.add(1, 'days')
											.format('YYYY-MM-DD')
							}
							onChange={onChange}
						></DateInput>
					</ToRight>
				</ChallengeStartContainer>
				<MarginBox>
					<CaptionTextBox>
						<Caption>3일간 10번씩 도전해봐요!</Caption>
					</CaptionTextBox>

					{/* 예상 종료일 */}
					<ColorBox>
						<EndDateText>
							<ToLeft style={{ margin: '0.813rem' }}>예상 종료일 </ToLeft>
							<ToRight style={{ margin: '0.813rem' }}>
								{/* @ts-ignore */}
								{todayPlus30 > todayDate
									? moment(date, 'YYYY.MM.DD')
											.add(29, 'days')
											.format('YYYY년 MM월 DD일') +
									  ' ' +
									  dayArray[moment(date, 'YYYY.MM.DD').add(29, 'days').day()] +
									  '요일'
									: edtiEnd}
							</ToRight>
						</EndDateText>
					</ColorBox>
				</MarginBox>
				<BorderBottom />
				<Grid padding="5%">
					<Grid>
						<HeadLine>챌린지 설명 작성</HeadLine>
					</Grid>
					<Grid>
						<CaptionTextBox>
							<Caption style={{ color: 'black' }}>
								무얼 도전해볼까요? 챌린지에 대해 설명해주세요.
							</Caption>
						</CaptionTextBox>
					</Grid>
					<Contents
						placeholder="ex) 매일 책 한 권 읽는 챌린지"
						onChange={onChangeDesc}
						maxLength={150}
						defaultValue={editdesc}
					></Contents>
					<LengthText textAlign="right">{descLength}/150자</LengthText>
				</Grid>
				<MarginBox>
					<Grid>
						<HeadLine>챌린지 인증 방법</HeadLine>
					</Grid>
					<Grid>
						<CaptionTextBox>
							<Caption style={{ color: 'black' }}>
								달성을 인증할 수 있는 방법에 대해 설명해주세요.
							</Caption>
						</CaptionTextBox>
					</Grid>
					<Contents
						placeholder="ex) 오늘 날짜가 적힌 메모와 책 페이지를 찍어주세요."
						onChange={onChangeMethod}
						maxLength={150}
						defaultValue={editmethod}
					></Contents>
					<LengthText textAlign="right">{methodLength}/150자</LengthText>
				</MarginBox>
				<MarginBox style={{ margin: '0 0 9.375rem 0' }}>
					<CreateBox>
						<CreateButton
							onClick={() => {
								confirm();
							}}
						>
							<CreateText>챌린지 수정완료</CreateText>
						</CreateButton>
					</CreateBox>
				</MarginBox>
			</Grid>
			<LoginModal ref={loginModal} in_page />
			<ButtonNavigation />
		</Container>
	);
};
const Container = styled.div``;
const TitleContainer = styled.div`
	text-align: center;
	margin: 1.313em 0 4.7vh 0;
	display: flex;
	align-items: center;
	justify-content: center;
`;

const TitleText = styled.span`
	font-size: 1.375rem;
	font-weight: bold;
	line-height: 1.813rem;
`;

const HeadLine = styled.span`
	font-size: 1.25rem;
	font-weight: bold;
	line-height: 1.625rem;
`;

const TitleInput = styled.input`
	width: 100%;
	box-sizing: border-box;
	background-color: #f7f7f7;
	height: 3.875rem;
	border: none;
	border-radius: 0.313rem;
	margin: 1.125rem 0 0;
	font-size: 1rem;
	padding-left: 1.625rem;
`;

const CategoryButton = styled.button`
	width: 100%;
	margin: 0.625rem 0;
	padding: 0;
	border: none;
	border-bottom: 1px solid #e0e0e0;
	background-color: white;
`;

const BorderBottom = styled.div`
	margin-top: 1.688rem;
	border-bottom: 1.5px solid #e0e0e0;
`;

const CategoryContainer = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
`;

const ToLeft = styled.div`
	display: flex;
	margin: 0.625rem 1.25rem;
	align-items: center;
	justify-content: left;
`;

const ToRight = styled.div`
	display: flex;
	margin: 0.625rem 1.25rem;
	align-items: center;
	justify-content: right;
`;

const ChallengeStartContainer = styled.div`
	display: grid;
	grid-template-columns: 1fr 1.7fr;
`;
const ChallengeText = styled.span`
	font-size: 1.25rem;
	font-weight: bold;
	line-height: 1.625rem;
	@media (max-width: 420px) {
		font-size: 0.9rem;
	}
`;
const StartDate = styled.span`
	font-size: 1.25rem;
	font-weight: bold;
	line-height: 1.625rem;
	color: #ff8b37;
	@media (max-width: 420px) {
		font-size: 0.9rem;
	}
`;
const DateInput = styled.input`
	color: white;
	text-align: center;
	border: none;
	::-webkit-datetime-edit {
		display: none;
	}
	::-webkit-calendar-picker-indicator {
		font-size: 1.25rem;
		margin: auto;
	}
	cursor: pointer;
`;
const MarginBox = styled.div`
	margin: 0.625rem 1.25rem;
`;

const CreateBox = styled.div`
	margin: 1.25rem 1.25rem;
`;

const CaptionTextBox = styled.div`
	margin: 0.625rem 0;
`;
const Caption = styled.span`
	font-size: 1rem;
	line-height: 1.25rem;
	color: #707070;
`;

const ColorBox = styled.div`
	width: 100%;
	height: 2.5rem;
	background-color: #ff8b37;
	border-radius: 0.313rem;
	display: flex;
	text-align: center;
`;

const EndDateText = styled.span`
	font-size: 1.125rem;
	font-weight: 600;
	line-height: 1.5rem;
	display: flex;
	align-items: center;
	width: 100%;
	justify-content: space-between;
	color: white;

	@media (max-width: 420px) {
		font-size: 0.8rem;
	}
`;

const Contents = styled.textarea`
	box-sizing: border-box;
	width: 100%;
	padding: 1.625rem;
	height: 8.125rem;
	background: #f7f7f7;
	resize: none;
	border: none;
	font-size: 1rem;
	::placeholder {
		font-size: 1rem;
		margin-top: 0.625rem;
		margin-left: 0.625rem;
		opacity: 1; /* 파이어폭스에서 뿌옇게 나오는 현상을 방지하기 위한 css */
	}
`;
const LengthText = styled.span<{ textAlign: string }>`
	margin-top: 0.5rem;
	display: flex;
	justify-content: right;
	font-size: 1rem;
	line-height: 1rem;
	color: #9c9c9c;
`;
const CreateButton = styled.button`
	width: 100%;
	height: 60px;
	cursor: pointer;
	background-color: #ff8b37;
	border: none;
	border-radius: 5px;
	color: #fff;
`;

const CreateText = styled.span`
	font-size: 1.375rem;
	font-weight: bold;
	line-height: 1.1813rem;
	color: white;
`;
const Imagethumbmail = styled.img`
	display: flex;
	margin: auto;
	height: 12rem;
	width: 100%;

	justify-content: center;
	align-items: center;
	cursor: pointer;
	background-size: 100% 100%;
`;

export default PostWrite;
