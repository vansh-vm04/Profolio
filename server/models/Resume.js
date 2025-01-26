const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const educationSchema = new Schema({
    cname: { type: String, required: true },
    clocation: { type: String, required: true },
    degree: { type: String, required: true },
    branch: { type: String, required: true },
    month: { type: String, required: true },
    year: { type: Number, required: true },
  });
  
  // Define the Experience Schema
  const experienceSchema = new Schema({
    jobTitle: { type: String, required: true },
    cname: { type: String, required: true },
    clocation: { type: String, required: true },
    smonth: { type: String, required: true },
    syear: { type: Number, required: true },
    emonth: { type: String, required: true },
    eyear: { type: Number, required: true },
    Working: { type: Boolean, required: true },
  });
  
  // Define the Project Schema
  const projectSchema = new Schema({
    Title: { type: String, required: true },
    Details: { type: String, required: true },
    Link: { type: String, default: '' },
  });
  
  // Define the Additional Sections Schema
  const additionalSectionsSchema = new Schema({
    Website: { type: String, required: false },
    Languages: { type: [String], required: false },
    Certifications: { type: [String], required: false },
    Accomplishments: { type: [String], required: false },
  });

  const _persist = new Schema({
    version:{ type: Number, required: true },
    rehydrated: { type: Boolean, required: true }
  })
  
  // Define the Main Resume Schema
  const resumeSchema = new Schema({
    heading: {
      firstname: { type: String, required: true },
      surname: { type: String, required: true },
      phone: { type: Number, required: true },
      email: { type: String, required: true },
      linkedin: { type: String, required: true },
    },
    education: { type: [educationSchema], required: true },
    experience: { type: [experienceSchema], required: true },
    projects: { type: [projectSchema], required: true },
    skills: { type: [String], required: true },
    additionalSections: { type: additionalSectionsSchema, required: true },
    template: {type:String, required:true},
    hash: { type: String, required: true, unique: true },
    _persist:{type:_persist,required:true}
});

const Resume = mongoose.model('Resume',resumeSchema);
module.exports = Resume;