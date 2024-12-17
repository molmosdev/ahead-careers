import { Injectable, resource, signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { createClient } from '@sanity/client';
import { toHTML } from '@portabletext/to-html';

@Injectable({
  providedIn: 'root',
})
export class SanityService {
  private client = createClient({
    projectId: environment.SANITY_PROJECT_ID,
    dataset: environment.SANITY_DATASET,
    apiVersion: new Date().toISOString().split('T')[0],
    useCdn: true,
    token: environment.SANITY_TOKEN, // Añade el token aquí
  });

  params = signal<
    | {
        type: string;
        singleton: boolean;
        filters: { name: string; value: string }[];
      }
    | undefined
  >(undefined);
  data = resource({
    request: this.params,
    loader: async ({ request: params }) => {
      if (params) {
        let query = `*[_type == "${params.type}"]`;
        if (params.filters && params.filters.length > 0) {
          const filtersQuery = params.filters
            .map(filter => `${filter.name} == ${filter.value}`)
            .join(' && ');
          query += ` { "${params.type}": ${params.type}[${filtersQuery}] }`;
        }
        const data = await this.client.fetch(query);
        return params.singleton ? data[0] : data;
      }
    },
  });

  async getDataByType(type: string, singleton = false): Promise<any> {
    const query = `*[_type == "${type}"]`;
    const data = await this.client.fetch(query);
    return singleton ? data[0] : data;
  }

  transformBlockToHtml(block: any): string {
    return toHTML(block);
  }

  async deleteDocumentById(documentId: string): Promise<void> {
    try {
      await this.client.delete(documentId);
      console.log(`Documento con _id ${documentId} eliminado exitosamente.`);
    } catch (error) {
      console.error('Error al eliminar el documento:', error);
    }
  }

  async postDocument(document: any): Promise<void> {
    try {
      const res = await this.client.create(document);
      console.log('Documento creado:', res);
    } catch (error) {
      console.error('Error al crear el documento:', error);
    }
  }

  async uploadFile(file: File): Promise<any> {
    try {
      const asset = await this.client.assets.upload('file', file, {
        filename: file.name,
      });
      return asset;
    } catch (error) {
      console.error('Error al subir el archivo:', error);
      throw error;
    }
  }
}
