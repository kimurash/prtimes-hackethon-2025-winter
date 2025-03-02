import { fetchMyDreams } from "@/api/dreams/mine";
import { Dream } from "@/types/dream";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Header from "../components/Header";
import MyDreamCards from "./MyDreamCards";
import MyDreamInput from "./MyDreamInput";

const MyDreamPage = () => {
  const [myDreams, setMyDreams] = useState<Dream[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchDreams = async () => {
      try {
        const dreams: Dream[] = await fetchMyDreams();
        setMyDreams(dreams);
      } catch (e) {
        console.error(e);
      }
    };

    fetchDreams();
  }, []);

  return (
    <div>
      <Header />
      <MyDreamInput setMyDreams={setMyDreams} />
      <MyDreamCards myDreams={myDreams} setMyDreams={setMyDreams} />
    </div>
  );
};

export default MyDreamPage;
