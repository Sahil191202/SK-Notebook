const jwt = require('jsonwebtoken');
const JWT_auth = 'Sahilkhan$191202';

const fetchuser = (req,res,next)=>{
    const token = req.header('authtoken')
    if(!token){
        res.status(401).send({error : "Please Enter Valid Auth Token"})
    }
    try {
        const data = jwt.verify(token ,JWT_auth);
        req.user = data.user;
        next();
    } catch (error) {
        res.sendStatus(401);
        
    }
}
module.exports = fetchuser;