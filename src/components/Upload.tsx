import React, { forwardRef, useImperativeHandle } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import { actionCreators as postActions } from '../redux/modules/post';

const Upload = forwardRef((props: any, ref) => {
	const dispatch = useDispatch();
	const location = useLocation();

	const { _onClick, _ref } = props;

	useImperativeHandle(ref, () => ({
		upload() {
			let myInput = document.getElementById('thumnail');
			myInput.click();
		},
	}));

	const saveFileImage = (e) => {
		setPreviewImg(URL.createObjectURL(e.target.files[0]));
		dispatch((postActions as any).imgExist(true));
	};

	const editthumbnail = useSelector(
		(state) => (state as any).post.post?.thumbnail
	);

	const [previewImg, setPreviewImg] = React.useState(
		location.pathname.includes('/editPostpage')
			? null
			: location.pathname.includes('/confirm')
			? process.env.PUBLIC_URL + '/images/confirm_base.png'
			: process.env.PUBLIC_URL + '/images/open_base.png'
	);

	React.useEffect(() => {
		dispatch((postActions as any).imgExist(false));
		if (location.pathname.includes('/editPostpage')) {
			setPreviewImg(editthumbnail);
		}
	}, []);

	return (
		<div>
			<ImageBox
				style={{
					backgroundImage: `url(${previewImg})`,
				}}
				onClick={_onClick}
			>
				<ImageInput
					id="thumnail"
					type="file"
					accept=".png, .jpg, .jpeg, .gif, .jfif, .webp, image/*;capture=camera"
					onChange={saveFileImage}
					ref={_ref}
					cursor={'pointer'}
				></ImageInput>
			</ImageBox>
		</div>
	);
});

Upload.defaultProps = {};

const ImageBox = styled.div`
	display: flex;
	margin: auto;
	height: 12rem;
	width: 100%;

	justify-content: center;
	align-items: center;
	cursor: pointer;
	background-size: 100% 100%;
`;

const ImageInput = styled.input<{ cursor: string }>`
	display: none;
`;

export default Upload;
