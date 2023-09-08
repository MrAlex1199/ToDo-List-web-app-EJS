import express from "express";
import bodyParser from "body-parser";
import cron from "node-cron";

const app = express();
const port = 3000;

var todoListDayTask = [];
var todoListWorkTask = [];

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

const restartServer = () => {
    console.log("Restarting server...");
    process.exit(0);
  };

cron.schedule("0 0 * * *", restartServer);

app.get('/', (req, res) => {
    const data = {
        listDayTodo: todoListDayTask,
    };
    res.render('index.ejs', data);
});

app.get("/workpage", (req, res) => {
    const data = {
        listWorkTodo: todoListWorkTask,
    };
    res.render("workpage.ejs", data);
});

app.post('/submit1', (req, res) => {
    var stringDayContent = req.body['TodayDaylsit'];
    if (stringDayContent === '') {
    } else {
        todoListDayTask.push(stringDayContent);
    }
    res.redirect('/');
});

app.post('/submit2', (req, res) => {
    var stringDayContent2 = req.body['TodayDaylsit2'];
    if (stringDayContent2 === '') {
    } else {
        todoListWorkTask.push(stringDayContent2);
    }
    res.redirect('/workpage');
});


app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });

    