
  export interface CreateDPIResponse{
    message:string,
    user:User,
    patient:Patient,
    dossier:Dossier

    

  }

  interface Dossier{
    NSS:string,
    date_derniere_mise_a_jour:string
  }

  interface User{
  username:string,
  email:string,
  first_name:string,
  last_name:string,

}

interface Patient{
    numero_securite_sociale:string,
    date_naissance:string,
   adresse:string,
    telephone: string,
    mutuelle: string,
    personne_contact_nom: string,
    personne_contact_telephone: string
}