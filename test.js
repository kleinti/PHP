const mongoose = require('mongoose');
const Quiz = require('./Quiz');
const Question = require('./Question');
const { schema } = require('./User');

// Quiz Schema
const resultSchema = new mongoose.Schema({    
    user : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },        
    quiz : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Quiz"
    },        
    registered : {type : Boolean, default : true},    
    jokersAvailable : {type : [String], default : []},
    fiftyFiftyJokerUsed : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Question",
        default: null
    }, 
    
    numberPostedQuestionsPlayed : {type: Number, default: 0},
    pointsPostedQuestions : {type: Number, default: 0},

    numberMultipleChoiceAnswers : {type: Number, default: 0},
    numberCorrectMultipleChoiceAnswers : {type: Number, default: 0},    
    pointsCorrectMultipleChoiceAnswers : {type: Number, default: 0},

    numberEstimations : {type: Number, default: 0},
    numberGoodEstimations : {type: Number, default: 0},
    pointsGoodEstimations : {type: Number, default: 0},

    pointsTotal : {type: Number, default: 0},
    position : {type: Number, default: 0}
});

// Static function to add Result document, i.e. register a user to a quiz
resultSchema.statics.addResultDocument = async (user, quiz, jokersAvailable) => {
    result = await Result.create({user, quiz, jokersAvailable});
    console.log('User ' +  user + ' registered for quiz ' + quiz + '.');
}   

// Get register state of current quiz based on userID
resultSchema.statics.currentResult = async (userId, groupId) => {          
    const currentQuiz = await Quiz.currentQuiz(groupId);
    if (currentQuiz)
    {
        const result = await Result.findOne({$and: [{user : userId}, {quiz : currentQuiz._id}]}).populate('user quiz');                
        return result;
    }
    else {
        return null;
    }
}

const Result  = mongoose.model('Result', resultSchema);
module.exports = Result;