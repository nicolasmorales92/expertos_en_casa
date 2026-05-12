import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { CategoriesRepository } from './category.repository';

@Injectable()
export class CategoriesService {
  constructor(
    private readonly categoriesRepository: CategoriesRepository
  ){}

  async create(createCategoryDto: CreateCategoryDto) {
    return await this.categoriesRepository.create(createCategoryDto)
  }
  
  async findCategories(){
    return await this.categoriesRepository.findCategories()
  }






  async findCategoryByName(name: string) {
    return await this.categoriesRepository.findCategoryByName(name)
  }

  async listCategories(names: string[]){
    const categories = await this.categoriesRepository.listCategories(names)
    if(categories.length === 0) throw new BadRequestException('Categoría inválida.')

      return categories
  }
}
