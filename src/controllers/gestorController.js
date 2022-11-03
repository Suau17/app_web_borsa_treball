import GestorModel from "#schemas/Gestor.js"


// crear empresa
export const registerEmpresaControllers = async (req, res) => {
    const { nomEmpresa ,nomGestor, carrec , telefon , gestor , perfilHabilitado, refUser } = req.body


   const gestorempresa = new GestorModel({
    nomEmpresa ,nomGestor, carrec , telefon , gestor , perfilHabilitado, refUser
    })
    await gestorempresa.save()

   
return res.send('Empresa Registrada con exito')

}


 
  
