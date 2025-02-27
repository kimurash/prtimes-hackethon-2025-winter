import MyDreamCards from "./MyDreamCards";
import MyDreamInput from "./MyDreamInput";
import Header from "../components/header";

const MyDreamPage = () => {
  return (
    <div>
      <Header/>
      <MyDreamInput />
      <MyDreamCards />
    </div>
  );
};

export default MyDreamPage;
