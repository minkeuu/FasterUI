const express = require('express');                                                                                                                                                                       
const cors = require("cors");                                                                                                                                                                                                    
const app = express();  
const prisma = require("./prisma.cjs");                                                                                                                                                                                                                                                                                                                                                            
                                                                                                                                                                                                          
                                                                                                                                                                                                          
const auth = require("./auth.cjs")
const profile = require("./profile.cjs")
// Middleware                           
app.use(cors())                                                                                                                                                                                    
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

if (process.env.PORT !== 'production') {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`Сервер запущен на порту ${PORT}`));
}

module.exports = app; 