import { Area, Bloc, UserWithBlocs } from "@/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: Bloc[];
}

export class ApiService {


  private static getRequestOptions(method: string = 'GET', body?: any): RequestInit {
    const options: RequestInit = {
      method,
      headers: {
      'Content-Type': 'application/json',
    },
      credentials: 'include', 
    };

    if (body) {
      options.body = JSON.stringify(body);
    }

    return options;
  }


  static async getBlocs(): Promise<Bloc[]> {
    try {
      const response = await fetch(`${API_URL}/blocs/`, this.getRequestOptions());

      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }

      const data: PaginatedResponse<Bloc> = await response.json();


      return data.results;
    } catch (error) {
      console.error("Erreur lors de la récupération des blocs:", error);
      throw new Error("Impossible de récupérer les blocs depuis l'API");
    }
  }


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


  static async getAreas(): Promise<Area[]> {
    try {
      const response = await fetch(`${API_URL}/areas/`, this.getRequestOptions());

      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }

      const data = await response.json();

      return data.results;
    } catch (error) {
      console.error("Erreur lors de la récupération des zones:", error);
      throw new Error("Impossible de récupérer les zones depuis l'API");
    }
  }


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


  static async getUserWithBlocs(userId: number): Promise<UserWithBlocs> {
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

 
  static async updateBlocStatus(blocId: number, status: 'en projet' | 'complété' | null): Promise<any> {
    try {
      if (status === null) {
        return await this.removeBlocStatus(blocId);
      } else {
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

  static async removeBlocStatus(blocId: number): Promise<{message: string}> {
    try {
      const response = await fetch(
        `${API_URL}/user-bloc-completions/?bloc_id=${blocId}`, 
        this.getRequestOptions()
      );

      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }

      const data = await response.json();
      
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


  static async createBloc(blocData: {
    name: string;
    description: string;
    starting_position: string;
    style: string;
    level: string;
    area: number;
    lat: number;
    lng: number;
    img_url?: string;
  }): Promise<any> {
    try {
      const response = await fetch(
        `${API_URL}/blocs/`, 
        this.getRequestOptions('POST', blocData)
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Erreur HTTP: ${response.status} - ${JSON.stringify(errorData)}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Erreur lors de la création du bloc:", error);
      throw new Error("Impossible de créer le bloc");
    }
  }
}
