export type ReadinessProbe = IExecProbe | IHttpProbe | ITcpProbe

export interface ICommonProbeOptions {
  timeoutSeconds?: number
  initialDelaySeconds?: number
  periodSeconds?: number
}

export interface IExec {
  command: string
  user?: string
  env?: Record<string, string>
}

export interface IExecProbe extends ICommonProbeOptions {
  exec: IExec
}

export interface IHttpProbe extends ICommonProbeOptions {
  path: string
  scheme?: string
  method?: string
  host?: string
  port?: string
  headers?: ReadonlyArray<HttpHeader>
}

type HttpHeader = Record<"name" | "value", string>

export interface ITcpProbe extends ICommonProbeOptions {
  port: number
  host?: string
}
