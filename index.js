import express from "express";
import axios from "axios";
import env from "dotenv";
import bodyParser from "body-parser";

env.config();
const app = express();
const PORT = process.env.PORT || 3000;

//Middleware

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

const apiURL = `https://diy-jokes-api.onrender.com`;

const config = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  };
//Routes

app.get("/", async (req, res) => {
  try {
    const response = await axios.get(apiURL + `/random`);
    res.render("index", response.data);
  } catch (error) {
    console.log(error.message);
  }
});

app.post("/getByID", async (req, res) => {
  try {
    const id = req.body.id;
    const response = await axios.get(apiURL + `/jokes/${id}`);
    res.render("index", response.data);
  } catch (error) {
    console.log(error.message);
  }
});

app.post("/postJoke", async (req, res) => {
  try {
    const response = await axios.post(apiURL + `/post`, req.body,config);


    res.render("index", {jokeText:response.data.joke.jokeText});
  } catch (error) {
    console.log(error.message);
  }
});

app.post('/putJoke',async (req,res)=>{
    try {
        const jokeData = req.body;
        const id = req.body.id;
        const myUrl = apiURL+`/jokes/${id}`;
        const response = await axios.put(myUrl,jokeData,config);
       res.render('index',{jokeText:response.data.joke.jokeText});
    } catch (error) {
        console.log(error.message);
    }
   
})

app.post('/patchJoke',async (req,res)=>{
    try {
        const jokeData = req.body;
        const id = req.body.id;
        const myUrl = apiURL+`/jokes/${id}`;
        const response = await axios.patch(myUrl,jokeData,config);
       res.render('index',{jokeText:response.data.joke.jokeText});
    } catch (error) {
        console.log(error.message);
    }
})

app.post('/deleteJoke',async (req,res)=>{
    try {
        const id = req.body.id;
        const myUrl = apiURL+`/jokes/${id}`;
        const response = await axios.delete(myUrl);
       res.render('index',{jokeText:response.data.status});
    } catch (error) {
        console.log(error.message);
    }
})

//Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
