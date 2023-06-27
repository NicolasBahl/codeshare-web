import React from "react";

interface VotesContainerProps {
  votes: number;
}

const VotesContainer = (props: VotesContainerProps) => {
  const { votes } = props;
  return <span className="text-center">{votes}</span>;
};

export default VotesContainer;
