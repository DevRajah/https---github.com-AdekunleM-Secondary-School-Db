const {registerModel, scoreModel} = require('../model/models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {validatorSchool, validatorSchool2, } = require('../middleware/validate');
require('dotenv').config();

// Function to register a new student
const registerStudent = async (req, res) => {
    try {
        const {error} = validatorSchool(req.body);
        if(error){
            res.status(500).json({
                message: error.details[0].message
            })
            return;
        } else {

            const { name, email, password} = req.body;
        if (name == "" || email == "" || password == "") {
            res.status(400).json({
                message: 'name, email or password cannot be left empty'
            })
            return;
        }

        const emailExist = await registerModel.findOne({email: email.toLowerCase()})
        if (emailExist) {
            res.status(400).json({
                message: 'email already exists'
            });
            return;
        }

        //We hash our password for us to be able to encrypt it
        const salt = bcrypt.genSaltSync(12);
        const hashpassword = bcrypt.hashSync(password, salt);

        const student = await new registerModel({
            name: name,
            email: email.toLowerCase(),
            password: hashpassword
        });

        if (!student) {
            res.status(404).json({
                message: "User not found"
            })
            return;
        }
        const newStudent = await student.save(); 
        res.status(201).json({
            message: 'Student successfully created an account', 
            data: newStudent
        })

        }

    } catch (err) {
        res.status(500).json({
            message: "internal server error: " + err.message,
        })
    }
};


// Function to log in a registered student
const loginStudent = async (req, res) => {
    try{
        {const {error} = validatorSchool2(req.body);
        if(error){
            res.status(500).json({
                message: error.details[0].message
            })
            return;
        } else {
            const {email, password} = req.body;
        const studentExists = await registerModel.findOne({email: email.toLowerCase()});
        if (!studentExists) {
            res.status(404).json({
                message: "Student not found"
            })
            return;
        }
        const checkPassword = bcrypt.compareSync(password, studentExists.password);
        if (!checkPassword) {
            res.status(404).json({
                message: "Password is incorrect"
            })
            return;
        }
        const token = jwt.sign({
            userId: studentExists._id,
            email: studentExists.email,
        }, process.env.secret, {expiresIn: "1d"});
        res.status(200).json({
            message: "Login successful",
            token: token
        })

        }
    }
    } catch (err) {
        res.status(500).json({
            message: "Internal server error " + err.message,
        })
    }

};


//Function to Enter subjects scores 
const enterScore = async (req, res) => {

    try {
        const {maths, english, civic, basicScience, socialStudies} = req.body;
        const email = req.user.email;
        const userId = req.user.userId;
        const scores = await new scoreModel({maths, english, civic, basicScience, socialStudies, email: email, userId: userId});
        if (maths == "" || english == "" || civic == "" || basicScience == "" || socialStudies == "") {
            res.status(400).json({
                message: "maths, english, civic, basicScience, socialStudies can't be left empty"
            })
            return;
        }
        if (!scores) { 
            res.status(404).json({
                message: 'The Student scores not found'
            })
            return;
        }
        await scores.save();
        res.status(200).json({
            message: 'Student scores entered successfully',
            data: scores
        })

    } catch (err) {
        res.status(500).json({
            message: "Internal server error: " +err.message,
        })
    }
} 

const getAll = async (req, res) => {
    try {
      const students = await registerModel.find();
      if (!students) {
        res.status(404).json({
          message: "No students found",
        });
      } else {
        res.status(201).json({
          message: "All students in my database.",
          data: students,
          totalNumberOfStudents: students.length,
        });
      }
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };
  

// Function to view all added scores on the server
const viewScores = async (req, res) => {
    try {
        const scores = await scoreModel.find();
        if (!scores) {
            res.status(404).json({
                message: "Scores not found",
            })
        }
        res.status(200).json({
            message: `List of ${scores.length} scsores found with their associated emails`,
            data: scores,
        })


    } catch (err) {
        res.status(500).json({
            message: "Internal server error: " +err.message    
        })
    }

}

//Function to view a score when login is successful
const viewOne = async (req, res) => {
    try {
        const userId = req.user.userId;
        const email = req.user.email;
        const scores = await scoreModel.findOne({userId: userId});
        if (!scores){
            res.status(404).json({
                message: 'The Student score information not found'
            })
            return;
        } else {
            res.status(200).json({
                message: `The Student score information with email: ${email} found`,
                data: scores
            })
        }
    } catch (err) {
        res.status(500).json({
            message: "internal server error: " +err.message
        })
    }

}


// Function to update a student score 
const updateScore = async (req, res) => {
    try {
        const userId = req.user.userId;
        const email = req.user.email;        
        const scores = await scoreModel.findOne({userId: userId});
        if (!scores) {
            res.status(404).json({
                message: 'The Student score information not found'
            })
            return;
        }

        const scoreData = {
            maths: req.body.maths || scores.maths,
            english: req.body.english || scores.english,
            civic: req.body.civic || scores.civic,
            basicScience: req.body.basicScience || scores.basicScience,
            socialStudies: req.body.socialStudies || scores.socialStudies
        }

        const newScores = await scoreModel.findOneAndUpdate({userId}, scoreData, {new:true});
        if (!newScores) { 
            res.status(404).json({
                message: 'The Student score information not found'
            })
            return;
        } 
        res.status(200).json({
            message: `The Student score with email: ${email} updated successfully`,
            data: newScores
        })
    } catch (err) {
        res.status(500).json({
            message: "Internal server error: " +err.message
        })
    } 
}


// Function to update a student score 
const deleteScore = async (req, res) => {
    try {
        const userId = req.user.userId;
        const email = req.user.email;        
        const scores = await scoreModel.findOne({userId: userId});
        if (!scores) {
            res.status(404).json({
                message: 'The Student score information not found'
            })
            return;
        }

        await scoreModel.findOneAndDelete({userId}); 
        res.status(200).json({
            message: `The Student score with email: ${email} deleted successfully`,
            data: scores
        })

    } catch (err) {
        res.status(500).json({
            message: "Internal server  error: " + err.message,
        })
    }
}
const logOut = async (req, res) => {
    try{
        const hasAuthor =req.headers.authorization
        const token = hasAuthor.split(':')[1]
        const id = req.userId
        const user = await dataBase.findById(id)

        if (!user) {
            return res.status(404).json({
                 message: 'User not found'})
        }
        user.blackList.push(token)
        await user.save()

        res.status(200).json({
            message: 'Succcessfully logged out'
        })

    }catch (err) {
        res.status(500).json({
            message: err.message,
        });
    }
}


module.exports = {
    registerStudent,
    loginStudent,
    enterScore,   
    viewScores,
    viewOne,
    updateScore,
    deleteScore,
    logOut,
    getAll,

}