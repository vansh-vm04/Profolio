const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const educationSchema = new Schema({
    cname: { type: String, required: true },
    clocation: { type: String, required: true },
    degree: { type: String, required: true },
    branch: { type: String, required: true },
    syear: { type: Number, required: true },
    eyear: { type: Number, required: true },
  });
  
  const experienceSchema = new Schema({
    jobTitle: { type: String, required: true },
    cname: { type: String, required: true },
    clocation: { type: String, required: true },
    worklink: { type: String},
    smonth: { type: String, required: true },
    syear: { type: Number, required: true },
    emonth: { type: String, required: false },
    eyear: { type: Number, required: false },
    Working: { type: Boolean, required: true },
  });
  
  const projectSchema = new Schema({
    Title: { type: String, required: true },
    Details: { type: String, required: true },
    Link: { type: String, default: '' },
    Skills:{type:[String], default:[]}
  });

  const _persist = new Schema({
    version:{ type: Number, required: true },
    rehydrated: { type: Boolean, required: true }
  })
  
  const resumeSchema = new Schema({
    heading: {
      firstname: { type: String, required: true },
      surname: { type: String, required: false },
      phone: { type: Number, required: false },
      email: { type: String, required: false },
      linkedin: { type: String, required: false },
      about:{type:String},
      twitter:{type:String},
      github:{type:String},
      location:{type:String}
    },
    education: { type: [educationSchema], required: false },
    experience: { type: [experienceSchema], required: false },
    projects: { type: [projectSchema], required: false },
    skills: { type: [String], required: true },
    template: {type:String, required:true},
    hash: { type: String, required: true, unique: true },
    _persist:{type:_persist,required:true}
});

const Resume = mongoose.model('Resume',resumeSchema);
module.exports = Resume;