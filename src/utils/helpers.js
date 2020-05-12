export const formatQuestion = (question, author, authedUser) => {
  const { id, optionOne, optionTwo, timestamp } = question;
  const { name, avatarURL } = author;

  return {
    avatar: avatarURL,
    id,
    hasVoted: optionOne.votes.includes(authedUser) || optionTwo.votes.includes(authedUser),
    name,
    optionOne,
    optionTwo,
    timestamp
  };
};