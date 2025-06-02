import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OmbuExtensions } from 'src/entity/ombutel_extensions.entity';
import { DataSource, Repository } from 'typeorm';
import { DtoGetGeneralReportExit } from './dto/get_general_report_exit.dto';

@Injectable()
export class ExtensionsService {
    constructor(
        @InjectRepository(OmbuExtensions) private readonly OmbuExtensionsRepository: Repository<OmbuExtensions>,
        private readonly DataSource: DataSource,
    ) { }

    async find() {
        try {
            return await this.OmbuExtensionsRepository.find({ relations: { contact: true } });
        } catch (error) {
            return []
        }
    }

    async getGeneralReportExit(data: DtoGetGeneralReportExit) {
        const queryRunner = this.DataSource.createQueryRunner();
        await queryRunner.connect();

        try {
            const result = await queryRunner.manager.query(
                `
                SELECT 
                    ombu_devices.description AS agent, 
                    cdr.source AS Exten, 
                    cdr.destination AS Destino, 
                    cdr.disposition AS Estado, 
                    date_format(CONVERT_TZ(cdr.calldate, '+00:00', @@session.time_zone),'%d/%m/%Y') AS Fecha,
                    date_format(CONVERT_TZ(cdr.calldate, '+00:00', @@session.time_zone),'%H:%i:%s') AS Hora,
                    dstchannel, 
                    cdr_id,
                    DATE_FORMAT(SEC_TO_TIME(cdr.billsec),'%H:%i:%s') as Duracion,
                    cdr.pin_code AS Costo
                FROM cdr
                LEFT JOIN ombu_devices ON cdr.source = ombu_devices.assigned_exten
                WHERE 
                    cdr.calltype = 3 AND 
                    dstchannel REGEXP 'Axtel|SBC|Telmex'/**/
                    AND cdr.calldate>=DATE_FORMAT(NOW() , ? )
                    AND cdr.calldate<DATE_FORMAT(NOW() , ?)
                    AND dstchannel NOT REGEXP 'SIP/TR|DHAD';
                `, [data.init_date, data.end_date]
            );

            result.forEach(tmp => {
                console.log(tmp, ' tmpp')
                if (tmp.Costo) {
                    // console.log(result);
                }
            })

        } catch (error) {
            console.log(error, ' error');
            return [];
        } finally {
            await queryRunner.release();
        }
    }
}
