
export class Logger {
    static log(message: string, ...args: any[]) {
        console.log(message, ...args);
    }
    static error(error: Error, context?: object) {
        console.error(error, context);
    }
}
