function setMetaData(key: string, value) {
  return function<T extends Function>(target: T): T {
    Object.defineProperty(target.prototype, key, {
      value: value
    });
    return target;
  };
}

function setFlagMetaData<T extends Function>(target: T, flag: string) {
  Object.defineProperty(target.prototype, flag, {
    value: true,
    enumerable: true
  });
  return target;
}

export function name(value: string) {
  return setMetaData("name", value);
}

export function description(value: string) {
  return setMetaData("description", value);
}

export function ownerOnly<T extends Function>(target: T): T {
  return setFlagMetaData(target, "ownerOnly");
}

export function aliases(...values: string[]) {
  return setMetaData("aliases", values);
}

export function slashCommandOptions(values: any[]) {
  return setMetaData("slashCommandOptions", values);
}

export function guildOnly<T extends Function>(target: T): T {
  return setFlagMetaData(target, "guildOnly");
}

export function userPermissions(...values: string[]) {
  return setMetaData("userPermissions", values);
}

export function clientPermissions(...values: string[]) {
  return setMetaData("clientPermissions", values);
}

export function cooldown(value: number) {
  return setMetaData("cooldown", value);
}

export function usage(value: string) {
  return setMetaData("usage", value);
}
