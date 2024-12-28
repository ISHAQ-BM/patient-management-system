interface Medicament {
  id: number;
  nom: string;
  description: string;
}


interface Ordonnance {
  date_ordonnance: string;
  description: string;
  medicaments: MedicamentDose[];
}

interface MedicamentDose {
  medicament: Medicament;
  dose: string;
  frequence: string;
  duree: string;
}


interface Examen {
  type_examen: 'biologique' | 'radiologique' | 'autre';  
  date_examen: string;
  bilan: string;
}


interface Consultation {
  date_consultation: string;
  diagnostic: string;
  resume: string;
  medecin_nom: string;
  ordonnance: Ordonnance;
  examens: Examen[];
}


interface Dossier {
  date_derniere_mise_a_jour: string;
  antecedents: string;
  consultations: Consultation[];
}


export interface DPIResponse {
  numero_securite_sociale: string;
  nom: string;
  prenom: string;
  date_naissance: string;
  adresse: string;
  telephone: string;
  mutuelle: string;
  medecin_traitant_nom: string;
  personne_contact_nom: string;
  personne_contact_telephone: string;
  dossier: Dossier;
}
