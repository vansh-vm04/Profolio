import React,{useEffect, useState} from "react";
import P1 from "../components/templates/Portfolio-1";
import P2 from "../components/templates/Portfolio-2";
import P3 from "../components/templates/Portfolio-3";
import P4 from "../components/templates/Portfolio-4";
import P5 from "../components/templates/Portfolio-5";
import P6 from "../components/templates/Portfolio-6";
import P7 from "../components/templates/Portfolio-7";
import P8 from "../components/templates/Portfolio-8";
import P9 from "../components/templates/Portfolio-9";
import { useParams } from "react-router-dom";
const env = import.meta.env;

const RenderPortfolio = () => {
    const {hash} = useParams();
    const [resume, setresume] = useState(null)
    const fetchData = async ()=>{
        const res = await fetch(`${env.VITE_SERVER_URL}/api/portfolio/open/${hash}`);
        if(res) setresume(await res.json());
    }
    useEffect(() => {
      fetchData();
    }, [])
    

  const templates = {
    p1: P1,
    p2: P2,
    p3: P3,
    p4: P4,
    p5: P5,
    p6: P6,
    p7: P7,
    p8: P8,
    p9: P9,
  };
  

  if (!resume || !resume.template) {
    return (
      <div className="text-center mt-20 text-red-600">
        Bad Request! No portfolio is hosted on this url.
      </div>
    );
  }

  // Select the template component dynamically
  const SelectedTemplate = templates[resume.template];

  if (!SelectedTemplate) {
    return (
      <div className="text-center mt-20 text-red-600">
        Bad Request! No portfolio is hosted on this url.
      </div>
    );
  }

  return <SelectedTemplate resume={resume} />;
};

export default RenderPortfolio;
