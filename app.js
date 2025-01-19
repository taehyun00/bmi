const express = require(`express`)
const path = require(`path`) 
const app = express()
const port = 3000


app.use(express.static(path.join(__dirname, `public`)))

app.get(`/`, (req, res) => {
    return res.redirect("/index.html")
})

app.get(`/result`, (req, res) => {
    const kg = Number(req.query.weight); 
    const cm = Number(req.query.height); 
    
    let bmi = 0;
    let k=0;

    if (cm < 150) {
        k =  cm-100;
        bmi = (kg - k/k)*100;

    } 
    else if (cm >= 150 && cm <= 160) {
        k = (cm - 150)/2 + 50;
        bmi = (kg - k/k)*100;

    }
     else if (cm > 160) {
        k = (cm-100)*0.9;
        bmi = ((kg - k)/k)*100;
    }
    let bmiStatus = ""; 
    let plus ="";

    if (bmi >= -10 && bmi <= 10) {
        bmiStatus = "정상";
        plus = "굿 지금만 유지하세요";
    } else if (bmi > 10 && bmi <= 20) {
        bmiStatus = "과체중";
        plus = "음 조금만 빼봅시다!";
    } else if (bmi > 20) {
        bmiStatus = "비만";
        plus = "넌 나가라;;";
    }
    res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>비만지수 결과</title>
        <link rel="stylesheet" href="index.css">
    </head>
    <body>
        <p>비만지수: ${bmi}</p>
        <p>상태: ${bmiStatus}</p>

        <hr>
        
        <h4>${plus}</h4>
    </body>
    <script>
    </script>
    </html>
`);
  })

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

module.exports = app;
