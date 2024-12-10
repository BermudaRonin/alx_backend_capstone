
export default class Validator {
    constructor(private data: any) { }

    isEmptyArray() {
        return Array.isArray(this.data) && this.data.length === 0;
    }
    isFullArray() {
        return Array.isArray(this.data) && this.data.length > 0;
    }

}