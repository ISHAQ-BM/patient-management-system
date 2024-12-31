
interface PatientInfo {
  numero_securite_sociale: string;
  nom: string;
  prenom: string;
  date_naissance: string;
  adresse: string;
  telephone: string;
  mutuelle: string;
  medecin_traitant: string;
}


export interface SearchPatientResponse {
  id: number;
  NSS: string;
  date_derniere_mise_a_jour: string;
  antecedents: string;
  patient_info: PatientInfo;
}
