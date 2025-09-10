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
   * Options de base pour les requêtes avec authentification
   */
  private static getRequestOptions(method: string = 'GET', body?: any): RequestInit {
    const options: RequestInit = {
      method,
      headers: {
      'Content-Type': 'application/json',
    },
      credentials: 'include', // Toujours inclure les cookies pour l'authentification
    };

    if (body) {
      options.body = JSON.stringify(body);
    }

    return options;
  }

  /**
   * Récupère tous les blocs depuis l'API
   */
  static async getBlocs(): Promise<Bloc[]> {
    try {
      const response = await fetch(`${API_URL}/blocs/`, this.getRequestOptions());

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
      const response = await fetch(`${API_URL}/blocs/${id}/`, this.getRequestOptions());

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
      const response = await fetch(`${API_URL}/areas/`, this.getRequestOptions());

      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }

      const data = await response.json();

      return data.results || data;
    } catch (error) {
      console.error("Erreur lors de la récupération des zones:", error);
      throw new Error("Impossible de récupérer les zones depuis l'API");
    }
  }

  /**
   * Ajoute un commentaire à un bloc (nécessite une authentification)
   */
  static async addComment(blocId: number, text: string, rating?: number, parentId?: number): Promise<any> {
    try {
      const body: any = { 
        bloc: blocId, 
        text: text 
      };
      
      if (rating !== undefined) {
        body.rating = rating;
      }
      
      if (parentId !== undefined) {
        body.parent = parentId;
      }

      const response = await fetch(
        `${API_URL}/comments/`, 
        this.getRequestOptions('POST', body)
      );

      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Erreur lors de l'ajout du commentaire:", error);
      throw new Error("Impossible d'ajouter le commentaire");
    }
  }

  /**
   * Récupère les commentaires d'un bloc spécifique
   */
  static async getCommentsByBloc(blocId: number): Promise<any[]> {
    try {
      const response = await fetch(
        `${API_URL}/comments/?bloc_id=${blocId}`, 
        this.getRequestOptions()
      );

      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }

      const data = await response.json();
      return data.results || data;
    } catch (error) {
      console.error("Erreur lors de la récupération des commentaires:", error);
      throw new Error("Impossible de récupérer les commentaires");
    }
  }

  /**
   * Récupère un utilisateur avec ses blocs en projet et complétés
   */
  static async getUserWithBlocs(userId: number): Promise<any> {
    try {
      const response = await fetch(
        `${API_URL}/users/${userId}/with_blocs/`, 
        this.getRequestOptions()
      );

      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Erreur lors de la récupération de l'utilisateur avec ses blocs:", error);
      throw new Error("Impossible de récupérer les données utilisateur");
    }
  }

  /**
   * Met à jour le statut d'un bloc (générique)
   */
  static async updateBlocStatus(blocId: number, status: 'en projet' | 'complété' | null): Promise<any> {
    try {
      if (status === null) {
        // Supprimer le statut
        return await this.removeBlocStatus(blocId);
      } else {
        // Ajouter/mettre à jour le statut
        const response = await fetch(
          `${API_URL}/user-bloc-completions/set_status/`, 
          this.getRequestOptions('POST', { 
            bloc_id: blocId, 
            status: status 
          })
        );

        if (!response.ok) {
          throw new Error(`Erreur HTTP: ${response.status}`);
        }

        return await response.json();
      }
    } catch (error) {
      console.error("Erreur lors de la mise à jour du statut:", error);
      throw new Error("Impossible de mettre à jour le statut du bloc");
    }
  }
  /**
   * Supprime le statut d'un bloc (retire de la liste projets/complétés)
   */
  static async removeBlocStatus(blocId: number): Promise<any> {
    try {
      // D'abord, récupérer l'ID de l'entrée UserBlocCompletion
      const response = await fetch(
        `${API_URL}/user-bloc-completions/?bloc_id=${blocId}`, 
        this.getRequestOptions()
      );

      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }

      const data = await response.json();
      
      // Si il y a une entrée, la supprimer
      if (data.results && data.results.length > 0) {
        const completionId = data.results[0].id;
        const deleteResponse = await fetch(
          `${API_URL}/user-bloc-completions/${completionId}/`, 
          this.getRequestOptions('DELETE')
        );

        if (!deleteResponse.ok) {
          throw new Error(`Erreur HTTP: ${deleteResponse.status}`);
        }

        return { message: 'Statut supprimé' };
      }
      
      return { message: 'Aucun statut à supprimer' };
    } catch (error) {
      console.error("Erreur lors de la suppression du statut du bloc:", error);
      throw new Error("Impossible de supprimer le statut du bloc");
    }
  }
}
