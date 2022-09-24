import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import Tweets from "components/Tweets/Tweets";
import { getTweets } from "state/features/tweetsSlice";
import { useDispatch, useSelector } from "react-redux";
import "./App.scss";
import Notification from "mini-components/Notification/Notification";
import { useEffect, useState } from "react";

const App = () => {
  const dispatch = useDispatch();

  const [user, setUser] = useState(null);

  const globalStore = useSelector((state) => state.tweets);
  console.log("GLOBAL STORE:", globalStore);

  useEffect(() => {
    if (user) {
      const interval = setInterval(() => {
        dispatch(getTweets(user));
      }, 30000);
      return () => clearInterval(interval);
    }
  }, [user]);

  return (
    <div className="container">
      <div className="header">
        <p className="montserrat white">Welcome to the Twitter API App</p>
        <p className="roboto white">
          Select whether to view tweets from Ed Sheeran or from The Rock Dwayne
          Johnson
        </p>
      </div>
      <div className="subheader">
        <div
          className="card"
          onClick={() => {
            setUser({ user: "edsheeran" });
            dispatch(
              getTweets({
                user: "edsheeran",
              })
            );
          }}
        >
          <p className="roboto black">
            See the most recent tweets from Ed Sheeran.
          </p>

          <div className="card-row">
            <FontAwesomeIcon className="twitter-icon" icon={faTwitter} />
            <p className="roboto twitterBlue card-button">click here</p>
          </div>
        </div>
        <div
          className="card"
          onClick={() => {
            setUser({ user: "TheRock" });
            dispatch(
              getTweets({
                user: "TheRock",
              })
            );
          }}
        >
          <p className="roboto black">
            See the most recent tweets from The Rock
          </p>
          <div className="card-row">
            <FontAwesomeIcon className="twitter-icon" icon={faTwitter} />
            <p className="roboto twitterBlue card-button">click here</p>
          </div>
        </div>
      </div>
      <Tweets tweets={globalStore.tweets} />
      <Notification />
    </div>
  );
};

export default App;
