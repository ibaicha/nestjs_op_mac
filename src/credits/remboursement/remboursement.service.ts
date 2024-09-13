import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateRemboursementDto } from './dto/createRemboursement.dto';
import { UpdateRemboursementDto } from './dto/updateRemboursement.dto';


@Injectable()
export class RemboursementService {
    constructor(private readonly prismaService : PrismaService) {}

    async getAllx() {
        return this.prismaService.remboursement.findMany(
            {
            include: {

                typeRemboursement: true,
                exploitation: true,
                emballage: {
                    include: {
                        typeEmballage: true
                    }
                }
            }
            }
        );
    }

    formatMontant(montant: number) {

        return montant.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") ;

    }
    async getAllxx() {
        try {
            const creditWithRemboursement = await this.prismaService.remboursement.findMany(
                {
                    include: {

                        typeRemboursement: true,
                        exploitation: true,
                        emballage: {
                            include: {
                                typeEmballage: true
                            }
                        }
                    }
                 
                }
            );
            // return opsWithType;
            const remboursements: {          
                id: number;
                date: string;
                pu: number;
                puFormat: string;
                nombreUnite: number;
                nombreUniteFormat: string;
                nombreEmballage: number;
                nombreEmballageFormat: string;
                valeur: number;
                valeurFormat: string;
                typeRemboursementId: number;
                typeRemboursementName: string;
                exploitationId: number;
                emballageId: number;
                emballageName: string;
                emballageTypeEmballageId: number;
                emballageTypeEmballageName: string;    
            }[] = [];


            for (const credit of creditWithRemboursement) {

                const dateObjectCredit = new Date(credit.date);
                const formattedDateCredit = dateObjectCredit.toLocaleDateString('fr-FR');
        
                    remboursements.push({
                        id: credit.id,
                        date: formattedDateCredit,
                        pu: credit.pu,
                        puFormat: this.formatMontant(credit.pu),
                        nombreUnite: credit.nombre_unite,
                        nombreUniteFormat: this.formatMontant(credit.nombre_unite),
                        nombreEmballage: credit.nombre_emballage,
                        nombreEmballageFormat: this.formatMontant(credit.nombre_emballage),
                        valeur: credit.valeur,
                        valeurFormat: this.formatMontant(credit.valeur),
                        exploitationId: credit.exploitationId,
                        typeRemboursementId: credit.typeRemboursementId,
                        typeRemboursementName: credit.typeRemboursement.name,
                        emballageId: credit.emballageId,
                        emballageName: credit.emballage.name,
                        emballageTypeEmballageId: credit.emballage.typeEmballageId,
                        emballageTypeEmballageName: credit.emballage.typeEmballage.name,
                    }
                );
                
            
            }
            return remboursements;
        } catch (error) {
            throw new ForbiddenException(error);
        } finally {
            await this.prismaService.$disconnect();
        }
         
    }


    async getAllRemboursementsFromExploitation( exploitationId: number) {
        return this.prismaService.recolte.findMany(
            {
                select: {
                    id: true,
                    date: true,
                    pu: true,
                    nombre_unite: true,
                    nombre_emballage: true,
                    valeur: true,
                    exploitation: {
                        select: {
                            id: true,
                            compte: true,
                            date: true,
                            unite: true,
                            surface: true,
                            createdAt: true,
                            updatedAt: true,
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
                    }
                },
                where: {
                    exploitation: {
                        id: exploitationId
                    }
                }
            }

        );

    }

    async getAll() {
        return this.prismaService.recolte.findMany(
            {
                select: {
                    id: true,
                    date: true,
                    pu: true,
                    nombre_unite: true,
                    nombre_emballage: true,
                    valeur: true,
                    exploitation: {
                        select: {
                            id: true,
                            compte: true,
                            date: true,
                            unite: true,
                            surface: true,
                            createdAt: true,
                            updatedAt: true,
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
                    }
                },
            }

        );

    }


    async getOne(remboursementId: number) {
        const remboursement = await this.prismaService.remboursement.findUnique({where: {id: remboursementId}});
        if(!remboursement) throw new NotFoundException('Post not found');
        return remboursement;
    }

    async create(createRemboursementDto: CreateRemboursementDto) {
        const { date,pu, nombre_unite, nombre_emballage, valeur, typeRemboursementId, exploitationId,emballageId} = createRemboursementDto;
        await this.prismaService.remboursement.create({data : { date,pu, nombre_unite, nombre_emballage, valeur, typeRemboursementId, exploitationId,emballageId}});
        return {data : "Remboursement created"};
    }

 
    async update(remboursementId: number, updateRemboursementDto: UpdateRemboursementDto) {
        const remboursement = await this.prismaService.remboursement.findUnique({where: {id: remboursementId}});
        if(!remboursement) throw new NotFoundException('Remboursement not found');
        await this.prismaService.remboursement.update({where: {id: remboursementId}, data : {...updateRemboursementDto}});
        return {data : "Remboursement updeted!"};
    }

    async delete(remboursementId: number) {
        const remboursement = await this.prismaService.remboursement.findUnique({where: {id: remboursementId}});
        if(!remboursement) throw new NotFoundException('Post not found');
        await this.prismaService.remboursement.delete({where: {id: remboursementId}});
        return {data : "Remboursement deleted"};
        
    }
}


