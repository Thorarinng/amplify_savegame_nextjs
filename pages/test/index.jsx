import axios from "axios";
import React, { useState } from "react";
import next from "../../config/next";
import port from "../../config/port";

import furi from "../../config/next";
import cookieService from "../../service/cookieService";

// const index = () => {
//   return <h1>/test-index.jsx</h1>;
// };

const index = ({ data }) => {
  console.log(data);
  const [val, setVal] = useState(null);

  const handlePress = async () => {
    const res = await axios.post(`api/test`, { test: "test test hehe" });
    console.log(res.data);
    setVal(res.data.d);
  };

  return (
    <div>
      {console.log(process.env)}
      {console.log(next)}
      {console.log(port)}
      index
      <span> {val} </span>
      <button type="button" onClick={handlePress}>
        Get Data
      </button>
    </div>
  );
};

export const getServerSideProps = async ({ req }) => {
  const accessToken = cookieService.getAccessToken(req);
  return {
    props: {
      data: req.headers,
    },
  };
};

export default index;
