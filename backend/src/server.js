import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import sequelize from './config/database.js'
import { identificarUsuario } from './middlewares/identificarUsuario.js'
import './utils/historicoHooks.js'

import { login } from './controllers/Authcontroller.js'
import authRoutes from './routes/Authroutes.js'
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
import atualizacaoProcessoRoutes from './routes/atualizacaoprocessoRoutes.js'
import clienteHistoricoContatoRoutes from './routes/clientehistoricocontatoRoutes.js'
import historicoAtividadeRoutes from './routes/historicoatividadeRoutes.js'
import dashboardRoutes from './routes/DashboardRoutes.js'
const app = express()

app.use(cors())
app.use(express.json())
app.use('/dashboard', dashboardRoutes)
app.post('/login', login)
app.use('/auth', authRoutes)
app.use(identificarUsuario)
app.use('/perfil', perfilRoutes)
app.use('/usuario', usuarioRoutes)
app.use('/permissao', permissaoRoutes)
app.use('/pastas', pastaRoutes)
app.use('/pasta', pastaRoutes)
app.use('/cliente', clienteRoutes)
app.use('/clientes', clienteRoutes)
app.use('/casos', casoRoutes)
app.use('/caso', casoRoutes)
app.use('/processos', processoRoutes)
app.use('/processo', processoRoutes)
app.use('/diligencia', diligenciaRoutes)
app.use('/diligencias', diligenciaRoutes)
app.use('/alerta', alertaRoutes)
app.use('/notificacao', notificacaoRoutes)
app.use('/perfil-permissao', perfilPermissaoRoutes)
app.use('/pasta-responsavel', pastaResponsavelRoutes)
app.use('/caso-responsavel', casoResponsavelRoutes)
app.use('/diligencia-responsavel', diligenciaResponsavelRoutes)
app.use('/atualizacao-processo', atualizacaoProcessoRoutes)
app.use('/cliente-historico-contato', clienteHistoricoContatoRoutes)
app.use('/historico-atividade', historicoAtividadeRoutes)

sequelize.authenticate().then(() => {
  console.log("banco de dados Conetado")

  app.listen(3000, () => {
    console.log('Server is running on port 3000')
  })
}).catch(erro => {
  console.error(erro)
})