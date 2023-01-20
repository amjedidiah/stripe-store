type Object = {
    id?: number;
    [key: string]: any;
}

export const objectifyArray = <T extends Object> (arr: T[], determinant: keyof T = "id") => arr.reduce((acc, it) => {
    acc[it[determinant]] = it;
    return acc;
}, {} as { [key: string]: T });

export const reverseObject = <T extends Object> (obj: T) => Object.values(obj).filter(Boolean) as T[keyof T][];