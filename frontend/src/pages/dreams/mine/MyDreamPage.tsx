import { useEffect, useState } from "react";
import { fetchMyDreams } from "../../../api/dreams/mine";
import { Dream } from "../../../types/dream";
import Header from "../components/Header";
import MyDreamCards from "./MyDreamCards";
import MyDreamInput from "./MyDreamInput";

const MyDreamPage = () => {
  const [myDreams, setMyDreams] = useState<Dream[]>([]);

  useEffect(() => {
    const fetchDreams = async () => {
      try {
        const dreams: Dream[] = await fetchMyDreams();
        setMyDreams(dreams);
      } catch (e) {
        console.error(e);
      }
    };

    void fetchDreams();
  }, []);

  const replaceMyDreams = (newMyDreams: Dream[]) => {
    setMyDreams(newMyDreams);
  };

  return (
    <div>
      <Header />
      <MyDreamInput replaceMyDreams={replaceMyDreams} />
      <MyDreamCards myDreams={myDreams} replaceMyDreams={replaceMyDreams} />
    </div>
  );
};

export default MyDreamPage;
