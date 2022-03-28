import React from "react";
import { Helmet } from "react-helmet";
// import { Helmet } from "react-helmet-async";

const MetaTag = (props) => {
  const { keywords, description, title } = props;

  return (
    <Helmet>
      <title>{title}</title>
      <meta property="og:title" content={title} />
      <meta property="og:site_name" content={title} />
      <meta property="og:description" content={description} />
      <meta
        property="og:image"
        content={process.env.PUBLIC_URL + "/meta/metatag_02.png"}
      />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />

      <meta name="twitter:title" content={title} />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:url" content="https://makehabit.co.kr/" />
      <meta
        name="twitter:image"
        content={process.env.PUBLIC_URL + "/meta/metatag_02.png"}
      />
    </Helmet>
  );
};

MetaTag.defaultProps = {
  // image: process.env.PUBLIC_URL + "/meta/metatag_02.png",
  description: "작심삼일도 열번 하면 30일이다",
  keywords: "습관삼끼, 습관만들기, 갓생살기",
};

export default MetaTag;
