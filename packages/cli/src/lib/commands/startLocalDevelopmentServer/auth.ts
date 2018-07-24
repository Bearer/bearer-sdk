const Router = require('koa-router')
import * as fs from 'fs'
import { AuthStrategyFactory } from './authStrategies'

const router = new Router({ prefix: '/' })

router.get('v1/user/initialize', ctx => {
  ctx.body = '<html><head></head><body><script>'
  ctx.body += fs.readFileSync(__dirname + '/iframe.js')
  ctx.body += '</script></body></html>'
})

router.get('v1/auth/callback', async (ctx, res, next) => {
  const { integration_uuid, setupId } = ctx.signedCookies
  const {
    integrationConfigTableId,
    servicesTableId,
    userDataTableId
  } = ctx.stageVariables
  const auth = await AuthStrategyFactory.authStrategy(
    integrationConfigTableId,
    integration_uuid,
    servicesTableId,
    userDataTableId
  )

  auth.callbackRequest(ctx, res, setupId, next)
})

router.get('v1/auth/:integration_uuid', async (ctx, res, next) => {
  const { integration_uuid } = ctx.params
  const {
    integrationConfigTableId,
    servicesTableId,
    userDataTableId
  } = ctx.stageVariables

  const setupId = ctx.query.setupId

  const auth = await AuthStrategyFactory.authStrategy(
    integrationConfigTableId,
    integration_uuid,
    servicesTableId,
    userDataTableId
  )

  res.cookie('integration_uuid', integration_uuid, {
    maxAge: 60000,
    signed: true
  }) //expires in one minute
  res.cookie('setupId', setupId, {
    maxAge: 60000,
    signed: true
  }) //expires in one minute
  auth.setupRequest(ctx, res, setupId, next)
})

export default router
