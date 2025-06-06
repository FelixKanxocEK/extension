import { IsString } from "class-validator";

export class DtoGetGeneralReportExit {
    @IsString()
    init_date: string;

    @IsString()
    end_date: string;
}