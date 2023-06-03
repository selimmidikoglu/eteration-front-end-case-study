import React from "react";
// import GIF from "./hireme.gif";
type Props = {};

const Dummy = (props: Props) => {
  return (
    <div className="m-w-full m-h-full flex align-middle justify-center">
      <img
        src={
          "https://media1.giphy.com/media/clnORRzuaBV7rNisCP/giphy.gif?cid=ecf05e47p3sqbuo2xshl6z614pq9g6r33cwt5nr1hfb59ud1&ep=v1_gifs_search&rid=giphy.gif&ct=g"
        }
        style={{ width: 1000, height: 1000 }}
      />
    </div>
  );
};

export default Dummy;
