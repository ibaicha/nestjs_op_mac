import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProduitDto } from './dto/createProduit.dto';
import { UpdateProduitDto } from './dto/updateProduit.dto';

@Injectable()
export class ProduitService {
    constructor(private readonly prismaService : PrismaService) {}

    async getAll() {
        return this.prismaService.produit.findMany(
            {
              select: {
                id: true,
                name: true,
                //isRecolte:true,
                isActive: true,
                isDerive: true,
                isEnsachage: true,
                filiere: {
                  select: {
                    id: true,
                    name: true
                  }
                },
                familleEmplacement: {
                  select: {
                    id: true,
                    name: true
                  }
                }
              }
            }
        );
    }

    async getOne(produitId: number) {
        const produit = await this.prismaService.produit.findUnique({where: {id: produitId}});
        if(!produit) throw new NotFoundException('Post not found');
        return produit;
    }
    async create(createProduitDto: CreateProduitDto) {
        const { name,isActive, isDerive, isEnsachage, filiereId,familleEmplacementId} = createProduitDto;
        await this.prismaService.produit.create({data : { name,isActive, isDerive, isEnsachage, filiereId,familleEmplacementId }});
        return {data : "Produit created"};
    }

    async update(produitId: number, updateProduitDto: UpdateProduitDto) {
        const produit = await this.prismaService.produit.findUnique({where: {id: produitId}});
        if(!produit) throw new NotFoundException('Produit not found');
        await this.prismaService.produit.update({where: {id: produitId}, data : {...updateProduitDto}});
        return {data : "Produit updeted!"};
    }

    async delete(produitId: number) {
        const produit = await this.prismaService.produit.findUnique({where: {id: produitId}});
        if(!produit) throw new NotFoundException('Post not found');
        await this.prismaService.produit.delete({where: {id: produitId}});
        return {data : "Produit deleted"};
    }
}

