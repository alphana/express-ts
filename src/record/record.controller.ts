import { RestcontrollerDecorator } from "../applicationChassis/restcontroller.decorator";
import ServerConfiguration from "../applicationChassis/server.configuration";
import { PostMapping } from "../applicationChassis/getmapping.decorator";
import RecordService from "./record.service";
import RecordsPayload from "./record.payload";
import RecordFilter from "./record.filter";

@RestcontrollerDecorator("/api/record")
class RecordController {
    private recordService: RecordService;

    constructor(public app: ServerConfiguration) {
        this.recordService = new RecordService();
    }


    @PostMapping()
    public getAggregatedRecords(filter: RecordFilter): Promise<RecordsPayload> {
        return this.recordService.getAggregatedRecordByFilter(filter);
    }
}

export default RecordController;
