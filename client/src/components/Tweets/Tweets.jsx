import { API_STATUS } from "mini-components/Common/Constants";
import { useSelector } from "react-redux";
import { StyledLoader } from "mini-components/Loader/StyledLoader";
import { Error } from "components/Error/Error";
import "../../App.scss";
import "./styles.scss";

const Tweets = ({ tweets }) => {
  const getTweetsStatus = useSelector((state) => state.tweets.status);

  return getTweetsStatus === API_STATUS.FULFILLED ? (
    <div className="tweets-container">
      <div className="tweets-container-header">
        <p className="roboto white">
          See the latest tweets from {tweets[0]?.user.name}. Any new tweets from
          him (if any) will be added automatically every 30 seconds!
        </p>
      </div>
      <div className="tweets-cards">
        {tweets.map((tweet) => {
          return (
            <div key={tweet.id} className="tweets-card">
              <div className="tweets-card-header">
                <p
                  className="montserrat black"
                  style={{ fontSize: "19px", fontWeight: "bold" }}
                >
                  {tweet.user.name}
                </p>
                <p className="montserrat black" style={{ fontSize: "19px" }}>
                  @{tweet.user.username}
                </p>
              </div>
              <div className="tweets-card-body">
                <p className="roboto black">{tweet.text}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  ) : getTweetsStatus === API_STATUS.PENDING ? (
    <StyledLoader />
  ) : getTweetsStatus === API_STATUS.REJECTED ? (
    <Error />
  ) : null;
};

export default Tweets;
