import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

// Instantiate Prisma Client
const prisma = new PrismaClient();

// A `main` function so that we can use async/await
async function main() {
  // ... your Prisma Client goes here
  await deleteCredit();
  await deleteExploitation();
  await deletePermission();
  await deleteOp();
  await deleteLocalite();
  await deleteUniteTransformation();
  await deleteMouvementStock();
  await deleteRoleUserProfile();
  await deleteFiliere();
  await deleteEmballage();
  await deleteConstants();

  await addConstants();
  await addRoleUserProfile();
  await addLocalite();
  await addFiliere();
  await addEmballage();
  await addExploitation();
  
}

async function deleteCredit() {
  console.log(' -----------DELETE REMBOURSEMENT -----------');
  await prisma.remboursement.deleteMany({});
  console.log(' remboursement deleted');

  console.log(' -----------DELETE TYPE REMBOURSEMENT -----------');
  await prisma.typeRemboursement.deleteMany({});
  console.log(' type remboursement deleted');

  console.log(' -----------DELETE CREDIT -----------');
  await prisma.credit.deleteMany({});
  console.log(' credit deleted');

  console.log(' -----------DELETE POINT AGENCES -----------');
  await prisma.pointAgence.deleteMany({});
  console.log(' point agence deleted');

  console.log(' -----------DELETE AGENCE -----------');
  await prisma.agence.deleteMany({});
  console.log(' agence deleted');

  console.log(' -----------DELETE SOCIETE -----------');
  await prisma.societe.deleteMany({});
  console.log(' societe deleted');

  console.log(' -----------DELETE TYPE SOCIETE-----------');
  await prisma.typeSociete.deleteMany({});
  console.log(' type societe deleted');

  console.log(' -----------DELETE RECOLTE -----------');
  await prisma.recolte.deleteMany({});
  console.log(' recolte deleted');
}
async function deleteExploitation() {
  console.log(' -----------DELETE EXPLOITATION -----------');
  await prisma.exploitation.deleteMany({});
  console.log(' exploitation deleted');
  console.log(' -----------DELETE FAMILLE CHARGE EXPLOITATION -----------');
  await prisma.familleChargeExploitation.deleteMany({});
  console.log(' famille charge exploitation deleted');
  console.log(' -----------DELETE TYPE CHARGE EXPLOITATION -----------');
  await prisma.typeChargeExploitation.deleteMany({});
  console.log(' type charge exploitation deleted');
  console.log(
    ' -----------DELETE FAMILLE TYPE CHARGE EXPLOITATION -----------',
  );
  await prisma.familleTypeChargeExploitation.deleteMany({});
  console.log(' famille type charge exploitation deleted');
}
async function deleteConstants() {
  console.log(' -----------DELETE ANNEE -----------');
  await prisma.annee.deleteMany({});
  console.log(' annee deleted');
  console.log(' -----------DELETE SAISON -----------');
  await prisma.saison.deleteMany({});
  console.log(' saison deleted');

  console.log(' -----------DELETE CAMPAGNE -----------');
  await prisma.campagne.deleteMany({});
  console.log(' campagne deleted');

  console.log(' -----------DELETE MOUVEMENT STOCK -----------');
  await prisma.modeEntreeSortieStock.deleteMany({});
  console.log(' mode entre sortie deleted');

  await prisma.typeMouvementStock.deleteMany({});
  console.log(' type mouvement deleted');

  console.log(' -----------DELETE MOUVEMENT INTRANT -----------');
  await prisma.modeEntreeSortieIntrant.deleteMany({});
  console.log(' mode entre sortie intrant deleted');

  await prisma.typeMouvementIntrant.deleteMany({});
  console.log(' type mouvement intrant deleted');

  await prisma.societe.deleteMany({});
  console.log(' societe deleted');
}
async function deleteEmballage() {
  console.log(' -----------DELETE TYPE EMBALLAGE -----------');
  await prisma.typeEmballage.deleteMany({});
  console.log(' type emballage deleted');
  console.log(' -----------DELETE TYPE UNITE GRANDEUR -----------');
  await prisma.typeUniteGrandeur.deleteMany({});
  console.log(' type unite grandeur deleted');
  await prisma.uniteGrandeur.deleteMany({});
  console.log(' unite grandeur deleted');
  await prisma.emballage.deleteMany({});
  console.log(' emballage deleted');
}
async function deleteFiliere() {
  console.log(' -----------DELETE VARIETE -----------');
  await prisma.variete.deleteMany({});
  console.log(' variete deleted');
  console.log(' -----------DELETE PRODUIT -----------');
  await prisma.produit.deleteMany({});
  console.log(' produit deleted');
  console.log(' -----------DELETE FILIERE -----------');
  await prisma.filiere.deleteMany({});
  console.log(' filiere deleted');
  console.log(' -----------DELETE FAMILLE EMPLACEMENT -----------');
  await prisma.familleEmplacement.deleteMany({});
  console.log(' famille emplacement deleted');
}
async function deletePermission() {
  console.log(' -----------DELETE PERMISSION -----------');

  await prisma.userZone.deleteMany({});
  console.log(' userZone deleted');

  await prisma.sousZone.deleteMany({});
  console.log(' sousZone deleted');

  await prisma.userLocalite.deleteMany({});
  console.log(' UserLocalite deleted');

  await prisma.userVillage.deleteMany({});
  console.log(' userVillage deleted');

  await prisma.userPoint.deleteMany({});
  console.log(' userPoint deleted');
}
async function deleteOp() {
  console.log(' -----------DELETE OP -----------');
  await prisma.producteur.deleteMany({});
  console.log(' producteur deleted');

  await prisma.op.deleteMany({});
  console.log(' op deleted');

  await prisma.point.deleteMany({});
  console.log(' point deleted');

  await prisma.typeOp.deleteMany({});
  console.log(' type op deleted');
}
async function deleteUniteTransformation() {
  console.log(' -----------DELETE UNITE TRANSFORMATION -----------');
  await prisma.uniteTransformation.deleteMany({});
  console.log(' unite transformation deleted');
}
async function deleteMouvementStock() {
  console.log(' -----------DELETE MOUVEMENT STOCK -----------');
  await prisma.mouvementStock.deleteMany({});
  console.log(' unite mouvement stock deleted');

  await prisma.emplacement.deleteMany({});
  console.log(' unite emplacement deleted');

  await prisma.entrepot.deleteMany({});
  console.log(' unite entrepot deleted');
}
async function deleteLocalite() {
  console.log(' -----------DELETE LOCALITES -----------');

  await prisma.village.deleteMany({});
  console.log(' village deleted');

  await prisma.localite.deleteMany({});
  console.log(' localite deleted');

  await prisma.sousZone.deleteMany({});
  console.log(' sous zone deleted');

  await prisma.zone.deleteMany({});
  console.log(' zone deleted');

  await prisma.pays.deleteMany({});
  console.log(' pays deleted');
}
async function deleteRoleUserProfile() {
  console.log(' -----------DELETE USER -----------');
  await prisma.profile.deleteMany({});
  console.log(' profile deleted');

  await prisma.user.deleteMany({});
  console.log(' user deleted');

  await prisma.role.deleteMany({});
  console.log(' role deleted');
}

async function addFiliere() {
  console.log(' ----------- ADD FILIERE -----------');
  console.log(' add filiere: RIZ');
  const filiere_riz = await prisma.filiere.create({
    data: {
      name: 'RIZ',
    },
  });
  console.log(' add produit: RIZ PADDY');
  const produit_riz_paddy = await prisma.produit.create({
    data: {
      name: 'RIZ PADDY',
      //"isRecolte": true,
      isDerive: false,
      isEnsachage: false,
      isActive: true,
      filiereId: filiere_riz.id,
      familleEmplacementId: 1,
    },
  });
  console.log(' add variete: SAHEL 108');
  const variete_sahel_108 = await prisma.variete.create({
    data: {
      name: 'SAHEL 108',
      surface_unite: 'HA',
      quantite_unite: 'TONNE',
      pu_unite: 125,
      rendement_unite: 10,
      isActive: true,
      produitId: produit_riz_paddy.id,
    },
  });
  console.log(' add variete: SAHEL 134');
  const variete_sahel_134 = await prisma.variete.create({
    data: {
      name: 'SAHEL 134',
      surface_unite: 'HA',
      quantite_unite: 'TONNE',
      pu_unite: 130,
      rendement_unite: 8,
      isActive: true,
      produitId: produit_riz_paddy.id,
    },
  });
  console.log(' add variete: SAHEL 177');
  const variete_sahel_177 = await prisma.variete.create({
    data: {
      name: 'SAHEL 177',
      surface_unite: 'HA',
      quantite_unite: 'TONNE',
      pu_unite: 135,
      rendement_unite: 6,
      isActive: true,
      produitId: produit_riz_paddy.id,
    },
  });

  console.log(' add produit: RIZ BLANC');
  const produit_riz_blanc = await prisma.produit.create({
    data: {
      name: 'RIZ BLANC',
      //"isRecolte": false,
      isDerive: true,
      isEnsachage: false,
      isActive: true,
      filiereId: filiere_riz.id,
      familleEmplacementId: 2,
    },
  });

  console.log(' add filiere: ARACHIDE');
  const filiere_arachide = await prisma.filiere.create({
    data: {
      name: 'ARACHIDE',
    },
  });
  console.log(' add produit: ARACHIDE COQUE');
  const produit_arachide_coque = await prisma.produit.create({
    data: {
      name: 'ARACHIDE COQUE',
      //"isRecolte": true,
      isDerive: false,
      isEnsachage: false,
      isActive: true,
      filiereId: filiere_arachide.id,
      familleEmplacementId: 1,
    },
  });
  console.log(' add variete: 55-437');
  const variete_55_437 = await prisma.variete.create({
    data: {
      name: '55-437',
      surface_unite: 'HA',
      quantite_unite: 'TONNE',
      pu_unite: 250,
      rendement_unite: 6,
      isActive: true,
      produitId: produit_arachide_coque.id,
    },
  });
  console.log(' add variete: GC 8-35');
  const variete_gc_8_35 = await prisma.variete.create({
    data: {
      name: 'GC 8-35',
      surface_unite: 'HA',
      quantite_unite: 'TONNE',
      pu_unite: 280,
      rendement_unite: 8,
      isActive: true,
      produitId: produit_arachide_coque.id,
    },
  });
  console.log(' add variete: 73-33');
  const variete_73_33 = await prisma.variete.create({
    data: {
      name: '73-33',
      surface_unite: 'HA',
      quantite_unite: 'TONNE',
      pu_unite: 255,
      rendement_unite: 8,
      isActive: true,
      produitId: produit_arachide_coque.id,
    },
  });
  console.log(' add produit: ARACHIDE TRANSFORME');
  const produit_arachide_transforme = await prisma.produit.create({
    data: {
      name: 'ARACHIDE TRANSFORME',
      //"isRecolte": false,
      isDerive: false,
      isEnsachage: false,
      isActive: true,
      filiereId: filiere_arachide.id,
      familleEmplacementId: 2,
    },
  });

  console.log(' add filiere: HORTICULTURE');
  const filiere_horticulture = await prisma.filiere.create({
    data: {
      name: 'HORTICULTURE',
    },
  });
  console.log(' add produit: OIGON');
  const produit_oigon = await prisma.produit.create({
    data: {
      name: 'OIGON',
      //"isRecolte": true,
      isDerive: false,
      isEnsachage: false,
      isActive: true,
      filiereId: filiere_horticulture.id,
      familleEmplacementId: 1,
    },
  });
  console.log(' add produit: POMME DE TERRE');
  const produit_pomme_terre = await prisma.produit.create({
    data: {
      name: 'POMME DE TERRE',
      //"isRecolte": true,
      isDerive: false,
      isEnsachage: false,
      isActive: true,
      filiereId: filiere_horticulture.id,
      familleEmplacementId: 1,
    },
  });
  console.log(' ----------- ADD FILIERE -----------');
  console.log(' add filiere: MAIS');
  const filiere_mais = await prisma.filiere.create({
    data: {
      name: 'MAIS',
    },
  });
  console.log(' ----------- ADD FILIERE -----------');
  console.log(' add filiere: NIEBE');
  const filiere_niebe = await prisma.filiere.create({
    data: {
      name: 'NIEBE',
    },
  });
  console.log(' ----------- ADD FILIERE -----------');
  console.log(' add filiere: SESAME');
  const filiere_sesame = await prisma.filiere.create({
    data: {
      name: 'SESAME',
    },
  });
  console.log(' ----------- ADD FILIERE -----------');
  console.log(' add filiere: SORGHO');
  const filiere_sorgho = await prisma.filiere.create({
    data: {
      name: 'SORGHO',
    },
  });
  console.log(' ----------- ADD FILIERE -----------');
  console.log(' add filiere: FONIO');
  const filiere_fonio = await prisma.filiere.create({
    data: {
      name: 'FONIO',
    },
  });
}
async function addConstants() {
  console.log(' ----------- FAMILLE EMPLACEMENT -----------');
  console.log(' add famile emplacement: BRUT');
  const famille_emplacement_brut = await prisma.familleEmplacement.create({
    data: {
      name: 'BRUT',
    },
  });
  console.log(' add famile emplacement: TRANSFORME');
  const famille_emplacement_transforme = await prisma.familleEmplacement.create(
    {
      data: {
        name: 'TRANSFORME',
      },
    },
  );
  console.log(' add famile emplacement: INTRANT');
  const famille_emplacement_intrant = await prisma.familleEmplacement.create({
    data: {
      name: 'INTRANT',
    },
  });
  console.log(' ----------- ADD ANNEES -----------');

  let valeur: number = 2020;
  let duree: number = 21;
  for (let i = 0; i < duree; i++) {
    await prisma.annee.create({
      data: {
        id: i + 20,
        name: valeur.toString(),
        valeur: valeur,
      },
    });
    valeur++;
  }
  console.log(' -----> add annee: ' + (duree - 1).toString());
  console.log(' ----------- ADD SAISON -----------');

  console.log(' add saison: Hivernage');
  const saison_hiv = await prisma.saison.create({
    data: {
      name: 'HIV',
      description: 'Hivernage',
    },
  });

  console.log(' add saison: Contre Saison Chaude ');
  const saison_csc = await prisma.saison.create({
    data: {
      name: 'CSC',
      description: 'Contre Saison Chaude',
    },
  });

  console.log(' add saison: Contre Saison Froide ');
  const saison_csf = await prisma.saison.create({
    data: {
      name: 'CSF',
      description: 'Contre Saison Froide',
    },
  });

  console.log(' add campagne: 2020 || HIV ');
  const campagne_2020_hiv = await prisma.campagne.create({
    data: {
      anneeId: 20,
      saisonId: 1,
    },
  });

  console.log(' ----------- TYPE SOCIETE-----------');
  console.log(' add type societe: MINISTERE');
  const type_societe_ministere = await prisma.typeSociete.create({
    data: {
      name: 'MINISTERE',
    },
  });
  const type_societe_banque = await prisma.typeSociete.create({
    data: {
      name: 'BANQUE',
    },
  });

  console.log(' ----------- SOCIETE  -----------');
  console.log(' add  societe: MINISTERE');
  const societe_ministere = await prisma.societe.create({
    data: {
      name: 'Ministere Agriculture',
      sigle: 'MASAE',
      email: 'masae@example.com',
      telephone: '01 23 45 67 89',
      adresse: 'Rue Assane Ndoye, 97300 Dakar',
      typeSocieteId: type_societe_ministere.id,
    },
  });

  console.log(' add societe: LBA');
  const societe_lba = await prisma.societe.create({
    data: {
      name: 'La Banque Agricole',
      sigle: 'LBA',
      email: 'lba@example.com',
      telephone: '01 23 45 67 89',
      adresse: 'Rue de la Banque Agricole, 97300 Saint-Louis',
      typeSocieteId: type_societe_banque.id,
    },
  });

  console.log(' ----------- FOURNISSEUR  -----------');
  console.log(' add  fournisseur: agrofitex');
  const fournisseur_agrofitex = await prisma.fournisseur.create({
    data: {
      name: 'AGOFITEX',
      sigle: 'AGOFITEX',
      email: 'agrofitex@example.com',
      telephone: '01 23 45 67 89',
      adresse: 'Rue de la Banque Agricole, 97300 Saint-Louis',
      prenom_contact: 'Ibrahima',
      nom_contact: 'CAMARA',
      email_contact: 'agrofitex@gmx.fr',
      telephone_contact: '01 23 45 67 89',
      societeId: societe_ministere.id,
    },
  });
  console.log(' add  fournisseur: top mountain');
  const fournisseur_topmountain = await prisma.fournisseur.create({
    data: {
      name: 'Top Mountain',
      sigle: 'TM',
      email: 'topmountain@example.com',
      telephone: '01 23 45 67 89',
      adresse: 'Rue de la Banque Agricole, 97300 Saint-Louis',
      prenom_contact: 'Ibrahima',
      nom_contact: 'CAMARA',
      email_contact: 'topmountain@gmx.fr',
      telephone_contact: '01 23 45 67 89',
      societeId: societe_ministere.id,
    },
  });
  console.log(' add  fournisseur: fiaya');
  const fournisseur_fiaya = await prisma.fournisseur.create({
    data: {
      name: 'Fiaya-Agricole',
      sigle: 'FA',
      email: 'fiaya@example.com',
      telephone: '01 23 45 67 89',
      adresse: 'Rue de la Banque Agricole, 97300 Saint-Louis',
      prenom_contact: 'Ibrahima',
      nom_contact: 'CAMARA',
      email_contact: 'fiaya@gmx.fr',
      telephone_contact: '01 23 45 67 89',
      societeId: societe_ministere.id,
    },
  });
  console.log(' add  fournisseur: emc');
  const fournisseur_emc = await prisma.fournisseur.create({
    data: {
      name: 'EMC',
      sigle: 'EMC',
      email: 'emc@example.com',
      telephone: '01 23 45 67 89',
      adresse: 'Rue de la Banque Agricole, 97300 Saint-Louis',
      prenom_contact: 'Ibrahima',
      nom_contact: 'CAMARA',
      email_contact: 'emc@gmx.fr',
      telephone_contact: '01 23 45 67 89',
      societeId: societe_ministere.id,
    },
  });
  console.log(' add  fournisseur: dioubo');
  const fournisseur_dioubo = await prisma.fournisseur.create({
    data: {
      name: 'Dioubo Sarl',
      sigle: 'DIOUBO',
      email: 'dioubo@example.com',
      telephone: '01 23 45 67 89',
      adresse: 'Rue de la Banque Agricole, 97300 Saint-Louis',
      prenom_contact: 'Ibrahima',
      nom_contact: 'CAMARA',
      email_contact: 'dioubo@gmx.fr',
      telephone_contact: '01 23 45 67 89',
      societeId: societe_ministere.id,
    },
  });

  console.log(' add  fournisseur: dioubo');
  const fournisseur_cigogne = await prisma.fournisseur.create({
    data: {
      name: 'La Cigogne',
      sigle: 'LC',
      email: 'cigogne@example.com',
      telephone: '01 23 45 67 89',
      adresse: 'Rue de la Banque Agricole, 97300 Saint-Louis',
      prenom_contact: 'Ibrahima',
      nom_contact: 'CAMARA',
      email_contact: 'cigogne@gmx.fr',
      telephone_contact: '01 23 45 67 89',
      societeId: societe_ministere.id,
    },
  });

  console.log(' add  fournisseur: amafrique');
  const fournisseur_amafrique = await prisma.fournisseur.create({
    data: {
      name: 'Amafrique',
      sigle: 'AF',
      email: 'amafrique@example.com',
      telephone: '01 23 45 67 89',
      adresse: 'Rue de la Banque Agricole, 97300 Saint-Louis',
      prenom_contact: 'Ibrahima',
      nom_contact: 'CAMARA',
      email_contact: 'amafrique@gmx.fr',
      telephone_contact: '01 23 45 67 89',
      societeId: societe_ministere.id,
    },
  });

  console.log(' add  fournisseur: rgs');
  const fournisseur_rgs = await prisma.fournisseur.create({
    data: {
      name: 'Regard Global Services',
      sigle: 'RGS',
      email: 'rgs@example.com',
      telephone: '01 23 45 67 89',
      adresse: 'Rue de la Banque Agricole, 97300 Saint-Louis',
      prenom_contact: 'Ibrahima',
      nom_contact: 'CAMARA',
      email_contact: 'rgs@gmx.fr',
      telephone_contact: '01 23 45 67 89',
      societeId: societe_ministere.id,
    },
  });

  console.log(' add  fournisseur: dioubo');
  const fournisseur_spia = await prisma.fournisseur.create({
    data: {
      name: 'Société de produits industriels et agricoles',
      sigle: 'SPIA',
      email: 'spia@example.com',
      telephone: '01 23 45 67 89',
      adresse: 'Rue de la Banque Agricole, 97300 Saint-Louis',
      prenom_contact: 'Ibrahima',
      nom_contact: 'CAMARA',
      email_contact: 'spia@gmx.fr',
      telephone_contact: '01 23 45 67 89',
      societeId: societe_ministere.id,
    },
  });

  console.log(' add  fournisseur: rmg');
  const fournisseur_rmg = await prisma.fournisseur.create({
    data: {
      name: 'RMG Sénégal SA',
      sigle: 'RMA',
      email: 'rma@example.com',
      telephone: '01 23 45 67 89',
      adresse: 'Rue de la Banque Agricole, 97300 Saint-Louis',
      prenom_contact: 'Ibrahima',
      nom_contact: 'CAMARA',
      email_contact: 'rma@gmx.fr',
      telephone_contact: '01 23 45 67 89',
      societeId: societe_ministere.id,
    },
  });

  console.log(' add agence: LBA SAINT LOUIS');
  const agence_lba_saint_louis = await prisma.agence.create({
    data: {
      name: 'LBA Saint-Louis',
      sigle: 'LBASL',
      societeId: societe_lba.id,
    },
  });

  console.log(' add agence : LBA ROSS BETHIO');
  const agence_lba_ross_bethio = await prisma.agence.create({
    data: {
      name: 'LBA Ross Bethio',
      sigle: 'LBARB',
      societeId: societe_lba.id,
    },
  });

  console.log(' add agence: LBA RICHARD TOLL');
  const agence_lba_richard_toll = await prisma.agence.create({
    data: {
      name: 'LBA Richard Toll',
      sigle: 'LBART',
      societeId: societe_lba.id,
    },
  });

  console.log(' add agence: LBA PODOR');
  const agence_lba_podor = await prisma.agence.create({
    data: {
      name: 'LBA PODOR',
      sigle: 'LBAPO',
      societeId: societe_lba.id,
    },
  });

  console.log(' add agence : LBA OUROSSOGUY');
  const agence_lba_ourossoguy = await prisma.agence.create({
    data: {
      name: 'LBA OUROSSOGUY',
      sigle: 'LBAOR',
      societeId: societe_lba.id,
    },
  });

  console.log(' add agence : LBA MATAM');
  const agence_lba_matam = await prisma.agence.create({
    data: {
      name: 'LBA Matam',
      sigle: 'LBAMT',
      societeId: societe_lba.id,
    },
  });

  console.log(' add  societe: BHS');
  const societe_bhs = await prisma.societe.create({
    data: {
      name: "Banque de l'Habitat du Sénégal",
      sigle: 'BHS',
      email: 'lba@example.com',
      telephone: '01 23 45 67 89',
      adresse: 'Rue de la Banque Agricole, 97300 Saint-Louis',
      typeSocieteId: type_societe_banque.id,
    },
  });

  console.log(' ----------- TYPE REMBOURSEMENT -----------');
  console.log(' add type remboursement: NATURE');
  const type_remboursement_nature = await prisma.typeRemboursement.create({
    data: {
      name: 'NATURE',
    },
  });

  console.log(' ----------- TYPE REMBOURSEMENT -----------');
  console.log(' add type remboursement: ESPECE');
  const type_remboursement_espece = await prisma.typeRemboursement.create({
    data: {
      name: 'ESPECE',
    },
  });

  console.log(' ----------- ADD TYPE MOUVEMENT STOCK -----------');
  console.log(' add type mouvement stock: ENTRE');
  const type_mouvement_stock_entree = await prisma.typeMouvementStock.create({
    data: {
      name: 'entree',
    },
  });

  console.log(' add type mouvement stock: SORTIE');
  const type_mouvement_stock_sortie = await prisma.typeMouvementStock.create({
    data: {
      name: 'sortie',
    },
  });

  console.log(' ----------- ADD MODE ENTREE SORTIE STOCK -----------');
  console.log(' add mode entree sortie stock:  ENTREE REMBOURSEMENT');
  const mode_entree_sortie_stock_entree_remboursement =
    await prisma.modeEntreeSortieStock.create({
      data: {
        code: 'e_remboursement',
        name: 'Remboursement',
        typeMouvementStockId: type_mouvement_stock_entree.id,
      },
    });

  console.log(' add mode entree sortie stock:  ENTREE ENLEVELENT');
  const mode_entree_sortie_stock_entree_enlevement =
    await prisma.modeEntreeSortieStock.create({
      data: {
        code: 's_enlevement',
        name: 'Enlevement',
        typeMouvementStockId: type_mouvement_stock_sortie.id,
      },
    });

  console.log(' ----------- ADD TYPE MOUVEMENT INTRANT -----------');
  console.log(' add type mouvement intrant: ENTRE');
  const type_mouvement_intrant_entree =
    await prisma.typeMouvementIntrant.create({
      data: {
        name: 'entree',
      },
    });

  console.log(' add type mouvement intrant: SORTIE');
  const type_mouvement_intrant_sortie =
    await prisma.typeMouvementIntrant.create({
      data: {
        name: 'sortie',
      },
    });

  console.log(' ----------- ADD MODE ENTREE SORTIE INTRANT -----------');
  console.log(' add mode entree sortie intrant:  ENTREE ACHAT');
  const mode_entree_sortie_intrant_entree_achat =
    await prisma.modeEntreeSortieIntrant.create({
      data: {
        code: '11',
        name: 'Achat',
        typeMouvementIntrantId: type_mouvement_intrant_entree.id,
      },
    });

  console.log(' add mode entree sortie intrant:  ENTREE TRANSFERT');
  const mode_entree_sortie_intrant_entree_transfert =
    await prisma.modeEntreeSortieIntrant.create({
      data: {
        code: '12',
        name: 'Transfert (Entree)',
        typeMouvementIntrantId: type_mouvement_intrant_entree.id,
      },
    });

  console.log(' add mode entree sortie intrant:  ENTREE RETOUR SUBVENTION');
  const mode_entree_sortie_intrant_entree_retour_subvention =
    await prisma.modeEntreeSortieIntrant.create({
      data: {
        code: '13',
        name: 'Retour Subvention',
        typeMouvementIntrantId: type_mouvement_intrant_entree.id,
      },
    });

  console.log(' add mode entree sortie intrant:  SORTIE SUBVENTION');
  const mode_entree_sortie_intrant_sortie_subvention =
    await prisma.modeEntreeSortieIntrant.create({
      data: {
        code: '21',
        name: 'Subvention',
        typeMouvementIntrantId: type_mouvement_intrant_sortie.id,
      },
    });
  console.log(' add mode entree sortie intrant:  SORTIE TRANSFERT');
  const mode_entree_sortie_intrant_sortie_transfert =
    await prisma.modeEntreeSortieIntrant.create({
      data: {
        code: '22',
        name: 'Transfert (Sortie)',
        typeMouvementIntrantId: type_mouvement_intrant_sortie.id,
      },
    });

  console.log(' add mode entree sortie intrant:  SORTIE RETOUR ACHAT');
  const mode_entree_sortie_intrant_sortie_retour_achat =
    await prisma.modeEntreeSortieIntrant.create({
      data: {
        code: '23',
        name: 'Retour Achat',
        typeMouvementIntrantId: type_mouvement_intrant_sortie.id,
      },
    });

  console.log(' add mode entree sortie intrant:  SORTIE REBUT');
  const mode_entree_sortie_intrant_sortie_rebut =
    await prisma.modeEntreeSortieIntrant.create({
      data: {
        code: '24',
        name: 'Rebut',
        typeMouvementIntrantId: type_mouvement_intrant_sortie.id,
      },
    });
}

async function addRoleUserProfile() {
  const hash = await bcrypt.hash('123456', 10);
  console.log(' ----------- ADD ROLES -----------');
  // CREATION DES ROLES
  // ADD ROLE ADMIN
  console.log(' add role: Admin');
  const role_admin = await prisma.role.create({
    data: {
      name: 'Admin',
    },
  });
  console.log(' -----> add user: user_iba_gmx_fr');
  const user_iba_gmx_fr = await prisma.user.create({
    data: {
      username: 'iba',
      email: 'iba@gmx.fr',
      password: hash,
      roleId: role_admin.id,
    },
  });
  console.log(' -----> add profile: user_iba_gmx_fr');
  const profile_iba_gmx_fr = await prisma.profile.create({
    data: {
      firstName: 'Ibrahima',
      lastName: 'CAMARA',
      address: 'Sud, Saint-Louis',
      phone: '0123456789',
      userId: user_iba_gmx_fr.id,
    },
  });

  // ADD SOCIETE
  console.log(' add role: Societe');
  const role_societe = await prisma.role.create({
    data: {
      name: 'Societe',
    },
  });

  // ADD ROLE AGENCE
  console.log(' add role: Agence');
  const role_agence = await prisma.role.create({
    data: {
      name: 'Agence',
    },
  });

  // ADD ROLE ZONE
  console.log(' add role: Zone');
  const role_zone = await prisma.role.create({
    data: {
      name: 'Zone',
    },
  });
  // ADD ROLE SOUS ZONE
  console.log(' add role: Sous Zone');
  const role_sous_zone = await prisma.role.create({
    data: {
      name: 'Sous Zone',
    },
  });

  // ADD ROLE LOCALITE
  console.log(' -----> add role: Localite');
  const role_localite = await prisma.role.create({
    data: {
      name: 'Localite',
    },
  });
  // ADD POINT
  console.log(' -----> add role: Point');
  const role_point = await prisma.role.create({
    data: {
      name: 'Point',
    },
  });

  // ADD ROLE OP
  console.log(' -----> add role: Op');
  const role_op = await prisma.role.create({
    data: {
      name: 'Op',
    },
  });

  console.log(' -----> add user: user_mailck_gmx_fr');
  const user_malick_gmx_fr = await prisma.user.create({
    data: {
      username: 'malick',
      email: 'malick@gmx.fr',
      password: hash,
      roleId: role_societe.id,
    },
  });

  console.log(' -----> add profile: user_malick_gmx_fr');
  const profile_malick_gmx_fr = await prisma.profile.create({
    data: {
      firstName: 'Malick',
      lastName: 'NDIAYE',
      address: 'Sud, Saint-Louis',
      phone: '0123456789',
      userId: user_malick_gmx_fr.id,
    },
  });

  console.log(' -----> add user: user_ousmane_gmx_fr');
  const user_ousmane_gmx_fr = await prisma.user.create({
    data: {
      username: 'ousmane',
      email: 'ousmane@gmx.fr',
      password: hash,
      roleId: role_societe.id,
    },
  });

  console.log(' -----> add profile: user_ousmane_gmx_fr');
  const profile_ousmane_gmx_fr = await prisma.profile.create({
    data: {
      firstName: 'Ousmane',
      lastName: 'GUISSEE',
      address: 'Sud, Saint-Louis',
      phone: '0123456789',
      userId: user_ousmane_gmx_fr.id,
    },
  });

  console.log(' -----> add user: user_jules_gmx_fr');
  const user_jules_gmx_fr = await prisma.user.create({
    data: {
      username: 'jules',
      email: 'jules@gmx.fr',
      password: hash,
      roleId: role_agence.id,
    },
  });
  console.log(' -----> add profile: user_iba_gmx_fr');
  const profile_jules_gmx_fr = await prisma.profile.create({
    data: {
      firstName: 'Souleymane',
      lastName: 'DIAGNE',
      address: 'Sud, Saint-Louis',
      phone: '0123456789',
      userId: user_jules_gmx_fr.id,
    },
  });

  console.log(' -----> add user: user_massaer_gmx_fr');
  const user_massaer_gmx_fr = await prisma.user.create({
    data: {
      username: 'massaer',
      email: 'massaer@gmx.fr',
      password: hash,
      roleId: role_agence.id,
    },
  });
  console.log(' -----> add profile: user_massaer_gmx_fr');
  const profile_massaer_gmx_fr = await prisma.profile.create({
    data: {
      firstName: 'Massaer',
      lastName: 'DIOP',
      address: 'Sud, Saint-Louis',
      phone: '0123456789',
      userId: user_massaer_gmx_fr.id,
    },
  });

  console.log(' -----> add user: user_khalifa_gmx_fr');
  const user_khalifa_gmx_fr = await prisma.user.create({
    data: {
      username: 'khalifa',
      email: 'khalifa@gmx.fr',
      password: hash,
      roleId: role_agence.id,
    },
  });
  console.log(' -----> add profile: user_khalifa_gmx_fr');
  const profile_khalifa_gmx_fr = await prisma.profile.create({
    data: {
      firstName: 'Khalifa',
      lastName: 'DIOP',
      address: 'Sud, Saint-Louis',
      phone: '0123456789',
      userId: user_khalifa_gmx_fr.id,
    },
  });

  console.log(' -----> add user: user_cheikh_gmx_fr');
  const user_cheikh_gmx_fr = await prisma.user.create({
    data: {
      username: 'cheikh',
      email: 'cheikh@gmx.fr',
      password: hash,
      roleId: role_agence.id,
    },
  });
  console.log(' -----> add profile: user_cheikh_gmx_fr');
  const profile_cheikh_gmx_fr = await prisma.profile.create({
    data: {
      firstName: 'Cheikh',
      lastName: 'NDIAYE',
      address: 'Sud, Saint-Louis',
      phone: '0123456789',
      userId: user_cheikh_gmx_fr.id,
    },
  });

  console.log(' -----> add user: user_aby_gmx_fr');
  const user_aby_gmx_fr = await prisma.user.create({
    data: {
      username: 'aby',
      email: 'aby@gmx.fr',
      password: hash,
      roleId: role_zone.id,
    },
  });
  console.log(' -----> add profile: user_aby_gmx_fr');
  const profile_aby_gmx_fr = await prisma.profile.create({
    data: {
      firstName: 'Aby',
      lastName: 'CAMARA',
      address: 'Sud, Saint-Louis',
      phone: '0123456789',
      userId: user_aby_gmx_fr.id,
    },
  });

  console.log(' -----> add user: user_babacar_gmx_fr');
  const user_babacar_gmx_fr = await prisma.user.create({
    data: {
      username: 'babacar',
      email: 'babacar@gmx.fr',
      password: hash,
      roleId: role_sous_zone.id,
    },
  });

  console.log(' -----> add profile: user_babacar_gmx_fr');
  const profile_babacar_gmx_fr = await prisma.profile.create({
    data: {
      firstName: 'Babacar',
      lastName: 'CAMARA',
      address: 'Sud, Saint-Louis',
      phone: '0123456789',
      userId: user_babacar_gmx_fr.id,
    },
  });

  console.log(' -----> add user: user_aicha_gmx_fr');
  const user_aicha_gmx_fr = await prisma.user.create({
    data: {
      username: 'aicha',
      email: 'aicha@gmx.fr',
      password: hash,
      roleId: role_localite.id,
    },
  });
  console.log(' -----> add profile: user_aicha_gmx_fr');
  const profile_aicha_gmx_fr = await prisma.profile.create({
    data: {
      firstName: 'Aichatou',
      lastName: 'CAMARA',
      address: 'Sud, Saint-Louis',
      phone: '0123456789',
      userId: user_aicha_gmx_fr.id,
    },
  });

  console.log(' -----> add user: user_mouhamed_gmx_fr');
  const user_mouhamed_gmx_fr = await prisma.user.create({
    data: {
      username: 'mouhamed',
      email: 'mouh@gmx.fr',
      password: hash,
      roleId: role_point.id,
    },
  });
  console.log(' -----> add profile: user_mouhamed_gmx_fr');
  const profile_mouhamed_gmx_fr = await prisma.profile.create({
    data: {
      firstName: 'Mouhamed',
      lastName: 'CAMARA',
      address: 'Sud, Saint-Louis',
      phone: '0123456789',
      userId: user_mouhamed_gmx_fr.id,
    },
  });

  console.log(' -----> add user: user_abdou_gmx_fr');
  const user_abdou_gmx_fr = await prisma.user.create({
    data: {
      username: 'abdou',
      email: 'abdou@gmx.fr',
      password: hash,
      roleId: role_point.id,
    },
  });
  console.log(' -----> add profile: user_abdou_gmx_fr');
  const profile_abdou_gmx_fr = await prisma.profile.create({
    data: {
      firstName: 'Abdou',
      lastName: 'SOUMARE',
      address: 'Sud, Saint-Louis',
      phone: '0123456789',
      userId: user_abdou_gmx_fr.id,
    },
  });

  console.log(' -----> add user: user_badara_gmx_fr');
  const user_badara_gmx_fr = await prisma.user.create({
    data: {
      username: 'badara',
      email: 'badara@gmx.fr',
      password: hash,
      roleId: role_point.id,
    },
  });
  console.log(' -----> add profile: user_badara_gmx_fr');
  const profile_badara_gmx_fr = await prisma.profile.create({
    data: {
      firstName: 'Alioune Badara',
      lastName: 'SAMB',
      address: 'Sud, Saint-Louis',
      phone: '0123456789',
      userId: user_badara_gmx_fr.id,
    },
  });

  console.log(' -----> add user: user_mabouba_gmx_fr');
  const user_mabouba_gmx_fr = await prisma.user.create({
    data: {
      username: 'mabouba',
      email: 'mabouba@gmx.fr',
      password: hash,
      roleId: role_societe.id,
    },
  });
  console.log(' -----> add profile: user_mabouba_gmx_fr');
  const profile_mabouba_gmx_fr = await prisma.profile.create({
    data: {
      firstName: 'Mabouba',
      lastName: 'DIAGNE',
      address: 'Sud, Saint-Louis',
      phone: '0123456789',
      userId: user_mabouba_gmx_fr.id,
    },
  });

  console.log(' ---------> add user structure: mabouba');
  const user_structure_mabouba_ministere = await prisma.userSociete.create({
    data: {
      societeId: 1,
      userId: user_mabouba_gmx_fr.id,
    },
  });

  console.log(' -----> add user: user_souare_gmx_fr');
  const user_souare_gmx_fr = await prisma.user.create({
    data: {
      username: 'amadou',
      email: 'souare@gmx.fr',
      password: hash,
      roleId: role_point.id,
    },
  });

  console.log(' -----> add profile: user_badara_gmx_fr');
  const profile_souare_gmx_fr = await prisma.profile.create({
    data: {
      firstName: 'Amadou',
      lastName: 'SOUARE',
      address: 'Sud, Saint-Louis',
      phone: '0123456789',
      userId: user_souare_gmx_fr.id,
    },
  });

  console.log(' -----> add user: user_serigne_gmx_fr');
  const user_serigne_gmx_fr = await prisma.user.create({
    data: {
      username: 'serigne',
      email: 'serigne@gmx.fr',
      password: hash,
      roleId: role_point.id,
    },
  });
  console.log(' -----> add profile: user_serigne_gmx_fr');
  const profile_serigne_gmx_fr = await prisma.profile.create({
    data: {
      firstName: 'Serigne Ibrahima',
      lastName: 'Diop',
      address: 'Sud, Saint-Louis',
      phone: '0123456789',
      userId: user_serigne_gmx_fr.id,
    },
  });

  console.log(' -----> add user: user_jeyli_gmx_fr');
  const user_jeyli_gmx_fr = await prisma.user.create({
    data: {
      username: 'jeyli',
      email: 'jeyli@gmx.fr',
      password: hash,
      roleId: role_op.id,
    },
  });

  console.log(' -----> add profile: user_jeylany_gmx_fr');
  const profile_jeylany_gmx_fr = await prisma.profile.create({
    data: {
      firstName: 'Jeylany',
      lastName: 'CAMARA',
      address: 'Sud, Saint-Louis',
      phone: '0123456789',
      userId: user_jeyli_gmx_fr.id,
    },
  });
}

async function addExploitation() {
  console.log(' ----------- ADD FAMILLE EXPLOITATION -----------');
  console.log(' add famille charge exploitation: CHARGES USUELLE');
  const famille_exploitation_charge_usuelle =
    await prisma.familleChargeExploitation.create({
      data: {
        name: 'CHARGES USUELLE',
      },
    });
  console.log(' add famille charge exploitation: CHARGES EXCEPTIONNELLE');
  const famille_exploitation_charge_exeptionnelle =
    await prisma.familleChargeExploitation.create({
      data: {
        name: 'CHARGES EXCEPTIONNELLE',
      },
    });

  console.log(' ----------- ADD FAMILLE TYPE EXPLOITATION -----------');
  console.log(' add famille type charge exploitation: INTRANT');
  const famille_type_exploitation_charge_intrant =
    await prisma.familleTypeChargeExploitation.create({
      data: {
        name: 'INTRANT',
      },
    });

  console.log(' add famille type charge exploitation: FRAIS');
  const famille_type_exploitation_charge_frais =
    await prisma.familleTypeChargeExploitation.create({
      data: {
        name: 'FRAIS',
      },
    });
  console.log(' add famille type charge exploitation: SOL');
  const famille_type_exploitation_charge_sol =
    await prisma.familleTypeChargeExploitation.create({
      data: {
        name: 'SOL',
      },
    });
  console.log(' add famille type charge exploitation: AUTRES');
  const famille_type_exploitation_charge_autres =
    await prisma.familleTypeChargeExploitation.create({
      data: {
        name: 'AUTRES',
      },
    });

  console.log(' ----------- ADD TYPE EXPLOITATION -----------');
  console.log(' add type charge exploitation: PREPARATION DU SOL');
  const type_exploitation_charge_preparation_du_sol =
    await prisma.typeChargeExploitation.create({
      data: {
        name: 'PREPARATION DU SOL',
        familleTypeChargeExploitationId:
          famille_type_exploitation_charge_sol.id,
      },
    });

  console.log(' add charge exploitation: Preparation du sol');
  const charge_exploitation_preparation_sol =
    await prisma.chargeExploitation.create({
      data: {
        name: 'PREPARATION SOL',
        unite: 'UNITE',
        pu: 27500,
        quantite_unite_superficie: 1,
        isAchat: true,
        isProduit: true,
        isIntrant: false,
        uniteGrandeurId: 1,
        typeChargeExploitationId:
          type_exploitation_charge_preparation_du_sol.id,
        familleChargeExploitationId: famille_exploitation_charge_usuelle.id,
      },
    });

  console.log(' add charge exploitation: OFFSETAGE');
  const charge_exploitation_offsetage = await prisma.chargeExploitation.create({
    data: {
      name: 'OFFSETAGE',
      unite: 'HA',
      pu: 27500,
      quantite_unite_superficie: 1,
      isAchat: true,
      isProduit: true,
      isIntrant: false,
      uniteGrandeurId: 1,
      typeChargeExploitationId: type_exploitation_charge_preparation_du_sol.id,
      familleChargeExploitationId: famille_exploitation_charge_usuelle.id,
    },
  });

  console.log(' add type charge exploitation: ANGRAIS');
  const type_exploitation_charge_angrais =
    await prisma.typeChargeExploitation.create({
      data: {
        name: 'ANGRAIS',
        familleTypeChargeExploitationId:
          famille_type_exploitation_charge_intrant.id,
      },
    });

  console.log(' add charge exploitation: LONDAX');
  const charge_exploitation_londax = await prisma.chargeExploitation.create({
    data: {
      name: 'LONDAX',
      unite: 'Sachet',
      pu: 5000,
      quantite_unite_superficie: 2,
      isAchat: true,
      isProduit: true,
      isIntrant: true,
      uniteGrandeurId: 1,
      typeChargeExploitationId: type_exploitation_charge_angrais.id,
      familleChargeExploitationId: famille_exploitation_charge_usuelle.id,
    },
  });

  console.log(' add charge exploitation: UREE');
  const charge_exploitation_uree = await prisma.chargeExploitation.create({
    data: {
      name: 'UREE',
      unite: 'Sachet',
      pu: 5000,
      quantite_unite_superficie: 2,
      isAchat: true,
      isProduit: true,
      isIntrant: true,
      uniteGrandeurId: 1,
      typeChargeExploitationId: type_exploitation_charge_angrais.id,
      familleChargeExploitationId: famille_exploitation_charge_usuelle.id,
    },
  });

  console.log(' add charge exploitation: DAP');
  const charge_exploitation_npk = await prisma.chargeExploitation.create({
    data: {
      name: 'NPK',
      unite: 'Sachet',
      pu: 5000,
      quantite_unite_superficie: 2,
      isAchat: true,
      isProduit: true,
      isIntrant: true,
      uniteGrandeurId: 1,
      typeChargeExploitationId: type_exploitation_charge_angrais.id,
      familleChargeExploitationId: famille_exploitation_charge_usuelle.id,
    },
  });

  console.log(' add charge exploitation: DAP');
  const charge_exploitation_phosphore = await prisma.chargeExploitation.create({
    data: {
      name: 'PHOSPHORE',
      unite: 'Sachet',
      pu: 5000,
      quantite_unite_superficie: 2,
      isAchat: true,
      isProduit: true,
      isIntrant: true,
      uniteGrandeurId: 1,
      typeChargeExploitationId: type_exploitation_charge_angrais.id,
      familleChargeExploitationId: famille_exploitation_charge_usuelle.id,
    },
  });
  console.log(' add type charge exploitation: IRRIGATION');
  const type_exploitation_charge_irrigation =
    await prisma.typeChargeExploitation.create({
      data: {
        name: 'IRRIGATION',
        familleTypeChargeExploitationId:
          famille_type_exploitation_charge_autres.id,
      },
    });

  console.log(' add type charge exploitation: SEMENCES CERTIFIEES');
  const type_exploitation_charge_semences_certifiees =
    await prisma.typeChargeExploitation.create({
      data: {
        name: 'SEMENCES CERTIFIEES',
        familleTypeChargeExploitationId:
          famille_type_exploitation_charge_intrant.id,
      },
    });

  console.log(' add charge exploitation: semence_base');
  const charge_exploitation_semence_base_g4 =
    await prisma.chargeExploitation.create({
      data: {
        name: 'BASE (G4)',
        unite: 'UNITE',
        pu: 27500,
        quantite_unite_superficie: 1,
        isAchat: true,
        isProduit: true,
        isIntrant: true,
        uniteGrandeurId: 1,
        typeChargeExploitationId:
          type_exploitation_charge_semences_certifiees.id,
        familleChargeExploitationId: famille_exploitation_charge_usuelle.id,
      },
    });
  console.log(' add charge exploitation: semence_prebase_base_g1');
  const charge_exploitation_semence_prbase_g1 =
    await prisma.chargeExploitation.create({
      data: {
        name: 'PREBASE (G1)',
        unite: 'UNITE',
        pu: 27500,
        quantite_unite_superficie: 1,
        isAchat: true,
        isProduit: true,
        isIntrant: true,
        uniteGrandeurId: 1,
        typeChargeExploitationId:
          type_exploitation_charge_semences_certifiees.id,
        familleChargeExploitationId: famille_exploitation_charge_usuelle.id,
      },
    });
  console.log(' add charge exploitation: semence_prebase_base_g2');
  const charge_exploitation_semence_prbase_g2 =
    await prisma.chargeExploitation.create({
      data: {
        name: 'PREBASE (G2)',
        unite: 'UNITE',
        pu: 27500,
        quantite_unite_superficie: 1,
        isAchat: true,
        isProduit: true,
        isIntrant: true,
        uniteGrandeurId: 1,
        typeChargeExploitationId:
          type_exploitation_charge_semences_certifiees.id,
        familleChargeExploitationId: famille_exploitation_charge_usuelle.id,
      },
    });

  console.log(' add charge exploitation: semence_prebase_base_g3');
  const charge_exploitation_semence_prbase_g3 =
    await prisma.chargeExploitation.create({
      data: {
        name: 'PREBASE (G3)',
        unite: 'UNITE',
        pu: 27500,
        quantite_unite_superficie: 1,
        isAchat: true,
        isProduit: true,
        isIntrant: true,
        uniteGrandeurId: 1,
        typeChargeExploitationId:
          type_exploitation_charge_semences_certifiees.id,
        familleChargeExploitationId: famille_exploitation_charge_usuelle.id,
      },
    });

  console.log(' add type charge exploitation: BATTAGE MECANIQUE');
  const type_exploitation_charge_battage_mecanique =
    await prisma.typeChargeExploitation.create({
      data: {
        name: 'BATTAGE MECANIQUE',
        familleTypeChargeExploitationId:
          famille_type_exploitation_charge_autres.id,
      },
    });

  console.log(' add charge exploitation: battage mecanique');
  const charge_exploitation_battage_mecanique =
    await prisma.chargeExploitation.create({
      data: {
        name: 'BATTAGE MECANIQUE',
        unite: 'UNITE',
        pu: 27500,
        quantite_unite_superficie: 1,
        isAchat: true,
        isProduit: true,
        isIntrant: false,
        uniteGrandeurId: 1,
        typeChargeExploitationId: type_exploitation_charge_battage_mecanique.id,
        familleChargeExploitationId: famille_exploitation_charge_usuelle.id,
      },
    });

  console.log(" add type charge exploitation: MAIN D'OEUVRE");
  const type_exploitation_charge_main_oeuvre =
    await prisma.typeChargeExploitation.create({
      data: {
        name: "MAIN D'OEUVRE",
        familleTypeChargeExploitationId:
          famille_type_exploitation_charge_autres.id,
      },
    });

  console.log(' add charge exploitation: semence_prebase_base_g3');
  const charge_exploitation_main_oeuvre =
    await prisma.chargeExploitation.create({
      data: {
        name: 'MAIN OEUVRE',
        unite: 'UNITE',
        pu: 27500,
        quantite_unite_superficie: 1,
        isAchat: true,
        isProduit: true,
        isIntrant: false,
        uniteGrandeurId: 1,
        typeChargeExploitationId: type_exploitation_charge_main_oeuvre.id,
        familleChargeExploitationId: famille_exploitation_charge_usuelle.id,
      },
    });

  console.log(' add type charge exploitation: PRODUITS PHYTOSANITAIRES');
  const type_exploitation_charge_produits_phytosanitaires =
    await prisma.typeChargeExploitation.create({
      data: {
        name: 'PRODUITS PHYTOSANITAIRES',
        familleTypeChargeExploitationId:
          famille_type_exploitation_charge_intrant.id,
      },
    });

  console.log(' add charge exploitation: PROPANIL');
  const charge_exploitation_propanil = await prisma.chargeExploitation.create({
    data: {
      name: 'PROPANIL',
      unite: 'Litre',
      pu: 2900,
      quantite_unite_superficie: 3,
      isAchat: true,
      isProduit: true,
      isIntrant: true,
      uniteGrandeurId: 1,
      typeChargeExploitationId:
        type_exploitation_charge_produits_phytosanitaires.id,
      familleChargeExploitationId: famille_exploitation_charge_usuelle.id,
    },
  });
  console.log(' add charge exploitation: WEEDONE');
  const charge_exploitation_weedone = await prisma.chargeExploitation.create({
    data: {
      name: 'WEEDONE',
      unite: 'Litre',
      pu: 10000,
      quantite_unite_superficie: 1,
      isAchat: true,
      isProduit: true,
      isIntrant: true,
      uniteGrandeurId: 1,
      typeChargeExploitationId:
        type_exploitation_charge_produits_phytosanitaires.id,
      familleChargeExploitationId: famille_exploitation_charge_usuelle.id,
    },
  });

  console.log(' add type charge exploitation: REDEVANCES');
  const type_exploitation_charge_redevances =
    await prisma.typeChargeExploitation.create({
      data: {
        name: 'REDEVANCES',
        familleTypeChargeExploitationId:
          famille_type_exploitation_charge_frais.id,
      },
    });
  console.log(' add charge exploitation: semence_predevances');
  const charge_exploitation_redevances = await prisma.chargeExploitation.create(
    {
      data: {
        name: 'REDEVANCES',
        unite: 'UNITE',
        pu: 27500,
        quantite_unite_superficie: 1,
        isAchat: true,
        isProduit: true,
        isIntrant: false,
        uniteGrandeurId: 1,
        typeChargeExploitationId: type_exploitation_charge_redevances.id,
        familleChargeExploitationId: famille_exploitation_charge_usuelle.id,
      },
    },
  );

  console.log(' add type charge exploitation: ASSURANCES');
  const type_exploitation_charge_assurances =
    await prisma.typeChargeExploitation.create({
      data: {
        name: 'ASSURANCES',
        familleTypeChargeExploitationId:
          famille_type_exploitation_charge_frais.id,
      },
    });
  console.log(' add charge exploitation: semence_assurances');
  const charge_exploitation_assurance = await prisma.chargeExploitation.create({
    data: {
      name: 'ASSURANCES',
      unite: 'UNITE',
      pu: 27500,
      quantite_unite_superficie: 1,
      isAchat: true,
      isProduit: true,
      isIntrant: false,
      uniteGrandeurId: 1,
      typeChargeExploitationId: type_exploitation_charge_assurances.id,
      familleChargeExploitationId: famille_exploitation_charge_usuelle.id,
    },
  });

  console.log(' add type charge exploitation: AMORTISSEMENTS');
  const type_exploitation_charge_amortissements =
    await prisma.typeChargeExploitation.create({
      data: {
        name: 'AMORTISSEMENTS',
        familleTypeChargeExploitationId:
          famille_type_exploitation_charge_frais.id,
      },
    });
  console.log(' add charge exploitation: amortissements');
  const charge_exploitation_amortissements =
    await prisma.chargeExploitation.create({
      data: {
        name: 'AMORTISSEMENTS',
        unite: 'UNITE',
        pu: 27500,
        quantite_unite_superficie: 1,
        isAchat: true,
        isProduit: true,
        isIntrant: false,
        uniteGrandeurId: 1,
        typeChargeExploitationId: type_exploitation_charge_amortissements.id,
        familleChargeExploitationId: famille_exploitation_charge_usuelle.id,
      },
    });

  console.log(' add type charge exploitation: CHARGES RECOLTE ET POST RECOLTE');
  const type_exploitation_charge_charges_recolte_et_post_recolte =
    await prisma.typeChargeExploitation.create({
      data: {
        name: 'CHARGES RECOLTE ET POST RECOLTE',
        familleTypeChargeExploitationId:
          famille_type_exploitation_charge_frais.id,
      },
    });
  console.log(' add charge exploitation: semence_prebase_base_g3');
  const charge_exploitation_charge_charges_recoltes_et_post_recolte =
    await prisma.chargeExploitation.create({
      data: {
        name: 'CHARGES RECOLTE ET POST RECOLTE',
        unite: 'UNITE',
        pu: 27500,
        quantite_unite_superficie: 1,
        isAchat: true,
        isProduit: true,
        isIntrant: false,
        uniteGrandeurId: 1,
        typeChargeExploitationId:
          type_exploitation_charge_charges_recolte_et_post_recolte.id,
        familleChargeExploitationId: famille_exploitation_charge_usuelle.id,
      },
    });

  console.log(' add type charge exploitation: FRAIS FINANCIER');
  const type_exploitation_charge_frais_financier =
    await prisma.typeChargeExploitation.create({
      data: {
        name: 'FRAIS FINANCIER',
        familleTypeChargeExploitationId:
          famille_type_exploitation_charge_frais.id,
      },
    });
  console.log(' add charge exploitation: semence_prebase_base_g3');
  const charge_exploitation_frais_financier =
    await prisma.chargeExploitation.create({
      data: {
        name: 'FRAIS FINANCIER',
        unite: 'UNITE',
        pu: 27500,
        quantite_unite_superficie: 1,
        isAchat: true,
        isProduit: true,
        isIntrant: false,
        uniteGrandeurId: 1,
        typeChargeExploitationId: type_exploitation_charge_frais_financier.id,
        familleChargeExploitationId: famille_exploitation_charge_usuelle.id,
      },
    });

  console.log(' add type charge exploitation: AUTRES CHARGES');
  const type_exploitation_charge_autres_charges =
    await prisma.typeChargeExploitation.create({
      data: {
        name: 'AUTRES CHARGES',
        familleTypeChargeExploitationId:
          famille_type_exploitation_charge_autres.id,
      },
    });
  console.log(' add charge exploitation: semence_prebase_base_g3');
  const charge_exploitation_autres_charges =
    await prisma.chargeExploitation.create({
      data: {
        name: 'AUTRES CHARGES',
        unite: 'UNITE',
        pu: 27500,
        quantite_unite_superficie: 1,
        isAchat: true,
        isProduit: true,
        isIntrant: false,
        uniteGrandeurId: 1,
        typeChargeExploitationId: type_exploitation_charge_autres_charges.id,
        familleChargeExploitationId: famille_exploitation_charge_usuelle.id,
      },
    });
}

async function addEmballage() {
  console.log(' ----------- ADD TYPE EMBALLAGE -----------');
  console.log(' add type emballage: SAC');
  const type_emballage_sac = await prisma.typeEmballage.create({
    data: {
      name: 'SAC',
    },
  });

  console.log(' add type emballage: BIDON');
  const type_emballage_bidon = await prisma.typeEmballage.create({
    data: {
      name: 'BIDON',
    },
  });

  console.log(' ----------- ADD TYPE UNITE GRANDEUR -----------');
  console.log(' add type unite grandeur: POIDS');
  const type_unite_grandeur_poids = await prisma.typeUniteGrandeur.create({
    data: {
      name: 'POIDS',
    },
  });

  console.log(' add type unite grandeur: VOLUME');
  const type_unite_grandeur_volume = await prisma.typeUniteGrandeur.create({
    data: {
      name: 'VOLUME',
    },
  });

  console.log(' ----------- ADD UNITE GRANDEUR -----------');
  console.log(' add unite grandeur: KG');
  const unite_grandeur_kg = await prisma.uniteGrandeur.create({
    data: {
      name: 'KG',
      typeUniteGrandeurId: type_unite_grandeur_poids.id,
    },
  });
  

  console.log(' add unite grandeur: LITRE');
  const unite_grandeur_LITRE = await prisma.uniteGrandeur.create({
    data: {
      name: 'LITRE',
      typeUniteGrandeurId: type_unite_grandeur_volume.id,
    },
  });

  console.log(' ----------- ADD EMBALLAGE-----------');
  console.log(' add emballage: RIZ PADDY -  SAC - 80 KG');
  const emballage_riz_paddy_sac_80kg = await prisma.emballage.create({
    data: {
      name: 'SAC - 80 KG',
      conditionnement: 'Sac de 80 kg',
      quantite: 80,
      pu: 130,
      valeur: 10400,
      isActive: true,
      isDefault: true,
      produitId: 1,
      typeEmballageId: type_emballage_sac.id,
      uniteGrandeurId: unite_grandeur_kg.id,
    },
  });
  console.log(' add emballage: RIZ PADDY - SAC - 50KG');
  const emballage_riz_paddy_sac_50kg = await prisma.emballage.create({
    data: {
      name: 'SAC - 50 KG',
      conditionnement: 'Sac de 50 kg',
      quantite: 50,
      pu: 130,
      valeur: 6500,
      isActive: true,
      isDefault: false,
      produitId: 1,
      typeEmballageId: type_emballage_sac.id,
      uniteGrandeurId: unite_grandeur_kg.id,
    },
  });

  console.log(' add emballage: RIZ BLANC - SAC - 100KG');
  const emballage_riz_blanc_sac_100kg = await prisma.emballage.create({
    data: {
      name: 'SAC - 100 KG',
      conditionnement: 'Sac de 100 kg',
      quantite: 100,
      pu: 500,
      valeur: 50000,
      isActive: true,
      isDefault: false,
      produitId: 2,
      typeEmballageId: type_emballage_sac.id,
      uniteGrandeurId: unite_grandeur_kg.id,
    },
  });
  console.log(' add emballage: RIZ BLANC - SAC - 50KG');
  const emballage_riz_blanc_sac_50kg = await prisma.emballage.create({
    data: {
      name: 'SAC - 50 KG',
      conditionnement: 'Sac de 50 kg',
      quantite: 50,
      pu: 500,
      valeur: 25000,
      isActive: true,
      isDefault: true,
      produitId: 2,
      typeEmballageId: type_emballage_sac.id,
      uniteGrandeurId: unite_grandeur_kg.id,
    },
  });

  console.log(' add emballage: RIZ BLANC - SAC - 25KG');
  const emballage_riz_blanc_sac_250kg = await prisma.emballage.create({
    data: {
      name: 'SAC - 25 KG',
      conditionnement: 'Sac de 25 kg',
      quantite: 25,
      pu: 500,
      valeur: 12500,
      isActive: true,
      isDefault: false,
      produitId: 2,
      typeEmballageId: type_emballage_sac.id,
      uniteGrandeurId: unite_grandeur_kg.id,
    },
  });

  console.log(' add emballage: RIZ BLANC - SAC - 5KG');
  const emballage_riz_blanc_sac_5kg = await prisma.emballage.create({
    data: {
      name: 'SAC - 5 KG',
      conditionnement: 'Sac de 5 kg',
      quantite: 5,
      pu: 500,
      valeur: 2500,
      isActive: true,
      isDefault: false,
      produitId: 2,
      typeEmballageId: type_emballage_sac.id,
      uniteGrandeurId: unite_grandeur_kg.id,
    },
  });

  console.log(' add emballage: ARACHIDE COQUE -  SAC - 50 KG');
  const emballage_arachide_coque_sac_50kg = await prisma.emballage.create({
    data: {
      name: 'SAC - 50 KG',
      conditionnement: 'Sac de 50 kg',
      quantite: 50,
      pu: 250,
      valeur: 12500,
      isActive: true,
      isDefault: true,
      produitId: 3,
      typeEmballageId: type_emballage_sac.id,
      uniteGrandeurId: unite_grandeur_kg.id,
    },
  });

  console.log(' add emballage: ARACHIDE COQUE -  SAC - 100 KG');
  const emballage_arachide_coque_sac_100kg = await prisma.emballage.create({
    data: {
      name: 'SAC - 100 KG',
      conditionnement: 'Sac de 100 kg',
      quantite: 100,
      pu: 250,
      valeur: 250000,
      isActive: true,
      isDefault: true,
      produitId: 3,
      typeEmballageId: type_emballage_sac.id,
      uniteGrandeurId: unite_grandeur_kg.id,
    },
  });
/*
  console.log(' ----------- ADD EMBALLAGE INTRANT-----------');
  console.log(' add emballage intrant: UREE -  SAC - 50 KG');
  const emballage_uree_sac_50kg = await prisma.emballageIntrant.create({
    data: {
      name: 'SAC - 50 KG',
      conditionnement: 'Sac de 50 kg',
      quantite: 50,
      pu: 580,
      valeur: 29000,
      isActive: true,
      isDefault: true,
      chargeExploitationId: 4,
      typeEmballageId: type_emballage_sac.id,
    },
  });
  console.log(' add emballage intrant: UREE -  SAC - 25 KG');
  const emballage_uree_sac_25kg = await prisma.emballageIntrant.create({
    data: {
      name: 'SAC - 25 KG',
      conditionnement: 'Sac de 25 kg',
      quantite: 25,
      pu: 580,
      valeur: 29000,
      isActive: true,
      isDefault: true,
      chargeExploitationId: 4,
      typeEmballageId: type_emballage_sac.id,
    },
  });

  console.log(' add emballage intrant: NPK -  SAC - 25 KG');
  const emballage_npk_sac_80kg = await prisma.emballageIntrant.create({
    data: {
      name: 'SAC - 25 KG',
      conditionnement: 'Sac de 25 kg',
      quantite: 25,
      pu: 600,
      valeur: 15000,
      isActive: true,
      isDefault: true,
      chargeExploitationId: 5,
      typeEmballageId: type_emballage_sac.id,
    },
  });

  console.log(' add emballage intrant: PROPANIL -  BIDON - 10 L');
  const emballage_propanil_bidon_10l = await prisma.emballageIntrant.create({
    data: {
      name: 'BIDON - 10 L',
      conditionnement: 'Bidon 10 L',
      quantite: 10,
      pu: 600,
      valeur: 15000,
      isActive: true,
      isDefault: true,
      chargeExploitationId: 13,
      typeEmballageId: type_emballage_bidon.id,
    },
  });

  console.log(' add emballage intrant: PROPANIL -  BIDON - 25 L');
  const emballage_propanil_bidon_25l = await prisma.emballageIntrant.create({
    data: {
      name: 'BIDON - 25 L',
      conditionnement: 'Bidon 25 L',
      quantite: 25,
      pu: 600,
      valeur: 15000,
      isActive: true,
      isDefault: true,
      chargeExploitationId: 13,
      typeEmballageId: type_emballage_bidon.id,
    },
  });

  console.log(' add emballage intrant: WEEDONE -  BIDON - 10 L');
  const emballage_weedone_bidon_10l = await prisma.emballageIntrant.create({
    data: {
      name: 'BIDON - 10 L',
      conditionnement: 'Bidon 10 L',
      quantite: 10,
      pu: 600,
      valeur: 15000,
      isActive: true,
      isDefault: true,
      chargeExploitationId: 14,
      typeEmballageId: type_emballage_bidon.id,
    },
  });

  console.log(' add emballage intrant: WEEDONE -  BIDON - 5 L');
  const emballage_weedone_bidon_5l = await prisma.emballageIntrant.create({
    data: {
      name: 'BIDON - 5 L',
      conditionnement: 'Bidon 5 L',
      quantite: 5,
      pu: 600,
      valeur: 15000,
      isActive: true,
      isDefault: true,
      chargeExploitationId: 14,
      typeEmballageId: type_emballage_bidon.id,
    },
  });
*/
}

async function addLocalite() {
  console.log(' ----------- ADD PAYS -----------');
  console.log(' add pays: SENEGAL');
  const pays_senegal = await prisma.pays.create({
    data: {
      name: 'Sénégal',
      sigle: 'SEN',
    },
  });
  console.log(' -----> add zone: VFS');
  const zone_vfs = await prisma.zone.create({
    data: {
      name: 'VFS',
      paysId: pays_senegal.id,
    },
  });

  console.log(' ---------> add sous zone: SAINT LOUIS');
  const sous_zone_saint_louis = await prisma.sousZone.create({
    data: {
      name: 'SAINT LOUIS',
      zoneId: zone_vfs.id,
    },
  });

  console.log(' ---------> add localite: SAINT LOUIS');
  const localite_saint_louis = await prisma.localite.create({
    data: {
      name: 'SAINT LOUIS',
      sousZoneId: sous_zone_saint_louis.id,
    },
  });

  console.log(' ---------> add Point: VIRTUEL');
  const point_virtuel = await prisma.point.create({
    data: {
      name: 'PC VIRTUEL',
      isProduit: false,
      isIntrant: true,
      isVirtuel: true,
      localiteId: localite_saint_louis.id,
    },
  });

  console.log(' ---------> add Point : NDELLE');
  const point_ndelle = await prisma.point.create({
    data: {
      name: 'PC NDELLE',
      isProduit: true,
      isIntrant: true,
      isVirtuel: false,
      localiteId: localite_saint_louis.id,
    },
  });

  console.log(' ---------> add Point  Agence:NDELLE - SAINT LOUIS');
  const point_agence_ndelle_saint_louis =
    await prisma.pointAgence.create({
      data: {
        pointId: point_ndelle.id,
        agenceId: 1,
      },
    });

  console.log(' ----------- ADD TYPE OP -----------');
  console.log(' add op: GIE');
  const type_op_gie = await prisma.typeOp.create({
    data: {
      name: 'GIE',
    },
  });
  console.log(' add op: SV');
  const type_op_sv = await prisma.typeOp.create({
    data: {
      name: 'SV',
    },
  });

  let i = 0;
  while (i < 2) {
    console.log(
      ' ---------> add Op: Op gie - ' + i + ' ' + localite_saint_louis.name,
    );
    await prisma.op.create({
      data: {
        name: 'op - gie ' + i + ' ' + localite_saint_louis.name,
        sigle: 'SIGLE',
        email: 'EMAIL',
        telephone: '779548763',
        adresse: 'ADRESSE',
        prenom_contact: 'PRENOM_CONTACT',
        nom_contact: 'NOM_CONTACT',
        email_contact: 'EMAIL_CONTACT',
        telephone_contact: '779548768',
        typeOpId: type_op_gie.id,
        localiteId: localite_saint_louis.id,
        pointId: point_ndelle.id,
      },
    });
    i++;
  }
  let k = 0;
  while (k < 2) {
    console.log(
      ' ---------> add Op: Op - sv ' + k + ' ' + localite_saint_louis.name,
    );
    await prisma.op.create({
      data: {
        name: 'op - sv ' + k + ' ' + localite_saint_louis.name,
        sigle: 'SIGLE',
        email: 'EMAIL',
        telephone: '779548763',
        adresse: 'ADRESSE',
        prenom_contact: 'PRENOM_CONTACT',
        nom_contact: 'NOM_CONTACT',
        email_contact: 'EMAIL_CONTACT',
        telephone_contact: '779548768',
        typeOpId: type_op_sv.id,
        localiteId: localite_saint_louis.id,
        pointId: point_ndelle.id,
      },
    });
    k++;
  }

  console.log(' ---------> add Point: SAINT LOUIS');
  const point_3prd = await prisma.point.create({
    data: {
      name: 'PC 3PRD',
      isProduit: true,
      isIntrant: true,
      isVirtuel: false,
      localiteId: localite_saint_louis.id,
    },
  });

  console.log(' ---------> add Point Agence: SAINT LOUIS');
  const point_agence_2prd_saint_louis =
    await prisma.pointAgence.create({
      data: {
        pointId: point_3prd.id,
        agenceId: 1,
      },
    });

  console.log(' ---------> add localite: TILENE');
  const localite_tilene = await prisma.localite.create({
    data: {
      name: 'TILENE',
      sousZoneId: sous_zone_saint_louis.id,
    },
  });
  console.log(' ---------> add Point : TILENE');
  const point_tilene = await prisma.point.create({
    data: {
      name: 'PC TILENE',
      isProduit: true,
      isIntrant: true,
      isVirtuel: false,
      localiteId: localite_tilene.id,
    },
  });

  console.log(' ---------> add Point  Agence: SAINT LOUIS');
  const point_agence_tilene_saint_louis =
    await prisma.pointAgence.create({
      data: {
        pointId: point_tilene.id,
        agenceId: 1,
      },
    });

  let l = 0;
  while (l < 2) {
    console.log(
      ' ---------> add Op: Op gie - ' + l + ' ' + localite_tilene.name,
    );
    await prisma.op.create({
      data: {
        name: 'op - gie ' + l + ' ' + localite_tilene.name,
        sigle: 'SIGLE',
        email: 'EMAIL',
        telephone: '779548763',
        adresse: 'ADRESSE',
        prenom_contact: 'PRENOM_CONTACT',
        nom_contact: 'NOM_CONTACT',
        email_contact: 'EMAIL_CONTACT',
        telephone_contact: '779548768',
        typeOpId: type_op_gie.id,
        localiteId: localite_tilene.id,
        pointId: point_tilene.id,
      },
    });
    l++;
  }
  let m = 0;
  while (m < 2) {
    console.log(
      ' ---------> add Op: Op - sv ' + m + ' ' + localite_tilene.name,
    );
    await prisma.op.create({
      data: {
        name: 'op - sv ' + m + ' ' + localite_tilene.name,
        sigle: 'SIGLE',
        email: 'EMAIL',
        telephone: '779548763',
        adresse: 'ADRESSE',
        prenom_contact: 'PRENOM_CONTACT',
        nom_contact: 'NOM_CONTACT',
        email_contact: 'EMAIL_CONTACT',
        telephone_contact: '779548768',
        typeOpId: type_op_sv.id,
        localiteId: localite_tilene.id,
        pointId: point_tilene.id,
      },
    });
    m++;
  }

  console.log(' ---------> add localite: PONT GENDARME');
  const localite_pont_gendarme = await prisma.localite.create({
    data: {
      name: 'PONT GENDARME',
      sousZoneId: sous_zone_saint_louis.id,
    },
  });

  console.log(' ---------> add Point : PONT GENDARME');
  const point_pont_gendarme = await prisma.point.create({
    data: {
      name: 'PC PONT GENDARME',
      isProduit: true,
      isIntrant: false,
      isVirtuel: false,
      localiteId: localite_pont_gendarme.id,
    },
  });

  console.log(' ---------> add Point  Agence: PONT GENDARME');
  const point_agence_pont_gendarme_saint_louis =
    await prisma.pointAgence.create({
      data: {
        pointId: point_pont_gendarme.id,
        agenceId: 1,
      },
    });

  let n = 0;
  while (n < 2) {
    console.log(
      ' ---------> add Op: Op gie - ' + n + ' ' + localite_pont_gendarme.name,
    );
    await prisma.op.create({
      data: {
        name: 'op - gie ' + n + ' ' + localite_pont_gendarme.name,
        sigle: 'SIGLE',
        email: 'EMAIL',
        telephone: '779548763',
        adresse: 'ADRESSE',
        prenom_contact: 'PRENOM_CONTACT',
        nom_contact: 'NOM_CONTACT',
        email_contact: 'EMAIL_CONTACT',
        telephone_contact: '779548768',
        typeOpId: type_op_gie.id,
        localiteId: localite_pont_gendarme.id,
        pointId: point_pont_gendarme.id,
      },
    });
    n++;
  }
  let v = 0;
  while (v < 2) {
    console.log(
      ' ---------> add Op: Op - sv ' + v + ' ' + localite_pont_gendarme.name,
    );
    await prisma.op.create({
      data: {
        name: 'op - sv ' + v + ' ' + localite_pont_gendarme.name,
        sigle: 'SIGLE',
        email: 'EMAIL',
        telephone: '779548763',
        adresse: 'ADRESSE',
        prenom_contact: 'PRENOM_CONTACT',
        nom_contact: 'NOM_CONTACT',
        email_contact: 'EMAIL_CONTACT',
        telephone_contact: '779548768',
        typeOpId: type_op_sv.id,
        localiteId: localite_pont_gendarme.id,
        pointId: point_pont_gendarme.id,
      },
    });
    v++;
  }

  console.log(' ---------> add localite: DEBI TIGUETTE');
  const localite_debi_tiguette = await prisma.localite.create({
    data: {
      name: 'DEBI TIGUETTE',
      sousZoneId: sous_zone_saint_louis.id,
    },
  });

  console.log(' ---------> add Point : DEBI TIGUETTE');
  const point_debi_tiguette = await prisma.point.create({
    data: {
      name: 'PC DEBI TIGUETTE',
      isProduit: true,
      isIntrant: false,
      isVirtuel: false,
      localiteId: localite_debi_tiguette.id,
    },
  });

  console.log(' ---------> add Point  Agence: DEBI TIGUETTE');
  const point_agence_debi_tiguette_saint_louis =
    await prisma.pointAgence.create({
      data: {
        pointId: point_debi_tiguette.id,
        agenceId: 1,
      },
    });

  let p = 0;
  while (p < 2) {
    console.log(
      ' ---------> add Op: Op gie - ' + p + ' ' + localite_debi_tiguette.name,
    );
    await prisma.op.create({
      data: {
        name: 'op - gie ' + p + ' ' + localite_debi_tiguette.name,
        sigle: 'SIGLE',
        email: 'EMAIL',
        telephone: '779548763',
        adresse: 'ADRESSE',
        prenom_contact: 'PRENOM_CONTACT',
        nom_contact: 'NOM_CONTACT',
        email_contact: 'EMAIL_CONTACT',
        telephone_contact: '779548768',
        typeOpId: type_op_gie.id,
        localiteId: localite_debi_tiguette.id,
        pointId: point_debi_tiguette.id,
      },
    });
    p++;
  }
  let q = 0;
  while (q < 2) {
    console.log(
      ' ---------> add Op: Op - sv ' + q + ' ' + localite_debi_tiguette.name,
    );
    await prisma.op.create({
      data: {
        name: 'op - sv ' + q + ' ' + localite_debi_tiguette.name,
        sigle: 'SIGLE',
        email: 'EMAIL',
        telephone: '779548763',
        adresse: 'ADRESSE',
        prenom_contact: 'PRENOM_CONTACT',
        nom_contact: 'NOM_CONTACT',
        email_contact: 'EMAIL_CONTACT',
        telephone_contact: '779548768',
        typeOpId: type_op_sv.id,
        localiteId: localite_debi_tiguette.id,
        pointId: point_debi_tiguette.id,
      },
    });
    q++;
  }

  console.log(' ---------> add sous zone: ROSS BETHIO');
  const sous_zone_ross_bethio = await prisma.sousZone.create({
    data: {
      name: 'ROSS BETHIO',
      zoneId: zone_vfs.id,
    },
  });

  console.log(' ---------> add sous zone: RICHARD TOLL');
  const sous_zone_richard_toll = await prisma.sousZone.create({
    data: {
      name: 'RICHARD TOLL',
      zoneId: zone_vfs.id,
    },
  });

  console.log(' ---------> add sous zone: PODOR');
  const sous_zone_podor = await prisma.sousZone.create({
    data: {
      name: 'PODOR',
      zoneId: zone_vfs.id,
    },
  });

  console.log(' ---------> add sous zone: MATAM');
  const sous_zone_matam = await prisma.sousZone.create({
    data: {
      name: 'MATAM',
      zoneId: zone_vfs.id,
    },
  });

  console.log(' -----> add zone: CENTRE');
  const zone_centre = await prisma.zone.create({
    data: {
      name: 'CENTRE',
      paysId: pays_senegal.id,
    },
  });

  console.log(' -----> add zone: NIAYES');
  const zone_niayes = await prisma.zone.create({
    data: {
      name: 'NIAYES',
      paysId: pays_senegal.id,
    },
  });

  console.log(' -----> add zone: ARACHIDIER');
  const zone_arachidier = await prisma.zone.create({
    data: {
      name: 'ARACHIDIER',
      paysId: pays_senegal.id,
    },
  });

  console.log(' -----> add zone: SAHELIEN');
  const zone_sahelien = await prisma.zone.create({
    data: {
      name: 'SAHELIEN',
      paysId: pays_senegal.id,
    },
  });

  console.log(' -----> add zone: SYLVO-PASTORALE');
  const zone_sylvopastorale = await prisma.zone.create({
    data: {
      name: 'SYLVO-PASTORALE',
      paysId: pays_senegal.id,
    },
  });

  console.log(" add pays: COTE D'IVOIRE");
  const pays_cote_ivoire = await prisma.pays.create({
    data: {
      name: "COTE D'IVOIRE",
      sigle: 'CIV',
    },
  });
  console.log(' add pays: MALI');
  const pays_mali = await prisma.pays.create({
    data: {
      name: 'MALI',
      sigle: 'MAL',
    },
  });
  console.log(' add pays: MAURITANIE');
  const pays_mauritanie = await prisma.pays.create({
    data: {
      name: 'Mauritanie',
      sigle: 'MAU',
    },
  });

  // UNITE TRANSFORMATION

  console.log(' add unite trasformation: VITAL');
  const unite_vital = await prisma.uniteTransformation.create({
    data: {
      name: 'VITAL',
      sigle: 'VITAL',
      adresse: 'Ross Bethio',
      telephone: '339613569',
    },
  });
  console.log(' add unite trasformation: SERIC');
  const unite_seric = await prisma.uniteTransformation.create({
    data: {
      name: 'SERIC',
      sigle: 'SERIC',
      adresse: 'Saint-Louis',
      telephone: '339613569',
    },
  });
  console.log(' add unite trasformation: SFA SA');
  const unite_sfa = await prisma.uniteTransformation.create({
    data: {
      name: 'SFA SA',
      sigle: 'SFA',
      adresse: 'Ross Bethio',
      telephone: '339613569',
    },
  });
  console.log(' add unite trasformation: CMG Agro Industriel');
  const unite_cmg = await prisma.uniteTransformation.create({
    data: {
      name: 'CMG Agro Industriel',
      sigle: 'CMG',
      adresse: 'Ross Bethio',
      telephone: '339613569',
    },
  });
  console.log(' add unite trasformation: Fall et Frere');
  const unite_fall_freres = await prisma.uniteTransformation.create({
    data: {
      name: 'Fall et Freres',
      sigle: 'F&F',
      adresse: 'Ross Bethio',
      telephone: '339613569',
    },
  });
  console.log(' add unite trasformation: Ets Coumba Nor Thiam');
  const unite_coumba_nor_thiam = await prisma.uniteTransformation.create({
    data: {
      name: 'Ets Coumba Nor Thiam',
      sigle: 'CNT',
      adresse: 'Ross Bethio',
      telephone: '339613569',
    },
  });
  console.log(' add unite trasformation: ETS Aissatou Gaye');
  const unite_ets_aissatou_gaye = await prisma.uniteTransformation.create({
    data: {
      name: 'ETS Aissatou Gaye',
      sigle: 'EAG',
      adresse: 'Ross Bethio',
      telephone: '339613569',
    },
  });
  console.log(' add unite trasformation: GIE Mbodj et Freres');
  const unite_mbodj_freres = await prisma.uniteTransformation.create({
    data: {
      name: 'GIE Mbodj et Freres',
      sigle: 'M&F',
      adresse: 'Ross Bethio',
      telephone: '339613569',
    },
  });

  console.log(' add unite trasformation: GIE Diagne et Freres');
  const unite_diagne_freres = await prisma.uniteTransformation.create({
    data: {
      name: 'GIE Diagne et Freres',
      sigle: 'D&F',
      adresse: 'Ross Bethio',
      telephone: '339613569',
    },
  });

  console.log(' add unite trasformation: GIE Mbodj et Freres');
  const unite_naxadi_deret = await prisma.uniteTransformation.create({
    data: {
      name: 'GIE Naxadi Deret',
      sigle: 'NAXADI DERET',
      adresse: 'Ross Bethio',
      telephone: '339613569',
    },
  });

  console.log(' ---------> add entrepot: VIRTUEL');
  const entrepot_virtuel = await prisma.entrepot.create({
    data: {
      name: 'ENT. Virtuel',
      adresse: 'Adresse Virtuel',
      pointId: point_virtuel.id,
    },
  });

  console.log(' ---------> add emplacement: VIRTUEL FOURNISSEUR');
  const emplacement_virtuel_fournisseur = await prisma.emplacement.create({
    data: {
      name: 'EMP. Virtuel Fournisseur',
      code: 1,
      capacite: 0,
      entrepotId: entrepot_virtuel.id,
      familleEmplacementId: 1,
    },
  });

  console.log(' ---------> add emplacement: VIRTUEL CLIENT');
  const emplacement_virtuel_client = await prisma.emplacement.create({
    data: {
      name: 'EMP. Virtuel Client',
      code: 2,
      capacite: 0,
      entrepotId: entrepot_virtuel.id,
      familleEmplacementId: 1,
    },
  });

  console.log(' ---------> add emplacement: VIRTUEL REBUT');
  const emplacement_virtuel_rebut = await prisma.emplacement.create({
    data: {
      name: 'EMP. Virtuel Rebut',
      code: 3,
      capacite: 0,
      entrepotId: entrepot_virtuel.id,
      familleEmplacementId: 1,
    },
  });

  console.log(' ---------> add entrepot: DEBI TIGUETTE');
  const entrepot_debi_tiguette = await prisma.entrepot.create({
    data: {
      name: 'ENT. Débi Tiguette',
      adresse: 'Saint-Louis',
      pointId: point_debi_tiguette.id,
    },
  });

  console.log(' ---------> add emplacement: DEBI TIGUETTE');
  const emplacement_debi_tiguette = await prisma.emplacement.create({
    data: {
      name: 'EMP. DEBI TIGUETTE',
      capacite: 1000,
      entrepotId: entrepot_debi_tiguette.id,
      familleEmplacementId: 1,
    },
  });

  console.log(' ---------> add entrepot: PONT GENDARME');
  const entrepot_pont_gendarme = await prisma.entrepot.create({
    data: {
      name: 'ENT. Pont Gendarme',
      adresse: 'Pont GendarmeSaint-Louis',
      pointId: point_pont_gendarme.id,
    },
  });

  console.log(' ---------> add emplacement: PONT GENDARME');
  const emplacement_pont_gendarme = await prisma.emplacement.create({
    data: {
      name: 'EMP. Pont Gendarme',
      capacite: 1000,
      entrepotId: entrepot_pont_gendarme.id,
      familleEmplacementId: 1,
    },
  });

  console.log(' ---------> add entrepot: NDELLE');
  const entrepot_ndelle = await prisma.entrepot.create({
    data: {
      name: 'ENT. Ndelle',
      adresse: 'Ndelle Saint-Louis',
      pointId: point_ndelle.id,
    },
  });
  console.log(' ---------> add emplacement: NDELLE');
  const emplacement_ndelle = await prisma.emplacement.create({
    data: {
      name: 'EMP. Ndelle',
      capacite: 1000,
      entrepotId: entrepot_ndelle.id,
      familleEmplacementId: 1,
    },
  });

  console.log(' ---------> add entrepot: TILENE');
  const entrepot_tilene = await prisma.entrepot.create({
    data: {
      name: 'ENT. Tilène',
      adresse: 'Tilene Saint-Louis',
      pointId: point_tilene.id,
    },
  });
  console.log(' ---------> add emplacement: TILENE');
  const emplacement_tilene = await prisma.emplacement.create({
    data: {
      name: 'EMP. Tilène',
      capacite: 1000,
      entrepotId: entrepot_tilene.id,
      familleEmplacementId: 1,
    },
  });
}

main()
  .catch((e: Error) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // Disconnect Prisma Client
    await prisma.$disconnect();
  });
