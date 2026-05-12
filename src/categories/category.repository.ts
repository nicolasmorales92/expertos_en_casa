import { InjectRepository } from "@nestjs/typeorm";
import { Categories } from "./entities/category.entity";
import { In, Repository } from "typeorm";
import { ConflictException, NotFoundException } from "@nestjs/common";
import { CreateCategoryDto } from "./dto/create-category.dto";

export class CategoriesRepository {
    constructor(
        @InjectRepository(Categories)
        private readonly categoriesRepository : Repository<Categories>
    ){}
    async create(createCategoryDto: CreateCategoryDto){
        const exist = await this.categoriesRepository.findOneBy({name: createCategoryDto.name})
        if(exist) throw new ConflictException('La categoría ya existe.')

        return await this.categoriesRepository.save(createCategoryDto)
    }

    async findCategories(){
        return await this.categoriesRepository.find()
    }





    async findCategoryByName(name: string){
        const foundCategory = await this.categoriesRepository.findOne({
            where: {name: name}
        })

        if(!foundCategory) throw new NotFoundException('categoría inexistente.')
        return foundCategory
    }


    async listCategories(names: string[]){
        return await this.categoriesRepository.findBy({
        name: In(names)
    });
    }
}