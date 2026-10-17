const express = require('express')
const { type } = require('os')
const app = express()
const PORT = 3500
const path = require("path")
const { json } = require('stream/consumers')
const db = require('./db.json')
const tasks = require('./tasks.json')
const fs = require("fs")
const { url } = require('inspector')
const { URL } = require('url')
const mysql = require('mysql')
const { error } = require('console')






// const db = [{name: "js", releaseDate: 1995}, {name: "python", releaseDate: 1999}, {name: "python", releaseDate: 1999}]

app.use(express.static(path.join(__dirname + "/../client")))
app.use(express.json())

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname + "/../client/index.html"))
})

app.get("/subject/:subjectName/:id", (req, res) => {
    res.sendFile(path.join(__dirname + "/../client/subject.html"))

})


app.get('/fetchLessons/:id', (req, res) => {
  const { id } = req.params;

  connection.query(`SELECT * FROM lessons WHERE subject_id = ${id}`, (err, rows) => {
    if (err) {
            console.log(err)
            return
        }
        console.log(rows)
        res.json(rows)
  })
});

app.get('/fetchLessonForId', (req, res) => {
  const { id } = req.query;

  connection.query(`SELECT * FROM lessons WHERE id = ${id}`, (err, rows) => {
    if (err) {
            console.log(err)
            return
        }
        console.log(rows)
        res.json(rows)
  })
});

app.get("/createLesson", (req, res) => {
    res.sendFile(path.join(__dirname + "/../client/addLesson.html"))
})

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'education_app_v5',
});



connection.connect()

app.get("/fetchSubjects", (req, res) => {
    connection.query("SELECT * FROM subjects", (err, rows) => {
        if (err) {
            console.log(err)
            return
        }
        console.log(rows)
        res.send(rows)
    })
})

app.get("/fetchLessonBlocks", (req, res) => {    
    const { id } = req.query;
    connection.query(`SELECT * FROM lesson_blocks WHERE lesson_id = ${id}`, (err, rows) => {
        if (err) {
            console.log(err)
            return
        }
        console.log(rows)
        res.send(rows)
    })
})

app.get("/fetchLessonBlockItems", (req, res) => {

    const { block_id } = req.query;
    
    connection.query(`SELECT * FROM lesson_block_items WHERE block_id = ${block_id}`, (err, rows) => {
        if (err) {
            console.log(err)

            return
        }
        console.log(rows)
        res.send(rows)
    })
})


app.get("/fetchPracticeTasks/:lessonId", (req, res) => {

    const { lessonId } = req.params;
    
    connection.query(`SELECT * FROM practice_tasks WHERE lesson_id = ${lessonId}`, (err, rows) => {
        if (err) {
            console.log(err)
            
            return
        }
        console.log(rows)
        res.send(rows)
    })
})



app.get("/fetchPracticeAnswers", (req, res) => {

    const { taskId } = req.query;
    
    connection.query(`SELECT * FROM practice_answers WHERE task_id = ${taskId}`, (err, rows) => {
        if (err) {
            console.log(err)

            
            return
        }
        console.log(rows)
        res.send(rows)
    })
})
// app.get('/write-data:num', (req, res) => {
//     const { num } = req.params
    
//     db.numbers.push(parseFloat(num))

//     fs.writeFileSync("./db.json", JSON.stringify(numbers))

//     res.json(db)
// })

// app.put("/edit-users", (req, res) => {
//     const { name } = req.body
//     for (let i=0; i<db.users.length; i++) {
//         for (let key in db.users[i]) {
//             if (key == "name") {
//                 if (db.users[i][key] == name) {
//                     db.users[i].pass = 123
//                 }
//             }
//         }
//     } 
//     fs.writeFileSync("./db.json", JSON.stringify(db))
//     res.send()
// })

// app.post("/users/validate", (req, res) => {
//     const { name, email } = req.body
//     let errorsText = []
//     if (name.length < 2 ||  name.length > 50) {
//         errorsText.push("Ошибка ввода имени")
//     }
//     if (!email.includes("@") || !email.includes(".")) {
//         errorsText.push("Ошибка ввода почты: нет @ или '.'")
//     }


//     if (errorsText.length === 0) {
//         res.json({"valid": true})
//     } else {
//         res.json({"valid": false, "errors": er
// rorsText})

//     }
// })



// app.post("/write", (req, res) => {
//     const data = req.body["text"]
//     console.log(data)
//     fs.writeFileSync("./data.json", JSON.stringify(data))
//     res.json({ "message": "Файл успешно записан" })
// })

// app.put("/tasks/:id", (req, res) => {
//     const id = parseInt(req.params.id)
    
//     console.log(id)
//     const { titleTask, completed } = req.body
//     let active = false
//     for (let key in tasks) {
//         if (key == id) {
//             if (titleTask != "") {
//                 tasks[key]["title"] = titleTask
//             } 
//             if (completed != "") {
//                 tasks[key]["completed"] = completed
//             } 
//             active = true
//             break
//         }
//     }
//     if (active) {
//         fs.writeFileSync("./tasks.json", JSON.stringify(tasks))
//         res.status(200).json(tasks[id])
//     } else {
//         res.status(404).json({"message": "Задача не найдена"})
//     }
    
   
// })
// app.get("/myPage/", (req, res) => {
//     console.log(req.query)
//     res.send("gekkoerokgr")
// })

// app.post("/addNewLang", (req, res) => {
//     console.log(req.body)
//     const {langName, langDate} = req.body
    
//     db.push({ name: langName, releaseDate: langDate})
//     console.log(db)
//     res.send("Данные успешно записаны")
// })

app.listen(PORT, () => {
    console.log(`Сервер запущен по адресу: http://localhost:${PORT}`)
          
})

// app.get("/getLang", (req, res) => {
//     console.log(req.query)
//     const obj = {"id": 1}
//     res.json(obj)
// })

// app.get("/test", (req, res) => {
//     res.sendFile(path.join(__dirname + "/../client/test.html"))
// })

// app.get("/echo", (req, res) => {
//     if (req.query.message) {
//         console.log(req.query)
//         const obj = {
//             "received": req.query.message, 
//             "length": req.query.message.length
//         }
//         res.json(obj) 
//     } else {
//         res.end()
//     }
    
// })



// const cart = []
// let nextId = 1

// app.post("/cart", (req, res) => {
//     const { name, price } = req.body
    
//     if (!name || !price) {
//         return res.status(400).json({
//             error: "Ошибка",
//             message: "Поля 'name' и 'price' обязательны"
//         })
//     }
    
//     const newProduct = {
//         id: nextId,
//         name: name,
//         price: price
//     }
    
//     nextId++
//     cart.push(newProduct)
//     res.status(201).json(newProduct)
// })

// app.get("/cart", (req, res) => {
//     res.json(cart)
// })