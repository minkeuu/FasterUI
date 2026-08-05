const express = require('express');                                                                                                                                                                       
const cors = require("cors");                                                                                                                                                                                                    
const app = express();  
const prisma = require("./prisma.cjs");                                                                                                                                                                                

const port = 3000;                                                                                                                                                                                        
                                                                                                                                                                                                          
                                                                                                                                                                                                          
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
app.listen(port, () => {                                                                                                                                                                                    
    console.log(`Server is running on http://localhost:${port}`);                                                                                                                                         
                                                                                                                                                                                                          
});  
