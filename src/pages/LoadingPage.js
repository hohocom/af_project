import img01 from "assets/images/loading/01.png";
import img02 from "assets/images/loading/02.png";
import img03 from "assets/images/loading/03.png";
import img04 from "assets/images/loading/04.png";
import img05 from "assets/images/loading/05.png";
import { withPublic } from "components/common";
import { MobileLayout } from "components/layouts";
import { Link } from "react-router-dom";

function LoadingPage() {
  return (
    <MobileLayout themeColor="white" hideHeader={true}>
      <div className="w-full">
        <div className="mt-16 ml-4 text-3xl font-gong-light">
          <p>소중한</p>
          <p>금융자산을</p>
          <p>위한</p>
          <p className="font-bold">최고의 선택!</p>
        </div>
        <img
          src={img02}
          alt="img_02"
          className="absolute bottom-[50px] left-0 w-[100%]"
        />
        <div className="bg-[#F1F1F1] absolute bottom-0 h-[100px] w-full"></div>
        <div
          className="absolute right-0 w-[80px] h-[50%] top-52 bg-gradient-to-b from-[#3000FA] to-[#5E00B6] rounded-l-3xl
      flex flex-col items-center"
        >
          <Link to="/login" className="w-[80%] mt-[16px] z-50">
            <img src={img03} alt="img_03" />
          </Link>
          <button className="w-[80%] mt-[12px] z-50">
            <img src={img04} alt="img_04" className="w-full" />
          </button>
          <button className="w-[80%] mt-[12px] z-50">
            <img src={img05} alt="img_05" className="w-full" />
          </button>
        </div>
        <hr className="absolute left-0 bottom-0 ml-4 mb-4 w-[50%] border-gray-800" />
        <img
          src={img01}
          alt="img_01"
          className="absolute bottom-0 right-0 w-[70%] mr-2"
        />
        <div className="absolute bottom-0 left-0 mb-8 ml-4 text-[12px] font-gong-light">
          <p>금융위원회 인가등록</p>
          <p className="font-bold">호남 최초 투자자문일임사</p>
        </div>
      </div>
    </MobileLayout>
  );
}

export default withPublic(LoadingPage);
