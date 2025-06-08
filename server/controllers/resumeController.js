const Resume = require("../models/Resume");
const User = require("../models/User");

const parseResumeData = (data) => {
  const education = Object.values(data.education || {});

  const experience = Object.values(data.experience || {});

  const projects = Object.values(data.projects || {});

  const skills = Object.values(data.skills || {});

  return {
    ...data,
    education,
    experience,
    projects,
    skills,
  };
};

const savePortfolio = async (req, res) => {
  try {
    const {resumeData} = req.body;
    const data = await parseResumeData(resumeData);
    const username = await req.params.username;
    const resume = await Resume.findOne({ hash: data.hash });
    if (resume)
      return res.status(403).json({ message: "URL Key already exists" });
    const newResume = await Resume.create(data);
    const user = await User.findOne({ username: username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.resumes = [...user.resumes, newResume.hash];
    await user.save();
    await newResume.save();
    console.log("Saved Portfolio")
    res.status(200).json({ message: "Portfolio Saved and Deployed" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
    console.log(error);
  }
};

const openPortfolio = async (req, res) => {
  try {
    const hash = await req.params.hash;
    const portfolio = await Resume.findOne({ hash: hash });
    if (!portfolio) res.status(400).json({ message: "Portfolio Not found" });
    res.status(200).json(portfolio);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
    console.log("Error in openPortfolio: " + error);
  }
};

const deletePortfolio = async(req,res)=>{
  try {
    const data = await req.params;
    await Resume.deleteOne({hash:data.hash});
    const user = await User.findOne({username:data.username});
    user.resumes = await user.resumes.filter(resume=>{
      if(resume!=data.hash){
        return resume;
      }
    });
    await user.save();
    res.status(200).json({message:"Portfolio Deleted!"})
  } catch (error) {
    res.status(500).json({message:"Internal Server Error"})
    console.log(error)
  }
}


module.exports = { savePortfolio, openPortfolio,deletePortfolio };
