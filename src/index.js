import httpServer from "#config/http.js";
// si los import requieren del .env tienen que ir debajo del imoprt env para que ejecuten correctamente
import '#config/env.js'
import connectDB from "#config/database.js";

const bootServer = async () => {
   await connectDB(process.env.MONGODB_URL)
    
    httpServer.listen(process.env.PORT, () => {

        console.log(`servidor escuchando en el puerto ${process.env.PORT}`);
    })
}

bootServer()