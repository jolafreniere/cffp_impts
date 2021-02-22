let credits = [];

let cf0 = Credit("Crédit en raison de l'âge", (x, params) => {
  cp = params["FED_AGE"];
  return x.age >= cp.MIN_AGE && x.revenue < cp.MAX_REV;
});
cf0.category = "Mesures relatives aux aînés";
cf0.type = `Fédéral`;
cf0.reference =
  "http://cffp.recherche.usherbrooke.ca/outils-ressources/guide-mesures-fiscales/credit-impot-age/";
cf0.type_credit = "Non remboursable";
let fed = [cf0];

let cp4 = Credit(
  "Crédit d'impôt pour le soutien des aînés",
  (x) => {
    return (
      x.age >= CREDIT_PARAMETERS["PROV_SOUTIEN_AINES"].MIN_AGE &&
      !CREDIT_PARAMETERS["PROV_SOUTIEN_AINES"].HAS_PARTNER
    );
  },
  203,
  CREDIT_PARAMETERS["PROV_SOUTIEN_AINES"].MAX_REV,
  0.05,
  0,
  null
);
cp4["reference"] =
  "http://cffp.recherche.usherbrooke.ca/outils-ressources/guide-mesures-fiscales/credit-dimpot-pour-le-soutien-des-aines/";
cp4.type_credit = "Remboursable";
cp4.category = "Mesures relatives aux aînés";

let cp5 = Credit("Crédit d'impôt pour le soutien des aînés", (x) => {
  return (
    x.age >= CREDIT_PARAMETERS["PROV_SOUTIEN_AINES_2"].MIN_AGE &&
    revenu_familial(x) <
      CREDIT_PARAMETERS["PROV_SOUTIEN_AINES_2"].MAX_REV_FAM &&
    x.hasPartner &&
    x.partner.age < CREDIT_PARAMETERS["PROV_SOUTIEN_AINES_2"].MAX_PARTNER_AGE
  );
});
cp5.type_credit = "Remboursable";
cp5.category = "Mesures relatives aux aînés";
cp5[
  "note"
] = `Le crédit d’impôt remboursable pour le soutien des aînés est partageable entre les conjoints selon la proportion dont ils auront convenu au moyen d’un formulaire prescrit TP-1029.SA
« Crédit d’impôt pour soutien aux aînés ». À défaut d’entente entre les particuliers, le ministre du Revenu déterminera le montant du crédit d’impôt que chacun pourra demander.`;
cp5["reference"] =
  "http://cffp.recherche.usherbrooke.ca/outils-ressources/guide-mesures-fiscales/credit-dimpot-pour-le-soutien-des-aines/";

let cp6 = Credit("Crédit d'impôt pour le soutien des aînés", (x) => {
  return (
    x.age >= CREDIT_PARAMETERS["PROV_SOUTIEN_AINES_3"].MIN_AGE &&
    x.hasPartner &&
    x.partner.age >=
      CREDIT_PARAMETERS["PROV_SOUTIEN_AINES_3"].MIN_PARTNER_AGE &&
    revenu_familial(x) < CREDIT_PARAMETERS["PROV_SOUTIEN_AINES_3"].MAX_REV_FAM
  );
});
cp6[
  "note"
] = `Le crédit d’impôt remboursable pour le soutien des aînés est partageable entre les conjoints selon la proportion dont ils auront convenu au moyen d’un formulaire prescrit TP-1029.SA
« Crédit d’impôt pour soutien aux aînés ». À défaut d’entente entre les particuliers, le ministre du Revenu déterminera le montant du crédit d’impôt que chacun pourra demander.`;
cp6["reference"] =
  "http://cffp.recherche.usherbrooke.ca/outils-ressources/guide-mesures-fiscales/credit-dimpot-pour-le-soutien-des-aines/";
cp6.type_credit = "Remboursable";
cp6.category = "Mesures relatives aux aînés";

let cp7 = Credit("Crédit d'impôt pour activités des aînés", (x) => {
  return (
    x.age >= CREDIT_PARAMETERS["PROV_ACT_AINES"].MIN_AGE &&
    revenu_familial(x) < CREDIT_PARAMETERS["PROV_ACT_AINES"].MAX_REV_FAM &&
    x.frais_inscription_adhesion == "true"
  );
});
cp7["reference"] =
  "http://cffp.recherche.usherbrooke.ca/outils-ressources/guide-mesures-fiscales/credit-impot-activites-aines/";
cp7.type_credit = "Remboursable";
cp7.category = "Mesures relatives aux aînés";

let cp9 = Credit(
  "Fractionnement des revenus de retraite entre conjoints",
  (x) => {
    return (
      x.hasPartner &&
      x.age >= CREDIT_PARAMETERS["PROV_FRAC_REV_RETRAITE"].MIN_AGE &&
      x.revenue_type.retraite
    );
  }
);
cp9.category = "Mesures relatives aux aînés";
cp9.type_credit = "Fractionnement";
cp9.note = ` Le choix de fractionner ou non le revenu de pension entre les conjoints est un choix qui doit être fait annuellement. Un choix fait dans une année ne lie
pas les conjoints pour les autres années.
<br>
Un seul choix conjoint peut être fait pour une année d'imposition. Si le contribuable et son conjoint ont tous les deux un revenu de pension admissible, ils doivent
décider lequel d'entre eux fractionnera son revenu de pension[1].
<br>
Si un choix conjoint est effectué afin de bénéficier du mécanisme de fractionnement de revenus, le conjoint qui transfère le revenu de pension a aussi l'obligation de transférer, dans la
même proportion, l'impôt retenu à la source sur ledit revenu.
<br>
Dans la situation où seulement un des deux conjoints reçoit un revenu de pension admissible durant l'année, il peut alors être intéressant d'effectuer le choix du fractionnement de revenu
afin que les deux conjoints profitent du crédit pour revenu de pension du fédéral et du crédit pour revenu de retraite du Québec.
<br>
Il est possible de faire un choix de fractionnement de revenus différent dans la déclaration du Québec de celui fait dans la déclaration du fédéral.
<br>
Lorsque le choix du fractionnement de revenus est effectué, les deux conjoints sont alors solidairement responsables du paiement de l'impôt résultant du montant transféré [2].
<br><br>
[1] ARC, Fractionnement du revenu de pension.
<br>
[2] Par. 160(1.3) LIR et art. 1034.0.0.3 LI.
`;
cp9.reference =
  "http://cffp.recherche.usherbrooke.ca/outils-ressources/guide-mesures-fiscales/fractionnement-revenus-pension-et-fractionnement-revenus-retraite-conjoints/";

let cp11 = Credit(
  "Crédit d'impôt pour activités des enfants", //REMBOURSABLE
  (x) => {
    return (
      x.frais_engages.activite_des_enfants &&
      revenu_familial(x) <=
        CREDIT_PARAMETERS["PROV_ACTIVITE_ENFANT"].MAX_REV_FAM
    );
  }
);
cp11.category = "Mesures relatives aux enfants";
cp11.note = `
Le montant du crédit d’impôt peut être fractionné entre les conjoints à condition que le total réclamé n’excède pas le montant maximal permis pour un seul de ces particuliers à l’égard de
l’enfant.
`;
cp11.reference =
  "http://cffp.recherche.usherbrooke.ca/outils-ressources/guide-mesures-fiscales/credit-impot-activites-enfants/";
cp11.type_credit = "Remboursable";

let cp13 = Credit("Crédit d'impôt pour activités des enfants", (x) => {
  let val = false;
  if (x.hasKids) {
    for (let i = 0; i < x.kidAmount; i++) {
      val =
        val ||
        (x.kids[i].frais_engages.activite_enfant &&
          x.kids[i].age < 16 &&
          x.kids[i].age > 5);
    }
  }
  return (
    val &&
    revenu_familial(x) < CREDIT_PARAMETERS["PROV_ACTIVITE_ENFANT"].MAX_REV_FAM
  );
});
cp13.category = "Mesures relatives aux enfants";
cp13.reference =
  "http://cffp.recherche.usherbrooke.ca/outils-ressources/guide-mesures-fiscales/credit-impot-activites-enfants/";
cp13.type_credit = "Remboursable";

let cp15 = Credit("Déduction pour travailleurs", (x) => {
  return x.revenue_type.emploi || x.revenue_type.travailleur_autonome;
});
cp15.category = "Mesures relatives au travail";
cp15.type_credit = "Déduction";
cp15.reference =
  "http://cffp.recherche.usherbrooke.ca/outils-ressources/guide-mesures-fiscales/deduction-travailleurs/";

let cp21 = Credit(
  "Montant pour autres personnes à charge", //Non remboursable
  (x) => {
    if (!x.hasKids) return false;
    for (let i = 0; i < x.kidAmount; i++) {
      if (
        x.kids[i].age >= 18 &&
        (x.kids[i].status_etudiant == "pas_aux_etudes" ||
          x.kids[i].status_etudiant == "temps_partiel") &&
        x.kids[i].revenue <
          CREDIT_PARAMETERS["PROV_PERSONNE_CHARGE"].MAX_KID_REV
      ) {
        return true;
      }
    }
    return false;
  }
);
cp21.type_credit = "Non remboursable";
cp21.note = `
Ce montant peut être demandé par un particulier pour un enfant majeur qui n’a pas poursuivi des études postsecondaires à temps plein, pour un enfant majeur qui n’a pas transféré un montant
pour enfant majeur aux études postsecondaires ou encore pour un frère, une soeur, un neveu, une nièce, un parent, un grand-père, une grand-mère, un oncle, une tante ou ceux et celles du conjoint du
particulier[1]. Ce montant peut être fractionné avec une autre personne ayant subvenu aux besoins de la personne à charge[2].
<br>
[1] REVENU QUÉBEC,«367 – Montant pour personnes à charge et montant transféré par un enfant majeur aux études postsecondaires ».
<br>
[2] Art. 752.0.7 LI. La répartition de ce montant se fait à la ligne 54 de l’annexe A pour la personne à charge en question, où un pourcentage est indiqué.
`;
cp21.category = "Mesure selon la situation familiale";

cp21.reference =
  "http://cffp.recherche.usherbrooke.ca/outils-ressources/guide-mesures-fiscales/montant-personnes-a-charge/";

let cp20 = Credit("Déduction pour frais de déménagement", (x) => {
  return x.frais_engages.demenagement;
});
cp20.type_credit = "Déduction";
cp20.note = `Les frais de déménagement ne sont pas déductibles s'il n'existe aucun lien entre le déménagement du particulier et l'occupation d'un emploi, de l'exploitation d'une entreprise ou
de la fréquentation d'un établissement d'enseignement. Le lien requis n'existe pas si un particulier déménage uniquement pour des raisons personnelles.`;
cp20.category = "Mesures relatives au travail";
cp20.reference =
  "http://cffp.recherche.usherbrooke.ca/outils-ressources/guide-mesures-fiscales/frais-demenagement/";

let cp25 = Credit(
  "Montant pour enfant aux études postsecondaires", //NON REMBOURSABLE, POUR DEUX SESSIONS (TODO)
  (x) => {
    return hasKid(x, (kid) => {
      return (
        kid.age < 18 &&
        kid.status_etudiant == "temps_plein" &&
        kid.revenue < CREDIT_PARAMETERS["PROV_MONTANT_POSTSEC"].MAX_KID_REV
      );
    });
  }
);
cp25.category = "Mesures relatives aux études";
cp25.note = `Le montant pour enfant mineur aux études postsecondaires et le montant transféré par un enfant majeur aux études postsecondaires peuvent faire l’objet d’un fractionnement entre les
personnes qui ont subvenu à leurs besoins. À cet effet, l’enfant n’a pas à résider sous le même toit que la personne à qui le montant est transféré.
<br>
Le montant pour enfant mineur aux études postsecondaires et le montant transféré par un enfant majeur aux études postsecondaires doivent être réduits du revenu de l’enfant pour l’année. À
cet effet, les bourses d’études reçues par l’étudiant durant l’année ne sont pas prises en considération.`;
cp25.type_credit = "Non remboursable";
cp25.reference =
  "http://cffp.recherche.usherbrooke.ca/outils-ressources/guide-mesures-fiscales/montants-etudes-postsecondaires/";

let cp26 = Credit(
  "Montant transféré par un enfant majeur aux études postsecondaires", //NON REMBOURSABLE, POUR DEUX SESSIONS (TODO)
  (x) => {
    return hasKid(x, (kid) => {
      return (
        kid.age >= 18 &&
        kid.status_etudiant == "temps_plein" &&
        kid.revenue < CREDIT_PARAMETERS["PROV_MONTANT_POSTSEC_1"].MAX_KID_REV
      );
    });
  }
);
cp26.category = "Mesures relatives aux études";
cp26.type_credit = "Non remboursable";
cp26.note = `
Le montant pour enfant mineur aux études postsecondaires et le montant transféré par un enfant majeur aux études postsecondaires peuvent faire l’objet d’un fractionnement entre les
personnes qui ont subvenu à leurs besoins. À cet effet, l’enfant n’a pas à résider sous le même toit que la personne à qui le montant est transféré.
<br>
L'enfant qui transfère un montant pour enfant majeur aux études postsecondaires perd le droit, pour l’année, de demander les crédits d’impôt relatifs à la prime au travail.
<br>
Le montant pour enfant mineur aux études postsecondaires et le montant transféré par un enfant majeur aux études postsecondaires doivent être réduits du revenu de l’enfant pour l’année. À
cet effet, les bourses d’études reçues par l’étudiant durant l’année ne sont pas prises en considération.
`;
cp26.reference =
  "http://cffp.recherche.usherbrooke.ca/outils-ressources/guide-mesures-fiscales/montants-etudes-postsecondaires/";

let cp27 = Credit("Crédit d'impôt pour la prolongation de carrière", (x) => {
  return (
    x.revenue > CREDIT_PARAMETERS["PROV_PROL_CARRIERE"].MIN_REV &&
    x.age >= CREDIT_PARAMETERS["PROV_PROL_CARRIERE"].MIN_AGE &&
    x.revenue_type.emploi
  );
});
cp27.category = "Mesures relatives au travail";
cp27.type_credit = "Non remboursable";
cp27.note = `Lorsqu'un particulier atteint l’âge d’admissibilité en cours d’année, il a droit au crédit au prorata du nombre de mois où il a l’âge d’admissibilité au cours de l’année d’imposition donnée.
<br>
Depuis 2016, tout revenu provenant d’un emploi auprès d’un employeur avec lequel le particulier a un lien de dépendance n’est pas admissible au crédit. Ainsi, le salaire d’un actionnaire-employé
(par exemple, un professionnel incorporé) reçu de la société dont il est actionnaire pourrait ne pas donner droit au crédit.`;

cp27.reference =
  "http://cffp.recherche.usherbrooke.ca/faq-items/credit-dimpot-pour-la-prolongation-de-carriere/";

let cp28 = Credit("Crédit d'impôt pour la prolongation de carrière", (x) => {
  return (
    x.revenue > CREDIT_PARAMETERS["PROV_PROL_CARRIERE"].MIN_REV &&
    x.age >= 65 &&
    x.revenue_type.emploi
  );
});
cp28.category = "Mesures relatives au travail";
cp28.type_credit = "Non remboursable";
cp28.note = `Lorsqu'un particulier atteint l’âge d’admissibilité en cours d’année, il a droit au crédit au prorata du nombre de mois où il a l’âge d’admissibilité au cours de l’année d’imposition donnée.
<br>
Depuis 2016, tout revenu provenant d’un emploi auprès d’un employeur avec lequel le particulier a un lien de dépendance n’est pas admissible au crédit. Ainsi, le salaire d’un actionnaire-employé
(par exemple, un professionnel incorporé) reçu de la société dont il est actionnaire pourrait ne pas donner droit au crédit.`;
cp28.reference =
  "http://cffp.recherche.usherbrooke.ca/faq-items/credit-dimpot-pour-la-prolongation-de-carriere/";

let cp29 = Credit(
  "Crédit d'impôt pour cotisations syndicales et professionnelles",
  (x) => {
    return x.frais_engages.cotisation_syndicale_professionnelle;
  }
);
cp29.category = "Mesures relatives au travail";
cp29.type_credit = "Non remboursable";
cp29.reference =
  "http://cffp.recherche.usherbrooke.ca/outils-ressources/guide-mesures-fiscales/cotisation-syndicale-ou-professionnelle/#sources";

let cp31 = Credit("Crédit pour maintien à domicile des aînés", (x) => {
  return (
    x.age >= CREDIT_PARAMETERS["PROV_MAINTIEN_DOM_AINES"].MIN_AGE &&
    (!x.hasPartner ||
      (x.hasPartner &&
        x.partner.age <
          CREDIT_PARAMETERS["PROV_MAINTIEN_DOM_AINES"].MAX_PARTNER_AGE)) &&
    revenu_familial(x) <
      CREDIT_PARAMETERS["PROV_MAINTIEN_DOM_AINES"].MAX_REV_FAM &&
    x.depenses_maintien_domicile == "true"
  );
});
cp31.category = "Mesures relatives aux aînés";
cp31.type_credit = "Remboursable";
cp31.reference =
  "http://cffp.recherche.usherbrooke.ca/outils-ressources/guide-mesures-fiscales/credit-maintien-domicile-aines/";

let cp32 = Credit("Crédit pour maintien à domicile des aînés", (x) => {
  return (
    x.age >= CREDIT_PARAMETERS["PROV_MAINTIEN_DOM_AINES_2"].MIN_AGE &&
    x.hasPartner &&
    x.partner.age >=
      CREDIT_PARAMETERS["PROV_MAINTIEN_DOM_AINES_2"].MIN_PARTNER_AGE &&
    revenu_familial(x) <
      CREDIT_PARAMETERS["PROV_MAINTIEN_DOM_AINES_2"].MAX_REV_FAM &&
    x.depenses_maintien_domicile == "true"
  );
});
cp32.category = "Mesures relatives aux aînés";
cp32.type_credit = "Remboursable";
cp32.reference =
  "http://cffp.recherche.usherbrooke.ca/outils-ressources/guide-mesures-fiscales/credit-maintien-domicile-aines/";

//----------------------------------------------------------------------------------------------------------------
// MESURES FEDERALES //// MESURES FEDERALES //// MESURES FEDERALES //// MESURES FEDERALES //// MESURES FEDERALES //
//----------------------------------------------------------------------------------------------------------------

let cf1 = Credit("Montant pour revenu de pension", (x) => {
  return x.revenue_type.retraite;
});
cf1.category = "Mesures relatives aux aînés";
cf1[
  "note"
] = `Pour le montant pour revenu de pension (Fédéral), si une partie du crédit est inutilisée, elle peut être transférée à l’époux ou au conjoint de fait. Les revenus de pension admissibles au crédit
d’impôt se limitent à certains types de revenus et varient en fonction de l’âge du particulier.`;
cf1["reference"] =
  "http://cffp.recherche.usherbrooke.ca/outils-ressources/guide-mesures-fiscales/montant-revenu-pension-montant-revenus-retraite/";
cf1.type_credit = "Non remboursable";

let cf2 = Credit("Crédit d'impôt pour accessibilité domiciliaire", (x) => {
  return (
    (x.age >= CREDIT_PARAMETERS["FED_ACCES_DOMICILIAIRE"].MIN_AGE ||
      (x.hasPartner &&
        x.partner.age >=
          CREDIT_PARAMETERS["FED_ACCES_DOMICILIAIRE"].MIN_PARTNER_AGE)) &&
    (x.depenses_renovation_admissibles == "true" ||
      x.sante.depenses_renovations_admissibles == "true")
  );
});
cf2.category = "Mesures relatives à la santé";
cf2.type_credit = "Non remboursable";
cf2[
  "note"
] = `Le crédit d’impôt remboursable pour le soutien des aînés est partageable entre les conjoints selon la proportion dont ils auront convenu au moyen d’un formulaire prescrit TP-1029.SA
« Crédit d’impôt pour soutien aux aînés ». À défaut d’entente entre les particuliers, le ministre du Revenu déterminera le montant du crédit d’impôt que chacun pourra demander.

<br>
ARC,Ligne 398 – Dépenses pour l’accessibilité domiciliaire.`;
cf2["reference"] =
  "http://cffp.recherche.usherbrooke.ca/outils-ressources/guide-mesures-fiscales/credit-impot-accessibilite-domiciliaire/";

let cf3 = Credit("Fractionnement du revenu de pension", (x) => {
  return x.hasPartner && x.revenue_type.retraite;
});
cf3.type_credit = "Fractionnement";
cf3.category = "Mesures relatives aux aînés";
cf3.note = ` Le choix de fractionner ou non le revenu de pension entre les conjoints est un choix qui doit être fait annuellement. Un choix fait dans une année ne lie
pas les conjoints pour les autres années.
<br>
Un seul choix conjoint peut être fait pour une année d'imposition. Si le contribuable et son conjoint ont tous les deux un revenu de pension admissible, ils doivent
décider lequel d'entre eux fractionnera son revenu de pension[1].
<br>
Si un choix conjoint est effectué afin de bénéficier du mécanisme de fractionnement de revenus, le conjoint qui transfère le revenu de pension a aussi l'obligation de transférer, dans la
même proportion, l'impôt retenu à la source sur ledit revenu.
<br>
Dans la situation où seulement un des deux conjoints reçoit un revenu de pension admissible durant l'année, il peut alors être intéressant d'effectuer le choix du fractionnement de revenu
afin que les deux conjoints profitent du crédit pour revenu de pension du fédéral et du crédit pour revenu de retraite du Québec.
<br>
Il est possible de faire un choix de fractionnement de revenus différent dans la déclaration du Québec de celui fait dans la déclaration du fédéral.
<br>
Lorsque le choix du fractionnement de revenus est effectué, les deux conjoints sont alors solidairement responsables du paiement de l'impôt résultant du montant transféré [2].
<br><br>
[1] ARC, Fractionnement du revenu de pension.
<br>
[2] Par. 160(1.3) LIR et art. 1034.0.0.3 LI.
`;
cf3.reference =
  "http://cffp.recherche.usherbrooke.ca/outils-ressources/guide-mesures-fiscales/fractionnement-revenus-pension-et-fractionnement-revenus-retraite-conjoints/";

let cf6 = Credit("Crédit d'impôt pour époux ou conjoint de fait", (x, p) => {
  let params = p["FED_EPOUX_CONJOINT"];
  let maxPartnerRev = params.MAX_REV_PARTNER;
  if (x.revenue > params.MIN_REV) {
    maxPartnerRev =
      params.MAX_REV_PARTNER - (x.revenue - params.MIN_REV) * 0.01457;
  }

  if (x.revenue >= params.MIN_REV_P2) {
    maxPartnerRev = params.MAX_REV_PARTNER_P2;
  }
  return x.hasPartner && x.partner.revenue < maxPartnerRev;
});
cf6.category = "Mesure selon la situation familiale";
cf6.type_credit = "Non remboursable";
cf6.reference =
  "http://cffp.recherche.usherbrooke.ca/outils-ressources/guide-mesures-fiscales/credit-epoux-ou-conjoint-de-fait/";

let csf1 = Credit("Crédit d'impôt pour frais médicaux", (x) => {
  return x.sante.frais_medicaux_admissibles == "true";
});

csf1.note = `Le crédit d’impôt pour frais médicaux a la particularité qu’il peut être demandé à l’égard de dépenses payées au cours d’une période de 12 mois consécutifs qui se termine pendant
l’année d’imposition pour laquelle la demande est présentée.
<br><br>
Tant au Québec qu’au fédéral, les demandes à l’égard de frais médicaux effectués au nom d’un époux, d’un conjoint de fait ou d’enfants mineurs peuvent être regroupées avec les frais médicaux
du contribuable[1], pour autant que les frais dépassent un seuil minimal. Les frais médicaux payés à l'égard de personnes à charge majeures sont aussi admissibles, mais le calcul est différent
au fédéral du Québec.
<br><br>
Il n’y a pas de plafond au montant du crédit d’impôt pour frais médicaux. Toutefois, seuls les montants payés pour des frais médicaux admissibles qui n’ont pas été remboursés par une assurance
privée peuvent être inclus dans le calcul du crédit.
<br><br>
[1] Notons que les frais payés pour des personnes majeures à charge sont aussi à considérer dans le total des frais médicaux au Québec.`;
csf1.reference =
  "http://cffp.recherche.usherbrooke.ca/outils-ressources/guide-mesures-fiscales/credit-impot-frais-medicaux/";
csf1.type_credit = "Non remboursable";

let csf2 = Credit("Crédit d'impôt pour personnes handicapées", (x) => {
  return x.sante.deficience_grave_prolongee == "true";
});
csf2.type_credit = "Non remboursable";
csf2.note = ` Le crédit de base et le supplément peuvent être transférés à certaines personnes qui assurent le soutien du particulier[1]. Toutefois, il est à noter qu'au Québec, contrairement au fédéral,
le transfert est possible seulement au conjoint.
<br><br>
Si un contribuable reçoit des prestations d’invalidité, des indemnités pour accidents du travail ou d’autres prestations d’invalidité ou d’assurance du Régime de pensions du Canada ou du Régime de
rentes du Québec, ce dernier n’est pas nécessairement admissible au crédit d’impôt pour personnes handicapées[2] (Fédéral).
<br><br>
[1] Par. 118.3(2) LIR. Les personnes admissibles au transfert sont le père, la mère, le grand-père, la grand-mère, un enfant, un petit-enfant, un frère, une soeur, une tante, un oncle, un neveu, une
nièce, l’époux ou le conjoint de fait du particulier qui assure son soutien.
<br>
[2] ARC,Crédit d’impôt pour personnes handicapées.`;
csf2.reference =
  "http://cffp.recherche.usherbrooke.ca/outils-ressources/guide-mesures-fiscales/credit-impot-personnes-handicapees-credit-impot-deficience-grave-prolongee/";

let csf4 = Credit(
  "Supplément remboursable pour frais médicaux",
  (x, app_parameters) => {
    let params = app_parameters["FED_SUPPL_FRAIS_MED"];
    return (
      revenu_familial(x) < params.MAX_REV_FAM &&
      (x.revenue_type.emploi || x.revenue_type.travailleur_autonome) &&
      x.revenue >= params.MIN_REV_FAM &&
      x.sante.frais_medicaux_admissibles == "true"
    );
  }
);
csf4.type_credit = "Remboursable";
csf4.reference =
  "https://cffp.recherche.usherbrooke.ca/outils-ressources/guide-mesures-fiscales/supplement-et-credit-impot-frais-medicaux/";

let csf5 = Credit("Crédit canadien pour aidant naturel", (x) => {
  return x.sante.aidant_naturel == "true";
});
csf5.lien_additionnel =
  "http://cffp.recherche.usherbrooke.ca/outils-ressources/guide-mesures-fiscales/credit-canadien-aidant-naturel/credit-canadien-pour-aidant-naturel-simulateur/#personne_charge_majeure";
csf5.type_credit = "Non remboursable";
csf5.note = `Il n'est pas possible de demander le crédit canadien pour aidant naturel à l’égard d’une personne à charge qui n’a pas une déficience des fonctions physiques ou mentales, y compris un
parent ou l’un des grands-parents âgés de 65 ans ou plus[1].
<br>
Si un particulier demande le crédit pour personne à charge à l’égard d’une personne à charge, aucune autre personne que le particulier ne peut alors demander le crédit canadien pour
aidant naturel à l’égard de cette personne à charge[2].
<br>
Pour demander le crédit, il n’est pas nécessaire que la personne à charge réside avec l’aidant naturel.
<br>
<a href="http://cffp.recherche.usherbrooke.ca/outils-ressources/guide-mesures-fiscales/credit-canadien-aidant-naturel/credit-canadien-pour-aidant-naturel-simulateur/#personne_charge_majeure#" target="_blank">Calculateur</a>
<br>
[1] ARC,Ligne 307 – Montant canadien pour aidants naturels pour autres personnes à charge âgées de 18 ans ou plus ayant une déficience.
[2] Al. 118(4)c) LIR.`;
csf5.reference =
  "http://cffp.recherche.usherbrooke.ca/outils-ressources/guide-mesures-fiscales/credit-canadien-aidant-naturel/";

let csp3 = Credit(
  "Crédit d'impôt pour aidant naturel d'une personne majeure",
  (x) => {
    return x.sante.prend_soin_conjoint == "true";
  }
);
csp3.type_credit = "Remboursable";
csp3.reference =
  "http://cffp.recherche.usherbrooke.ca/outils-ressources/guide-mesures-fiscales/credit-impot-aidant-naturel-personne-majeure/";
csp3.lien_additionnel =
  "http://cffp.recherche.usherbrooke.ca/outils-ressources/guide-mesures-fiscales/credit-canadien-aidant-naturel/credit-canadien-pour-aidant-naturel-simulateur/#personne_charge_majeure";
csp3.note = `<a href="http://cffp.recherche.usherbrooke.ca/outils-ressources/guide-mesures-fiscales/credit-canadien-aidant-naturel/credit-canadien-pour-aidant-naturel-simulateur/#personne_charge_majeure" target="_blank">Lien vers le calculateur</a>`;

let csp1 = Credit("Crédit d'impôt pour frais médicaux", (x, app_parameters) => {
  let params = app_parameters["PROV_FRAIS_MEDIC"];
  return (
    revenu_familial(x) < params.MAX_REV_FAM &&
    (x.revenue_type.emploi || x.revenue_type.travailleur_autonome) &&
    x.revenue >= params.MIN_REV_FAM &&
    x.sante.frais_medicaux_admissibles == "true"
  );
});
csp1.type_credit = "Non remboursable";
csp1.note = `Le crédit d’impôt pour frais médicaux a la particularité qu’il peut être demandé à l’égard de dépenses payées au cours d’une période de 12 mois consécutifs qui se termine pendant
l’année d’imposition pour laquelle la demande est présentée.
<br><br>
Tant au Québec qu’au fédéral, les demandes à l’égard de frais médicaux effectués au nom d’un époux, d’un conjoint de fait ou d’enfants mineurs peuvent être regroupées avec les frais médicaux
du contribuable[1], pour autant que les frais dépassent un seuil minimal. Les frais médicaux payés à l'égard de personnes à charge majeures sont aussi admissibles, mais le calcul est différent
au fédéral du Québec.
<br><br>
Il n’y a pas de plafond au montant du crédit d’impôt pour frais médicaux. Toutefois, seuls les montants payés pour des frais médicaux admissibles qui n’ont pas été remboursés par une assurance
privée peuvent être inclus dans le calcul du crédit.
<br><br>
[1] Notons que les frais payés pour des personnes majeures à charge sont aussi à considérer dans le total des frais médicaux au Québec.`;
csp1.reference =
  "http://cffp.recherche.usherbrooke.ca/outils-ressources/guide-mesures-fiscales/credit-impot-frais-medicaux/";

let csp2 = Credit("Crédit d'impôt pour déficience grave et prolongée", (x) => {
  return x.sante.deficience_grave_prolongee == "true";
});
csp2.type_credit = "Non remboursable";
csp2.note = ` Le crédit de base et le supplément peuvent être transférés à certaines personnes qui assurent le soutien du particulier[1]. Toutefois, il est à noter qu'au Québec, contrairement au fédéral,
le transfert est possible seulement au conjoint.
<br>
Si un contribuable reçoit des prestations d’invalidité, des indemnités pour accidents du travail ou d’autres prestations d’invalidité ou d’assurance du Régime de pensions du Canada ou du Régime de
rentes du Québec, ce dernier n’est pas nécessairement admissible au crédit d’impôt pour personnes handicapées[2] (Fédéral).
<br><br>
[1] Par. 118.3(2) LIR. Les personnes admissibles au transfert sont le père, la mère, le grand-père, la grand-mère, un enfant, un petit-enfant, un frère, une soeur, une tante, un oncle, un neveu, une
nièce, l’époux ou le conjoint de fait du particulier qui assure son soutien.
<br>
[2] ARC,Crédit d’impôt pour personnes handicapées.`;
csp2.reference =
  "http://cffp.recherche.usherbrooke.ca/outils-ressources/guide-mesures-fiscales/credit-impot-personnes-handicapees-credit-impot-deficience-grave-prolongee/";

let csp4 = Credit(
  "Crédit d'impôt pour aidant naturel d'une personne majeure",
  (x) => {
    return x.sante.heberge_proche_admissible == "true";
  }
);
csp4.type_credit = "Remboursable";
csp4.reference =
  "http://cffp.recherche.usherbrooke.ca/outils-ressources/guide-mesures-fiscales/credit-impot-aidant-naturel-personne-majeure/";
csp4.note = `<a href="http://cffp.recherche.usherbrooke.ca/outils-ressources/guide-mesures-fiscales/credit-canadien-aidant-naturel/credit-canadien-pour-aidant-naturel-simulateur/#personne_charge_majeure" target="_blank">Lien vers le calculateur</a>`;
csp4.lien_additionnel =
  "http://cffp.recherche.usherbrooke.ca/outils-ressources/guide-mesures-fiscales/credit-canadien-aidant-naturel/credit-canadien-pour-aidant-naturel-simulateur/#personne_charge_majeure";

let csp5 = Credit(
  "Crédit d'impôt pour aidant naturel d'une personne majeure",
  (x) => {
    return x.sante.cohabite_proche_deficient == "true";
  }
);
csp5.lien_additionnel =
  "http://cffp.recherche.usherbrooke.ca/outils-ressources/guide-mesures-fiscales/credit-canadien-aidant-naturel/credit-canadien-pour-aidant-naturel-simulateur/#personne_charge_majeure";
csp5.type_credit = "Remboursable";
csp5.reference =
  "http://cffp.recherche.usherbrooke.ca/outils-ressources/guide-mesures-fiscales/credit-impot-aidant-naturel-personne-majeure/";
csp5.note = `<a href="http://cffp.recherche.usherbrooke.ca/outils-ressources/guide-mesures-fiscales/credit-canadien-aidant-naturel/credit-canadien-pour-aidant-naturel-simulateur/#personne_charge_majeure" target="_blank">Lien vers le calculateur</a>`;

let csp6 = Credit(
  "Crédit d'impôt pour aidant naturel d'une personne majeure",
  (x) => {
    return x.sante.aide_personne_sans_cohabiter == "true";
  }
);
csp6.type_credit = "Remboursable";
csp6.lien_additionnel =
  "http://cffp.recherche.usherbrooke.ca/outils-ressources/guide-mesures-fiscales/credit-canadien-aidant-naturel/credit-canadien-pour-aidant-naturel-simulateur/#personne_charge_majeure";
csp6.reference =
  "http://cffp.recherche.usherbrooke.ca/outils-ressources/guide-mesures-fiscales/credit-impot-aidant-naturel-personne-majeure/";
csp6.note = `<a href="http://cffp.recherche.usherbrooke.ca/outils-ressources/guide-mesures-fiscales/credit-canadien-aidant-naturel/credit-canadien-pour-aidant-naturel-simulateur/#personne_charge_majeure" target="_blank">Lien vers le calculateur</a>`;

let csp7 = Credit("Crédit d'impôt pour relève bénévole", (x) => {
  return x.sante.heures200 == "true" && x.sante.fournis_service_releve_benevole;
});
csp7.type_credit = "Remboursable";
csp7.reference =
  "http://cffp.recherche.usherbrooke.ca/outils-ressources/guide-mesures-fiscales/credit-impot-releve-benevole/";

let csp9 = Credit(
  "Crédit d'impôt pour aidant naturel d'une personne majeure",
  (x) => {
    return x.sante.aidant_naturel == "true";
  }
);
csp9.type_credit = "Remboursable";
csp9.reference =
  "http://cffp.recherche.usherbrooke.ca/outils-ressources/guide-mesures-fiscales/credit-canadien-aidant-naturel/";
csp9.lien_additionnel =
  "http://cffp.recherche.usherbrooke.ca/outils-ressources/guide-mesures-fiscales/credit-canadien-aidant-naturel/credit-canadien-pour-aidant-naturel-simulateur/#personne_charge_majeure";
csp9.note = `<a href="http://cffp.recherche.usherbrooke.ca/outils-ressources/guide-mesures-fiscales/credit-canadien-aidant-naturel/credit-canadien-pour-aidant-naturel-simulateur/#personne_charge_majeure" target="_blank">Lien vers le calculateur</a>`;

//ETUDE

let cep1 = Credit("Déduction pour bourse d'études", (x) => {
  return x.etude.recu_bourse == "true";
});
cep1.note = `Les bourses d’études ne reçoivent pas le même traitement au fédéral qu’au Québec. Au fédéral, l’exemption pour bourse d’études se calcule au niveau du revenu net tandis qu’elle se
calcule au niveau du revenu imposable au Québec. Ce traitement différent au niveau provincial fera en sorte que l’étudiant aura un revenu net plus élevé au Québec, ce qui pourrait affecter
négativement certains crédits d’impôt auxquels il a droit.
<br>
Pendant qu’il est au service d’un employeur ou immédiatement après, un employé peut parfois conclure un arrangement avec lui selon lequel ce dernier convient de payer la totalité ou une partie de
ses frais de scolarité à la condition qu’il retourne travailler pour lui une fois que ses études sont terminées. Dans de tels cas, les frais liés aux études qui sont payés par l’employeur sont considérés
comme des sommes reçues au titre, dans l’occupation ou en vertu d’une charge ou d’un emploi et ne sont pas considérés être une bourse d’études[1].
<br>
Un étudiant peut recevoir une bourse d’études en échange de laquelle il s’engage à travailler à la fin de ses études ou de sa formation pour la personne qui lui accorde l’aide financière.
Si une relation employeur-employé n’a pas encore été établie au moment où l’étudiant reçoit ces sommes, celles-ci sont normalement considérées comme une bourse d’études[2].
<br><br>
[1] ARC, Folio de l’impôt sur le revenu S1-F2-C3, « Bourses d’études, subventions de recherches et autres montants d’aide à l’éducation » (26 avril 2017), par. 3.11.
<br>
[2] ARC, Folio de l’impôt sur le revenu S1-F2-C3, « Bourses d’études, subventions de recherches et autres montants d’aide à l’éducation » (26 avril 2017), par. 3.14.`;
cep1.reference =
  "http://cffp.recherche.usherbrooke.ca/outils-ressources/guide-mesures-fiscales/exemption-bourse-etudes/";
cep1.type_credit = "Déduction";

let cef1 = Credit("Exemption pour bourse d'études", (x) => {
  return x.etude.recu_bourse == "true";
});
cef1.note = `Les bourses d’études ne reçoivent pas le même traitement au fédéral qu’au Québec. Au fédéral, l’exemption pour bourse d’études se calcule au niveau du revenu net tandis qu’elle se
calcule au niveau du revenu imposable au Québec. Ce traitement différent au niveau provincial fera en sorte que l’étudiant aura un revenu net plus élevé au Québec, ce qui pourrait affecter
négativement certains crédits d’impôt auxquels il a droit.
<br>
Pendant qu’il est au service d’un employeur ou immédiatement après, un employé peut parfois conclure un arrangement avec lui selon lequel ce dernier convient de payer la totalité ou une partie de
ses frais de scolarité à la condition qu’il retourne travailler pour lui une fois que ses études sont terminées. Dans de tels cas, les frais liés aux études qui sont payés par l’employeur sont considérés
comme des sommes reçues au titre, dans l’occupation ou en vertu d’une charge ou d’un emploi et ne sont pas considérés être une bourse d’études[1].
<br>
Un étudiant peut recevoir une bourse d’études en échange de laquelle il s’engage à travailler à la fin de ses études ou de sa formation pour la personne qui lui accorde l’aide financière.
Si une relation employeur-employé n’a pas encore été établie au moment où l’étudiant reçoit ces sommes, celles-ci sont normalement considérées comme une bourse d’études[2].
<br><br>
[1] ARC, Folio de l’impôt sur le revenu S1-F2-C3, « Bourses d’études, subventions de recherches et autres montants d’aide à l’éducation » (26 avril 2017), par. 3.11.
<br>
[2] ARC, Folio de l’impôt sur le revenu S1-F2-C3, « Bourses d’études, subventions de recherches et autres montants d’aide à l’éducation » (26 avril 2017), par. 3.14.`;
cef1.reference =
  "http://cffp.recherche.usherbrooke.ca/outils-ressources/guide-mesures-fiscales/exemption-bourse-etudes/";
cef1.type_credit = "Exemption";
cef1.type = "Fédéral";

let cepf2 = Credit(
  "Crédit d'impôt pour intérêts payés sur un prêt étudiant",
  (x) => {
    return x.etude.interet_sur_pret_etude == "true";
  }
);
cepf2.note = `Le particulier qui a contracté un prêt admissible peut demander le crédit si lui ou une personne avec qui il est lié a payé les intérêts dus au cours de l’année. Cependant, il est le seul à pouvoir
le demander. Autrement dit, le crédit n’est pas transférable à une autre personne, ni à un conjoint, ni à un parent.
<br>
Tant au fédéral qu’au Québec, toute partie du crédit d’impôt qui est inutilisée peut être appliquée en réduction de l’impôt à payer dans les années subséquentes. Au fédéral, le report du crédit est
cependant limité à cinq années suivant le paiement des intérêts.`;
cepf2.reference =
  "http://cffp.recherche.usherbrooke.ca/outils-ressources/guide-mesures-fiscales/credit-impot-interets-payes-pret-etudiant/";
cepf2.type_credit = "Non remboursable";
cepf2.type = "Fédéral & Provincial";
cepf2.category = "Mesures relatives aux études";

let cdpf1 = Credit("Crédit d'impôt pour contributions politiques", (x) => {
  return x.dons.contribution_verse == "true";
});
cdpf1.reference =
  "http://cffp.recherche.usherbrooke.ca/outils-ressources/guide-mesures-fiscales/credit-impot-contributions-politiques/";
cdpf1.type_credit = "Non remboursable";

let cdpf2 = Credit("Crédit d'impôt pour dons", (x) => {
  return x.dons.don_fait == "true";
});
cdpf2.note = `
Un particulier peut bénéficier d'un crédit d'impôt pour dons sur le montant admissible du don. S'il s'agit d'un don en espèce, c'est ce montant qui prévaut. Dans les autres cas, il s'agit 
de l'excédent de la juste valeur marchande du don sur le montant de l'avantage reçu. Par exemple, le prix payé pour un souper-bénéfice ne constitue pas entièrement le montant admissible 
au don puisque le donateur a reçu l'avantage d'un repas. Il faut évaluer la valeur du repas, sans toutefois comptabiliser les taxes et le pourboire, et la réduire du prix payé pour obtenir le montant 
admissible au don. 
`;
cdpf2.reference =
  " http://cffp.recherche.usherbrooke.ca/outils-ressources/guide-mesures-fiscales/credit-impot-dons/";
cdpf2.type_credit = "Non remboursable, reportable";

let cp30 = Credit(
  "Crédit d'impôt pour séjour dans une unité transitoire de récupération fonctionnelle",
  (x) => {
    return x.biens_admissibles == "true" || x.sejour_unite_transitoire;
  }
);
cp30.category = "Mesures relatives aux aînés";
cp30.type_credit = "Remboursable";
cp30.reference =
  " http://cffp.recherche.usherbrooke.ca/outils-ressources/guide-mesures-fiscales/credit-impot-frais-engages-aine-maintenir-autonomie/";

let cp12 = Credit(
  "Allocation famille", //REMBOURSABLE
  (x) => {
    return hasKid(x, (kid) => {
      return kid.age < 18;
    });
  }
);
cp12.category = "Mesures relatives aux enfants";
cp12.type_credit = "Remboursable";
cp12.note = `
Retraite Québec considère habituellement que c'est le parent féminin qui est le principal responsable des soins de l'enfant
lorsque les parents féminins et masculins habitent tous deux sous le même toit que l'enfant. Ainsi, c'est le parent féminin qui doit
faire la demande, à moins que le parent masculin soit le principal responsable de l'enfant. Dans le cas d'une garde partagée, 
l'allocation famille est versée à chaque parent selon le pourcentage de temps que l'enfant passe avec eux.
<br>
Les familles bénéficient automatiquement du crédit d'impôt lorsqu'elles déclarent la naissance de leur enfant au Directeur de l'état
civil. Par la suite, ils doivent remplir leur déclaration de revenus du Québec annuellement pour continuer de recevoir les paiements
pour le soutien aux enfants.
<br>
En cas de garde partagée, les prestations sont versées aux deux parents en même temps, et ce, sans interruption et selon
la fréquence choisie par chacun (trimestrielle ou mensuelle). Retraite Québec détermine qu'une garde partagée existe quand un enfant
réside en alternance entre 40% et 60% du temps par mois avec chaque parent [1].
<br>
En présence d'une famille recomposée dont les deux conjoints sont admissibles au crédit, le conjoint ayant le plus grand nombre
d'enfants recevra le paiement pour tous les enfants admissibles. Si les deux conjoints ont le même nombre d'enfants, le paiement
sera versé au conjoint ayant l'enfant le plus jeune. Cependant, si ce plus jeune enfant est l'enfant du couple, le paiement sera
attribué à la mère [2].
<br>
<br>
[1] RETRAITE QUÉBEC, <a href="https://www.rrq.gouv.qc.ca/fr/enfants/naissance/paiement_soutien_enfants/Pages/versement.aspx" target="_blank">Le versement de l’Allocation famille.</a>
<br>
[2] RETRAITE QUÉBEC, <a href="https://www.rrq.gouv.qc.ca/fr/enfants/naissance/paiement_soutien_enfants/Pages/versement.aspx" target="_blank">Le versement de l’Allocation famille.</a>
`;
cp12.reference =
  "http://cffp.recherche.usherbrooke.ca/outils-ressources/guide-mesures-fiscales/allocation-famille-soutien-enfants/";

let cp8 = Credit(
  "Crédit d'impôt pour frais engagés par un aîné pour maintenir son autonomie",
  (x) => {
    return x.age >= 70 && x.biens_admissibles;
  }
);
cp8.reference =
  "http://cffp.recherche.usherbrooke.ca/outils-ressources/guide-mesures-fiscales/credit-impot-frais-engages-aine-maintenir-autonomie/";
cp8.type_credit = "Remboursable";
cp8.category = "Mesures relatives aux aînés";

let cp10 = Credit(
  "Crédit d'impôt pour frais de garde d'enfants", //REMBOURSABLE
  (x) => {
    return hasKid(x, (kid) => {
      return (
        kid.age <= 16 && //Not in suggested parameter sheet?
        kid.frais_engages.frais_garde == true &&
        kid.frais_engages.frais_garde_cont_reduite == false
      );
    });
  }
);
cp10.category = "Mesures relatives aux enfants";
cp10.type_credit = "Remboursable";
cp10.note = `
Contrairement au fédéral qui calcule la déduction pour frais de garde en fonction du revenu gagné, le Québec n’a pas cette limitation. Ainsi, il suffit que les frais de garde soient engagés
pendant que le contribuable (ou son conjoint) occupait un emploi, exploitait une entreprise, faisait de la recherche pour laquelle il avait reçu une subvention, exerçait une profession, recherchait
activement un emploi, fréquentait un établissement d’enseignement ou encore s’il recevait des prestations du Régime québécois d’assurance parentale ou d’assurance-emploi. 
<br>
Art. 1029.8.67 LI.
`;
cp10.reference =
  "http://cffp.recherche.usherbrooke.ca/outils-ressources/guide-mesures-fiscales/credit-impot-frais-garde-enfants/";

/*


let cf6 = Credit("Crédit d'impôt pour époux ou conjoint de fait",
    (x, p) => {
        let params = p["FED_EPOUX_CONJOINT"];
        let maxPartnerRev = params.MAX_REV_PARTNER;
        if(x.revenue > params.MIN_REV){
            maxPartnerRev = params.MAX_REV_PARTNER - ((x.revenue - params.MIN_REV)*0.01457);
        }

        if (x.revenue >= params.MIN_REV_P2) {
            maxPartnerRev = params.MAX_REV_PARTNER_P2;
        }
        return x.hasPartner && x.partner.revenue < maxPartnerRev;
    }
);


*/

let cf7 = Credit("Crédit d'impôt pour personne à charge", (x, cp) => {
  let params = cp["FED_PERSONNE_A_CHARGE"];
  let kidsUnder18WithLowRevenue = false;
  if (x.hasKids) {
    let maxkidrev = params.MAX_KID_REV;
    if (x.revenue > params.MAX_REV) {
      maxkidrev = params.MAX_KID_REV - (x.revenue - params.MAX_REV) * 0.01457;
    }

    if (x.revenue >= params.MIN_REV_P2) {
      maxkidrev = params.MAX_KID_REV_P2;
    }
    for (let i = 0; i < x.kidAmount; i++) {
      if (x.kids[i].age < 18 && x.kids[i].revenue < maxkidrev) {
        kidsUnder18WithLowRevenue = true;
      }
    }
  }
  return !x.hasPartner && kidsUnder18WithLowRevenue;
});
cf7.category = "Mesure selon la situation familiale";
cf7.type_credit = "Non remboursable";
cf7.reference =
  "http://cffp.recherche.usherbrooke.ca/outils-ressources/guide-mesures-fiscales/credit-pour-personne-a-charge-admissible/";

let cf16 = Credit("Déduction pour frais de garde", (x) => {
  return hasKid(x, (kid) => {
    return kid.age < 16 && kid.frais_engages.frais_garde == true;
  });
});
cf16.category = "Mesures relatives aux enfants";
cf16.reference =
  "http://cffp.recherche.usherbrooke.ca/outils-ressources/guide-mesures-fiscales/deduction-frais-garde-enfants/";
cf16.type_credit = "Déduction";

let cf15 = Credit(
  "Déduction fédérale pour cotisations syndicales et professionnelles",
  (x) => {
    return x.frais_engages.cotisation_syndicale_professionnelle;
  }
);
cf15.category = "Mesures relatives au travail";
cf15.type_credit = "Déduction";
cf15.reference =
  "http://cffp.recherche.usherbrooke.ca/outils-ressources/guide-mesures-fiscales/cotisation-syndicale-ou-professionnelle/";

let cf14 = Credit("Déduction pour frais de déménagement", (x) => {
  return x.frais_engages.demenagement;
});
cf14.category = "Mesures relatives au travail";
cf14.note = `Les frais de déménagement ne sont pas déductibles s'il n'existe aucun lien entre le déménagement du particulier et l'occupation d'un emploi, de l'exploitation d'une entreprise ou
de la fréquentation d'un établissement d'enseignement. Le lien requis n'existe pas si un particulier déménage uniquement pour des raisons personnelles.`;
cf14.reference =
  "http://cffp.recherche.usherbrooke.ca/outils-ressources/guide-mesures-fiscales/frais-demenagement/";
cf14.type_credit = "Déduction";

let cf9 = Credit("Crédit canadien pour emploi", (x) => {
  return x.revenue_type.emploi;
});
cf9.category = "Mesures relatives au travail";
cf9.type_credit = "Non remboursable";
cf9.reference =
  "http://cffp.recherche.usherbrooke.ca/outils-ressources/guide-mesures-fiscales/credit-canadien-emploi/";

let csp8 = Credit("Crédit d'impôt remboursable pour frais médicaux", (x) => {
  return (
    x.sante.frais_medicaux_admissibles == "true" &&
    (x.revenue_type.emploi || x.revenue_type.travailleur_autonome) &&
    revenu_familial(x) < 47400 &&
    x.revenue >= 3080
  );
});
csp8.type_credit = "Remboursable";
csp8.reference =
  "https://cffp.recherche.usherbrooke.ca/outils-ressources/guide-mesures-fiscales/supplement-et-credit-impot-frais-medicaux/";

let cf8 = Credit("Crédit d'impôt pour la TPS ", (x, cp) => {
  let params = cp["FED_TPS"];
  let kids_under_19 = 0;
  if (x.hasKids) {
    for (let i = 0; i < x.kidAmount; i++) {
      if (x.kids[i].age < 19) {
        kids_under_19++;
      }
    }
  }

  let seuilsConjoint = [
    params.P0_MAXREV,
    params.P1_MAXREV,
    params.P2_MAXREV,
    params.P3_MAXREV,
    params.P4_MAXREV,
  ];

  let seuilsCelib = [
    params.NP0_MAXREV,
    params.NP1_MAXREV,
    params.NP2_MAXREV,
    params.NP3_MAXREV,
    params.NP4_MAXREV,
  ];
  if (x.hasPartner) {
    return revenu_familial(x) < seuilsConjoint[kids_under_19];
  } else {
    return revenu_familial(x) < seuilsCelib[kids_under_19];
  }
});
cf8.category = "Mesures relatives au soutien au revenu";
cf8.type_credit = "Remboursable";
cf8.reference =
  "http://cffp.recherche.usherbrooke.ca/outils-ressources/guide-mesures-fiscales/credit-impot-tps-tvh/";

let cf5 = Credit(
  "Allocation canadienne pour enfants", //Prestation
  (x, parameters) => {
    let cp = parameters["FED_ALLOC_ENFANT"];
    let mat_admiss = [
      [
        null,
        cp._1BELOW6_0ABOVE6_MAXREV,
        cp._2BELOW6_0ABOVE6_MAXREV,
        cp._3BELOW6_0ABOVE6_MAXREV,
        cp._4BELOW6_0ABOVE6_MAXREV,
      ], // 0 enfants 6 a 18
      [
        cp._0BELOW6_1ABOVE6_MAXREV,
        cp._1BELOW6_1ABOVE6_MAXREV,
        cp._2BELOW6_1ABOVE6_MAXREV,
        cp._3BELOW6_1ABOVE6_MAXREV,
      ],
      [
        cp._0BELOW6_2ABOVE6_MAXREV,
        cp._1BELOW6_2ABOVE6_MAXREV,
        cp._2BELOW6_2ABOVE6_MAXREV,
      ],
      [cp._0BELOW6_3ABOVE6_MAXREV, cp._1BELOW6_3ABOVE6_MAXREV],
      [cp._0BELOW6_4ABOVE6_MAXREV],
    ];

    let under_six = 0;
    let six_to_eighteen = 0;
    for (let i = 0; i < x.kidAmount; i++) {
      let age = x.kids[i].age;
      if (age < 6) {
        under_six++;
      } else if (age < 18) {
        six_to_eighteen++;
      }
    }

    return (
      x.hasKids && revenu_familial(x) < mat_admiss[six_to_eighteen][under_six]
    );
  }
);
cf5.category = "Mesures relatives aux enfants";
cf5.type_credit = "Remboursable";
cf5.note = `Si l’enfant est en garde partagée, les deux parents peuvent être considérés comme le principal responsable des soins et de l’éducation de l’enfant et ils recevront alors un versement égal à
50 % du montant qu’ils auraient reçu si l’enfant avait vécu à temps plein avec eux. À cet effet, l’ARC considère qu’il y a garde partagée dans l’une ou l’autre des situations suivantes : 
<ul>
<li> l’enfant </li>
habite avec un parent quatre jours par semaine et avec l’autre parent trois jours par semaine; 
<li>l’enfant habite avec un parent durant une semaine et avec l’autre parent la </li>semaine suivante; ou
<li>tout autre cycle régulier de rotation de garde.</li>
</ul>

<br>
[1] ARC, Guide T4114, « Allocation canadienne pour enfants et les programmes provinciaux et territoriaux connexes », (2018), p. 8.

`;
cf5.reference =
  "http://cffp.recherche.usherbrooke.ca/outils-ressources/guide-mesures-fiscales/allocation-canadienne-enfants/";

let cp16 = Credit(
  "Crédit d'impôt attribuant une prime au travail",
  (x, parameters) => {
    let cp = parameters["PROV_PRIM_TRAVAIL"];
    return (
      (x.revenue_type.emploi || x.revenue_type.travailleur_autonome) &&
      !x.hasPartner &&
      x.status_etudiant != "temps_plein" &&
      !hasEnfantsAuxEtudesTempsPlein(x) &&
      !hasKid(x, (kid) => {
        return kid.age < 18;
      }) &&
      x.revenue > cp.NPNK_MINREV &&
      x.revenue < cp.NPNK_MAXREV
    );
  }
);
cp16.category = "Mesures relatives au travail";
cp16.type_credit = "Remboursable";
cp16.reference =
  "http://cffp.recherche.usherbrooke.ca/outils-ressources/guide-mesures-fiscales/credit-impot-remboursable-prime-travail/";
cp16.note = `Un étudiant à temps plein, sauf s’il a un conjoint ou un enfant qui réside avec lui, n’a pas droit à la prime au travail. Toutefois, un étudiant à temps partiel y aura droit, sauf dans la situation
où il transfère, à son père ou à sa mère, un montant pour enfant majeur aux études postsecondaires.
<br>
Il est possible de désigner son enfant (ou celui de son conjoint) comme personne à charge pour demander la prime au travail ou la prime au travail adaptée. Dans cette situation, l’enfant doit être
âgé de moins de 18 ans ou, s’il a 18 ans ou plus, poursuivre des études secondaires à la formation professionnelle ou des études postsecondaires. Si la garde de l’enfant désigné est partagée, le
pourcentage du temps de garde, pour le dernier mois de l’année, doit être d’au moins 40 %. Il est aussi à noter que l’enfant à charge désigné perd le droit de demander, pour lui-même, les crédits
d’impôt relatifs à la prime au travail.
<br>
Lorsque, pour une année donnée, un contribuable a droit à la fois à la prime au travail et à la prime au travail adaptée, il peut choisir la plus avantageuse des deux. Toutefois, pour cette année,
le contribuable et son conjoint doivent demander le même crédit d’impôt relatif à la prime au travail.
`;

let cp17 = Credit(
  "Crédit d'impôt attribuant une prime au travail",
  (x, parameters) => {
    let cp = parameters["PROV_PRIM_TRAVAIL"];
    return (
      (x.revenue_type.emploi || x.revenue_type.travailleur_autonome) &&
      !x.hasPartner &&
      (hasEnfantsAuxEtudesTempsPlein(x) ||
        hasKid(x, (kid) => {
          return kid.age < 18;
        })) &&
      x.revenue > cp.NPK_MINREV &&
      x.revenue < cp.NPK_MAXREV
    );
  }
);
cp17.type_credit = "Remboursable";
cp17.note = cp16.note;
cp17.reference = cp16.reference;
cp17.category = "Mesures relatives au travail";

let cp18 = Credit(
  "Crédit d'impôt attribuant une prime au travail",
  (x, params) => {
    let cp = params["PROV_PRIM_TRAVAIL"];
    return (
      (x.revenue_type.emploi || x.revenue_type.travailleur_autonome) &&
      x.hasPartner &&
      (!hasKid(x, (kid) => {
        return kid.age >= 18 && kid.status_etudiant == "temps_plein";
      }) ||
        !hasKid(x, (kid) => {
          return kid.age < 18;
        })) &&
      revenu_familial(x) > cp.PNK_MINREV &&
      revenu_familial(x) < cp.PNK_MAXREV
    );
  }
);
cp18.type_credit = "Remboursable";
cp18.note = cp16.note;
cp18.reference = cp16.reference;
cp18.category = "Mesures relatives au travail";

let cp19 = Credit(
  "Crédit d'impôt attribuant une prime au travail",
  (x, params) => {
    let cp = params["PROV_PRIM_TRAVAIL"];
    return (
      (x.revenue_type.emploi || x.revenue_type.travailleur_autonome) &&
      x.hasPartner &&
      (hasKid(x, (kid) => {
        return kid.age < 18;
      }) ||
        hasKid(x, (kid) => {
          return kid.status_etudiant == "temps_plein" && kid.age >= 18;
        })) &&
      revenu_familial(x) > cp.PK_MINREV &&
      revenu_familial(x) < cp.PK_MAXREV
    );
  }
);
cp19.category = "Mesures relatives au travail";
cp19.type_credit = "Remboursable";
cp19.note = cp16.note;
cp19.reference = cp16.reference;

let cp14 = Credit(
  "Crédit d'impôt pour solidarité", //REMBOURSABLE
  (x, params) => {
    let cp = params["PROV_SOLIDARITE"];
    let kids_over_18 = 0;
    let kids_under_18 = 0;
    if (x.hasKids) {
      for (let i = 0; i < x.kidAmount; i++) {
        if (x.kids[i].age < 18) {
          kids_under_18++;
        }
      }
      for (let i = 0; i < x.kidAmount; i++) {
        if (x.kids[i].age >= 18) {
          kids_over_18++;
        }
      }
    }

    if (x.logement_admissible == "true") {
      let seuils_celib = [
        cp.NP_L_0K_MAXREV,
        cp.NP_L_1K_MAXREV,
        cp.NP_L_2K_MAXREV,
        cp.NP_L_3K_MAXREV,
        cp.NP_L_4K_MAXREV,
      ];
      let seuils_couple = [
        cp.P_L_0K_MAXREV,
        cp.P_L_1K_MAXREV,
        cp.P_L_2K_MAXREV,
        cp.P_L_3K_MAXREV,
        cp.P_L_4K_MAXREV,
      ];

      if (x.plusieurs_props_locs == "true") {
        if (x.qt_props_locs == 2) {
          if (x.revenue < cp.NP_2L_MAXREV) return true;
        } else if (x.qt_props_locs == 3) {
          if (x.revenue < NP_3L_MAXREV) return true;
        } else if (x.qt_props_locs == 4) {
          if (x.revenue < cp.NP_4L_MAXREV) return true;
        }
      }

      if (x.plusieurs_props_locs != "true") {
        if (x.hasPartner) {
          return revenu_familial(x) < seuils_couple[kids_under_18];
        } else {
          return revenu_familial(x) < seuils_celib[kids_under_18];
        }
      }
      return false;
    } else if (x.logement_admissible == "false") {
      if (
        !x.hasPartner &&
        x.revenue < cp.NP_NL_M_MAXREV &&
        (kids_over_18 > 0 || x.plusieurs_props_locs == "true")
      ) {
        return true;
      }
      if (
        !x.hasPartner &&
        x.revenue < cp.NP_NL_NM_MAXREV &&
        kids_over_18 == 0 &&
        x.plusieurs_props_locs == "false"
      ) {
        return true;
      }
      return x.hasPartner && revenu_familial(x) < cp.P_MAXREV;
    }
  }
);
cp14.category = "Mesures relatives au soutien au revenu";
cp14.type_credit = "Remboursable";
cp14.reference =
  "http://cffp.recherche.usherbrooke.ca/outils-ressources/guide-mesures-fiscales/credit-impot-solidarite/";

let cf10 = Credit(
  "Allocation canadienne pour les travailleurs",
  (x, params) => {
    let cp = params["FED_ALLOC_TRAVAILLEURS"];
    return (
      (x.revenue_type.emploi || x.revenue_type.travailleur_autonome) &&
      x.age >= 19 &&
      !x.hasPartner &&
      !hasKidBelow19(x) &&
      x.revenue > cp.NPNK_MINREV &&
      x.revenue < cp.NPNK_MAXREV
    );
  }
);
cf10.category = "Mesures relatives au travail";
cf10.type_credit = "Remboursable";
cf10.reference =
  "http://cffp.recherche.usherbrooke.ca/outils-ressources/guide-mesures-fiscales/allocation-canadienne-pour-les-travailleurs/";

let cf11 = Credit(
  "Allocation canadienne pour les travailleurs",
  (x, params) => {
    let cp = params["FED_ALLOC_TRAVAILLEURS"];
    return (
      (x.revenue_type.emploi || x.revenue_type.travailleur_autonome) &&
      !x.hasPartner &&
      hasKidBelow19(x) &&
      x.revenue > cp.NPK_MINREV &&
      x.revenue < cp.NPK_MAXREV
    );
  }
);
cf11.category = "Mesures relatives au travail";
cf11.type_credit = "Remboursable";
cf11.reference =
  "http://cffp.recherche.usherbrooke.ca/outils-ressources/guide-mesures-fiscales/allocation-canadienne-pour-les-travailleurs/";

let cf12 = Credit(
  "Allocation canadienne pour les travailleurs",
  (x, params) => {
    let cp = params["FED_ALLOC_TRAVAILLEURS"];
    return (
      (x.revenue_type.emploi || x.revenue_type.travailleur_autonome) &&
      x.hasPartner &&
      !hasKidBelow19(x) &&
      revenu_familial(x) > cp.PNK_MINREV &&
      revenu_familial(x) < cp.PNK_MAXREV
    );
  }
);
cf12.category = "Mesures relatives au travail";
cf12.type_credit = "Remboursable";
cf12.reference =
  "http://cffp.recherche.usherbrooke.ca/outils-ressources/guide-mesures-fiscales/allocation-canadienne-pour-les-travailleurs/";

let cf13 = Credit(
  "Allocation canadienne pour les travailleurs",
  (x, params) => {
    let cp = params["FED_ALLOC_TRAVAILLEURS"];
    return (
      (x.revenue_type.emploi || x.revenue_type.travailleur_autonome) &&
      x.hasPartner &&
      hasKidBelow19(x) &&
      revenu_familial(x) > cp.PK_MINREV &&
      revenu_familial(x) < cp.PK_MAXREV
    );
  }
);
cf13.category = "Mesures relatives au travail";
cf13.type_credit = "Remboursable";
cf13.reference =
  "http://cffp.recherche.usherbrooke.ca/outils-ressources/guide-mesures-fiscales/allocation-canadienne-pour-les-travailleurs/";

let cp0_a = Credit("Crédit d'impôt pour personne vivant seule", (x, params) => {
  let cp = params["AGE_RET_PVS"];
  return (
    x.age < 65 &&
    !x.hasPartner &&
    !hasKid(x, (kid) => {
      return kid.age >= 18;
    }) &&
    !(x.plusieurs_props_locs == "true") &&
    !x.revenue_type.retraite &&
    x.revenue < cp.LINE11_MAXREV
  );
});
addVivantSeuleInfo(cp0_a);

let cp0_b = Credit("Crédit d'impôt pour personne vivant seule", (x, params) => {
  let cp = params["AGE_RET_PVS"];
  return (
    x.age < 65 &&
    !x.hasPartner &&
    hasKid(x, (kid) => {
      return kid.age >= 18 && kid.status_etudiant == "temps_plein";
    }) &&
    !hasKid(x, (kid) => {
      return (
        kid.age >= 18 &&
        (kid.status_etudiant == "temps_partiel" ||
          kid.status_etudiant == "pas_aux_etudes")
      );
    }) &&
    !(x.plusieurs_props_locs == "true") &&
    !x.revenue_type.retraite &&
    x.revenue < cp.LINE12_MAXREV
  );
});
addVivantSeuleInfo(cp0_b);

let cp1_2 = Credit(
  "Crédit en raison de l'âge", // (Crédit en raison de l'âge seulement)
  (x, params) => {
    let cp = params["AGE_RET_PVS"];
    let kidO18NotStudyFullTime = hasKid(x, (kid) => {
      return kid.age >= 18 && kid.status_etudiant != "temps_plein";
    });
    return (
      x.age >= 65 &&
      ((x.hasPartner && x.partner.age < 65) ||
        x.plusieurs_props_locs == "true" ||
        kidO18NotStudyFullTime) &&
      !x.revenue_type.retraite &&
      revenu_familial(x) < cp.LINE0_MAXREV
    );
  }
);
addCreditAgeInfo(cp1_2);

let cp1_3 = Credit("Crédit en raison de l'âge", (x, params) => {
  let cp = params["AGE_RET_PVS"];
  return (
    x.age >= 65 &&
    x.hasPartner &&
    x.partner.age >= 65 &&
    !x.revenue_type.retraite &&
    revenu_familial(x) < cp.LINE1_MAXREV
  );
});
addCreditAgeInfo(cp1_3);

let cp1_4 = Credit("Crédit en raison de l'âge", (x) => {
  let kidO18NotStudyFullTime = hasKid(x, (kid) => {
    return kid.age >= 18 && kid.status_etudiant != "temps_plein";
  });
  return (
    x.age >= 65 &&
    ((x.hasPartner && x.partner.age < 65) ||
      x.plusieurs_props_locs == "true" ||
      kidO18NotStudyFullTime) &&
    x.revenue_type.retraite &&
    revenu_familial(x) < cp.LINE2_MAXREV
  );
});
addCreditAgeInfo(cp1_4);
let cp1_4a = Credit("Montant pour revenus de retraite", (x, params) => {
  let cp = params["AGE_RET_PVS"];
  let kidO18NotStudyFullTime = hasKid(x, (kid) => {
    return kid.age >= 18 && kid.status_etudiant != "temps_plein";
  });
  return (
    x.age >= 65 &&
    ((x.hasPartner && x.partner.age < 65) ||
      x.plusieurs_props_locs == "true" ||
      kidO18NotStudyFullTime) &&
    x.revenue_type.retraite &&
    revenu_familial(x) < cp.LINE2_MAXREV
  );
});
addMontantRetraiteInfo(cp1_4a);

let cp1_5 = Credit("Crédit en raison de l'âge", (x, params) => {
  let cp = params["AGE_RET_PVS"];
  return (
    x.age >= 65 &&
    x.hasPartner &&
    x.partner.age >= 65 &&
    x.revenue_type.retraite &&
    revenu_familial(x) < cp.LINE3_MAXREV
  );
});
addCreditAgeInfo(cp1_5);

let cp1_5a = Credit("Montant pour revenus de retraite", (x, params) => {
  let cp = params["AGE_RET_PVS"];
  return (
    x.age >= 65 &&
    x.hasPartner &&
    x.partner.age >= 65 &&
    x.revenue_type.retraite &&
    revenu_familial(x) < cp.LINE3_MAXREV
  );
});
addMontantRetraiteInfo(cp1_5a);
let cp1_6 = Credit("Crédit en raison de l'âge", (x, params) => {
  let cp = params["AGE_RET_PVS"];
  return (
    x.age >= 65 &&
    !x.hasPartner &&
    !(
      hasKid(x, (kid) => {
        return kid.age >= 18;
      }) || x.plusieurs_props_locs == "true"
    ) &&
    !x.revenue_type.retraite &&
    x.revenue < cp.LINE4_MAXREV
  );
});
addCreditAgeInfo(cp1_6);

let cp1_6a = Credit(
  "Crédit d'impôt pour personne vivant seule",
  (x, params) => {
    let cp = params["AGE_RET_PVS"];
    return (
      x.age >= 65 &&
      !x.hasPartner &&
      !hasKid(x, (kid) => {
        return kid.age >= 18;
      }) &&
      !(x.plusieurs_props_locs == "true") &&
      !x.revenue_type.retraite &&
      x.revenue < cp.LINE4_MAXREV
    );
  }
);
addVivantSeuleInfo(cp1_6a);
let cp1_7 = Credit("Crédit en raison de l'âge", (x, params) => {
  let cp = params["AGE_RET_PVS"];
  let kidO18StudyFullTime = hasKid(x, (kid) => {
    return kid.age >= 18 && kid.status_etudiant == "temps_plein";
  });
  return (
    x.age >= 65 &&
    !x.hasPartner &&
    kidO18StudyFullTime &&
    x.plusieurs_props_locs != "true" &&
    !x.revenue_type.retraite &&
    x.revenue < cp.LINE5_MAXREV
  );
});
addCreditAgeInfo(cp1_7);

let cp1_7a = Credit(
  "Crédit d'impôt pour personne vivant seule",
  (x, params) => {
    let cp = params["AGE_RET_PVS"];
    let kidO18StudyFullTime = hasKid(x, (kid) => {
      return kid.age >= 18 && kid.status_etudiant == "temps_plein";
    });
    return (
      x.age >= 65 &&
      !x.hasPartner &&
      kidO18StudyFullTime &&
      !hasKid(x, (kid) => {
        return (
          kid.age >= 18 &&
          (kid.status_etudiant == "temps_partiel" ||
            kid.status_etudiant == "pas_aux_etudes")
        );
      }) &&
      !(x.plusieurs_props_locs == "true") &&
      !x.revenue_type.retraite &&
      x.revenue < cp.LINE5_MAXREV
    );
  }
);
addVivantSeuleInfo(cp1_7a);
let cp1_8 = Credit("Crédit en raison de l'âge", (x, params) => {
  let cp = params["AGE_RET_PVS"];

  let res =
    x.age >= 65 &&
    !x.hasPartner &&
    !hasKid(x, (kid) => {
      return kid.age >= 18;
    }) &&
    !(x.plusieurs_props_locs == "true") &&
    x.revenue_type.retraite &&
    x.revenue < cp.LINE6_MAXREV;

  return res;
});
addCreditAgeInfo(cp1_8);

let cp1_8a = Credit(
  "Crédit d'impôt pour personne vivant seule",
  (x, params) => {
    let cp = params["AGE_RET_PVS"];

    let res =
      x.age >= 65 &&
      !x.hasPartner &&
      !hasKid(x, (kid) => {
        return kid.age >= 18;
      }) &&
      !(x.plusieurs_props_locs == "true") &&
      x.revenue_type.retraite &&
      x.revenue < cp.LINE6_MAXREV;
    console.log("RES");
    console.log(res);
    return res;
  }
);
addVivantSeuleInfo(cp1_8a);

let cp1_8b = Credit("Montant pour revenus de retraite", (x, params) => {
  let cp = params["AGE_RET_PVS"];

  return (
    x.age >= 65 &&
    !x.hasPartner &&
    !hasKid(x, (kid) => {
      return kid.age >= 18;
    }) &&
    !(x.plusieurs_props_locs == "true") &&
    x.revenue_type.retraite &&
    x.revenue < cp.LINE6_MAXREV
  );
});
addMontantRetraiteInfo(cp1_8b);
let cp1_9 = Credit("Crédit en raison de l'âge", (x, params) => {
  let cp = params["AGE_RET_PVS"];
  let kidO18StudyFullTime = hasKid(x, (kid) => {
    return kid.age >= 18 && kid.status_etudiant == "temps_plein";
  });
  return (
    x.age >= 65 &&
    !x.hasPartner &&
    kidO18StudyFullTime &&
    !(x.plusieurs_props_locs == "true") &&
    x.revenue_type.retraite &&
    x.revenue < cp.LINE7_MAXREV
  );
});
addCreditAgeInfo(cp1_9);
let cp1_9a = Credit(
  "Crédit d'impôt pour personne vivant seule",
  (x, params) => {
    let cp = params["AGE_RET_PVS"];
    let kidO18StudyFullTime = hasKid(x, (kid) => {
      return kid.age >= 18 && kid.status_etudiant == "temps_plein";
    });
    return (
      x.age >= 65 &&
      !x.hasPartner &&
      kidO18StudyFullTime &&
      !hasKid(x, (kid) => {
        return (
          kid.age >= 18 &&
          (kid.status_etudiant == "temps_partiel" ||
            kid.status_etudiant == "pas_aux_etudes")
        );
      }) &&
      !(x.plusieurs_props_locs == "true") &&
      x.revenue_type.retraite &&
      x.revenue < cp.LINE7_MAXREV
    );
  }
);
addVivantSeuleInfo(cp1_9a);
let cp1_9b = Credit("Montant pour revenus de retraite", (x, params) => {
  let cp = params["AGE_RET_PVS"];
  let kidO18StudyFullTime = hasKid(x, (kid) => {
    return kid.age >= 18 && kid.status_etudiant == "temps_plein";
  });
  return (
    x.age >= 65 &&
    !x.hasPartner &&
    kidO18StudyFullTime &&
    x.plusieurs_props_locs != "true" &&
    !x.revenue_type.retraite &&
    x.revenue < cp.LINE7_MAXREV
  );
});
addMontantRetraiteInfo(cp1_9b);

///FIN CREDIT AGE

function addMontantRetraiteInfo(cred) {
  cred.note = `Le crédit d’impôt est partageable entre les conjoints. Le montant du crédit maximal et le seuil de réduction sont indexés annuellement selon le taux d’indexation du régime d’imposition des
    particuliers.`;
  cred.reference =
    "http://cffp.recherche.usherbrooke.ca/outils-ressources/guide-mesures-fiscales/montant-revenu-pension-montant-revenus-retraite/";
  cred.category = "Mesures relatives aux aînés";
  cred.type = "Provincial";
  cred.type_credit = "Non remboursable";
}

let cpf2_1 = Credit("Montant pour revenus de retraite", (x, params) => {
  let cp = params["AGE_RET_PVS"];
  let kidO18NotStudyFullTime = hasKid(x, (kid) => {
    return kid.age >= 18 && kid.status_etudiant != "temps_plein";
  });
  return (
    x.age < 65 &&
    (x.hasPartner ||
      x.plusieurs_props_locs == "true" ||
      kidO18NotStudyFullTime) &&
    x.revenue_type.retraite &&
    revenu_familial(x) < cp.LINE8_MAXREV
  );
});
addMontantRetraiteInfo(cpf2_1);

let cpf2_2 = Credit("Montant pour revenus de retraite", (x, params) => {
  let cp = params["AGE_RET_PVS"];
  let kidO18NotStudyFullTime = hasKid(x, (kid) => {
    return kid.age >= 18 && kid.status_etudiant != "temps_plein";
  });
  return (
    x.age >= 65 &&
    (x.hasPartner ||
      x.plusieurs_props_locs == "true" ||
      kidO18NotStudyFullTime) &&
    x.revenue_type.retraite &&
    revenu_familial(x) < cp.LINE2_MAXREV
  );
});
addMontantRetraiteInfo(cpf2_2);
let cpf2_2a = Credit("Crédit en raison de l'âge", (x, params) => {
  let cp = params["AGE_RET_PVS"];
  let kidO18NotStudyFullTime = hasKid(x, (kid) => {
    return kid.age >= 18 && kid.status_etudiant != "temps_plein";
  });
  return (
    x.age >= 65 &&
    (x.hasPartner ||
      x.plusieurs_props_locs == "true" ||
      kidO18NotStudyFullTime) &&
    x.revenue_type.retraite &&
    revenu_familial(x) < cp.LINE2_MAXREV
  );
});

addCreditAgeInfo(cpf2_2a);

let cpf2_3 = Credit("Montant pour revenus de retraite", (x, params) => {
  let cp = params["AGE_RET_PVS"];
  return (
    x.age >= 65 &&
    x.hasPartner &&
    x.partner.age >= 65 &&
    x.revenue_type.retraite &&
    revenu_familial(x) < cp.LINE3_MAXREV
  );
});
addMontantRetraiteInfo(cpf2_3);

let cpf2_3a = Credit("Crédit en raison de l'âge", (x, params) => {
  let cp = params["AGE_RET_PVS"];
  return (
    x.age >= 65 &&
    x.hasPartner &&
    x.partner.age >= 65 &&
    x.revenue_type.retraite &&
    revenu_familial(x) < cp.LINE3_MAXREV
  );
});
addCreditAgeInfo(cpf2_3a);

let cpf2_4 = Credit("Montant pour revenus de retraite", (x, params) => {
  let cp = params["AGE_RET_PVS"];

  return (
    x.age < 65 &&
    !(
      hasKid(x, (kid) => {
        return kid.age >= 18;
      }) || x.plusieurs_props_locs == "true"
    ) &&
    !x.hasPartner &&
    x.revenue_type.retraite &&
    revenu_familial(x) < cp.LINE9_MAXREV
  );
});
addMontantRetraiteInfo(cpf2_4);

let cpf2_4a = Credit(
  "Crédit d'impôt pour personne vivant seule",
  (x, params) => {
    let cp = params["AGE_RET_PVS"];

    return (
      x.age < 65 &&
      !(
        hasKid(x, (kid) => {
          return kid.age >= 18;
        }) || x.plusieurs_props_locs == "true"
      ) &&
      !x.hasPartner &&
      x.revenue_type.retraite &&
      revenu_familial(x) < cp.LINE9_MAXREV
    );
  }
);
addVivantSeuleInfo(cpf2_4a);

let cpf2_5 = Credit("Montant pour revenus de retraite", (x, params) => {
  let cp = params["AGE_RET_PVS"];
  let kidO18NotStudyFullTime = hasKid(x, (kid) => {
    return kid.age >= 18 && kid.status_etudiant == "temps_plein";
  });
  return (
    !x.hasPartner &&
    x.age < 65 &&
    kidO18NotStudyFullTime &&
    x.plusieurs_props_locs == "false" &&
    x.revenue < cp.LINE10_MAXREV &&
    x.revenue_type.retraite
  );
});
addMontantRetraiteInfo(cpf2_5);
let cpf2_5a = Credit(
  "Crédit d'impôt pour personne vivant seule",
  (x, params) => {
    let cp = params["AGE_RET_PVS"];
    let kidO18StudyFullTime = hasKid(x, (kid) => {
      return kid.age >= 18 && kid.status_etudiant == "temps_plein";
    });
    return (
      !x.hasPartner &&
      x.age < 65 &&
      kidO18StudyFullTime &&
      !hasKid(x, (kid) => {
        return (
          kid.age >= 18 &&
          (kid.status_etudiant == "temps_partiel" ||
            kid.status_etudiant == "pas_aux_etudes")
        );
      }) &&
      x.plusieurs_props_locs == "false" &&
      x.revenue < cp.LINE10_MAXREV &&
      x.revenue_type.retraite
    );
  }
);

addVivantSeuleInfo(cpf2_5a);

let cpf2_6 = Credit("Montant pour revenus de retraite", (x, params) => {
  let cp = params["AGE_RET_PVS"];
  let kidO18NotStudyFullTime = hasKid(x, (kid) => {
    return kid.age >= 18 && kid.status_etudiant != "temps_plein";
  });
  return (
    !x.hasPartner &&
    x.age >= 65 &&
    !kidO18NotStudyFullTime &&
    x.plusieurs_props_locs == "false" &&
    x.revenue < cp.LINE6_MAXREV &&
    x.revenue_type.retraite
  );
});
addMontantRetraiteInfo(cpf2_6);
let cpf2_6a = Credit("Crédit en raison de l'âge", (x) => {
  let cp = params["AGE_RET_PVS"];
  let kidO18NotStudyFullTime = hasKid(x, (kid) => {
    return kid.age >= 18 && kid.status_etudiant != "temps_plein";
  });
  return (
    !x.hasPartner &&
    x.age >= 65 &&
    !kidO18NotStudyFullTime &&
    x.plusieurs_props_locs == "false" &&
    x.revenue < cp.LINE6_MAXREV &&
    x.revenue_type.retraite
  );
});
addCreditAgeInfo(cpf2_6a);

let cpf2_6b = Credit(
  "Crédit d'impôt pour personne vivant seule",
  (x, params) => {
    let cp = params["AGE_RET_PVS"];
    let kidO18StudyFullTime = hasKid(x, (kid) => {
      return kid.age >= 18 && kid.status_etudiant != "temps_plein";
    });

    return (
      !x.hasPartner &&
      x.age >= 65 &&
      !hasKid(x, (kid) => {
        return (
          kid.age >= 18 &&
          (kid.status_etudiant == "temps_partiel" ||
            kid.status_etudiant == "pas_aux_etudes")
        );
      }) &&
      !kidO18StudyFullTime &&
      x.plusieurs_props_locs == "false" &&
      x.revenue < cp.LINE6_MAXREV &&
      x.revenue_type.retraite
    );
  }
);
addVivantSeuleInfo(cpf2_6b);

let cpf2_7 = Credit("Montant pour revenus de retraite", (x, params) => {
  let cp = params["AGE_RET_PVS"];
  let kidO18StudyFullTime = hasKid(x, (kid) => {
    return kid.age >= 18 && kid.status_etudiant == "temps_plein";
  });
  return (
    !x.hasPartner &&
    x.age >= 65 &&
    kidO18StudyFullTime &&
    x.plusieurs_props_locs == "false" &&
    x.revenue < cp.LINE7_MAXREV &&
    x.revenue_type.retraite
  );
});
addMontantRetraiteInfo(cpf2_7);

let cpf2_7a = Credit("Crédit en raison de l'âge", (x, params) => {
  let cp = params["AGE_RET_PVS"];
  let kidO18StudyFullTime = hasKid(x, (kid) => {
    return kid.age >= 18 && kid.status_etudiant == "temps_plein";
  });
  return (
    !x.hasPartner &&
    x.age >= 65 &&
    kidO18StudyFullTime &&
    x.plusieurs_props_locs == "false" &&
    x.revenue < cp.LINE7_MAXREV &&
    x.revenue_type.retraite
  );
});
addCreditAgeInfo(cpf2_7a);

let cpf2_7b = Credit(
  "Crédit d'impôt pour personne vivant seule",
  (x, params) => {
    let cp = params["AGE_RET_PVS"];
    let kidO18StudyFullTime = hasKid(x, (kid) => {
      return kid.age >= 18 && kid.status_etudiant == "temps_plein";
    });
    return (
      !x.hasPartner &&
      x.age >= 65 &&
      kidO18StudyFullTime &&
      !hasKid(x, (kid) => {
        return (
          kid.age >= 18 &&
          (kid.status_etudiant == "temps_partiel" ||
            kid.status_etudiant == "pas_aux_etudes")
        );
      }) &&
      x.plusieurs_props_locs == "false" &&
      x.revenue < cp.LINE7_MAXREV &&
      x.revenue_type.retraite
    );
  }
);
addVivantSeuleInfo(cpf2_7b);

function revenu_familial(x) {
  if (x.hasPartner) {
    return x.revenue + x.partner.revenue;
  } else return x.revenue;
}

function Credit(
  name,
  eligibility_predicate,
  montant_credit,
  seuil_reduction,
  taux_reduction,
  montant_base = 0,
  revenu_admissible = null
) {
  let cr = {
    nom: name,
    montant: montant_credit,
    seuil_reduction: seuil_reduction,
    taux_reduction: taux_reduction,
    montant_base: montant_base,
    eligibility_predicate: eligibility_predicate,
    revenu_admissible: revenu_admissible,
  };

  if (revenu_admissible == null) {
    cr.revenu_admissible = (x) => {
      return x.revenue;
    }; //By default, return user revenue
    //Otherwise change for kids + partner etc...
  }
  return cr;
}

let prov = [
  cp4,
  cp5,
  cp6,
  cp7,
  cp8,
  cp9,
  cp10,
  cp11,
  cp12,
  cp13,
  cp14,
  cp15,
  cp16,
  cp17,
  cp18,
  cp19,
  cp20,
  cp21,
  cp25,
  cp26,
  cp27,
  cp28,
  cp29,
  cp30,
  cp31,
  cp32,
];
fed.push(cf1);
fed.push(cf2);
fed.push(cf3);
fed.push(cf5);
fed.push(cf6);
fed.push(cf7);
fed.push(cf8);
fed.push(cf9);
fed.push(cf10);
fed.push(cf11);
fed.push(cf12);
fed.push(cf13);
fed.push(cf14);
fed.push(cf15);
fed.push(cf16);

function hasEnfantsAuxEtudesTempsPlein(userProfile) {
  if (!userProfile.hasKids) return false;
  for (let i = 0; i < userProfile.kidAmount; i++) {
    if (userProfile.kids[i].status_etudiant == "temps_plein") return true;
  }
  return false;
}

function hasEnfantsOver18AuxEtudesTempsPlein(userProfile) {
  if (!userProfile.hasKids) return false;
  for (let i = 0; i < userProfile.kidAmount; i++) {
    if (
      userProfile.kids[i].status_etudiant == "temps_plein" &&
      userProfile.kids[i].age >= 18
    )
      return true;
  }
  return false;
}

function hasKidBelow19(userProfile) {
  if (!userProfile.hasKids) return false;
  for (let i = 0; i < userProfile.kidAmount; i++) {
    if (userProfile.kids[i].age < 19) return true;
  }
  return false;
}

function hasKid(x, pred) {
  if (!x.hasKids) {
    return false;
  } else {
    for (let i = 0; i < x.kidAmount; i++) {
      if (pred(x.kids[i])) return true;
    }
  }
  return false;
}

let csp = [csp1, csp2, csp3, csp4, csp5, csp6, csp7, csp8, csp9];
let csf = [csf1, csf2, csf4, csf5];

for (let i = 0; i < csp.length; i++) {
  csp[i].category = "Mesures relatives à la santé";
  prov.push(csp[i]);
}
for (let i = 0; i < csf.length; i++) {
  csf[i].category = "Mesures relatives à la santé";
  fed.push(csf[i]);
}

credits.push(cepf2);
let cef = [cef1];
let cep = [cep1];

for (let i = 0; i < cef.length; i++) {
  cef[i].category = "Mesures relatives aux études";
  fed.push(cef[i]);
}

for (let i = 0; i < cep.length; i++) {
  cep[i].category = "Mesures relatives aux études";
  prov.push(cep[i]);
}

let cdpf = [cdpf1, cdpf2];
for (let i = 0; i < cdpf.length; i++) {
  cdpf[i].type = "Fédéral et Provincial";
  cdpf[i].category = "Mesures relatives aux dons et contributions politiques";
  credits.push(cdpf[i]);
}

for (let i = 0; i < fed.length; i++) {
  fed[i].type = "Fédéral";
  credits.push(fed[i]);
}

for (let i = 0; i < prov.length; i++) {
  prov[i].type = "Provincial";
  credits.push(prov[i]);
}

function addCreditAgeInfo(cred) {
  cred.reference =
    "http://cffp.recherche.usherbrooke.ca/outils-ressources/guide-mesures-fiscales/credit-impot-age/";
  cred.type_credit = "Non remboursable";
  cred.category = "Mesures relatives aux aînés";
  cred.type = "Provincial";
  cred.note = `Pour le volet provincial du crédit en raison de l'âge, si le particulier est décédé au cours de l’année d’imposition, il devait avoir atteint l’âge d’admissibilité au moment du décès pour bénéficier du
    crédit.
    <br>
    Le crédit en raison de l’âge peut soit être utilisé par le particulier, soit être transféré, en tout ou en partie, à son conjoint [1]. Tant au fédéral qu’au Québec, le conjoint est admissible au transfert du crédit s’il ne vit pas séparément du particulier à la fin de l’année.
    <br>[1]Art. 118.8 LIR et art. 752.0.7.5a) et b) LI.`;
}

function addVivantSeuleInfo(cred) {
  cred.type_credit = "Non remboursable";
  cred.reference =
    "http://cffp.recherche.usherbrooke.ca/outils-ressources/guide-mesures-fiscales/credit-personne-vivant-seule/";
  cred.type = "Provincial";
  cred.category = "Mesure selon la situation familiale";
}

let arr = [
  cp0_a,
  cp0_b,
  cp1_2,
  cp1_3,
  cp1_4,
  cp1_4a,
  cp1_5,
  cp1_5a,
  cp1_6,
  cp1_6a,
  cp1_7,
  cp1_7a,
  cp1_8,
  cp1_8a,
  cp1_8b,
  cp1_9,
  cp1_9a,
  cpf2_1,
  cpf2_2,
  cpf2_2a,
  cpf2_3,
  cpf2_3a,
  cpf2_4,
  cpf2_4a,
  cpf2_5,
  cpf2_5a,
  cpf2_6,
  cpf2_6a,
  cpf2_6b,
  cpf2_7,
  cpf2_7a,
];
credits = credits.concat(arr);

for (let i = 0; i < credits.length; i++) {
  credits[i].index = "MC" + i;
  if (credits[i].note != null) {
    add(credits[i].index, credits[i].note, credits[i].nom);
  }
}
