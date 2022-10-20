import OfertaLaboral from "#schemas/ofertaLaboral.schema.js"


const ofertaRegisterController = async (req, res) => {
    const { title ,description ,requirements , skills , ciclo , dateOfPublication, expirationDate, createBy, User} = req.body

   const ofertaLaboral = new OfertaLaboral({
    title, description, requirements, skills, ciclo, dateOfPublication, expirationDate, createBy, User
    })
    await ofertaLaboral.save()

return res.send('oferta creada con exito')
}



export default ofertaRegisterController