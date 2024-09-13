-- CreateTable
CREATE TABLE `identifiant` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `sexe` INTEGER NOT NULL,
    `annee_string` VARCHAR(191) NOT NULL,
    `annee_numeric` INTEGER NOT NULL,
    `annee_true` INTEGER NOT NULL,
    `ordre_string` VARCHAR(191) NOT NULL,
    `ordre_numeric` INTEGER NOT NULL,
    `code_string` VARCHAR(191) NOT NULL,
    `code_numeric` INTEGER NOT NULL,

    INDEX `identifiant_sexe_code_numeric_annee_true_idx`(`sexe`, `code_numeric`, `annee_true`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `username` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `roleId` INTEGER NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Role` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Role_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Profile` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `firstName` VARCHAR(191) NOT NULL,
    `lastName` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL DEFAULT '',
    `address` VARCHAR(191) NOT NULL DEFAULT '',
    `userId` INTEGER NULL,

    UNIQUE INDEX `Profile_userId_key`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Post` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `body` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Comment` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `content` VARCHAR(191) NOT NULL,
    `postId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Pays` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `sigle` VARCHAR(191) NULL,

    UNIQUE INDEX `Pays_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Zone` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `paysId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SousZone` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `zoneId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Localite` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `sousZoneId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Region` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `paysId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Departement` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `regionId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Commune` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `departementId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Village` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `communeId` INTEGER NULL,
    `localiteId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TypeOp` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `TypeOp_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Point` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `localiteId` INTEGER NOT NULL,
    `isProduit` BOOLEAN NOT NULL,
    `isIntrant` BOOLEAN NOT NULL,
    `isVirtuel` BOOLEAN NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PointAgence` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `pointId` INTEGER NOT NULL,
    `agenceId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Entrepot` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `adresse` VARCHAR(191) NOT NULL,
    `pointId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Emplacement` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `code` INTEGER NULL,
    `capacite` DOUBLE NOT NULL,
    `familleEmplacementId` INTEGER NOT NULL,
    `entrepotId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TypeEmplacement` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `TypeEmplacement_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TypeMouvementStock` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `TypeMouvementStock_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ModeEntreeSortieStock` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `code` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `typeMouvementStockId` INTEGER NOT NULL,

    UNIQUE INDEX `ModeEntreeSortieStock_code_key`(`code`),
    UNIQUE INDEX `ModeEntreeSortieStock_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MouvementStock` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `date` DATETIME(3) NOT NULL,
    `pu` DOUBLE NOT NULL,
    `quantiteEntreeEmballage` DOUBLE NOT NULL,
    `quantiteSortieEmballage` DOUBLE NOT NULL,
    `nombreUnite` DOUBLE NOT NULL,
    `valeur` DOUBLE NOT NULL,
    `lot` VARCHAR(191) NOT NULL DEFAULT '',
    `opId` INTEGER NULL,
    `uniteTransformationId` INTEGER NULL,
    `varieteId` INTEGER NOT NULL,
    `modeEntreeSortieStockId` INTEGER NOT NULL,
    `anneeId` INTEGER NOT NULL,
    `saisonId` INTEGER NOT NULL,
    `emplacementId` INTEGER NOT NULL,
    `emballageId` INTEGER NOT NULL,

    INDEX `MouvementStock_opId_anneeId_saisonId_varieteId_idx`(`opId`, `anneeId`, `saisonId`, `varieteId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UniteTransformation` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `sigle` VARCHAR(191) NOT NULL,
    `adresse` VARCHAR(191) NOT NULL,
    `telephone` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `UniteTransformation_name_key`(`name`),
    UNIQUE INDEX `UniteTransformation_sigle_key`(`sigle`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Op` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `sigle` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `telephone` VARCHAR(191) NOT NULL,
    `adresse` VARCHAR(191) NOT NULL,
    `prenom_contact` VARCHAR(191) NOT NULL,
    `nom_contact` VARCHAR(191) NOT NULL,
    `email_contact` VARCHAR(191) NOT NULL,
    `telephone_contact` VARCHAR(191) NOT NULL,
    `typeOpId` INTEGER NOT NULL,
    `villageId` INTEGER NULL,
    `localiteId` INTEGER NOT NULL,
    `pointId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Producteur` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `compte` INTEGER NOT NULL,
    `prenom` VARCHAR(191) NOT NULL,
    `nom` VARCHAR(191) NOT NULL,
    `cni` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `telephone` VARCHAR(191) NOT NULL,
    `adresse` VARCHAR(191) NOT NULL,
    `isActive` BOOLEAN NOT NULL,
    `opId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Annee` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `valeur` INTEGER NOT NULL,

    UNIQUE INDEX `Annee_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Saison` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Saison_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Campagne` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `anneeId` INTEGER NOT NULL,
    `saisonId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Filiere` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `FamilleEmplacement` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `FamilleEmplacement_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Produit` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `isDerive` BOOLEAN NOT NULL,
    `isEnsachage` BOOLEAN NOT NULL,
    `isActive` BOOLEAN NOT NULL,
    `filiereId` INTEGER NOT NULL,
    `familleEmplacementId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ProduitChargeExploitation` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `produitId` INTEGER NOT NULL,
    `chargeExploitationId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Variete` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `surface_unite` VARCHAR(191) NOT NULL,
    `quantite_unite` VARCHAR(191) NOT NULL,
    `pu_unite` DOUBLE NOT NULL,
    `rendement_unite` DOUBLE NOT NULL,
    `isActive` BOOLEAN NOT NULL,
    `produitId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `FamilleTypeChargeExploitation` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `FamilleTypeChargeExploitation_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TypeChargeExploitation` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `familleTypeChargeExploitationId` INTEGER NOT NULL,

    UNIQUE INDEX `TypeChargeExploitation_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `FamilleChargeExploitation` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `FamilleChargeExploitation_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ChargeExploitation` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `unite` VARCHAR(191) NOT NULL,
    `pu` DOUBLE NOT NULL,
    `quantite_unite_superficie` DOUBLE NOT NULL,
    `isAchat` BOOLEAN NOT NULL DEFAULT false,
    `isProduit` BOOLEAN NOT NULL DEFAULT false,
    `isIntrant` BOOLEAN NOT NULL DEFAULT false,
    `uniteGrandeurId` INTEGER NULL,
    `typeChargeExploitationId` INTEGER NOT NULL,
    `familleChargeExploitationId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Exploitation` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `compte` INTEGER NOT NULL,
    `date` DATE NULL,
    `unite` VARCHAR(191) NOT NULL,
    `surface` DOUBLE NOT NULL,
    `agenceId` INTEGER NOT NULL,
    `varieteId` INTEGER NOT NULL,
    `anneeId` INTEGER NOT NULL,
    `saisonId` INTEGER NOT NULL,
    `producteurId` INTEGER NULL,
    `opId` INTEGER NULL,

    UNIQUE INDEX `Exploitation_compte_key`(`compte`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Recolte` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `date` DATETIME(3) NOT NULL,
    `pu` DOUBLE NOT NULL,
    `nombre_unite` DOUBLE NOT NULL,
    `nombre_emballage` DOUBLE NOT NULL,
    `valeur` DOUBLE NOT NULL,
    `exploitationId` INTEGER NOT NULL,
    `varieteId` INTEGER NOT NULL,
    `emballageId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TypeSociete` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `TypeSociete_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Societe` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `sigle` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `adresse` VARCHAR(191) NOT NULL,
    `telephone` VARCHAR(191) NOT NULL,
    `typeSocieteId` INTEGER NOT NULL,

    UNIQUE INDEX `Societe_name_key`(`name`),
    UNIQUE INDEX `Societe_sigle_key`(`sigle`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Agence` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `sigle` VARCHAR(191) NOT NULL,
    `societeId` INTEGER NOT NULL,

    UNIQUE INDEX `Agence_name_key`(`name`),
    UNIQUE INDEX `Agence_sigle_key`(`sigle`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Credit` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `date` DATETIME(3) NOT NULL,
    `capital` DOUBLE NOT NULL,
    `interet` DOUBLE NOT NULL,
    `moratoire` DOUBLE NOT NULL,
    `autres_engagements` DOUBLE NOT NULL,
    `exploitationId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TypeRemboursement` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `TypeRemboursement_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Remboursement` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `date` DATETIME(3) NOT NULL,
    `pu` DOUBLE NULL,
    `nombre_unite` DOUBLE NOT NULL,
    `nombre_emballage` DOUBLE NOT NULL,
    `valeur` DOUBLE NOT NULL DEFAULT 0,
    `typeRemboursementId` INTEGER NOT NULL,
    `exploitationId` INTEGER NOT NULL,
    `emballageId` INTEGER NULL,
    `pointId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ExploitationChargeExploitation` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `pu` DOUBLE NOT NULL,
    `quantite` DOUBLE NOT NULL,
    `valeur` DOUBLE NOT NULL,
    `unite` VARCHAR(191) NOT NULL,
    `date` DATETIME(3) NOT NULL,
    `observation` VARCHAR(191) NOT NULL,
    `exploitationId` INTEGER NOT NULL,
    `chargeExploitationId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TypeUniteGrandeur` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `TypeUniteGrandeur_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UniteGrandeur` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `typeUniteGrandeurId` INTEGER NOT NULL,

    UNIQUE INDEX `UniteGrandeur_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SurUniteGrandeur` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `valeur_reference` DOUBLE NOT NULL,
    `uniteGrandeurId` INTEGER NOT NULL,

    UNIQUE INDEX `SurUniteGrandeur_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TypeEmballage` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `TypeEmballage_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Emballage` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `conditionnement` VARCHAR(191) NOT NULL,
    `quantite` DOUBLE NOT NULL,
    `pu` DOUBLE NOT NULL,
    `valeur` DOUBLE NOT NULL,
    `isActive` BOOLEAN NOT NULL,
    `isDefault` BOOLEAN NOT NULL,
    `produitId` INTEGER NOT NULL,
    `typeEmballageId` INTEGER NOT NULL,
    `uniteGrandeurId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Fournisseur` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `sigle` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `telephone` VARCHAR(191) NOT NULL,
    `adresse` VARCHAR(191) NOT NULL,
    `prenom_contact` VARCHAR(191) NOT NULL,
    `nom_contact` VARCHAR(191) NOT NULL,
    `email_contact` VARCHAR(191) NOT NULL,
    `telephone_contact` VARCHAR(191) NOT NULL,
    `societeId` INTEGER NOT NULL,

    UNIQUE INDEX `Fournisseur_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `EmballageIntrant` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `conditionnement` VARCHAR(191) NOT NULL,
    `quantite` DOUBLE NOT NULL,
    `pu` DOUBLE NOT NULL,
    `valeur` DOUBLE NOT NULL,
    `isActive` BOOLEAN NOT NULL,
    `isDefault` BOOLEAN NOT NULL,
    `chargeExploitationId` INTEGER NOT NULL,
    `typeEmballageId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TypeMouvementIntrant` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `TypeMouvementIntrant_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ModeEntreeSortieIntrant` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `code` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `typeMouvementIntrantId` INTEGER NOT NULL,

    UNIQUE INDEX `ModeEntreeSortieIntrant_code_key`(`code`),
    UNIQUE INDEX `ModeEntreeSortieIntrant_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MouvementIntrant` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `date` DATETIME(3) NOT NULL,
    `pu` DOUBLE NOT NULL,
    `quantiteEntreeEmballage` DOUBLE NOT NULL,
    `quantiteSortieEmballage` DOUBLE NOT NULL,
    `nombreUnite` DOUBLE NOT NULL,
    `valeur` DOUBLE NOT NULL,
    `lot` VARCHAR(191) NOT NULL DEFAULT '',
    `modeEntreeSortieIntrantId` INTEGER NOT NULL,
    `anneeId` INTEGER NOT NULL,
    `saisonId` INTEGER NOT NULL,
    `chargeExploitationId` INTEGER NULL,
    `emplacementId` INTEGER NOT NULL,
    `emplacementSourceId` INTEGER NOT NULL,
    `emplacementDestinationId` INTEGER NOT NULL,
    `opId` INTEGER NULL,
    `fournisseurId` INTEGER NULL,
    `emballageIntrantId` INTEGER NOT NULL,

    INDEX `MouvementIntrant_opId_fournisseurId_anneeId_saisonId_emplace_idx`(`opId`, `fournisseurId`, `anneeId`, `saisonId`, `emplacementId`, `chargeExploitationId`, `lot`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserZone` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `zoneId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserSousZone` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `sousZoneId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserLocalite` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `localiteId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserVillage` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `villageId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserPoint` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `pointId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserOp` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `opId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserAgence` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `agenceId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserSociete` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `societeId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_roleId_fkey` FOREIGN KEY (`roleId`) REFERENCES `Role`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Profile` ADD CONSTRAINT `Profile_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Comment` ADD CONSTRAINT `Comment_postId_fkey` FOREIGN KEY (`postId`) REFERENCES `Post`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Zone` ADD CONSTRAINT `Zone_paysId_fkey` FOREIGN KEY (`paysId`) REFERENCES `Pays`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SousZone` ADD CONSTRAINT `SousZone_zoneId_fkey` FOREIGN KEY (`zoneId`) REFERENCES `Zone`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Localite` ADD CONSTRAINT `Localite_sousZoneId_fkey` FOREIGN KEY (`sousZoneId`) REFERENCES `SousZone`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Region` ADD CONSTRAINT `Region_paysId_fkey` FOREIGN KEY (`paysId`) REFERENCES `Pays`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Departement` ADD CONSTRAINT `Departement_regionId_fkey` FOREIGN KEY (`regionId`) REFERENCES `Region`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Commune` ADD CONSTRAINT `Commune_departementId_fkey` FOREIGN KEY (`departementId`) REFERENCES `Departement`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Village` ADD CONSTRAINT `Village_communeId_fkey` FOREIGN KEY (`communeId`) REFERENCES `Commune`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Village` ADD CONSTRAINT `Village_localiteId_fkey` FOREIGN KEY (`localiteId`) REFERENCES `Localite`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Point` ADD CONSTRAINT `Point_localiteId_fkey` FOREIGN KEY (`localiteId`) REFERENCES `Localite`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PointAgence` ADD CONSTRAINT `PointAgence_pointId_fkey` FOREIGN KEY (`pointId`) REFERENCES `Point`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PointAgence` ADD CONSTRAINT `PointAgence_agenceId_fkey` FOREIGN KEY (`agenceId`) REFERENCES `Agence`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Entrepot` ADD CONSTRAINT `Entrepot_pointId_fkey` FOREIGN KEY (`pointId`) REFERENCES `Point`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Emplacement` ADD CONSTRAINT `Emplacement_familleEmplacementId_fkey` FOREIGN KEY (`familleEmplacementId`) REFERENCES `FamilleEmplacement`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Emplacement` ADD CONSTRAINT `Emplacement_entrepotId_fkey` FOREIGN KEY (`entrepotId`) REFERENCES `Entrepot`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ModeEntreeSortieStock` ADD CONSTRAINT `ModeEntreeSortieStock_typeMouvementStockId_fkey` FOREIGN KEY (`typeMouvementStockId`) REFERENCES `TypeMouvementStock`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MouvementStock` ADD CONSTRAINT `MouvementStock_opId_fkey` FOREIGN KEY (`opId`) REFERENCES `Op`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MouvementStock` ADD CONSTRAINT `MouvementStock_uniteTransformationId_fkey` FOREIGN KEY (`uniteTransformationId`) REFERENCES `UniteTransformation`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MouvementStock` ADD CONSTRAINT `MouvementStock_varieteId_fkey` FOREIGN KEY (`varieteId`) REFERENCES `Variete`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MouvementStock` ADD CONSTRAINT `MouvementStock_modeEntreeSortieStockId_fkey` FOREIGN KEY (`modeEntreeSortieStockId`) REFERENCES `ModeEntreeSortieStock`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MouvementStock` ADD CONSTRAINT `MouvementStock_anneeId_fkey` FOREIGN KEY (`anneeId`) REFERENCES `Annee`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MouvementStock` ADD CONSTRAINT `MouvementStock_saisonId_fkey` FOREIGN KEY (`saisonId`) REFERENCES `Saison`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MouvementStock` ADD CONSTRAINT `MouvementStock_emplacementId_fkey` FOREIGN KEY (`emplacementId`) REFERENCES `Emplacement`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MouvementStock` ADD CONSTRAINT `MouvementStock_emballageId_fkey` FOREIGN KEY (`emballageId`) REFERENCES `Emballage`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Op` ADD CONSTRAINT `Op_typeOpId_fkey` FOREIGN KEY (`typeOpId`) REFERENCES `TypeOp`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Op` ADD CONSTRAINT `Op_villageId_fkey` FOREIGN KEY (`villageId`) REFERENCES `Village`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Op` ADD CONSTRAINT `Op_localiteId_fkey` FOREIGN KEY (`localiteId`) REFERENCES `Localite`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Op` ADD CONSTRAINT `Op_pointId_fkey` FOREIGN KEY (`pointId`) REFERENCES `Point`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Producteur` ADD CONSTRAINT `Producteur_opId_fkey` FOREIGN KEY (`opId`) REFERENCES `Op`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Campagne` ADD CONSTRAINT `Campagne_anneeId_fkey` FOREIGN KEY (`anneeId`) REFERENCES `Annee`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Campagne` ADD CONSTRAINT `Campagne_saisonId_fkey` FOREIGN KEY (`saisonId`) REFERENCES `Saison`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Produit` ADD CONSTRAINT `Produit_filiereId_fkey` FOREIGN KEY (`filiereId`) REFERENCES `Filiere`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Produit` ADD CONSTRAINT `Produit_familleEmplacementId_fkey` FOREIGN KEY (`familleEmplacementId`) REFERENCES `FamilleEmplacement`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProduitChargeExploitation` ADD CONSTRAINT `ProduitChargeExploitation_produitId_fkey` FOREIGN KEY (`produitId`) REFERENCES `Produit`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProduitChargeExploitation` ADD CONSTRAINT `ProduitChargeExploitation_chargeExploitationId_fkey` FOREIGN KEY (`chargeExploitationId`) REFERENCES `ChargeExploitation`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Variete` ADD CONSTRAINT `Variete_produitId_fkey` FOREIGN KEY (`produitId`) REFERENCES `Produit`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TypeChargeExploitation` ADD CONSTRAINT `TypeChargeExploitation_familleTypeChargeExploitationId_fkey` FOREIGN KEY (`familleTypeChargeExploitationId`) REFERENCES `FamilleTypeChargeExploitation`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ChargeExploitation` ADD CONSTRAINT `ChargeExploitation_uniteGrandeurId_fkey` FOREIGN KEY (`uniteGrandeurId`) REFERENCES `UniteGrandeur`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ChargeExploitation` ADD CONSTRAINT `ChargeExploitation_typeChargeExploitationId_fkey` FOREIGN KEY (`typeChargeExploitationId`) REFERENCES `TypeChargeExploitation`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ChargeExploitation` ADD CONSTRAINT `ChargeExploitation_familleChargeExploitationId_fkey` FOREIGN KEY (`familleChargeExploitationId`) REFERENCES `FamilleChargeExploitation`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Exploitation` ADD CONSTRAINT `Exploitation_agenceId_fkey` FOREIGN KEY (`agenceId`) REFERENCES `Agence`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Exploitation` ADD CONSTRAINT `Exploitation_varieteId_fkey` FOREIGN KEY (`varieteId`) REFERENCES `Variete`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Exploitation` ADD CONSTRAINT `Exploitation_anneeId_fkey` FOREIGN KEY (`anneeId`) REFERENCES `Annee`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Exploitation` ADD CONSTRAINT `Exploitation_saisonId_fkey` FOREIGN KEY (`saisonId`) REFERENCES `Saison`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Exploitation` ADD CONSTRAINT `Exploitation_producteurId_fkey` FOREIGN KEY (`producteurId`) REFERENCES `Producteur`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Exploitation` ADD CONSTRAINT `Exploitation_opId_fkey` FOREIGN KEY (`opId`) REFERENCES `Op`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Recolte` ADD CONSTRAINT `Recolte_exploitationId_fkey` FOREIGN KEY (`exploitationId`) REFERENCES `Exploitation`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Recolte` ADD CONSTRAINT `Recolte_varieteId_fkey` FOREIGN KEY (`varieteId`) REFERENCES `Variete`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Recolte` ADD CONSTRAINT `Recolte_emballageId_fkey` FOREIGN KEY (`emballageId`) REFERENCES `Emballage`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Societe` ADD CONSTRAINT `Societe_typeSocieteId_fkey` FOREIGN KEY (`typeSocieteId`) REFERENCES `TypeSociete`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Agence` ADD CONSTRAINT `Agence_societeId_fkey` FOREIGN KEY (`societeId`) REFERENCES `Societe`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Credit` ADD CONSTRAINT `Credit_exploitationId_fkey` FOREIGN KEY (`exploitationId`) REFERENCES `Exploitation`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Remboursement` ADD CONSTRAINT `Remboursement_typeRemboursementId_fkey` FOREIGN KEY (`typeRemboursementId`) REFERENCES `TypeRemboursement`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Remboursement` ADD CONSTRAINT `Remboursement_exploitationId_fkey` FOREIGN KEY (`exploitationId`) REFERENCES `Exploitation`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Remboursement` ADD CONSTRAINT `Remboursement_emballageId_fkey` FOREIGN KEY (`emballageId`) REFERENCES `Emballage`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Remboursement` ADD CONSTRAINT `Remboursement_pointId_fkey` FOREIGN KEY (`pointId`) REFERENCES `Point`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ExploitationChargeExploitation` ADD CONSTRAINT `ExploitationChargeExploitation_exploitationId_fkey` FOREIGN KEY (`exploitationId`) REFERENCES `Exploitation`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ExploitationChargeExploitation` ADD CONSTRAINT `ExploitationChargeExploitation_chargeExploitationId_fkey` FOREIGN KEY (`chargeExploitationId`) REFERENCES `ChargeExploitation`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UniteGrandeur` ADD CONSTRAINT `UniteGrandeur_typeUniteGrandeurId_fkey` FOREIGN KEY (`typeUniteGrandeurId`) REFERENCES `TypeUniteGrandeur`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SurUniteGrandeur` ADD CONSTRAINT `SurUniteGrandeur_uniteGrandeurId_fkey` FOREIGN KEY (`uniteGrandeurId`) REFERENCES `UniteGrandeur`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Emballage` ADD CONSTRAINT `Emballage_produitId_fkey` FOREIGN KEY (`produitId`) REFERENCES `Produit`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Emballage` ADD CONSTRAINT `Emballage_typeEmballageId_fkey` FOREIGN KEY (`typeEmballageId`) REFERENCES `TypeEmballage`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Emballage` ADD CONSTRAINT `Emballage_uniteGrandeurId_fkey` FOREIGN KEY (`uniteGrandeurId`) REFERENCES `UniteGrandeur`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Fournisseur` ADD CONSTRAINT `Fournisseur_societeId_fkey` FOREIGN KEY (`societeId`) REFERENCES `Societe`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EmballageIntrant` ADD CONSTRAINT `EmballageIntrant_chargeExploitationId_fkey` FOREIGN KEY (`chargeExploitationId`) REFERENCES `ChargeExploitation`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EmballageIntrant` ADD CONSTRAINT `EmballageIntrant_typeEmballageId_fkey` FOREIGN KEY (`typeEmballageId`) REFERENCES `TypeEmballage`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ModeEntreeSortieIntrant` ADD CONSTRAINT `ModeEntreeSortieIntrant_typeMouvementIntrantId_fkey` FOREIGN KEY (`typeMouvementIntrantId`) REFERENCES `TypeMouvementIntrant`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MouvementIntrant` ADD CONSTRAINT `MouvementIntrant_modeEntreeSortieIntrantId_fkey` FOREIGN KEY (`modeEntreeSortieIntrantId`) REFERENCES `ModeEntreeSortieIntrant`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MouvementIntrant` ADD CONSTRAINT `MouvementIntrant_anneeId_fkey` FOREIGN KEY (`anneeId`) REFERENCES `Annee`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MouvementIntrant` ADD CONSTRAINT `MouvementIntrant_saisonId_fkey` FOREIGN KEY (`saisonId`) REFERENCES `Saison`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MouvementIntrant` ADD CONSTRAINT `MouvementIntrant_chargeExploitationId_fkey` FOREIGN KEY (`chargeExploitationId`) REFERENCES `ChargeExploitation`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MouvementIntrant` ADD CONSTRAINT `MouvementIntrant_emplacementId_fkey` FOREIGN KEY (`emplacementId`) REFERENCES `Emplacement`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MouvementIntrant` ADD CONSTRAINT `MouvementIntrant_emplacementSourceId_fkey` FOREIGN KEY (`emplacementSourceId`) REFERENCES `Emplacement`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MouvementIntrant` ADD CONSTRAINT `MouvementIntrant_emplacementDestinationId_fkey` FOREIGN KEY (`emplacementDestinationId`) REFERENCES `Emplacement`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MouvementIntrant` ADD CONSTRAINT `MouvementIntrant_opId_fkey` FOREIGN KEY (`opId`) REFERENCES `Op`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MouvementIntrant` ADD CONSTRAINT `MouvementIntrant_fournisseurId_fkey` FOREIGN KEY (`fournisseurId`) REFERENCES `Fournisseur`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MouvementIntrant` ADD CONSTRAINT `MouvementIntrant_emballageIntrantId_fkey` FOREIGN KEY (`emballageIntrantId`) REFERENCES `EmballageIntrant`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserZone` ADD CONSTRAINT `UserZone_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserZone` ADD CONSTRAINT `UserZone_zoneId_fkey` FOREIGN KEY (`zoneId`) REFERENCES `Zone`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserSousZone` ADD CONSTRAINT `UserSousZone_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserSousZone` ADD CONSTRAINT `UserSousZone_sousZoneId_fkey` FOREIGN KEY (`sousZoneId`) REFERENCES `SousZone`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserLocalite` ADD CONSTRAINT `UserLocalite_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserLocalite` ADD CONSTRAINT `UserLocalite_localiteId_fkey` FOREIGN KEY (`localiteId`) REFERENCES `Localite`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserVillage` ADD CONSTRAINT `UserVillage_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserVillage` ADD CONSTRAINT `UserVillage_villageId_fkey` FOREIGN KEY (`villageId`) REFERENCES `Village`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserPoint` ADD CONSTRAINT `UserPoint_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserPoint` ADD CONSTRAINT `UserPoint_pointId_fkey` FOREIGN KEY (`pointId`) REFERENCES `Point`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserOp` ADD CONSTRAINT `UserOp_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserOp` ADD CONSTRAINT `UserOp_opId_fkey` FOREIGN KEY (`opId`) REFERENCES `Op`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserAgence` ADD CONSTRAINT `UserAgence_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserAgence` ADD CONSTRAINT `UserAgence_agenceId_fkey` FOREIGN KEY (`agenceId`) REFERENCES `Agence`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserSociete` ADD CONSTRAINT `UserSociete_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserSociete` ADD CONSTRAINT `UserSociete_societeId_fkey` FOREIGN KEY (`societeId`) REFERENCES `Societe`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
