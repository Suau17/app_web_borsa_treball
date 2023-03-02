import chai from 'chai';
import chaiHttp from 'chai-http'
import server from '#config/express.js'
import UserModel from "#schemas/User.js"
import EstudianteModel from "#schemas/estudiante.js"
import EmpresaModel from '#schemas/empresaSchema.js'
import GestorModel from "#schemas/Gestor.js"
import OfertaLaboral from "#schemas/ofertaLaboral.js"
import InscripcionModel from '#schemas/inscripcion.js'
import {it, describe, before, after} from 'mocha'

const expect = chai.expect
const should = chai.should()

chai.use(chaiHttp)

import httpServer from "#config/http.js";
// si los import requieren del .env tienen que ir debajo del imoprt env para que ejecuten correctamente
import '#config/env.js'
import connectDB from "#config/database.js";

const bootServer = async () => {
  await connectDB(process.env.MONGODB_URL_TEST)

  httpServer.listen(process.env.PORT_TEST, () => {

    console.log(`servidor escuchando en el puerto ${process.env.PORT_TEST}`);
  })
}

bootServer()

before((done) => {
  UserModel.deleteMany(function (err) { if (err) return done(err)})
  GestorModel.deleteMany(function (err) {if (err) return done(err) })
  EmpresaModel.deleteMany(function (err) {if (err) return done(err) })
  OfertaLaboral.deleteMany(function (err) {if (err) return done(err) })
  InscripcionModel.deleteMany(function (err) {if (err) return done(err) })
  EstudianteModel.deleteMany(function (err) {if (err) return done(err) })
    done()

})

// si quieres ver resultados del testing comenta el after
after((done) => {
  UserModel.deleteMany(function (err) {if (err) return done(err) })
  GestorModel.deleteMany(function (err) {if (err) return done(err) })
  EmpresaModel.deleteMany(function (err) {if (err) return done(err) })
  OfertaLaboral.deleteMany(function (err) {if (err) return done(err) })
  InscripcionModel.deleteMany(function (err) {if (err) return done(err) })
  EstudianteModel.deleteMany(function (err) {if (err) return done(err) })
    done()

})



let tokenGestor;
let tokenEstudiante;
let idOferta;
let idInscripcion;


/** ORDEN DEL TEST: 
 * Registrar Gestor
 * Loguear Gestor
 * Crear Empresa
 * Crear oferta
 * Actualizar Oferta
 * Actualizar Empresa
 * Actualizar Gestor
 * 
 * 
 * Registrar Estudiante
 * Loguear Estudiante
 * Inscribirse a una oferta de trabajo
 * quitar mi inscripcion a una oferta
 * Inscribirse a una oferta (vuevlo a crear otra para poder aceptar la inscripcion como gestor)
 * Ver mis inscripciones
 * Actualizar datos estudiante
 * 
 * 
 * Aceptar/Rechazar Inscripcion de un estudiante
 * Eliminar Empresa
 * Eliminar Gestor&Empresa
 */
describe('Register && Login GESTOR', (done) => {

  let registrarGestor = {
    "name": "marc gestor",
    "email": "prueba98@microsoft.com",
    "description": "dafsdfsfs",
    "passwordHash": "marc1234@",
    "carrec": "hihihhihihihihihihihih",
    "telefon": "8932423",
    "nameEmpresa": "Empresa ooi"
  }

  it('Register Test', (done) => {
    chai.request(server).post('/user/register/gestor')
      .send(registrarGestor)
      .end((err, res) => {
        if (err) return done(err);
        res.should.have.status(200);
        done()
      })
  })

  let loginGestor = {
    "email": "prueba98@microsoft.com",
    "password": "marc1234@"
  }

  it('Login Test', (done) => {
    chai.request(server).post('/user/login')
      .send(loginGestor)
      .end((err, res) => {
        if (err) return done(err);
        res.should.have.status(200);
        res.body.should.be.a('Object');
        tokenGestor = res.body.token
        console.log(tokenGestor)
        done()
      })
  })
});


describe('Empresa', () => {
  it('Creando Empresa:', (done) => {
    let empresa = {
      "nom": "bugisoft",
      "direccion": "calle 3",
      "sector":"Empresa software"
    }
    chai.request(server)
      .post('/gestor/empresa/registrar')
      .auth(tokenGestor, { type: 'bearer' })
      .set('Cookie', ['tokenAcces=' + tokenGestor])
      .send(empresa)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.statusCode).to.equal(201);
        done();
      });
  });

  it('Creando Oferta', (done) => {
    let oferta = {
      "title": "Desarrollador",
      "description": "Haras pequeños funcionalidades e iras poco a poco escalando en responsabilidades y salario.",
      "requirements": "JavaScript, Bootstrap, HTML, React",
      "skills": "Ganas de aprender, 1 año de experiencia o varios proyectos tuyos",
      "ciclo": "GAME"
    }
    chai.request(server)
      .post('/gestor/oferta/registrar')
      .auth(tokenGestor, { type: 'bearer' })
      .set('Cookie', ['tokenAcces=' + tokenGestor])
      .send(oferta)
      .end((err, res) => {
        if (err) return done(err);
        res.body.should.be.a('Object');
        idOferta = res.body.id
        expect(res.statusCode).to.equal(200);
        done();
      });
  });

  it('Actualizando Oferta', (done) => {
    let oferta = {
      "title": "Desarrollador",
      "description": "Probaras testing en mocha chai",
    }
    chai.request(server)
      .put(`/gestor/oferta/update/${idOferta}`)
      .auth(tokenGestor, { type: 'bearer' })
      .set('Cookie', ['tokenAcces=' + tokenGestor])
      .send(oferta)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.statusCode).to.equal(200);
        done();
      });
  });

  it('Actualizando Empresa', (done) => {
    let empresa = {
      "nom": "GOOGLE",
      "description": "GOOGLE Company IRELAND & PORTUGAL",
    }
    chai.request(server)
      .put(`/gestor/empresa/update`)
      .auth(tokenGestor, { type: 'bearer' })
      .set('Cookie', ['tokenAcces=' + tokenGestor])
      .send(empresa)
      .end((err, res) => {
        if (err) return done(err);
        console.log(res.body.msg)
        expect(res.statusCode).to.equal(200);
        done();
      });
  });

  it('Actualizar Datos Gestor', (done) => {
    let gestor = {
      "name": "Marc bibol",
      "telefon": "1989079"
    }
    chai.request(server)
      .put(`/gestor/update`)
      .auth(tokenGestor, { type: 'bearer' })
      .set('Cookie', ['tokenAcces=' + tokenGestor])
      .send(gestor)
      .end((err, res) => {
        if (err) return done(err);
        console.log(res.body.msg)
        expect(res.statusCode).to.equal(200);
        done();
      });
  });
});


// // ESTUDIANTE /////

describe('Register && Login ESTUDIANTE', (done) => {

  let registrarEstudiante = {
    "name":"marc estudiante",
    "email":"marc2344@vidal.com",
    "passwordHash":"marc1234",
    "cartaPresentacion":"esta es mi carta de presentacion para su empresa",
    "estudis":["CFGS Desenvolupament d'aplicacions web (DUAL)","CFGS Desenvolupament d'aplicacions multiplataforma (DUAL)"]
}

  it('Register ESTUDIANTE Test', (done) => {
    chai.request(server).post('/user/register/estudiante')
      .send(registrarEstudiante)
      .end((err, res) => {
        if (err) return done(err);
        res.should.have.status(201);
        done()
      })
  })

  let loginGestor = {
    "email": "marc2344@vidal.com",
    "password": "marc1234"
  }

  it('Login ESTUDIANE Test', (done) => {
    chai.request(server).post('/user/login')
      .send(loginGestor)
      .end((err, res) => {
        if (err) return done(err);
        res.should.have.status(200);
        res.body.should.be.a('Object');
        tokenEstudiante = res.body.token
        console.log(tokenEstudiante)
        done()
      })
  })
});

/**
 * Inscribirse a una oferta de trabajo
 * quitar mi inscripcion a una oferta
 * Inscribirse a una oferta (vuevlo a crear otra para poder aceptar la inscripcion como gestor)
 * Ver mis inscripciones
 * Actualizar datos estudiante
 */

describe('GESTION ESTUDIANTE', (done) => {
  
  it('Inscribirse a una oferta', (done) => {
    chai.request(server).post('/estudiante/oferta/inscribirse')
    .auth(tokenEstudiante, { type: 'bearer' })
    .set('Cookie', ['tokenAcces=' + tokenEstudiante])
    .send({ "idOferta": idOferta })
    .end((err, res)=>{
      if (err) return done(err);
      expect(res.statusCode).to.equal(200);
      done();        
    })
  })
  
  it('quitar mi inscripcion a una oferta', (done) => {
    chai.request(server).delete('/estudiante/oferta/eliminarInscripcion/'+idOferta)
    .auth(tokenEstudiante, { type: 'bearer' })
    .set('Cookie', ['tokenAcces=' + tokenEstudiante])
    .end((err, res)=>{
      if (err) return done(err);
      expect(res.statusCode).to.equal(200);
      done();        
    })
  })

  it('Inscribirse a una oferta 2', (done) => {
    chai.request(server).post('/estudiante/oferta/inscribirse')
    .auth(tokenEstudiante, { type: 'bearer' })
    .set('Cookie', ['tokenAcces=' + tokenEstudiante])
    .send({ "idOferta": idOferta })
    .end((err, res)=>{
      if (err) return done(err);
      expect(res.statusCode).to.equal(200);
      
      idInscripcion =  res.body.id
      done();        
    })
  })

  it('Ver Mis Inscripciones', (done) => {
    chai.request(server).get('/estudiante/verInscripciones/')
    .auth(tokenEstudiante, { type: 'bearer' })
    .set('Cookie', ['tokenAcces=' + tokenEstudiante])
    .send({ "idOferta": idOferta })
    .end((err, res)=>{
      if (err) return done(err);
      expect(res.statusCode).to.equal(200);
      done();        
    })
  })
  it('Actualizar Datos Estudiante', (done) => {
    let estudiante = {
      "description":"nueva descripcion",
      "cartaPresentacion":"carta presentacion v2"
    }
    chai.request(server)
      .put(`/estudiante/update`)
      .auth(tokenEstudiante, { type: 'bearer' })
      .set('Cookie', ['tokenAcces=' + tokenEstudiante])
      .send(estudiante)
      .end((err, res) => {
        if (err) return done(err);
        console.log(res.body.msg)
        expect(res.statusCode).to.equal(200);
        done();
      });
  });
})

/// EMPRESA 2 ////

/**
 * Aceptar/Rechazar Inscripcion de un estudiante
 * Eliminar Empresa
 * Eliminar Gestor&Empresa
 */

describe('EMPRESA 2',(done) => {

  it('Aceptar/Rechazar Inscripcion de un estudiante', (done) => {
    console.log('ESTO ES EL ID INSCRIPCION DE PRUEB'+idInscripcion)
    let inscripcion = {
      "id":idInscripcion,
      "estado":"aceptar"
    }
    chai.request(server)
      .put(`/gestor/oferta/estado/${idInscripcion}`)
      .auth(tokenGestor, { type: 'bearer' })
      .set('Cookie', ['tokenAcces=' + tokenGestor])
      .send(inscripcion)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.statusCode).to.equal(200);
        done();
      });
  });

  // este ruta elimina empresa, oferta, inscripciones
  it('Eliminar Empresa', (done) => {
    chai.request(server).delete('/gestor/empresa/delete/')
    .auth(tokenGestor, { type: 'bearer' })
    .set('Cookie', ['tokenAcces=' + tokenGestor])
    .end((err, res)=>{
      if (err) return done(err);
      expect(res.statusCode).to.equal(200);
      done();        
    })
  })

  // este ruta elimina gestor, empresa, oferta, inscripciones
  it('Eliminar Gestor&Empresa', (done) => {
    chai.request(server).delete('/gestor/delete/')
    .auth(tokenGestor, { type: 'bearer' })
    .set('Cookie', ['tokenAcces=' + tokenGestor])
    .end((err, res)=>{
      if (err) return done(err);
      expect(res.statusCode).to.equal(200);
      done();        
    })
  })

})


