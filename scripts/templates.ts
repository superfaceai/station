export function profileTemplate(usecase: string, scope?: string, version: string = '1.0') {
    const name: string = scope ? `${scope}/${usecase}` : `/${usecase}`
    return `name = "${name}"\nversion = "${version}"\n`
}