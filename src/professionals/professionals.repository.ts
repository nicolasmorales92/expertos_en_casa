import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ProfessionalProfile } from "./entities/professional.entity";
import { Repository } from "typeorm";

@Injectable()
export class ProfessionalProfileRepository {
    @InjectRepository(ProfessionalProfile)
    private readonly professionalProfileRepository: Repository<ProfessionalProfile>
}