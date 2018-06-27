export default class Error {
    public message: string;
    public stacktrace: string;

    constructor(message, stacktrace) {
        this.message = message;
        this.stacktrace = stacktrace;
    }

    public toString() {
        return '{ message: ' + this.message + ' }';
    }
}