const Resume = require("../models/Resume");
const User = require('../models/User')
const ejs = require("ejs");
const path = require("path");
const puppeteer = require("puppeteer"); 
const { generateHash } = require("../utils/resumeHash");

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

const downloadResume = async (req, res) => {
  const resume = await parseResumeData(req.body);
  console.log("resume");
  try {
    const hash = generateHash(resume);
    console.log(hash);
    const resumeExist = await Resume.findOne({ hash });
    console.log(resumeExist != null);
    if (resumeExist == null) {
      const newResume = new Resume({ ...resume, hash });
      await newResume.save();
      console.log("Resume saved");
    }

    if (resume) {
      const userID = req.headers["userid"] || req.headers["UserID"];
      console.log("userid: "+userID)
      const updatedUser = await User.findByIdAndUpdate(
        userID,
        { $addToSet: { resumes: hash } }, 
        { new: true } 
      );

      const html = await ejs.renderFile(
        path.join(__dirname, `../views/${resume.template}.ejs`), 
        resume
      );
      
      // fs.writeFileSync("rendered_resume.html", html);

      
      const browser = await puppeteer.launch({
        headless: true,
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
      });
      const page = await browser.newPage();
      await page.setContent(html, { waitUntil: "networkidle0" });
      const pdfBuffer = await page.pdf({ format: "letter" });
      console.log("PDF Buffer Size:", pdfBuffer.length);
      await browser.close();

  
      // fs.writeFileSync("test_resume.pdf", pdfBuffer);

     
      // res.setHeader("Content-Type", "application/pdf");
      // res.setHeader("Content-Disposition", 'attachment; filename="resume.pdf"');
      console.log(updatedUser)
      const resumes = JSON.stringify(updatedUser.resumes);
      console.log(resumes)
      res.writeHead(200, {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="resume.pdf"',
        "Resumes": resumes
      });
      res.end(pdfBuffer);
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ Error: "Internal server error" });
  }
};

const viewResume = async (req, res) => {
  const resume = await parseResumeData(req.body);
  console.log("resume");
  try {
    const hash = generateHash(resume);
    console.log(hash);
    const resumeExist = await Resume.findOne({ hash:hash });
    console.log(resumeExist != null);
    if (resumeExist == null) {
      const newResume = new Resume({ ...resume, hash });
      await newResume.save();
      console.log("Resume saved");
    }

    if (resume) {
      const html = await ejs.renderFile(
        path.join(__dirname, `../views/${resume.template}.ejs`), // Adjust path if necessary
        resume
      );
      res.send(html);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json("Internal server error");
  }
};

const openResume = async (req,res) =>{
  const {hash} = req.body;
  console.log(hash)
  try {
    const resume = await Resume.findOne({ hash:hash });
    if(resume){
      res.status(200).json(resume)
    }else{
      res.status(500).json({Error:'Internal server error'});
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({Error:'Internal server error'});
  }
}

module.exports = { downloadResume, viewResume, openResume };
