const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const educationSchema = new Schema({
    cname: { type: String, required: true },
    clocation: { type: String, required: true },
    degree: { type: String, required: true },
    branch: { type: String, required: true },
    syear: { type: Number, required: false },
    eyear: { type: Number, required: false },
  });
  
  const experienceSchema = new Schema({
    jobTitle: { type: String, required: true },
    cname: { type: String, required: true },
    clocation: { type: String, required: false },
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
    version:{ type: Number, required: false },
    rehydrated: { type: Boolean, required: false }
  })
  
  const resumeSchema = new Schema({
    heading: {
      firstname: { type: String, required: true },
      surname: { type: String, required: true },
      phone: { type: Number, required: false },
      email: { type: String, required: true },
      linkedin: { type: String, required: false },
      about:{type:String},
      twitter:{type:String},
      github:{type:String},
      location:{type:String},
      image:{type:String}
    },
    education: { type: [educationSchema], required: true },
    experience: { type: [experienceSchema], required: false },
    projects: { type: [projectSchema], required: false },
    skills: { type: [String], required: false },
    template: {type:String, required:true},
    hash: { type: String, required: true, unique: true },
    _persist:{type:_persist,required:true}
});

const Resume = mongoose.model('Resume',resumeSchema);
module.exports = Resume;