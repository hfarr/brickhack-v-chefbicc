/*
    Mood.js
    Mongoose model for a Mood.
*/

// Require statements.
const mongoose = require('mongoose');

// Set promise.
mongoose.Promise = global.Promise;
const convertId = mongoose.Types.ObjectId;

// Create the model schema.
const MoodSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    unique: false,
  },
  mood: {
    type: Number,
    required: true,
    unique: false,
  },
  ouncesOfCoffee:{
    type: String,
    required: false,
    unique: false,
  },
  numberOfMeals:{
    type: String,
    required: false,
    unique: false,
  },
  hoursOfSleep:{
    type: String,
    required: false,
    unique: false,
  },
  hoursOfExercise:{
    type: String,
    required: false,
    unique: false
  },
  lastUpdated: {
    type: Date,
    default: Date.now,
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
});

// Helper methods.

MoodSchema.statics.toAPI = doc => {
  const apiDoc = {
    _id: doc._id,
    owner: doc.owner,
    mood: doc.mood,
    lastUpdated: doc.lastUpdated,
  }

  if(doc.ouncesOfCoffee) {
   apiDoc.ouncesOfCoffee = doc.ouncesOfCoffee;
  }

  if(doc.hoursOfSleep) {
   apiDoc.hoursOfSleep = doc.hoursOfSleep;
  }
  
  if(doc.hoursOfExercise) {
    apiDoc.hoursOfExercise = doc.hoursOfExercise;
   }

  return apiDoc;
};

MoodSchema.statics.findByOwner = (ownerId, callback) => {
  const search = {
    owner: convertId(ownerId),
  };

  return MoodModel.find(search).select('_id mood ouncesOfCoffee hoursOfSleep hoursOfExercise lastUpdated').exec(callback);
};

MoodSchema.statics.findByIdAndDelete = (moodId, callback) => {
  const search = {
    _id: convertId(moodId),
  };

  return MoodModel.deleteOne(search).exec(callback);
};

// Create the model.
const MoodModel = mongoose.model('Mood', MoodSchema);

// Export the model.
module.exports = {
  MoodModel,
  MoodSchema,
};
