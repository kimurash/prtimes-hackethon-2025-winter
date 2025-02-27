import { useEffect, useState } from "react";
import { fetchMyDreams } from "../../../api/dreams/mine";
import { Dream } from "../../../types/dream";
import Header from "../components/header";
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

  return (
    <div>
      <Header />
      <MyDreamInput
        setMyDreams={(newMyDreams: Dream[]) => {
          setMyDreams(newMyDreams);
        }}
      />
      <MyDreamCards myDreams={myDreams} />
    </div>
  );
};

export default MyDreamPage;
