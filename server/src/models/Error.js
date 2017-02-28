export default class Error {
    
    constructor(message, stacktrace) {
        this.message = message;
        this.stacktrace = stacktrace;
    }

    toString() {
        return '{ message: ' + this.message + ' }';
    }
}