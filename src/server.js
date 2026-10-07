import express from 'express'
import sequelize from './config/database.js'
import perfilRoutes from './routes/perfilRoutes.js'
import usuarioRoutes from './routes/usuarioRoutes.js'
import permissaoRoutes from './routes/permissaoRoutes.js'
import pastaRoutes from './routes/pastaRoutes.js'
import clienteRoutes from './routes/clienteRoutes.js'
import casoRoutes from './routes/casoRoutes.js'
import processoRoutes from './routes/processoRoutes.js'
import diligenciaRoutes from './routes/diligenciaRoutes.js'
import alertaRoutes from './routes/alertaRoutes.js'
import notificacaoRoutes from './routes/notificacaoRoutes.js'
import perfilPermissaoRoutes from './routes/perfilPermissaoRoutes.js'
import pastaResponsavelRoutes from './routes/pastaResponsavelRoutes.js'
import casoResponsavelRoutes from './routes/casoResponsavelRoutes.js'
import diligenciaResponsavelRoutes from './routes/diligenciaResponsavelRoutes.js'
const app = express()

app.use(express.json())
app.use('/perfil', perfilRoutes)
app.use('/usuario', usuarioRoutes)
app.use('/permissao', permissaoRoutes)
app.use('/pasta', pastaRoutes)
app.use('/cliente', clienteRoutes)
app.use('/caso', casoRoutes)
app.use('/processo', processoRoutes)
app.use('/diligencia', diligenciaRoutes)
app.use('/alerta', alertaRoutes)
app.use('/notificacao', notificacaoRoutes)
app.use('/perfil-permissao', perfilPermissaoRoutes)
app.use('/pasta-responsavel', pastaResponsavelRoutes)
app.use('/caso-responsavel', casoResponsavelRoutes)
app.use('/diligencia-responsavel', diligenciaResponsavelRoutes)


sequelize.authenticate().then(() => {
  console.log("banco de dados Conetado")

  app.listen(3000, () => {
    console.log('Server is running on port 3000')
  })
}).catch(erro => {
  console.error(erro)
})