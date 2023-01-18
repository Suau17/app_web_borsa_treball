import EmpresaModel from '#schemas/empresaSchema.js'
import GestorModel from "#schemas/Gestor.js"
import jwt from 'jsonwebtoken'


// Recuperar todas las empresas
export const getEmpresaControllers = async (req, res) => {
    try {
      // Obtener todas las empresas de la base de datos
      const empresas = await EmpresaModel.find();
  
      // Enviar las empresas en la respuesta
      res.send(empresas);
    } catch (error) {
      res.status(500).send('Ocurrió un error al recuperar las empresas. Por favor, intente nuevamente más tarde.');
    }
  }


export const empresaRegistrerController = async (req, res) => {
    
    const { nom , direccion, refUser, refOfertaLaboral } = req.body
   // const token = req.cookies.tokenAcces
   // const tokenData = jwt.verify(token, process.env.secretWord)
  //  refUser = tokenData.id;
    // UserModel.findById(refUser).then((user) => {
    //     res.send(user);
    //   }); 
 
   const gestorempresa = new EmpresaModel({
    nom , direccion, refUser, refOfertaLaboral
    })
    console.log(gestorempresa)
    await gestorempresa.save()  
    const gestor = await GestorModel.findOneAndUpdate(
      { refUser: refUser },
      { refEmpresa: gestorempresa._id }
    );

     res.send('empresa creada con extito')
         
}

  export const updateEmpresaController = async (req, res) => {
    try {
        const id = req.params.id
        // Actualizamos el registro del gestor en la base de datos
        await EmpresaModel.findByIdAndUpdate(id, req.body, { new: true })
        
        // Enviamos un mensaje de éxito
        return res.send('Datos de la empresa actualizados con éxito')
      } catch (error) {
        // En caso de error, enviamos un mensaje de error
        return res.status(500).send('Ocurrió un error inesperado. Por favor, intente nuevamente más tarde.')
      }
    }

    export const deleteEmpresaController = async (req, res) => {
        try {
          const id = req.params.id
          // Borramos el registro de la empresa de la base de datos
          await EmpresaModel.findByIdAndDelete(id)
          
          // Enviamos un mensaje de éxito
          return res.send('Empresa eliminada con éxito')
        } catch (error) {
          // En caso de error, enviamos un mensaje de error
          return res.status(500).send('Ocurrió un error inesperado. Por favor, intente nuevamente más tarde.')
        }
      }
