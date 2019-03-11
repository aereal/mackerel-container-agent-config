interface Props {
  serviceRoles: ServiceRole[]
}

export class ServiceRoleList {
  public serviceRoles: ServiceRole[]

  constructor(props: Props) {
    this.serviceRoles = props.serviceRoles
  }

  public add(serviceRole: ServiceRole): void {
    this.serviceRoles.push(serviceRole)
  }

  public toJSON(): any {
    return this.serviceRoles.map(({ service, role }) => `${service}:${role}`)
  }
}

export interface ServiceRole {
  service: string
  role: string
}
