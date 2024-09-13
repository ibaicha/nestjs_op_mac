import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateMouvementStockDto } from './dto/createMouvementStock.dto';
import { UpdateMouvementStockDto } from './dto/updateMouvementStock.dto';
 

 

@Injectable()
export class MouvementStockService {
    constructor(private readonly prismaService : PrismaService) {}

    async getAll() {
        return this.prismaService.mouvementStock.findMany(
            {
                select: {
                    id: true,
                    date: true,
                    pu: true,
                    quantiteEntreeEmballage: true,
                    quantiteSortieEmballage: true,
                    nombreUnite: true,
                    valeur: true,
                    variete: {
                        select: {
                            id: true,
                            name: true,
                            surface_unite: true,
                            quantite_unite: true,
                            rendement_unite: true,
                            isActive: true,
                            produit: {
                                select: {
                                    id: true,
                                    name: true
                                }
                            }
                        }
                    },
                    annee:{
                        select: {
                            id: true,
                            name: true,
                            valeur: true,
                        }

                    },
                    saison:{
                        select: {
                            id: true,
                            name: true,
                            description: true,
                        }
                    },
                    
                    emballage: {
                        select: {
                            name: true,
                            conditionnement: true,
                            quantite: true,
                            pu: true,
                            valeur: true,
                            isActive: true,
                            isDefault: true
                        }
                    },
                  
                    op:{
                        select: {
                            id: true,
                            name: true,
                        }
                    },
                    uniteTransformation: {
                        select: {
                            id: true,
                            name: true
                        }
                    },
                    emplacement: {
                        select: {
                            id: true,
                            name: true
                        }
                    }
                }
            }
        );
    
    }
    async getAllMouvementStockProduitCampagne( produitId: number, anneeId: number, saisonId: number )  {
        return this.prismaService.mouvementStock.findMany(
            {
                select: {
                    id: true,
                    date: true,
                    pu: true,
                    quantiteEntreeEmballage: true,
                    quantiteSortieEmballage: true,
                    nombreUnite: true,
                    valeur: true,
                    variete: {
                        select: {
                            id: true,
                            name: true,
                            surface_unite: true,
                            quantite_unite: true,
                            rendement_unite: true,
                            isActive: true,
                            produit: {
                                select: {
                                    id: true,
                                    name: true
                                }
                            }
                        }
                    },
                    annee:{
                        select: {
                            id: true,
                            name: true,
                            valeur: true,
                        }

                    },
                    saison:{
                        select: {
                            id: true,
                            name: true,
                            description: true,
                        }
                    },
                    
                    emballage: {
                        select: {
                            name: true,
                            conditionnement: true,
                            quantite: true,
                            pu: true,
                            valeur: true,
                            isActive: true,
                            isDefault: true
                        }
                    },
                  
                    op:{
                        select: {
                            id: true,
                            name: true,
                        }
                    },
                    uniteTransformation: {
                        select: {
                            id: true,
                            name: true
                        }
                    },
                    emplacement: {
                        select: {
                            id: true,
                            name: true
                        }
                    }
                },
                where: {
                /*   
                    annee: {
                        id: anneeId
                    },
                    saison: {
                        id: saisonId
                    },
                    variete: {
                        produit: {
                            id: produitId
                        },
                    },
                    */

                    anneeId: anneeId,
                    saisonId: saisonId,
                    variete: {
                        produitId:produitId
                        }


                }
            }
        );
    
    }

    async getAllMouvementStockOpProduitCampagne(opId: number, produitId: number, anneeId: number, saisonId: number )  {
        return this.prismaService.mouvementStock.findMany(
            {
                select: {
                    id: true,
                    date: true,
                    pu: true,
                    quantiteEntreeEmballage: true,
                    quantiteSortieEmballage: true,
                    nombreUnite: true,
                    valeur: true,
                    variete: {
                        select: {
                            id: true,
                            name: true,
                            surface_unite: true,
                            quantite_unite: true,
                            rendement_unite: true,
                            isActive: true,
                            produit: {
                                select: {
                                    id: true,
                                    name: true
                                }
                            }
                        }
                    },
                    annee:{
                        select: {
                            id: true,
                            name: true,
                            valeur: true,
                        }

                    },
                    saison:{
                        select: {
                            id: true,
                            name: true,
                            description: true,
                        }
                    },
                    
                    emballage: {
                        select: {
                            name: true,
                            conditionnement: true,
                            quantite: true,
                            pu: true,
                            valeur: true,
                            isActive: true,
                            isDefault: true
                        }
                    },
                  
                    op:{
                        select: {
                            id: true,
                            name: true,
                        }
                    },
                    uniteTransformation: {
                        select: {
                            id: true,
                            name: true
                        }
                    },
                    emplacement: {
                        select: {
                            id: true,
                            name: true
                        }
                    }
                },
                where: {
                /*   
                    annee: {
                        id: anneeId
                    },
                    saison: {
                        id: saisonId
                    },
                    variete: {
                        produit: {
                            id: produitId
                        },
                    },
                    */

                    anneeId: anneeId,
                    saisonId: saisonId,
                    variete: {
                        produitId:produitId
                        },
                        opId: opId


                }
            }
        );
    
    }

    async getOne(mouvementStockId: number) {
        return this.prismaService.mouvementStock.findMany(
            {
                select: {
                    id: true,
                    date: true,
                    pu: true,
                    quantiteEntreeEmballage: true,
                    quantiteSortieEmballage: true,
                    nombreUnite: true,
                    valeur: true,

                    emballage: {
                        select: {
                            name: true,
                            conditionnement: true,
                            quantite: true,
                            pu: true,
                            valeur: true,
                            isActive: true,
                            isDefault: true
                        }
                    },
                  
                    variete: {
                        select: {
                            id: true,
                            name: true,
                            surface_unite: true,
                            quantite_unite: true,
                            rendement_unite: true,
                            isActive: true
                        }
                    },
                    op:{
                        select: {
                            id: true,
                            name: true,
                        }
                    },
                    uniteTransformation: {
                        select: {
                            id: true,
                            name: true
                        }
                    },
                    emplacement: {
                        select: {
                            id: true,
                            name: true
                        }
                    }
                },
               where: {id: mouvementStockId}

               
                
            }
        );
  
    }

 
    async getOneX(mouvementStockId: number) {
        const mouvementStock = await this.prismaService.mouvementStock.findUnique({where: {id: mouvementStockId}});
        if(!mouvementStock) throw new NotFoundException('Post not found');
        return mouvementStock;
    }
  
    async create(createMouvementStockDto: CreateMouvementStockDto) {
        const {date, pu, quantiteEntreeEmballage, quantiteSortieEmballage, nombreUnite, valeur, opId, uniteTransformationId, varieteId,modeEntreeSortieStockId, emplacementId, emballageId, anneeId, saisonId} = createMouvementStockDto;
        await this.prismaService.mouvementStock.create({data : {date, pu, quantiteEntreeEmballage, quantiteSortieEmballage, nombreUnite, valeur, opId, uniteTransformationId, varieteId,modeEntreeSortieStockId, emplacementId, emballageId, anneeId, saisonId}});
        return {data : "MouvementStock created"};
    }

    async update(mouvementStockId: number, updateMouvementStockDto: UpdateMouvementStockDto) {
        const mouvementStock = await this.prismaService.mouvementStock.findUnique({where: {id: mouvementStockId}});
        if(!mouvementStock) throw new NotFoundException('MouvementStock not found');
        await this.prismaService.mouvementStock.update({where: {id: mouvementStockId}, data : {...updateMouvementStockDto}});
        return {data : "MouvementStock updeted!"};
    }

    async delete(mouvementStockId: number) {
        const mouvementStock = await this.prismaService.mouvementStock.findUnique({where: {id: mouvementStockId}});
        if(!mouvementStock) throw new NotFoundException('Post not found');
        await this.prismaService.mouvementStock.delete({where: {id: mouvementStockId}});
        return {data : "MouvementStock deleted"};
    }
}


