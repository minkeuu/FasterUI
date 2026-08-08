const express = require('express');                                                                                                                                                                       
const cors = require("cors");                                                                                                                                                                                                    
const app = express();  
const prisma = require("./prisma.cjs");                                                                                                                                                                                                                                                                                                                                                            
                                                                                                                                                                                                          
                                                                                                                                                                                                          
const auth = require("./auth.cjs")
const profile = require("./profile.cjs")
// Middleware                           
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, PATCH');
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    
    // Если браузер делает предварительный проверочный запрос OPTIONS — сразу гасим его ответом 200
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }
    next();
});                                                                                                                                                                               
app.use(express.json());                                                                                                                                                                                  
app.use("/api/auth", auth);   
app.use("/api/profile", profile) 
const path = require("path");

app.use("/uploads", express.static(path.join(__dirname, "uploads")));                                                                                                                                                         
                                                                                                                                                                                                                                                                                                                                                                                     
// Routes                                                                                                                                                                                                 
                                                                                                                                                                                                          
app.get('/', (req, res) => {                                                                                                                                                                              
                                                                                                                                                                                                          
    res.send('Hello World!');                                                                                                                                                                             
                                                                                                                                                                                                          
});                                                                                                                                                                                                       
                                                                                                                                                                                                          
                                                                                                                                                                                                          
                                                                                                                                                                                                          
// Start the server                                                                                                                                                                                       

(async () => {
    try {
        await prisma.$connect();
        console.log("✅ Prisma connected");
    } catch (err) {
        console.error(err);
    }
})();                                                                                                                                                                         

if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`Сервер запущен на порту ${PORT}`));
}
module.exports = app; 