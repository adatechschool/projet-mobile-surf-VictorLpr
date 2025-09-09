import { Bloc } from "@/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: Bloc[];
}

export class ApiService {
  /**
   * Récupère tous les blocs depuis l'API
   */
  static async getBlocs(): Promise<Bloc[]> {
    try {
      const response = await fetch(`${API_URL}/blocs/`);

      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }

      const data: PaginatedResponse<Bloc> = await response.json();

      console.log("Données reçues de l'API:", data);

      return data.results;
    } catch (error) {
      console.error("Erreur lors de la récupération des blocs:", error);
      throw new Error("Impossible de récupérer les blocs depuis l'API");
    }
  }

  /**
   * Récupère un bloc spécifique par son ID
   */
  static async getBlocById(id: number): Promise<Bloc> {
    try {
      const response = await fetch(`${API_URL}/blocs/${id}/`);

      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`Erreur lors de la récupération du bloc ${id}:`, error);
      throw new Error("Impossible de récupérer le bloc depuis l'API");
    }
  }

  /**
   * Récupère les zones d'escalade
   */
  static async getAreas() {
    try {
      const response = await fetch(`${API_URL}/areas/`);

      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }

      const data = await response.json();

      // L'API Django REST Framework retourne les données dans data.results
      return data.results || data;
    } catch (error) {
      console.error("Erreur lors de la récupération des zones:", error);
      throw new Error("Impossible de récupérer les zones depuis l'API");
    }
  }
}
