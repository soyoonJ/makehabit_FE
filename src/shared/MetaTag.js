import React from "react";
import { Helmet } from "react-helmet";

const MetaTag = (props) => {
  const { keywords, description, title, favicon } = props;

  return (
    <Helmet>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <title>{title}</title>
      <meta property="og:title" content={title} />
      <meta property="og:image" content={favicon} />
      <meta property="og:site_name" content="" />
      <meta property="og:description" content={description} />
      {/* 페이스북은 이미지의 사이즈가 최소 1200x630 픽셀보다 크기를 권장하며,
      1.91:1 의 비율인 이미지 권장
      트위터는 파일 사이즈가 1MB 보다 크기를 권장 */}
      <meta name="twitter:card" content="summary" />
    </Helmet>
  );
};

MetaTag.defaultProps = {
  description: "작심삼일도 열번 하면 30일이다",
  keywords: "습관삼끼, 습관만들기, 갓생살기",
};

export default MetaTag;
