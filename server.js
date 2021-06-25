const mongoose = require("mongoose");
const validator = require("validator");
//connection creation with new db or existing db
//array_data is name of db
//if array_data is present in mongo it will override it otherwise
//it creates the new database
mongoose
  .connect("mongodb://localhost:27017/array_data", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("connection succefull"))
  .catch((err) => console.log(err)); //returns the promise

const arrayShema = new mongoose.Schema({
  email: { type: String, unique: true },
  name: String,
});

const addArray = new mongoose.model("addArray", arrayShema); //defines class

const customers = [
  {
    email: "anurag11@yopmail.com",
    name: "anurag",
  },
  {
    email: "sameer11@yopmail.com",
    name: "sameer",
  },
  {
    email: "ravi11@yopmail.com",
    name: "ravi",
  },
  {
    email: "akash11@yopmail.com",
    name: "akash",
  },
  {
    email: "anjali11@yopmail.com",
    name: "anjai",
  },
  {
    email: "santosh11@yopmail.com",
    name: "santosh",
  },
];

// update the name of student in database if email id is matched with database email id
const updateName = async (_id, student_name) => {
  try {
    const result = await addArray.updateOne(
      { _id },
      {
        $set: {
          name: student_name,
        },
      }
    );
    console.log(result);
  } catch (error) {
    console.log(error);
  }
};

//get the collection by email id
// if student email id is not present then insert the data as it is if email id is already present
//then just call the updateName function

const getDocument = () => {
  customers.forEach(async (item) => {
    try {
      var email = item.email;
      var student_name = item.name;
      var result = await addArray.find({ email });
      if (!result) {
        console.log(item);
        addArray.insertMany(item);
      } else {
        console.log(result);
        updateName(result[0]._id, student_name);
      }
    } catch (error) {
      console.log(error);
    }
  });
};

getDocument();
