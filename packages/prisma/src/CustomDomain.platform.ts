interface NodeDns {
  readonly resolveNs: (name: string) => Promise<string[]>;
  readonly resolve4: (name: string) => Promise<string[]>;
  readonly Resolver: new () => {
    setServers(servers: string[]): void;
    resolveCname(name: string): Promise<string[]>;
  };
}

export function loadNodeDns(): Promise<NodeDns> {
  return import("node:dns/promises");
}

export function resolveNames(dns: NodeDns, name: string) {
  return dns.resolveNs(name);
}

export function resolveAddresses(dns: NodeDns, name: string) {
  return dns.resolve4(name);
}

export function createResolver(dns: NodeDns) {
  return new dns.Resolver();
}

export function setResolverServers(resolver: ReturnType<typeof createResolver>, servers: string[]) {
  return resolver.setServers(servers);
}

export function resolveCname(resolver: ReturnType<typeof createResolver>, name: string) {
  return resolver.resolveCname(name);
}
