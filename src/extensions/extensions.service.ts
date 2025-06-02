import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OmbuExtensions } from 'src/entity/ombutel_extensions.entity';
import { DataSource, Repository } from 'typeorm';
import { DtoGetGeneralReportExit } from './dto/get_general_report_exit.dto';
import { OmbutelCosts } from 'src/entity/ombutel_costs.entity';
import Decimal from 'decimal.js';

@Injectable()
export class ExtensionsService {
    constructor(
        @InjectRepository(OmbutelCosts) private readonly OmbuCostsRepository: Repository<OmbutelCosts>,
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
            const reports = await queryRunner.manager.query(
                `
                SELECT 
                    ombu_devices.description AS agent, 
                    cdr.source AS Exten, 
                    cdr.destination AS Destino, 
                    cdr.disposition AS Estado, 
                    date_format(CONVERT_TZ(cdr.calldate, '+00:00', @@session.time_zone),'%d/%m/%Y') AS Fecha,
                    date_format(CONVERT_TZ(cdr.calldate, '+00:00', @@session.time_zone),'%H:%i:%s') AS Hora,
                    dstchannel, 
                    lastapp,
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

            if (reports.length > 0) {
                const costs = await this.OmbuCostsRepository.find();

                if (costs.length == 0) {
                    return [];
                }

                const new_list_reports = [];
                reports.forEach(report => {
                    if (report.dstchannel && report.lastapp) {
                        const report_data = { ...report };
                        // CALCULAMOS LOS COSTOS
                        const time = this.timeToMinutes(report.Duracion);
                        // buscamos el costo de la llamada
                        const cost_carrier = costs.find(c => c.carrier == report.dstchannel && c.tipo == report.lastapp);
                        if (cost_carrier) {
                            // Calculamos el costo
                            const total_cost = new Decimal(time).mul(cost_carrier.costo).toDP(2).toNumber();
                            report_data.Costo = total_cost;
                        } else {
                            report_data.Costo = 0;
                        }
                        new_list_reports.push(report_data);
                    }
                });
                return new_list_reports;
            }
            return [];
        } catch (error) {
            console.error(error, ' error');
            return [];
        } finally {
            await queryRunner.release();
        }
    }

    timeToMinutes(time: string): number {
        const parts = time.split(':').map(Number).reverse(); // [ss, mm, hh]
        const seconds = parts[0] || 0;
        const minutes = parts[1] || 0;
        const hours = parts[2] || 0;

        return hours * 60 + minutes + seconds / 60;
    }
}
