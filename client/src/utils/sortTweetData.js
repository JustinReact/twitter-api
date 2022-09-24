export const sortTweetData = (tweets) => {
  const { data, includes } = tweets;
  try {
    const newTweetsArray = data.map((tweet) => {
      return {
        ...tweet,
        user: includes.users[0],
      };
    });
    return newTweetsArray;
  } catch (error) {
    console.error(error);
  }
};
