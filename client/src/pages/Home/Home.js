import { Fragment } from "react";

import Slide from "./HomeSlide";
import mainImg from "../../assets/mainImg.png";
import classes from "../../styles/Home.module.css";

const Home = (props) => {
  const dispatch = useDispatch();
  // const lastProdId = useSelector((state) => state.product);
  const [lastProdId, setLastProdId] = useState(null);
  const [productsList, setProductsList] = useState([]);

  const onClickMoreProduct = () => {
    console.log(
      "newProdId",
      setLastProdId(productsList[productsList.length - 1].id)
    );
    setLastProdId(productsList[productsList.length - 1].id);
  };

  useEffect(() => {
    console.log("lastProdId", lastProdId);
    dispatch(getRecentProduct(lastProdId))
      .then((response) => {
        console.log(response.payload.products);
        setProductsList(response.payload.products);
      })
      .catch((err) => err);
  }, [lastProdId]);
  return (
    <Fragment>
      <div className={classes.container}>
        <section className={classes.mainWrap}>
          <div className={classes.mainContent}>
            <div className={classes.mainTitle}>
              <div className={classes.typingTop}>
                <span>안전한</span>
              </div>
              <div className={classes.typingMiddle}>
                <span>거래플랫폼</span>
              </div>
              <div className={classes.typingBottom}>
                <span>블록체인을 활용해 보다 안전하게!</span>
              </div>
            </div>

            <div className={classes.mainImgWrap}>
              <img src={mainImg} alt="" className={classes.mainImg} />
            </div>
          </div>
        </section>

        <section className={classes.ImgslideWrap}>
          <Slide />
        </section>

        <section className={classes.latesProductWrap}>
          <div className={classes.latestProductContainer}>
            <h1>판다의 최근 상품</h1>
            <button onClick={onClickMoreProduct}>더보기</button>
          </div>
        </section>
      </div>
    </Fragment>
  );
};

export default Home;
