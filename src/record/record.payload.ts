import RecordsResponse from "./record.response";

class RecordsPayload {
    constructor(public code: number, public msg: string, public records: RecordsResponse[]) {
    }
}

export default RecordsPayload;
