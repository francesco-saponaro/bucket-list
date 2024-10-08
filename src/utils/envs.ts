const environment: { [key: string]: any } = {}

export const envs = new Proxy(environment, {
    get(target, name) {
        const variable = name.toString();
        if (target[variable])
            return target[variable];
        if (process.env[variable])
            return process.env[variable];
        if (process.env[`VITE_APP_${variable}`])
            return process.env[`VITE_APP_${variable}`];
        if (typeof localStorage != 'undefined') {
            const localValue = localStorage.getItem(variable);
            if (typeof localValue == 'string')
                return JSON.parse(localValue);
        }
    },
    set(target, name, value) {
        const paramName = name.toString();
        target[paramName] = value;
        if (typeof localStorage != 'undefined')
            localStorage.setItem(name.toString(), JSON.stringify(value));
        return true;
    }
});

